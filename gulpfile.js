const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

// Шлях до файлів
const paths = {
    scss: './src/scss/**/*.scss',
    html: './src/*.html',
    js: './src/js/**/*.js', // Додайте шлях до JavaScript файлів
    dest: './dist/'
};

// Завдання для компіляції SCSS у CSS
function styles() {
    return gulp.src(paths.scss)
        .pipe(sass().on('error', sass.logError)) // Обробка помилок
        .pipe(gulp.dest(`${paths.dest}/css`))
        .pipe(browserSync.stream());
}

// Завдання для копіювання HTML
function html() {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.dest))
        .pipe(browserSync.stream());
}

// Завдання для обробки JavaScript
function scripts() {
    return gulp.src(paths.js)
        .pipe(uglify()) // Мініфікація JS
        .pipe(rename({ suffix: '.min' })) // Додає суфікс .min
        .pipe(gulp.dest(`${paths.dest}/js`)) // Вихідна папка для JS
        .pipe(browserSync.stream());
}

// Завдання для спостереження
function watch() {
    browserSync.init({
        server: {
            baseDir: paths.dest
        }
    });
    gulp.watch(paths.scss, styles);
    gulp.watch(paths.html, html);
    gulp.watch(paths.js, scripts); // Додайте спостереження за JavaScript файлами
}

// Експортування завдань
exports.styles = styles;
exports.html = html;
exports.scripts = scripts; // Експортуйте завдання для JavaScript
exports.watch = watch;

// Завдання за замовчуванням
exports.default = gulp.series(gulp.parallel(styles, html, scripts), watch);
