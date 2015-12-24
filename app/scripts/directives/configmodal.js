'use strict';

/**
 * @ngdoc directive
 * @name dot2dotApp.directive:configModal
 * @description
 * # configModal
 */
angular.module('dot2dotApp')
  .directive('configModal', function () {
    return {
      templateUrl: 'views/configmodal.html',
      restrict: 'E',
      controller: ['$scope', function($scope) {
        $scope.p1colors = ['cadetblue', 'tomato'];
        $scope.p2colors = ['limegreen', 'goldenrod'];

        // defaults
        $scope.size = 4;
        $scope.p1color = $scope.p1colors[0];
        $scope.p2color = $scope.p2colors[0];

        // button click handler
        $scope.startGame = function() {
          console.log($scope.size, $scope.p1color, $scope.p2color);

          console.log('starting game');
          angular.element('#configModal').modal('hide');
        };
      }]
    };
  });
