var express = require('express');
var router = express.Router();

// Make sure user is signed in or order to view plants
router.use('/', function(req, res, next){
	if(!req.user){
		res.redirect('../');
	} else {
		console.log("Redirect to my home page");
	}
});

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('users', {user: 
  						{name: req.session.passport.user.displayName,
  						id: req.session.passport.user.id}});
});

module.exports = router;