// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
/*var gzip = require('gulp-gzip');*/
var inlineCss = require('gulp-inline-css');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

// Concatenate, Minify & Zip JS
gulp.task('scripts', function() {
    return gulp.src('./src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        /*.pipe(gzip())*/
        .pipe(gulp.dest('./dist/js'));
});

// Minify, inline CSS & Zip HTML
gulp.task('html', function() {
  return gulp.src('./src/*.html')
    .pipe(inlineCss())
    .pipe(htmlmin({collapseWhitespace: true, removeComments:true}))
    /*.pipe(gzip())*/
    .pipe(gulp.dest('dist'))
});

// Minify & Zip CSS
gulp.task('styles', function() {
  return gulp.src('./src/css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    /*.pipe(gzip())*/
    .pipe(gulp.dest('dist/css'));
});

//Minify images
gulp.task('images', function () {
    return gulp.src('./src/img/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
});

// Concatenate, Minify & Zip JS in views folder
// TODO: figure out how to get a task to work with multiples sources and destinations
gulp.task('scripts-views', function() {
    return gulp.src('./src/views/js/*.js')
        /*.pipe(concat('all.js'))
        .pipe(gulp.dest('dist/views/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())*/
        /*.pipe(gzip())*/
        .pipe(gulp.dest('./dist/views/js'));
});

// Minify inline CSS & Zip HTML in views folder
gulp.task('html-views', function() {
  return gulp.src('./src/views/*.html')
    /*.pipe(inlineCss())*/
    .pipe(htmlmin({collapseWhitespace: true, removeComments:true}))
    /*.pipe(gzip())*/
    .pipe(gulp.dest('dist/views'))
});

// Minify & Zip CSS in views folder
gulp.task('styles-views', function() {
  return gulp.src('./src/views/css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    /*.pipe(gzip())*/
    .pipe(gulp.dest('dist/views/css'));
});

//Minify the images in views folder
// TODO: look for gulp task for responsive images
gulp.task('images-views', function () {
    return gulp.src('./src/views/images/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/views/images'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['lint', 'scripts']);
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/css/*.css', ['styles']);
    gulp.watch('src/views/js/*.js', ['scripts-views']);
    gulp.watch('src/views/*.html', ['html-views']);
    gulp.watch('src/views/css/*.css', ['styles-views']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'html', 'styles', 'images', 'scripts-views', 'html-views', 'styles-views', 'images-views','watch']);