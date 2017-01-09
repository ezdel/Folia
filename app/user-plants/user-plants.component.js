angular.
	module('folia').
	component('userPlant', {
		template: 

		'<div id="plant-card" class="card" ng-repeat="plant in $ctrl.plants">' +

	  	'<img class="plant-image" src="../images/plant-placeholder.jpg" alt="plant image">' +

	  	'<div class="water-button">' +
	    '<img class="water-icon" src="../images/water-icon.png">' +
	  	'</div>' +

	  	'<p class="plant-name">{{plant.name}}</p>' +
	  	'<p class="scientific-name"><i>{{plant.sciName}}</i></p>' +
	  	'<hr class="plant-card-hr">' +

    	'<p class="water-date">Next Watering Date: {{plant.waterDate}}</p>' +
    	'<p class="water-days">Days Remaining: {{plant.days}}</p>' +

    	'</div>',


		controller: function PlantController() {
    		this.plants = [
    		{
    			name: 'Peace Lily',
    			sciName: 'Chlorogalum pomeridianum',
    			waterDate: 'January 14',
    			days: '6'
    		},
    		{
    			name: 'Hairy Huckleberry',
    			sciName: 'Huclkeberium Harium',
    			waterDate: 'January 12',
    			days: '4'
    		}
    		];
  		}
	});