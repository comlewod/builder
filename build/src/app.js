import Express from 'express';
//import Ejs from 'ejs';
import ExpressLayout from 'express-ejs-layouts';
import Config from './config';
import Fs from 'fs';

global.ROOT_PATH = process.cwd();

var app = Express();
//获取所有路由
Fs.readdir(Config.controllers, function(err, files){
	if( !files ){
		console.log(' —— 控制层获取失败 —— \n');
	} else {
		makePages();
		addRouter(files);
	}
});

//页面渲染
function makePages(){
	//将html文件用ejs模板引擎解析
	app.set('view engine', 'html');
	app.engine('.html', require('ejs').__express);
	//使用layout，默认在view/layout
	app.use(ExpressLayout);
}

//加载各个路由的中间件
function addRouter(arr){
	for( let i in arr ){
		let file_name = arr[i];
		//加载各个页面的controller模块
		let module = require(ROOT_PATH + '/controllers/' + file_name) ;
		file_name == 'index' && app.use('/', module);
		//路由指向
		app.use('/' + file_name, module);
	}
}

module.exports = app;
