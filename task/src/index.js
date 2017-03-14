import glob from 'glob';
import fs from 'fs-extra';
import path from 'path';
import chokidar from 'chokidar';
import dir from './config';

//获取页面主文件
var pages = glob.sync(path.join(dir.root, 'views', '*', 'index.html'));

var replace_txt = [
	[/{widget ([\s\S]*?)}/mgi, '<% include($1) %>'],
];

pages.forEach(filepath => {
	let file_content = fs.readFileSync(filepath, {encoding: 'utf8'});
	pathAnalysis(filepath);
	file_content = replaceContent(file_content);
});

function replaceContent(content){
	replace_txt.forEach(reg => {
		content = content.replace(reg[0], reg[1]);
	});
	return content;
}

function pathAnalysis(filepath){
}
