import gulp from 'gulp';
import babel from 'gulp-babel';
import path from 'path';
import webpack from 'webpack';

var url = path.join(__dirname, 'src', 'app.js');
var dest = 'lib';

function process(){
	gulp.src(url)
	.pipe(babel())
	.pipe(gulp.dest(dest));
}

gulp.task('default', ()=>{
	process();	
});

gulp.watch(url, ()=>{
	process();	
});


