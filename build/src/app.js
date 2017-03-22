import express from 'express';
import expressLayout from 'express-ejs-layouts';
import config from './config';
import fs from 'fs-extra';
import path from 'path';

global.ROOT_PATH = process.cwd();

const app = express();

//获取所有路由
fs.readdir(config.controllers, function(err, files){
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
	app.engine('.html', require('ejs').__express);
	app.set('views', path.join(ROOT_PATH, 'output'));
	app.set('view engine', 'html');
	//app.set('layout', config.output);
	app.use(expressLayout);
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
//export default app;
