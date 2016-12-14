// require mongoose
var mongoose = require('mongoose');

// create a Schema class with mongoose
var Schema = mongoose.Schema;

// make BookSchema a Schema
var PlantSchema = new Schema({
  // author: just a string
  plantName: {
    type:String
  },
  // title: just a string
  moisture: {
    type:String
  },
  shade: {
    type:String
  },
  soil: {
    type:String
  }
});

// NOTE: the book's id is stored automatically. 
// Our Library model will have an array to store these ids.

// create the Book model with the BookSchema
var YourPlants = mongoose.model('YourPlants', PlantSchema);

// export the model so we can use it on our server file.
module.exports = YourPlants;

