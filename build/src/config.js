import path from 'path';

//根目录的绝对路径
var root = path.join(__dirname, '../..');

var config = {
	controllers: path.join(root, 'controllers'),
	views: path.join(root, 'views'),
	pages: path.join(root, 'views', 'pages'),
};

module.exports = config;
