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
      ref: 'Plants'
  }]
});

var PlantsLib = mongoose.model('plantsLib', UserSchema);

// export the PlantsLib model
module.exports = PlantsLib;
