// require mongoose
var mongoose = require('mongoose');

// create a Schema class with mongoose
var Schema = mongoose.Schema;

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
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
});

var UserSchema = new Schema({
  name: {
    type:String,
    unique:true
  },
  email: String,
  displayName: String,
  google: Schema.Types.Mixed,
  yourPlants: [PlantSchema]
});

var UserLibrary = mongoose.model('UserLibrary', UserSchema);

// export the PlantsLib model
module.exports = UserLibrary;