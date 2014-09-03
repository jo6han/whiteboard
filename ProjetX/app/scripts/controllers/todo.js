'use strict';

/**
 * @ngdoc function
 * @name projectxApp.controller:TodoCtrl
 * @description
 * # TodoCtrl
 * Controller of the projectxApp
 */
angular.module('projectxApp')
	.controller('TodoCtrl', function ($scope, $http, $timeout) {
		$scope.items = [];
		var dataItems = [];
		var server = 'http://192.168.1.3:14782/johan';

		// $http.get(server).success(function (html) {
		// 	$scope.items = html;
		// });	

		function checkWithDB() {
			$http.get(server).success(function (data) {
				if (!angular.equals(data, dataItems)) {
					tick();
					console.log('back to tick')
				} else {
					$timeout(checkWithDB, 10000);
					console.log('checkWithDB again in 10 sec')
				}

			});
		}

		function tick() {
			$http.get(server).success(function (data) {
				$scope.items = data;
				dataItems = data;
				$timeout(checkWithDB, 10000);
				console.log("tick tack 10 sec")
			});
		}

		tick();



		$scope.removeItem = function (itemId, index) {
			$http.delete(server + '/' + itemId);
			$scope.items.splice(index, 1);
		};

		$scope.addItem = function (item, listInfo, colorInfo) {
			var newItem = {
				description: item,
				list: listInfo,
				color: colorInfo,
				done: false
			};
			console.log(JSON.stringify(newItem));
			$http.post(server, newItem).success(function (html) {
				$scope.items.push(html);
			});


		};
		// soon tm
		$scope.updateItem = function (itemId, description, list, color) {
			var itemToUpdate = $http.get(server + '/' + itemId);
			itemToUpdate.success(function (html) {
				var tmpItem = html;
				tmpItem.description = description;
				tmpItem.list = list;
				tmpItem.color = color;
				console.log(tmpItem);


				$http.put(server + '/' + itemId, tmpItem);
			});
		};

		$scope.incompleteCount = function () {
			var i, count = 0;
			for (i = 0; i < $scope.items.length; i = i + 1) {
				if (!$scope.items[i].done) {
					count = count + 1;
				}
			}
			return count;
		};

		$scope.showIncompleteCount = function () {
			return $scope.incompleteCount() !== 0;
		};
	})
	.directive('myDraggable', ['$document',
		function ($document) {
			return function (scope, element, attr) {
				var startX = 0,
					startY = 0,
					x = 0,
					y = 0;

				element.css({
					position: 'relative',
					border: '1px solid red',
					backgroundColor: 'lightgrey',
					cursor: 'pointer'
				});

				element.on('mousedown', function (event) {
					// Prevent default dragging of selected content
					event.preventDefault();
					startX = event.pageX - x;
					startY = event.pageY - y;
					$document.on('mousemove', mousemove);
					$document.on('mouseup', mouseup);
				});

				function mousemove(event) {
					y = event.pageY - startY;
					x = event.pageX - startX;
					element.css({
						top: y + 'px',
						left: x + 'px'
					});
				}

				function mouseup() {
					$document.off('mousemove', mousemove);
					$document.off('mouseup', mouseup);
				}
			};
		}
	]);