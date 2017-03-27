import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';

const ROOT_PATH = process.cwd();
var config = {
	root: ROOT_PATH,
	views: path.join(ROOT_PATH, 'views'),
	statics: path.join(ROOT_PATH, 'statics'),
	output: path.join(ROOT_PATH, 'output'),
};

//获取所有layout
config.layouts = glob.sync(path.join(config.views, '*.html'));
//获取页面主文件
config.pages = glob.sync(path.join(config.views, '*', 'index.html'));
//获取所有widget
config.widgets = glob.sync(path.join(config.views, '*', '*', '*.html'));

export default config;
