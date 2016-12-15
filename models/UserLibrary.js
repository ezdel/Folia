// require mongoose
var mongoose = require('mongoose');

// create a Schema class with mongoose
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type:String,
    unique:true
  },
  yourPlants: [{
      type: Schema.Types.ObjectId,
      ref: 'yourplants'
  }]
});

var UserLibrary = mongoose.model('UserLibrary', UserSchema);

// export the PlantsLib model
module.exports = UserLibrary;
