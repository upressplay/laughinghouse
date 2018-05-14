var gulp = require('gulp');

/*===================================================
Begin gulp plugins
===================================================*/

//js lint
var jshint = require("gulp-jshint");

//sass compiling
var sass = require('gulp-sass');

//adding vendor prefixes
var autoprefixer = require('gulp-autoprefixer');

//read html to determine how to combine files
var useref = require('gulp-useref');

//minify javascript
var uglify = require('gulp-uglify');

//allow conditionals in pipes
var gulpIf = require('gulp-if');

//conctenate files
var concat = require('gulp-concat');

//minify css
var cssnano = require('gulp-cssnano');

//image optimization
var imagemin = require('gulp-imagemin');

//cache already processed images to speed up future jobs
var cache = require('gulp-cache');

//delete existing build folder so old files aren't left behind
var del = require('del');

//allows a sequence of tasks rather than all tasks simultaneously
var runSequence = require('run-sequence');

//generates source maps
var sourcemaps = require('gulp-sourcemaps');

//handles pipe errors so watch tasks don't fail on errors
var plumber = require('gulp-plumber');

//display plumber errors in the terminal
var notify = require('gulp-notify');

//validate html files
var htmlhint = require("gulp-htmlhint");

//sort streams
var sort = require("sort-stream");

//allow the browser to automatically sync with local changes
var browserSync = require('browser-sync').create();

// order js dependencies to avoid undefined errors
var order = require("gulp-order");

/*===================================================
End gulp plugins
===================================================*/
//Display error messages in the console in a readable format
var onError = function(error) {
	notify.onError({ //display the error message in the console
		message: error.message
	})(error);
	this.emit('end'); //allow task to end gracefully without killing watch tasks
};

gulp.task('jsHint', function () {
	gulp.src(['src/js/**/*.js','!src/js/lib/**/*.js','!src/js/**/*.min.js']) // path to your files excluding lib folder and .min files
	.pipe(plumber({errorHandler: onError})) //if the validator crashes, fail gracefully
	.pipe(jshint()) //validate the javascript
	.pipe(jshint.reporter('jshint-stylish')) //format the error output for easy readability
});

gulp.task('jsMinify', function () {
	
	var src = [
        'src/js/lib/trace.js',
        'src/js/lib/utils.js',
        'src/js/**/*.js',
        'src/js/site.js'
    ];
	gulp.src(src) // path to your files

	.pipe(sourcemaps.init()) //initialize creating the sourcemap
	.pipe(concat('main.min.js')) //combine all javascript files into a single file
	.pipe(plumber({errorHandler: onError})) //if the minifier crashes, fail gracefully
	//.pipe(uglify()) //minify the javascript
	.pipe(sourcemaps.write('.')) //generate the final sourcemap
	.pipe(gulp.dest('build/js')) //write the finished file to the destination
});

gulp.task('scripts', function (callback) { //validate and minify scripts
	runSequence('jsHint', //make sure the javascript validates before trying to minify it
		['jsMinify'],
		callback
	)
});

gulp.task('sass', function(){
	del.sync('src/css');
	return gulp.src('src/scss/**/*.scss')
		.pipe(plumber({errorHandler: onError})) //if the SASS parser crashes, fail gracefully
		.pipe(sass()) // Using gulp-sass
		.pipe(gulp.dest('src/css'))
});

gulp.task('css', function(){
	return gulp.src('src/css/**/*.css')
	.pipe(sourcemaps.init()) //initialize creating the sourcemap
	.pipe(autoprefixer({ //add vendor prefixes for browsers in our support table
		browsers: ["Chrome >= 32", "ie >=9", "Firefox >=27", "Safari >=7", "last 2 Opera versions", "iOS >= 6", "Android >= 4"],
		cascade: false
	}))
	.pipe(plumber({errorHandler: onError})) //if the minifier crashes, fail gracefully
	.pipe(cssnano()) //minify css
	.pipe(concat('main.min.css')) //combine all css files into a single file
	.pipe(sourcemaps.write('.')) //generate the final sourcemap
	.pipe(gulp.dest('build/css'))
});


gulp.task('styles', function (callback) { //Parse SASS and process css
	runSequence('sass', //make sure all SASS files are parsed before concatenating and minifying css
		['css'],
		callback
	)
});

gulp.task('images', function(){ //optimize all image files
	return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg|ico)')
	// Caching images that ran through imagemin, cached files will be skipped unless they have been altered
	.pipe(cache(imagemin({
			interlaced: true
		})))
	.pipe(gulp.dest('build/img'))
});

gulp.task('watch', function(){ //watch for changes to HTML, CSS, SASS and javascript files and automatically process them
	gulp.watch(['src/scss/**/*.scss','src/css/**/*.css'], ['styles']);
	gulp.watch(['src/js/**/*.js'], ['scripts']);
});

gulp.task('fonts', function() { //copy over fonts, since fonts are already optimized we only need to copy them as is
	return gulp.src('src/fonts/**/*')
	.pipe(gulp.dest('build/fonts'))
});


gulp.task('pages', function (callback) { //validate and copy html and php pages
	runSequence('htmlHint', //make sure the html validates before trying to copy it
		['copyPages'],
		callback
	)
});

gulp.task('clean:build', function() { //delete the build folder, this is used when preparing a final build to remove any files that are no longer needed
	return del.sync('build/**/*');
});

gulp.task('cache:clear', function (callback) { //clear the cache for imagemin
	return cache.clearAll(callback)
});

gulp.task('build', function (callback) { //do a full build for the site
	runSequence('clean:build', 'sass',
		['css', 'scripts', 'images', 'fonts'],
		callback
	)
});
