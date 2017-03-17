import glob from 'glob';
import fs from 'fs-extra';
import path from 'path';
import chokidar from 'chokidar';
import config from './config';

//获取页面主文件
const pages = glob.sync(path.join(config.views, '*', 'index.html'));
//获取所有widget
const widgets = glob.sync(path.join(config.views, '*', '*', '*.html'));
//记录页面所需要的widget
var page_widget = {};

var replace_txt = {
	widget: [/{widget ([\s\S]*?)}$/mgi, '<% include($1) %>'],
};

pages.forEach(filepath => {
	//filepath: ../views/about/index.html
	//记录页面所需要的widget并将页面文件打包至output
	getWidget(filepath);
	//pathAnalysis(filepath);
});
console.log(page_widget);

for( let page_name in page_widget ){
	let all_widget = page_widget[page_name];
};


//获取页面主文件所依赖的widget
function getWidget(filepath, type){
	if( type ){
		let dir = path.parse(filepath).dir;
		console.log(dir);
	} else {
		//页面路径
		let dir = path.parse(filepath).dir;
		//页面名称
		let page_name = path.relative(config.views, dir); 
		page_widget[page_name] = {};

		let file_content = fs.readFileSync(filepath, {encoding: 'utf8'});

		let new_content = replaceContent(file_content, page_name);
		//将页面文件保存在output下
		fs.writeFileSync(path.join(config.output, page_name + '_index.html'), new_content);
	}
}

//替换widget引用和记录widget，包括widget里引用其他widget
function replaceContent(file_content, page_name){
	//判断文本内容是否有widget引用
	if( replace_txt.widget[0].test(file_content) ){
		let new_content = file_content.replace(replace_txt.widget[0], function($0, $1){
			let arr = $1.split('=>');
			let widget_name = arr[0].trim();
			let obj = arr[1].trim();

			//如果该widget没有被记录
			if( !page_widget[page_name][widget_name] ){
				page_widget[page_name][widget_name] = false;
			}

			let file_name = page_name + '_' + widget_name + '.html';
			return '<% include("' + file_name + '", ' + obj + ') %>';
		});
		return new_content;
	} else {
		return false;
	}
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

