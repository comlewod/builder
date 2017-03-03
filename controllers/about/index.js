//import Express from 'express';
var Express = require('express');

var router = Express.Router();
router.get('/', function(req, res){
	res.send('this is about page');
});

module.exports = router;
