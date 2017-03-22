import path from 'path';
import glob from 'glob';
import config from './config';
import getWidget from './getWidget';
import replaceContent from './replaceContent';

/*
 *	单页面打包，主要对主文件index.html和组件文件比如：nav.html
 *	filepath: []
 */

function packPage(filepath){
	let dir = path.parse(filepath).dir;

	if( ~config.pages.indexOf(filepath) ){
		//页面名称
		console.log('\n========== page 改变 ============');
		var page_name = path.relative(config.views, dir);

	} else if( ~config.widgets.indexOf(filepath) ){
		console.log('\n========== widget 改变 ============');
		var page_name = path.relative(config.views, path.join(dir, '..'));
	} else {
		console.log('\n========== 无效文件 ============');
		return;
	}
	console.log('变动文件:	\n' + filepath + '\n');

	page_widget[page_name] = [];
	//比如：获取主页面文件index.html所依赖的widget
	let content_widget = replaceContent(filepath, page_name);
	if( content_widget ){
		getWidget(content_widget, page_name);
	}
}

export default packPage;
