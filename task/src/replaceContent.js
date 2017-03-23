import path from 'path';
import glob from 'glob';
import fs from 'fs-extra';

import config from './config';
import tempReg from './templateReg';
import packImage from './packImage';

/*
 *	替换widget依赖和记录widget，同时生成页面文件 和 widget文件
 *	filepath:	页面主文件index.html 和 widget文件比如nav.html
 *	page_name:	页面名称
 */

var widget_reg = tempReg.widget[0];

function replaceContent(filepath, page_name){
	let content_widget = null;
	let dir = path.parse(filepath).dir;
	let file_content = fs.readFileSync(filepath, {encoding: 'utf8'});
	let new_content = '';

	//获取和打包该组件所有图片
	let img_arr = glob.sync(path.join(dir, '*.+(jpeg|jpg|png|gif)'));
	packImage(img_arr);
	

	//判断文本内容是否有widget引用
	if( widget_reg.test(file_content) ){
		new_content = file_content.replace(widget_reg, function($0, $1){
			let arr = $1.split('=>');
			let widget_name = arr[0].trim();
			let params_str = '';
			if( arr[1] ){
				params_str = ', ' + arr[1].trim();
			}

			//如果该widget没有被记录
			if( !~page_widget[page_name].indexOf(widget_name) ){
				page_widget[page_name].push(widget_name);

				!content_widget && (content_widget = []);
				content_widget.push(widget_name);
			}

			let file_name = page_name + '_' + widget_name + '.html';
			return '<%- include("' + file_name + '"' + params_str + ') %>';
		});
	} else {
		new_content = file_content;
	}
	//这里可以继续替换换其他正则内容

	//在output/widgets里生成该组件文件
	let file_name = path.parse(filepath).name;
	let dest = path.join(config.output, 'widgets', page_name + '_' + file_name + '.html')
	fs.writeFileSync(dest, new_content);
	
	//返回没有被记录的widget
	return content_widget;
}

export default replaceContent;
