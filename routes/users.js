var express = require('express');
var router = express.Router();

// Make sure user is signed in or order to do anything else
router.use('/', function(req, res, next){
	if(!req.user){
		res.redirect('/');
	} else {
		console.log("Not logged in");
	}
})

/* GET users listing. */
router.get('/', function(req, res) {
	console.log(req.session.passport.user.displayName);
  res.render('users', {user: 
  						{name: req.session.passport.user.displayName,
  						id: req.session.passport.user.id}});
});

module.exports = router;