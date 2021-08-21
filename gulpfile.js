
// All Imports
const { src, dest, series, watch } = require('gulp');
const rename = require('gulp-rename');
const sass = require('sass');
const gulpsass = require('gulp-sass')(sass);
const postcss = require('gulp-postcss');
const cssnano = require('cssnano'); /* Postcss plugin, not gulp plugin */
const autoprefixer = require('autoprefixer'); /* Postcss plugin, not gulp plugin */
const purgecss = require('gulp-purgecss'); /* Gulp plugin, not postcss plugin */
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

// File paths
const paths = {
    // Build Folder
    sourceFolder: 'src',
    destFolder: 'public',

    // HTML
    htmlFiles: 'public/**/*.html',

    // CSS
    scssEntry: 'src/styles/main.scss',
    scssFiles: 'src/styles/**/*.scss',
    cssOutPath: 'public/css',
    cssOutName: 'style.css',
    scssSpritePath: 'src/styles',
    scssSpriteName: '_sprite.scss',

    // JavaScript
    jsEntry: 'src/scripts/main.js',
    jsFiles: 'src/scripts/**/*.js',
    jsOutPath: 'public/js',
    jsOutName: 'app.js',

    // Images
    imgFiles: 'src/assets/images/**./*png',
    imgSpritePath: 'public/images',
    imgSpriteName: 'sprite.png'
};

// CSS Task
function csstask() {

    // PostCSS Plugins
    const postcssPlugins = [
        autoprefixer(),
        cssnano()
    ];

    // gulp purge css
    const purgecssOptions = {
        content: [
            paths.htmlFiles,
            paths.jsFiles
        ]
    };

    return src( paths.scssEntry, { sourcemaps: true } )
        .pipe( gulpsass() )
        .pipe( postcss( postcssPlugins ) )
        .pipe( purgecss( purgecssOptions ) )
        .pipe( rename( paths.cssOutName ) )
        .pipe( dest( paths.cssOutPath, { sourcemaps: '.' } ) );
}

// JavaScript Task
function jsTask(){
    return src( paths.jsEntry, {  sourcemaps: true } )
      .pipe( terser() )
      .pipe( rename( paths.jsOutName ) )
      .pipe( dest( paths.jsOutPath, { sourcemaps: '.' } ) );
}

// Browser sync
function browsersyncServe( cb ) {
    browsersync.init({
        server: { baseDir: paths.destFolder }
    });
    cb();
}

function browsersyncReload( cb ) {
    browsersync.reload();
    cb();
}

// Watch Task
function watchTask() {
    watch(
        [ paths.htmlFiles, paths.scssFiles, paths.jsFiles ],
        series( csstask, jsTask, browsersyncReload )
    );
}

// Gulp tasks
exports.default = series(
    csstask,
    jsTask,
    browsersyncServe,
    watchTask
);