import fs from 'fs-extra';
import imagemin from 'imagemin';
import imageJpg from 'imagemin-jpegtran';
import imagePng from 'imagemin-optipng';
import imageGif from 'imagemin-gifsicle';

/*
 *	打包单个组件所有图片
 *	img_arr:	[]
 */

function packImage(img_arr){
	if( img_arr.length ){
		img_arr.forEach(filepath => {
			let file_content = fs.readFileSync(filepath);
			//当原图片小于500kb时
			if( file_content.length < 500 * 1000 ){
				//为了获取图片的内容，使用buffer方式
				let new_content = file_content;
				try {
					new_content = await imagemin.buffer(file_content, {
						plugins: [
							imageJpg(),
							imagePng({optimizationLevel: 2}),
							imageGif()
						]
					});
				}catch(e){
					console.log(e);
				}
				console.log(new_content);
			} else {
			}
		});
	}
}

export default packImage;
