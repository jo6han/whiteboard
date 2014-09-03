'use strict';

/**
 * @ngdoc function
 * @name projectxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the projectxApp
 */
angular.module('projectxApp')
	.controller('MainCtrl', function ($scope) {
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
	});