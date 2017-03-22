import path from 'path';
import fs from 'fs-extra';
import config from './config';

/*
 *	打包所有layout文件
 *	filepath: []
 */
function packLayout(filepath){
	console.log('\n===============layout 改变============');
	let name = path.parse(filepath).name;
	let content = fs.readFileSync(filepath, {encoding: 'utf8'});	
	fs.writeFileSync(path.join(config.output, name + '.html'), content);
}

export default packLayout;
