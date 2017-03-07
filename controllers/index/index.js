//import Express from 'express';
var Express = require('express');
//var Config = require(ROOT_PATH + '/build/dest/config');

var router = Express.Router();
var index_path = ROOT_PATH + '/views/pages/index';

router.get('/', function(req, res){
	res.render(index_path);
});

module.exports = router;
