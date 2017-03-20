import path from 'path';
import fs from 'fs-extra';
import config from './config';
import replaceContent from './replaceContent';

/*
 *	获取未被记录widget的文本内容	
 *	origin_widget: 未被记录的widget
 *	page_name: 页面名称 
 */

function getWidget(origin_widget, page_name){
	for( let widget_name in origin_widget ){
		let filepath = path.join(config.views, page_name, widget_name, widget_name + '.html');
		let is_exist = fs.existsSync(filepath);
		//该widget文件是否已创建
		if( is_exist ){
			let content_widget = replaceContent(filepath, page_name);
			//如果该widget内容返回未被记录的widget，则再次获取未被记录的widget
			if( content_widget ){
				getWidget(content_widget, page_name);
			}
		} else {
			console.log(filepath + ' 未被创建');
		}
	}
}

export default getWidget;
