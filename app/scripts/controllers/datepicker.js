'use strict';

var app = angular.module('phoneappApp');

app.controller('DatepickerCtrl', function($scope, $timeout) {
	$scope.showWeeks = true;

	$scope.today = function() {
		$scope.dt = new Date();
	};
	$scope.today();
	
	$scope.toggleWeeks = function() {
		$scope.showWeeks = !$scope.showWeeks;
	};

	$scope.clear = function() {
		$scope.dt = null;
	};

	// Disable weekend selection
	$scope.disabled = function(date, mode) {
		return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
	};

	$scope.toggleMin = function() {
		$scope.minDate = ($scope.minDate) ? null : new Date();
	};
	$scope.toggleMin();

	$scope.openDatePicker = function() {
		$timeout(function() {
			$scope.opened = true;
		});
	};

	$scope.dateOptions = {
		'year-format': 'yyyy',
		'starting-day': 1
	};

});