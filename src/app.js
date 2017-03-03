import Express from 'express';
import Fs from 'fs';

var app = Express();
//获取所有路由
Fs.readdir('./controllers', function(err, files){
	addRouter(files);
});

//加载各个路由的中间件
function addRouter(arr){
	for( let i in arr ){
		let file_name = arr[i];
		let module = require('../controllers/' + file_name) ;
		file_name == 'index' &&  (file_name = '');
		app.use('/' + file_name, module);
	}
}

module.exports = app;
