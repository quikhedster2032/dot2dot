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
    var size = $routeParams.size;
    var p1color = $routeParams.p1color;
    var p2color = $routeParams.p2color;
    if (size < 4 || size > 10) {
      console.error('Illegal size : ' + size);
      size = 4;
    }

    if (p1color === undefined || p1color === '') {
      console.error('Illegal color for player 1 : [' + p1color + ']');
      p1color = 'cadetblue';
    }

    if (p2color === undefined || p2color === '') {
      console.error('Illegal color for player 2 : [' + p2color + ']');
      p2color = 'limegreen';
    }

    $scope.size = size;
	  $scope.p1 = {
		  color : p1color,
		  score : 0,
		  turn : true
	  };
    $scope.p2 = {
		  color : p2color,
		  score : 0,
		  turn : false
	  };



    //console.debug(size, p1color, p2color);
  }]);
