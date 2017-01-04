var passport = require('passport');
var googleStrategy = require('passport-google-oauth').OAuth2Strategy;
var YourPlants = require('../models/YourPlants');

module.exports = function(){
	passport.use(new googleStrategy({
	  clientID: '934579778545-kljd7ea5kgcf8l3lenr189rumbj1ben6.apps.googleusercontent.com',
	  clientSecret: 'RK7PBYQ4c5es4em9qct1uPrF',
	  callbackURL: 'http://localhost:3000/auth/google/callback'},
	  function(req, accessToken, refreshToken, profile, done){

	  	// Create a new google profile object
	  	var googleProfile = {};
	  	// The object will contain the ID and name
	  	YourPlants.googleProfile.id = req.user.displayName;
	  	YourPlants.googleProfile.token = accessToken;

	    done(null, YourPlants);
	  }
	));
};

//This adds a user to the DB with the Google ID
// module.exports = function(){
// 	passport.use(new googleStrategy({
// 	  clientID: '934579778545-kljd7ea5kgcf8l3lenr189rumbj1ben6.apps.googleusercontent.com',
// 	  clientSecret: 'RK7PBYQ4c5es4em9qct1uPrF',
// 	  callbackURL: 'http://localhost:3000/auth/google/callback'},
// 	  function(accessToken, refreshToken, profile, done){
// 	    UserLibrary.findOrCreate({ googleId: profile.id }, function(err, user) {
// 	        return done(err, user);
// 	        console.log(UserLibrary);
// 	    });
// 	  }
// 	));

// };