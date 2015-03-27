var gulp        = require('gulp');
var browserSync = require('browser-sync');
var concat      = require('gulp-concat');
var cssmin      = require('gulp-cssmin');
var rename      = require('gulp-rename');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var uncss       = require('gulp-uncss');
var uglify      = require('gulp-uglify');


// Static server
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './src'
    }
  });
});

// Compile app styles files
gulp.task('sass', function () {
  return gulp.src('sass/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({indentedSyntax: true}))
    .pipe(concat('app.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/styles/'));
});

// Compile vendor sstyles into a single, minified file
gulp.task('vendor-css', function () {
  return gulp.src(
    [
      'node_modules/angular-material/angular-material.min.css'
    ]
  )
  .pipe(cssmin())
  .pipe(concat('vendor.css'))
  // .pipe(uncss({
  //   html: ['src/**/*.html']
  // }))
  .pipe(gulp.dest('src/styles/'));
});

// Compile vendor scripts into a single, minified file
gulp.task('vendor-js', function () {
  return gulp.src([
      'node_modules/angular/angular.min.js',
      'node_modules/angular-animate/angular-animate.min.js',
      'node_modules/angular-aria/angular-aria.min.js',
      'node_modules/angular-material/angular-material.min.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/scripts/'));
});

// Launch BrowserSync and watch files for changes
gulp.task('default', ['sass', 'vendor-css', 'vendor-js', 'browser-sync'], function () {
  gulp.watch('sass/*.sass', ['sass', browserSync.reload]);
  gulp.watch(['src/scripts/**/*.js', './src/**/*.html'], browserSync.reload);
});