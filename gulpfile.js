var gulp = require('gulp');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var saveLicense = require('uglify-save-license');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

gulp.task('default', ['build', 'assets']);

gulp.task('dev', ['default', 'watch']);

gulp.task('watch', function(){
  gulp.watch('src/**/*', ['build', 'assets']);
});

gulp.task('build', function() {
  var assets = useref.assets();
  return gulp.src('src/index.html')
    .pipe(assets)
    .pipe(gulpif('*.js', uglify({
      mangle: false,
      preserveComments: saveLicense
    })))
    .pipe(gulpif('*.css', autoprefixer('last 2 versions')))
    .pipe(gulpif('*.css', minifyCSS()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});


gulp.task('assets', function() {
  return gulp.src([
    'src/items.json',
    'src/README.md'
    ])
    .pipe(gulp.dest('dist'));
});