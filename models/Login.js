var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var loginSchema = mongoose.Schema({
	google: {
		id: String,
		token: String,
		email: String,
		name: String
	}
});

loginSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

loginSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('Login', loginSchema);