var gulp = require('gulp');
var sass = require('gulp-sass');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
	return gulp.src('./public/assets/css/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./public/assets/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: '.'
		}
	})
});

gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('assets/css/**/*.scss', ['sass']);
	gulp.watch('./*.html', browserSync.reload);
	gulp.watch('.public/assets/js/*.js', browserSync.reload);
});
