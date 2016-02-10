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

// Minify & Zip HTML
gulp.task('html', function() {
  return gulp.src('./src/*.html')
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
    return gulp.src('src/img/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['lint', 'scripts']);
    gulp.watch('src/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'html', 'styles', 'images', 'watch']);