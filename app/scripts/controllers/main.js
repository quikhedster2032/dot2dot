'use strict';

/**
 * @ngdoc function
 * @name dot2dotApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dot2dotApp
 */
angular.module('dot2dotApp')
  .controller('MainCtrl', function ($scope) {
      $scope.startGame = function () {
          console.log ('startGamefunction');
      };
  });
