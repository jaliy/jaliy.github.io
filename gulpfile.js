
var gulp = require('gulp'),
	less = require('gulp-less'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	jshint = require('gulp-jshint'),
	minifyCss = require('gulp-minify-css');;


var path = {
	less:"./less/**/*.less",
	css_dev:"./css_dev",
	css:"./css",
	js_dev:"./js_dev/**/*.js",
	js:"./js"
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
	    .pipe(gulp.dest(path.js));
});


gulp.task('default', ["compile","compress-js"], function() {
	gulp.watch(path.less,["compile"]);
	gulp.watch(path.js_dev,["compress-js"]);
});