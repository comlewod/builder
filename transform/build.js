//监控和编译打包任务
import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import chokidar from 'chokidar';

//该方法获取失败
//import babel from 'babel-core';
const babel = require('babel-core');

//任务文件
const ROOT_PATH = process.cwd();
//获取文件名数组
const src_files = glob.sync(path.join(ROOT_PATH, 'build', 'src', '*.js'));
const dest = path.join(ROOT_PATH, 'build', 'dest');

function makeBabel(){
	//删除打包后的文件夹（包括里面的文件）
	fs.removeSync(dest);
	fs.ensureDirSync(dest);

	src_files.forEach(filepath => {
		//获取文件名
		const file_name = path.relative(path.join(ROOT_PATH, 'build', 'src'), filepath);
		//转化
		const file_content = babel.transformFileSync(filepath, {
			//这里的编译信息要取自根目录的.babelrc的设定
			presets: ['es2015'],
		}).code;
		fs.writeFileSync(path.join(dest, file_name), file_content);
	});
}

//监控文件变化
chokidar.watch(src_files, {}).on('all', (event, filepath) => {
	makeBabel(filepath);
});

