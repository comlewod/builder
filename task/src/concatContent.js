import path from 'path';
import fs from 'fs-extra';
import config from './config';

/*
 *	合并数组内文件的内容并返回
 *	all_files:	[]	比如：js数组文件
 *	page_name:	页面名称
 */

function concatContent(all_files, page_name){
	if( all_files.length ){
		return all_files.reduce((pre_val, filepath) => {
			return pre_val + fs.readFileSync(filepath, {encoding: 'utf8'});
		}, '') || '';
	}
}

export default concatContent;
