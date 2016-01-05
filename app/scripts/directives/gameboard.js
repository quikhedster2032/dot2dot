'use strict';
/*globals Snap */
/**
 * @ngdoc directive
 * @name dot2dotApp.directive:gameboard
 * @description
 * # gameboard
 */
angular.module('dot2dotApp')
  .directive('gameboard', function () {
    return {
      template: '<svg id="gameboard" width="500" height="500"></svg>',
      restrict: 'E',
      scope: true,
      controller: ['$scope', '$timeout', '$http', function($scope, $timeout, $http) {
        //console.debug($scope.size, $scope.p1color, $scope.p2color);

        $scope.clearDotSelectable = function() {
          for (var row = 0; row < $scope.size; row += 1) {
            for (var column = 0; column < $scope.size; column += 1) {
              $scope.dots[row][column].data('isSelectable', false)
                .attr('fill', 'lightgray')
                .attr('r', 5);
            }
          }
        };

        $scope.findLine = function(dot1, dot2) {
          for (var l = 0; l < $scope.lines.length; l += 1) {
            var line = $scope.lines[l];
            var dots = line.data('dots');
            if (dots.indexOf(dot1) !== -1 && dots.indexOf(dot2) !== -1) {
              return line;
            }
          }
          return null;
        };

        $scope.addLine = function(dot1, dot2) {
          var line = $scope.svgElement.line(dot1.attr('cx'), dot1.attr('cy'), dot2.attr('cx'), dot2.attr('cy'));
		      $scope.svgLineGroup.add(line);
          line.attr({
            'stroke': 'black',
            'stroke-width': 4
          });
          line.data('dots', [dot1, dot2]);
          $scope.lines.push(line);
          dot1.data('lineCount', dot1.data('lineCount') + 1);
          dot2.data('lineCount', dot2.data('lineCount') + 1);
		      for (var s = 0; s < $scope.squares.length; s += 1) {
			      var square = $scope.squares[s];
			      var dots = square.dots;
			      if (dots.indexOf(dot1) !== -1 && dots.indexOf(dot2) !== -1) {
              square.lineCount += 1;
			        if (square.lineCount === 4) {
				        console.log (square.lineCount);
				        var topLeft = dots[2];
				        var rect = $scope.svgElement.rect(topLeft.attr('cx'), topLeft.attr('cy'), $scope.gbspace, $scope.gbspace);
				        $scope.svgRectGroup.add(rect);
						if ($scope.p1.turn) {
							$scope.p1.score += 1;
							rect.attr({'fill':$scope.p1.color});
						} else {
							$scope.p2.score += 1;
							rect.attr({'fill':$scope.p2.color});
						}
			        }
            }
		      }
		      return line;
        };

        $scope.handleDotClick = function() {
          //console.debug('handle dot click', this);
          //var startX = this.attr('cx');
          //var startY = this.attr('cy');
          if (!this.data('isSelectable')) {
            console.error('Dot is not selectable');
            return;
          }
          $scope.clearDotSelectable();
          if ($scope.playerClick === 0) {
            $scope.playerClick = this;
			      var row = this.data('row');
			      var column = this.data('col');
			      this.attr('fill', 'red')
			        .attr('r', 5);
			      if (row !== 0) {
				      var dotAbove = $scope.dots[row - 1][column];
				      if ($scope.findLine(this, dotAbove) === null) {
                dotAbove.attr('fill', 'green')
                  .attr('r', 15)
                  .data('isSelectable', true);
              }
			      }
			      if (row !== $scope.size - 1) {
				      var dotBelow = $scope.dots[row + 1][column];
				      if ($scope.findLine(this, dotBelow) === null) {
                dotBelow.attr('fill', 'green')
                  .attr('r', 15)
                  .data('isSelectable', true);
				      }
			      }
			      if (column !== 0) {
				      var dotLeft = $scope.dots[row][column - 1];
				      if ($scope.findLine(this, dotLeft) === null) {
                dotLeft.attr('fill', 'green')
                  .attr('r', 15)
                  .data('isSelectable', true);
              }
			      }
			      if (column !== $scope.size - 1) {
				      var dotRight = $scope.dots[row][column + 1];
				      if ($scope.findLine(this, dotRight) === null) {
                dotRight.attr('fill', 'green')
                  .attr('r', 15)
                  .data('isSelectable', true);
              }
			      }
			    } else {
			      var line = $scope.findLine(this, $scope.playerClick);
			      if (line !== null) {
			        console.error('Line is already visible : should not happen!');
			      }

			      line = $scope.addLine(this, $scope.playerClick);

				  $scope.p1.turn = !$scope.p1.turn;
				  $scope.p2.turn = !$scope.p2.turn;

			      $scope.clearDotSelectable();

			      // Set the color and isSelectable for the next set of dots
			      $scope.lines.forEach(function(line) {
			        line.data('dots').forEach(function(dot) {
			          if (dot.data('lineCount') < dot.data('maxLines')) {
			            dot.attr('fill', 'green')
			              .attr('r', 15)
                    .data('isSelectable', true);
			          }
			        });
			      });

			      $scope.playerClick = 0;
						$scope.$apply();
		      }
        };

        $scope.initializeGameboard = function() {
          //console.debug('Initializing the gameboard');
          var i, j;
          $scope.playerClick = 0;
		      var gbsize = 500;
          var gbspace = gbsize / $scope.size;
		      $scope.gbspace = gbspace;
          var gbmargin = gbspace / 2;
          var dotsize = 15;
          $scope.dots = [];
		      $scope.squares = [];
          $scope.svgElement = new Snap('#gameboard');
		      $scope.svgRectGroup = $scope.svgElement.group();
		      $scope.svgLineGroup = $scope.svgElement.group();
		      $scope.svgLineGroup.before($scope.svgRectGroup);
          $scope.svgDotGroup = $scope.svgElement.group();
          $scope.svgDotGroup.before($scope.svgLineGroup);
          var s = $scope.svgElement;
          for (i = 0; i < $scope.size; i += 1) {
            var row = [];
            for (j = 0; j < $scope.size; j += 1) {
              var dot = s.circle((j * gbspace) + gbmargin, (i * gbspace) + gbmargin, dotsize);
              dot.data('row', i)
                .data('col', j)
                .data('isSelectable', true)
                .data('maxLines', 4)
                .data('lineCount', 0)
                .click($scope.handleDotClick);
              if (i === 0 || i === $scope.size - 1 || j === 0 || j === $scope.size - 1) {
                dot.data('maxLines', 3); // top/bottom/left/right row
              }
              row[j] = dot;
              $scope.svgDotGroup.add(dot);
			        if (i !== 0) {
				        if (j !== 0) {
					        var square = {};
                  square.dots = [];
                  square.dots.push(dot);
                  square.dots.push($scope.dots[i - 1][j]);
                  square.dots.push($scope.dots[i - 1][j - 1]);
                  square.dots.push(row[j - 1]);
                  square.lineCount = 0;
                  $scope.squares.push(square);
				        }
				      }
            }
            $scope.dots.push(row);

          }
          // Corner dots
          $scope.dots[0][0].data('maxLines', 2);
          $scope.dots[0][$scope.size - 1].data('maxLines', 2);
          $scope.dots[$scope.size - 1][0].data('maxLines', 2);
          $scope.dots[$scope.size - 1][$scope.size - 1].data('maxLines', 2);

          $scope.lines = [];
          //console.debug('Gameboard ready!');
        };

        var waitForRenderAndDoSomething = function() {
          if($http.pendingRequests.length > 0) {
              $timeout(waitForRenderAndDoSomething); // Wait for all templates to be loaded
          } else {
              //the code which needs to run after dom rendering
              $scope.initializeGameboard();
          }
        };
        $timeout(waitForRenderAndDoSomething); // Waits for first digest cycle
      }]
    };
  });
