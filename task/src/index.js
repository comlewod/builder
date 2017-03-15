import glob from 'glob';
import fs from 'fs-extra';
import path from 'path';
import chokidar from 'chokidar';
import config from './config';

//获取页面主文件
var pages = glob.sync(path.join(config.root, 'views', '*', 'index.html'));

var replace_txt = {
	widget: [/{widget ([\s\S]*?)}$/mgi, '<% include($1) %>'],
};

pages.forEach(filepath => {
	let file_content = fs.readFileSync(filepath, {encoding: 'utf8'});
	pathAnalysis(filepath);
	var all_widget = getWidget(filepath);
	//file_content = replaceContent(file_content);
});

function replaceContent(content){
	replace_txt.forEach(reg => {
		content = content.replace(reg[0], reg[1]);
	});
	return content;
}

//filepath: ../views/about/index.html
function pathAnalysis(filepath){
	var dir = path.parse(filepath).dir;
	fs.readdir(dir, (err, files) => {
		if( err ) throw err;
		//页面名称
		let page_name = path.relative(config.views, dir); 
		files.forEach(file => {
			fs.stat(path.join(dir, file), (err, stats) => {
				if( err ) throw err;
				//获取页面内组件名称
				if( stats.isDirectory() ){
					var widget_name = file;
				}
			});
		});
	});
}

//获取所依赖的widget
function getWidget(filepath){
	let dir = path.parse(filepath).dir;
	let page_name = path.relative(config.views, dir); 
	var file_content = fs.readFileSync(filepath, {encoding: 'utf8'});
	var matches = file_content.match(replace_txt.widget[0]);
	if( matches ){
		matches.forEach(mat => {
			
		});
	}
	file_content = file_content.replace(replace_txt.widget[0], function($0, $1){
		let arr = $1.split('=>');
		let widget_name = arr[0].trim();
		let obj = arr[1].trim();
		let file_name = page_name + '_' + widget_name + '.html';
		return '<% include("' + file_name + '", ' + obj + ') %>';
	});
	console.log(file_content);
}


