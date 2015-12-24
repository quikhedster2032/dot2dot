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
      controller: ['$scope', '$location', function($scope, $location) {
        $scope.p1colors = ['cadetblue', 'tomato', 'blueviolet'];
        $scope.p2colors = ['limegreen', 'goldenrod', 'darkgray'];

        // defaults
        $scope.size = 5;
        $scope.p1color = $scope.p1colors[0];
        $scope.p2color = $scope.p2colors[0];

        // button click handler
        $scope.startGame = function() {
          console.log($scope.size, $scope.p1color, $scope.p2color);

          angular.element('#configModal').modal('hide');
          var params = {
            size: $scope.size,
            p1color: $scope.p1color,
            p2color: $scope.p2color
          };
          $location.path('/play').search(params);
        };
      }]
    };
  });
