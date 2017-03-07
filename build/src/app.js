import Express from 'express';
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
	app.set('view engine', 'ejs');
}

//加载各个路由的中间件
function addRouter(arr){
	for( let i in arr ){
		let file_name = arr[i];
		let module = require(ROOT_PATH + '/controllers/' + file_name) ;
		file_name == 'index' && app.use('/', module);
		app.use('/' + file_name, module);
	}
}

module.exports = app;
