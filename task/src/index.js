import glob from 'glob';
import fs from 'fs-extra';
import path from 'path';
import chokidar from 'chokidar';

import config from './config';
import getWidget from './getWidget';
import concatContent from './concatContent';
import tempReg from './templateReg';
import packLayout from './packLayout';
import packPage from './packPage';

//获取文件内容 => 文本内容替换 => 记录组件，组件内容替换 => 生成output文件
//先打包单页面单组件图片，再将新图片地址替换到html、less、js
//再把上一步的单页面的所有组件的less、js合并编译

//记录页面所需要的widget
global.page_widget = {};
//监测打包文件变化
const pack_files = config.views;
var js_files = [];
var less_files = [];

fs.removeSync(config.output);
fs.ensureDirSync(config.output);
fs.ensureDirSync(path.join(config.output, 'widgets'));

//所有layout
config.layouts.forEach(filepath => {
	packLayout(filepath);	
});

//记录页面所需要的widget并将页面文件打包至output
config.pages.forEach(filepath => {
	packPage(filepath);
});

for( let page_name in page_widget ){
	let all_widget = page_widget[page_name];

	all_widget.forEach(widget_name => {
		let filepath = path.join(config.views, page_name, widget_name, widget_name);
		js_files.push( filepath + '.js');
		less_files.push( filepath + '.less');
	});

	let js_content = concatContent(js_files, page_name);
	let less_content = concatContent(less_files, page_name);
}

chokidar.watch(config.views, {
	ignored: /(^|[\/\\])\../,
	ignoreInitial: true,
}).on('all', (event, filepath) => {
	if( ~config.layouts.indexOf(filepath) ){
		packLayout(filepath);
	} else {
		packPage(filepath);
	}
});

