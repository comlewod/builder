var Express = require('express');

var router = Express.Router();
var index_path = ROOT_PATH + '/views/about/index';

router.get('/', function(req, res){
	res.render(index_path);
});

module.exports = router;
