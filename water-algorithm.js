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

// max pts for total algorithm:

var waterScore = 0;

// calculate the season
var calculateSeason = function() {
    var date = new Date();
    var currentMonth = date.getMonth();
    if (0 <= currentMonth <= 2 || currentMonth === 11) {
        console.log('winter');
        waterScore += 5;
        console.log(waterScore);
    } else if (3 <= currentMonth <= 4) {
        waterScore += 10;
    } else if (5 <= currentMonth <= 7) {
        waterScore += 15;
    } else if (8 <= currentMonth <= 10) {
        waterScore += 10;

    }
    caclulateSoil();
};

// calculate the soil thang
var soilConditon = 'LMH'

var caclulateSoil = function() {
     

        if (soilConditon === 'L') {
            waterScore += 11;
        } else if (soilConditon === 'LM') {
            waterScore += 9;
        } else if (soilConditon === 'LMH') {
            waterScore += 7;
            console.log(waterScore + 'soil')
        } else if (soilConditon === 'M') {
            waterScore += 5;
        } else if (soilConditon === 'MH') {
            waterScore += 3;

        }
        calculateWater();
    }
    // calculate the watering requirements 

var waterCondition = 'M'

var calculateWater = function() {
        if (waterCondition === 'D') {
            waterScore += 5;    
        } else if (waterCondition === 'DM') {
            waterScore += 10;
        } else if (waterCondition === 'M') {
            waterScore += 30;
            console.log(waterScore + ' water')
        } else if (waterCondition === 'MWe') {
            waterScore += 30;
        } else if (waterCondition === 'We') {
            waterScore += 40;
        } else if (waterCondition === 'WeWa') {
            waterScore += 45;
        } else if (waterCondition === 'Wa') {
            waterScore += 50;

        }
        calculateShade();
    }
    // calculate shade requirements 

var shadeCondition = 'SN'

var calculateShade = function() {
    if (shadeCondition === 'FS') {
        waterScore += 5;
    } else if (shadeCondition === 'S') {
        waterScore += 9;
    } else if (shadeCondition === 'SN') {
        waterScore += 13;
    } else if (shadeCondition === 'N') {
        waterScore += 16;
        console.log(waterScore + 'shade')
    } else if (shadeCondition === 'FSN') {
        waterScore += 10;

    }
    evaluateScore();
}

// function for finding watering score:
var evaluateScore = function() {
    console.log('this waterscore: ' + waterScore);
    if (0 <= waterScore && waterScore <= 30) {
        console.log('water every 2 weeks')
    } else if (31 <= waterScore && waterScore <= 40) {
        console.log('water every 10 days')
    } else if (41 <= waterScore && waterScore <= 45) {
        console.log('water every 7 days')
    } else if (46 <= waterScore && waterScore <= 60) {
        console.log('water every 5 days')
    } else if (61 <= waterScore && waterScore <= 75) {
        console.log('water every 3 days')
    } else if (76 <= waterScore && waterScore <= 90) {
        console.log('water every other day')
    } else if (waterScore >= 91) {
        console.log('water every day')
    }

}


calculateSeason();
// evaluateScore();
console.log('waterscore: ' + waterScore);
