var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
	console.log(req.session.passport.user.displayName);
  res.render('users', {user: 
  						{name: req.session.passport.user.displayName,
  						id: req.session.passport.user.id}});
});

module.exports = router;