import path from 'path';

//根目录的绝对路径
const root = path.join(__dirname, '../..');

const config = {
	controllers: path.join(root, 'controllers'),
	views: path.join(root, 'views'),
	pages: path.join(root, 'views', 'pages'),
	output: path.join(root, 'output'),
};

module.exports = config;
