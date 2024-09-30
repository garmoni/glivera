const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug'); // Імпортуйте gulp-pug

// Шлях до файлів
const paths = {
    scss: './src/scss/**/*.scss',
    pug: './src/**/*.pug', // Додайте шлях до Pug файлів
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

// Завдання для компіляції Pug у HTML
function templates() {
    return gulp.src(paths.pug)
        .pipe(pug()) // Компіляція Pug у HTML
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
    gulp.watch(paths.pug, templates); // Додайте спостереження за Pug файлами
    gulp.watch(paths.js, scripts); // Додайте спостереження за JavaScript файлами
}

// Експортування завдань
exports.styles = styles;
exports.templates = templates; // Експортуйте завдання для Pug
exports.scripts = scripts; // Експортуйте завдання для JavaScript
exports.watch = watch;

// Завдання за замовчуванням
exports.default = gulp.series(gulp.parallel(styles, templates, scripts), watch);
