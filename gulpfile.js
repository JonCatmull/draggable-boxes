'use strict';

const  gulp  = require('gulp'),
autoprefixer = require('gulp-autoprefixer'),
      babel  = require("gulp-babel"),
     concat  = require('gulp-concat'),
     uglify  = require('gulp-uglify'),
     rename  = require('gulp-rename'),
       sass  = require('gulp-sass'),
       maps  = require('gulp-sourcemaps'),
   cleanCSS  = require('gulp-clean-css'),
        del  = require('del'),
browserSync  = require('browser-sync').create(),
     reload  = browserSync.reload;

function swallowError (error) {
    // If you want details of the error in the console
    console.log(error.toString())
    this.emit('end')
}

gulp.task('concatScripts', () => {
    return gulp.src([
        'src/js/babel/Boxes.js',
        'src/js/babel/main.js'
    ])
    .pipe(concat('app.js'))
    .on('error', swallowError)
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('src/js'));
});

gulp.task('minifyScripts', ['concatScripts'], () => {
    return gulp.src('src/js/app.js')
    .pipe(maps.init())
    .pipe(uglify())
    .on('error', swallowError)
    .pipe(rename('app.min.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('src/js'));
});

gulp.task('compileSass', () => {
    return gulp.src('src/scss/application.scss')
    .pipe(maps.init())
    .pipe(sass())
    .on('error', swallowError)
    .pipe(maps.write('./'))
    .pipe(gulp.dest('src/css'));
});

gulp.task('minifyCSS', ['compileSass'], () => {
    return gulp.src([
        'src/css/application.css'
    ])
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .on('error', swallowError)
    .pipe(cleanCSS())
    .pipe(rename('application.min.css'))
    .pipe(gulp.dest('src/css'));
});

gulp.task('watchFiles', () => {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
    gulp.watch('src/scss/**/*.scss', ['compileSass', 'minifyCSS']).on('change', reload);
    gulp.watch('src/*.html').on('change', reload);
    gulp.watch('src/js/babel/**/*.js', ['concatScripts', 'minifyScripts']).on('change', reload);
});

gulp.task('clean', () => {
    del(['dist', 'src/css/application.css*', 'src/js/app.*.js*']);
});

gulp.task('build', ['compileSass', 'minifyCSS', 'concatScripts', 'minifyScripts'], () => {
    return gulp.src(['src/css/application.min.css','src/css/application.css.map', 'src/js/app.min.js', 'src/index.html', 'src/img/trash.svg'], { base: './src' })
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles']);

gulp.task('default', ['clean'], () => {
    gulp.start('build');
});