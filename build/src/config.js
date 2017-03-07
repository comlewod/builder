import Path from 'path';

//根目录的绝对路径
var root = Path.join(__dirname, '../..');

var config = {
	controllers: Path.join(root, 'controllers'),
	views: Path.join(root, 'views'),
	pages: Path.join(root, 'views', 'pages'),
};

module.exports = config;
