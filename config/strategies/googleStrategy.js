var passport = require('passport');
var googleStrategy = require('passport-google-oauth').OAuth2Strategy;
var UserLibrary = require('../../models/UserLibrary.js');

module.exports = function(){
	passport.use(new googleStrategy({
	  clientID: '934579778545-kljd7ea5kgcf8l3lenr189rumbj1ben6.apps.googleusercontent.com',
	  clientSecret: 'RK7PBYQ4c5es4em9qct1uPrF',
	  callbackURL: 'http://localhost:3000/auth/google/callback'},

	  function(req, accessToken, refreshToken, profile, done){
	  	var query = { 'google.id': profile.id };
	  	// Create a new google profile object
	  	// var googleProfile = {};

	  	UserLibrary.findOne(query, function(error, user) {
	  		if(user) {
	  			console.log('Found user!');
	  			done(null, user);
	  		} else {
	  			console.log('Not found');
	  			var user = new UserLibrary();
                user.email = profile.emails[0].value;
                user.displayName = profile.displayName;
                // user specific - place for user spec. tokens in user.google
                user.google = {};
                user.google.id = profile.id;
                user.google.token = accessToken;
                user.save();
                done(null, user)	  			
	  		}
	  	});
	  	// The object will contain the ID and name
	  	// YourPlants.googleProfile.id = req.user.id;
	  	// YourPlants.googleProfile.token = accessToken;

	   //  done(null, YourPlants);
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