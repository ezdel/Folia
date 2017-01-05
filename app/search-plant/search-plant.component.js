angular.module('folia').
component('searchPlant', {
	controller: function InputPlantController ($scope) {
    	$scope.searchShown = false;
    	$scope.inputs = [];
   		$scope.addfield = function () {
   	    	$scope.inputs.push({})
    	}
    	$scope.getValue = function (item) {
        	alert(item.value)
    	}
    }
});
