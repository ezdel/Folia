var moment = require('moment');

var currentDate = moment().format('MM-DD-YYYY');
var waterInterval = 6;
var daysToWatering = 0;
var dateWatered = moment();

// $('button').on('click', function (){
dateWatered = moment();
// send dateWatered to yourplants collection in plantDB
// });

var nextWatering = moment().add(waterInterval, 'days');


var daysToWatering = nextWatering.diff(dateWatered, 'days');

// function differenceInDays(dateWatered, nextWatering) {
//     daysToWatering = Math.round((parseInt(nextWatering) - parseInt(dateWatered))/(1000*60*60*24));
// };

// if (waterInterval > 0) {

// }
//differenceInDays();
console.log("last water date: " + dateWatered);
console.log("current date: " + currentDate);
// console.log("next watering: " + nextWatering);
console.log("days to watering: " + daysToWatering);
