import path from 'path';
import fs from 'fs-extra';

const ROOT_PATH = process.cwd();
var dir = {
	root: ROOT_PATH,
	views: path.join(ROOT_PATH, 'views'),
};

module.exports = dir;