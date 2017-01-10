// algorithm for plant watering

// 0 = water every 2 weeks
// 100 = water every day




// Season: max pts 15
// 	Fall: 10
// 	Winter: 5
// 	Spring: 10
// 	Summer: 15

// Soil: max pts 15
// 	L (light):  11
// 	LM (light medium):  9 
// 	LMH (light medium heavy): 7
// 	M (medium):  5
// 	MH (medium heavy): 3

// Water: max pts 50
// 	D (dry): 5
// 	DM (dry moist): 10
// 	M (moist): 20
// 	MWe (moist wet): 30
// 	We (wet): 40
// 	WeWa (wet water): 45
// 	Wa (water): 50

// Shade: max pts 20
// 	FS (full shade): 5
// 	S (semi-shade): 9
// 	SN (semi-shade to no shade): 13
// 	N (no shade): 16
// 	FSN (all the shades): 10

// variables:
var soilConditon;
var waterCondition;
var shadeCondition;
var waterDays;

// grab the plant name from the card   class = plant-name
// var thisPlant = 'Swamp Onion'

// max pts for total algorithm:

var waterScore = 0;
var mongoose = require('mongoose');


// require mongojs and connect to my db
var mongojs = require('mongojs');
var databaseUrl = "plantDB";
var collections = ["plants", "userlibraries", "yourplants"];

// save mongojs to the db variable
var db = mongojs(databaseUrl, collections);

// start a mongoose connection
//mongoose.connect('mongodb://localhost/plantDB');

// show any mongoose errors
db.on('error', function(err) {
    console.log('Mongoose has an error: ', err);
});

// once logged in to the db through mongoose, log a success message
//db.once('open', function() {
  //  console.log('Mongoose connection successful.');
//});

function calculateWaterAlgo(foundResult) {
    // calculate the season
var calculateSeason = function(waterScore) {
    var date = new Date();
    var currentMonth = date.getMonth();
    if (0 <= currentMonth <= 2 || currentMonth === 11) {
        console.log('winter');
        waterScore += 5;
    } else if (3 <= currentMonth <= 4) {
        waterScore += 10;
    } else if (5 <= currentMonth <= 7) {
        waterScore += 15;
    } else if (8 <= currentMonth <= 10) {
        waterScore += 10;

    }
    caclulateSoil(waterScore);
};

// calculate the soil thang


var caclulateSoil = function(waterScore) {
     

        if (soilConditon === 'L') {
            waterScore += 11;
        } else if (soilConditon === 'LM') {
            waterScore += 9;
        } else if (soilConditon === 'LMH') {
            waterScore += 7;
        } else if (soilConditon === 'M') {
            waterScore += 5;
        } else if (soilConditon === 'MH') {
            waterScore += 3;

        }
        calculateWater(waterScore);
    }
    // calculate the watering requirements 


var calculateWater = function(waterScore) {
        if (waterCondition === 'D') {
            waterScore += 5;    
        } else if (waterCondition === 'DM') {
            waterScore += 10;
        } else if (waterCondition === 'M') {
            waterScore += 30;
        } else if (waterCondition === 'MWe') {
            waterScore += 30;
        } else if (waterCondition === 'We') {
            waterScore += 40;
        } else if (waterCondition === 'WeWa') {
            waterScore += 45;
        } else if (waterCondition === 'Wa') {
            waterScore += 50;

        }
        calculateShade(waterScore);
    }
    // calculate shade requirements 


var calculateShade = function(waterScore) {
    if (shadeCondition === 'FS') {
        waterScore += 5;
    } else if (shadeCondition === 'S') {
        waterScore += 9;
    } else if (shadeCondition === 'SN') {
        waterScore += 13;
    } else if (shadeCondition === 'N') {
        waterScore += 16;
    } else if (shadeCondition === 'FSN') {
        waterScore += 10;
    }
    evaluateScore(waterScore);
}

// function for finding watering score:
var evaluateScore = function(waterScore) {
    console.log('this waterscore: ' + waterScore);
    if (0 <= waterScore && waterScore <= 30) {
        waterDays = 14;
        console.log('water every 2 weeks')
    } else if (31 <= waterScore && waterScore <= 40) {
        waterDays = 10;
        console.log('water every 10 days')
    } else if (41 <= waterScore && waterScore <= 45) {
        waterDays = 7;
        console.log('water every 7 days')
    } else if (46 <= waterScore && waterScore <= 60) {
        waterDays = 5;
        console.log('water every 5 days')
    } else if (61 <= waterScore && waterScore <= 75) {
        waterDays = 3;
        console.log('water every 3 days')
    } else if (76 <= waterScore && waterScore <= 90) {
        waterDays = 2;
        console.log('water every other day')
    } else if (waterScore >= 91) {
        waterDays = 1;
        console.log('water every day')
    }

}
calculateSeason(waterScore);
console.log('waterscore: ' + waterScore);
console.log('water days: ' + waterDays);
return  {
    waterScore: waterScore,
    waterDays: waterDays
}
}

module.exports = function(thisPlant, next) {
    console.log("this plant: " + thisPlant);
  // Query: In our database, go to the yourplants collection, then "find" everything 
 // db.plants.find({commonName: thisPlant}, function(err, found) {
    // log any errors if the server encounters one
    //if (err) {
    //  console.log(err);
    //}
   var calc = calculateWaterAlgo();
   console.log('Calculations: ' + calc);
   return calc;
 // });
  
}

