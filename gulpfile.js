
var gulp = require('gulp'),
	less = require('gulp-less'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	jshint = require('gulp-jshint'),
	minifyCss = require('gulp-minify-css'),
	useref = require('gulp-useref'),
	rev = require('gulp-rev'),
	revCollector = require('gulp-rev-collector');


var path = {
	html:"./**/*.html",
	less:"./app/less/**/*.less",
	css_dev:"./app/css_dev",
	css:"./app/css",
	js_dev:"./app/js_dev/**/*.js",
	js:"./app/js",
	rev:"./app/rev",
	revJson:"./app/rev/*.json"
};

/**编译less&&min css*/
gulp.task("compile",function() {
	return gulp.src(path.less)
	    .pipe(less())
	    .pipe(gulp.dest(path.css_dev))
	    .pipe(minifyCss({compatibility: 'ie8'}))
	    .pipe(gulp.dest(path.css));
});

/**压缩js*/
gulp.task("compress-js", function() {
	return gulp.src(path.js_dev)
	    .pipe(uglify())
	    .pipe(rename(function(path) {
	    	path.basename += ".min"
	    }))
	    //.pipe(rev())
	    .pipe(gulp.dest(path.js));
//	    .pipe(rev.manifest())
//	    .pipe(gulp.dest(path.rev));
});
/**min文件名md5替换*/
gulp.task('rev',["compress-js"], function() {
  gulp.src([path.revJson, path.html])					
  //- 读取 rev-manifest.json 文件以及需要进行js名替换的文件
  .pipe(revCollector())
  //- 执行文件内js名的替换
  .pipe(gulp.dest('./'));
  //- 替换后的文件输出的目录
});
/**
gulp.task('useref', function(){
  return gulp.src(path.html)
        .pipe(useref())
        .pipe(gulp.dest('./app/dist'));
});
**/


gulp.task('default', ["compile","compress-js"], function() {
	gulp.watch(path.less,["compile"]);
	gulp.watch(path.js_dev,["compress-js"]);
});