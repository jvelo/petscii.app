var gulp = require('gulp'),
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    streamify = require('gulp-streamify'),
    source = require('vinyl-source-stream'),
    babelify = require('babelify'),
    reactify = require('reactify'),
    watchify = require('watchify'),
    browserify = require('browserify'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    minimist = require('minimist');

// command line options
var minimistOptions = {
    string: ['env', 'mode'],
    default: { env: 'env.json', mode: 'dev' }
};
var options = minimist(process.argv.slice(2), minimistOptions);

var context = require('./' + options.env);
context.MODE = options.mode;

function buildScripts(src, dest, mode) {
    var opts = {
        entries: src + '/petscii.jsx',
        extensions: ['.jsx'],
        debug: mode !== 'prod'
    };
    var bundleStream = browserify(opts)
        .transform(babelify)
        .transform(reactify)
        .bundle();

    return bundleStream
        .on('error', function(error) { gutil.log(gutil.colors.red(error.message)); })
        .pipe(source('main.js'))
        .pipe(gulpif(mode === 'prod', streamify(uglify())))
        .pipe(gulp.dest(dest));
}

/**
 * Build scripts task
 */
gulp.task('scripts', function() {
    return buildScripts('./src', 'www', options.mode);
});

/**
 *  Default task only builds scripts
 */
gulp.task('default', ['scripts']);

gulp.task('bundle', function() {
    var bundler = watchify(
        browserify({
            entries: './src/petscii.jsx',
            extensions: ['.jsx'],
            debug: true
        }, watchify.args)
    );

    bundler.transform(babelify);
    bundler.transform(reactify);
    bundler.on('update', rebundle);

    function rebundle() {
        gutil.log('Compiling JS...');
        return bundler.bundle()
            .on('error', function (err) {
                gutil.log(err.message);
                browserSync.notify("Browserify Error!");
                this.emit("end");
            })
            .pipe(source('main.js'))
            .pipe(gulp.dest('./www/'))
            .pipe(browserSync.reload({stream: true, once: true}));
    }

    return rebundle();
})

/**
 * Watch : first bundle, then serve from the ./app directory
 */
gulp.task('watch', ['bundle'], function () {
    browserSync({
        server: "./www"
    });
});

/**
 * Export API for tarifa build
 */
module.exports = {
    buildScripts: buildScripts
};
