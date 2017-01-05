var folia = angular.module('folia', []);

folia.controller('InputPlantController', function($scope){
		$scope.searchShown = false;
    	$scope.inputs = [];
   		$scope.addfield = function () {
   	    	$scope.inputs.push({})
    	}
    	$scope.getValue = function (item) {
        	alert(item.value)
    	}
		$scope.plants = [{}]
})