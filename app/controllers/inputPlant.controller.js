var inputPlant = angular.module('inputPlant', []);
var showSearch = angular.module('showSearch', []);
inputPlant.controller('InputPlantController', function ($scope) {
    $scope.inputs = [];
    $scope.addfield = function () {
        $scope.inputs.push({})
    }
    $scope.getValue = function (item) {
        alert(item.value)
    }
});

module.exports = inputPlant;