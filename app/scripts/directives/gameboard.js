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

        $scope.initializeGameboard = function() {
          //console.debug('Initializing the gameboard');
          var gbsize = 500;
          var gbspace = gbsize / $scope.size;
          var gbmargin = gbspace / 2;
          var dotsize = 2;
          var dots = [];
          var s = new Snap('#gameboard');
          for (var i = 0; i < $scope.size; i += 1) {
            var row = [];
            for (var j = 0; j < $scope.size; j += 1) {
              row[j] = s.circle((j * gbspace) + gbmargin, (i * gbspace) + gbmargin, dotsize);
            }
            dots.push(row);
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
