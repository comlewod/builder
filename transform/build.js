//监控和编译打包任务
import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import chokidar from 'chokidar';

//该方法获取失败
//import babel from 'babel-core';
const babel = require('babel-core');

const ROOT_PATH = process.cwd();
//express服务文件
const express_obj = {
	//src: glob.sync(path.join(ROOT_PATH, 'build', 'src', '*.js')),
	src: path.join(ROOT_PATH, 'build', 'src'),
	dest: path.join(ROOT_PATH, 'build', 'dest'),
};

//对静态资源处理的文件
const task_obj = {
	//src: glob.sync(path.join(ROOT_PATH, 'task', 'src', '*.js')),
	src: path.join(ROOT_PATH, 'task', 'src'),
	dest: path.join(ROOT_PATH, 'task', 'dest'),
};

//监控文件变化，若是文件数组，不能检测到每次的修改（可能是模块bug），所以改成监测整个目录
var spy_arr = [
	express_obj.src, 
	task_obj.src,
];
chokidar.watch(spy_arr, {
	ignored: /(^|[\/\\])\../,
}).on('all', (event, filepath) => {
	console.log(path.relative(ROOT_PATH, filepath));
	makeBabel(express_obj);
	makeBabel(task_obj);
});

function makeBabel(obj){
	var src = glob.sync(path.join(obj.src, '*.js'));
	var dest = obj.dest;
	//删除打包后的文件夹（包括里面的文件）
	fs.removeSync(dest);
	fs.ensureDirSync(dest);

	src.forEach(filepath => {
		//获取文件名
		var file_name = path.relative(path.join(dest, '..', 'src'), filepath);
		//转化
		var file_content = babel.transformFileSync(filepath, {
			//这里的编译信息要取自根目录的.babelrc或package.json的设定
			presets: ['es2015'],
		}).code;
		fs.writeFileSync(path.join(dest, file_name), file_content);
	});
}


