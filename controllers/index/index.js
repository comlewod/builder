//import Express from 'express';
var Express = require('express');

var router = Express.Router();
router.get('/', function(req, res){
	res.send('Hello, comlewod');
});

module.exports = router;
