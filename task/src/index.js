import glob from 'glob';
import fs from 'fs-extra';
import path from 'path';
import chokidar from 'chokidar';
import config from './config';
import getWidget from './getWidget';
import tempReg from './templateReg';
import replaceContent from './replaceContent';

//获取文件内容 => 文本内容替换 => 记录组件，组件内容替换 => 生成output文件

//获取所有layout
const layouts = glob.sync(path.join(config.views, '*.html'));
//获取页面主文件
const pages = glob.sync(path.join(config.views, '*', 'index.html'));
//获取所有widget
const widgets = glob.sync(path.join(config.views, '*', '*', '*.html'));
//记录页面所需要的widget
global.page_widget = {};

fs.removeSync(config.output);
fs.ensureDirSync(config.output);
fs.ensureDirSync(path.join(config.output, 'widgets'));

//所有layout
layouts.forEach(filepath => {
	packLayout(filepath);	
});

//记录页面所需要的widget并将页面文件打包至output
pages.forEach(filepath => {
	packPages(filepath);
});

//监测打包文件变化
const pack_files = config.views;
chokidar.watch(config.views, {
	ignored: /(^|[\/\\])\../,
	ignoreInitial: true,
}).on('all', (event, filepath) => {
	let dir = path.parse(filepath).dir;
	if( dir == config.views ){
		console.log('layout 改变');
		packLayout(filepath);
	} else {
		console.log('\n==========widget 改变============');
		packPages(filepath);
	}
});


function packLayout(filepath){
	let name = path.parse(filepath).name;
	let content = fs.readFileSync(filepath, {encoding: 'utf8'});	
	fs.writeFileSync(path.join(config.output, name + '.html'), content);
}
function packPages(filepath){
	let dir = path.parse(filepath).dir;
	//页面名称
	let page_name = path.relative(config.views, dir); 
	page_widget[page_name] = {};
	//主页面文件index.html所依赖的widget
	console.log(22222, page_name);
	let content_widget = replaceContent(filepath, page_name);
	if( content_widget ){
		getWidget(content_widget, page_name);
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

