angular.
	module('folia').
	component('userPlant', {
		template: 

		'<div id="plant-card" class="card" ng-repeat="plant in $ctrl.plants">' +

	  	'<img class="plant-image" src="../images/plant-placeholder.jpg" alt="plant image">' +

	  	'<div class="water-button">' +
	    '<img class="water-icon" src="../images/water-icon.png">' +
        '<button value="date" id="logDate"></button>' +
	  	'</div>' +

	  	'<p class="plant-name">{{plant.plantName}}</p>' +
	  	'<p class="scientific-name"><i>{{plant.latinName}}</i></p>' +
	  	'<hr class="plant-card-hr">' +

    	'<p class="water-date">Last Watered: {{plant.lastModified}}</p>' +
    	'<p class="water-days">Next Watering: {{plant.nextWatering}}</p>' +

    	'</div>',


		controller: function PlantController($scope, $http) {
    		this.plants = [];
            var plants = this.plants;
            $http({
                method: 'GET',
                url: '/myplants'
            }).then(function successCallback(response) {
                for (var i = 0; i < response.data[0].yourPlants.length; i++) {
                    plants.push(response.data[0].yourPlants[i]);
                }

            }, function errorCallback(response) {
                 console.log('Error: ' + response);
            });
                   
  	     }
	});