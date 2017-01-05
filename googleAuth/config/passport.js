var passport  = require('passport');

module.exports = function(app) {

	// Pull in Passport middleware
	app.use(passport.initialize());
	app.use(passport.session());

	// Pull in serialize user. This puts the user object in the session
	passport.serializeUser(function(user, done){
	  done(null, user)
	});

	// Passport removes the user out of the session using deserializeuser
	passport.deserializeUser(function(user, done){
	  done(null, user);
	});

};

require('./googleStrategy')();