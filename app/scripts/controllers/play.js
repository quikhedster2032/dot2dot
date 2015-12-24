'use strict';

/**
 * @ngdoc function
 * @name dot2dotApp.controller:PlayCtrl
 * @description
 * # PlayCtrl
 * Controller of the dot2dotApp
 */
angular.module('dot2dotApp')
  .controller('PlayCtrl', [ '$scope', '$routeParams', function ($scope, $routeParams) {
    console.log($routeParams.size, $routeParams.p1color, $routeParams.p2color);
  }]);
