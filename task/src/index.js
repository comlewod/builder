import glob from 'glob';
import fs from 'fs-extra';
import path from 'path';
import chokidar from 'chokidar';
import config from './config';

//获取页面主文件
var pages = glob.sync(path.join(config.root, 'views', '*', 'index.html'));

var replace_txt = [
	[/{widget ([\s\S]*?)}/mgi, '<% include($1) %>'],
];

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
	var file_content = fs.readFileSync(filepath, {encoding: 'utf8'});
	var matches = file_content.match(replace_txt[0][0]);
	if( matches ){
		matches.forEach(mat => {
			console.log(mat);
		});
	}
}
