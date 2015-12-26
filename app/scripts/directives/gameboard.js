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
      scope: {
        size: '=size',
        p1color: '=p1color',
        p2color: '=p2color'
      },
      controller: ['$scope', '$timeout', '$http', function($scope, $timeout, $http) {
        //console.debug($scope.size, $scope.p1color, $scope.p2color);

        $scope.handleDotClick = function() {
          console.debug('handle dot click', this);
          //var startX = this.attr('cx');
          //var startY = this.attr('cy');
          if ($scope.playerClick === 0) {
			  var row = this.data('row');
			  var column = this.data('col');
			  this.attr('fill', 'red');
			  if (row !== 0) {
				var dotAbove = $scope.dots[row - 1][column];
				dotAbove.attr('fill', 'green');
			  }
			  if (row !== $scope.size - 1) {
				var dotBelow = $scope.dots[row + 1][column];
				dotBelow.attr('fill', 'green');
			  }
			  if (column !== 0) {
				var dotLeft = $scope.dots[row][column - 1];
				dotLeft.attr('fill', 'green');
			  }
			  if (column !== $scope.size - 1) {
				var dotRight = $scope.dots[row][column + 1];
				dotRight.attr('fill', 'green');
			  }
			  $scope.playerClick = 1;
			  
		  } else {
			  $scope.playerClick = 0;
			  for (var ro = 0; ro < $scope.size; ro += 1) {
				for (var col = 0; col < $scope.size; col += 1) {
					$scope.dots[ro][col].attr('fill', 'black');
				}
			 }
		  }
		  
		 
		 // var nextDot = $scope.dots[row + 1][column];
         // var endX = nextDot.attr('cx');
         // var endY = nextDot.attr('cy');
          //$scope.svgElement.line(startX, startY, endX, endY).attr({
           // 'stroke': 'black',
           // 'stroke-width': 2
          //});
        };

        $scope.initializeGameboard = function() {
          //console.debug('Initializing the gameboard');
          $scope.playerClick = 0;
		  $scope.playerTurn = 'p1';
		  var gbsize = 500;
          var gbspace = gbsize / $scope.size;
          var gbmargin = gbspace / 2;
          var dotsize = 6;
          $scope.dots = [];
          $scope.svgElement = new Snap('#gameboard');
          var s = $scope.svgElement;
          for (var i = 0; i < $scope.size; i += 1) {
            var row = [];
            for (var j = 0; j < $scope.size; j += 1) {
              var dot = s.circle((j * gbspace) + gbmargin, (i * gbspace) + gbmargin, dotsize);
              dot.data('row', i)
                .data('col', j)
                .click($scope.handleDotClick);
              row[j] = dot;
            }
            $scope.dots.push(row);
          }

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
