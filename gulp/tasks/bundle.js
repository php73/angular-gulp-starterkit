(function () {
    const gulp = require('gulp');
    const concat = require('gulp-concat');
    const uglify = require('gulp-uglify');
    const fs = require('fs');
    const Builder = require("gulp-systemjs-builder");
    const rmdir = require('../components/rmdir');
    const CONFIG = require('../config');

    gulp.task('libraries', function () {
        return gulp.src(CONFIG.libraries)
            .pipe(concat('libraries.js'))
            .pipe(uglify())
            .pipe(
                gulp.dest(CONFIG.distFolder+'/tmp')
            );
    });

    gulp.task('application', function () {
        // Build app

        var builder = new Builder('./');
        builder.loadConfigSync(CONFIG.systemjsConfigPath, undefined, true);
        builder.config({
            defaultJSExtensions: true,
            map: {
                'rxjs': 'node_modules/rxjs',
                'primeng': 'node_modules/primeng'
            },
            packages: {
                'rxjs': {main: 'Rx.js', defaultExtension: 'js'},
                'primeng': {main: 'primeng.js', defaultExtension: 'js'}
            }
        });

        return builder
            .buildStatic(
                CONFIG.distFolder+'/tmp/'+CONFIG.typescriptEntry+'.js',
                'app.min.js',
                {
                    minify: true,
                    mangle: true
                }
            )
            .pipe(gulp.dest(CONFIG.distFolder+'/tmp'));
    });

    gulp.task('concat-libraries-and-application', function () {
        return gulp
            .src([
                CONFIG.distFolder+'/tmp/libraries.js',
                CONFIG.distFolder+'/tmp/app.min.js'
            ])
            .pipe(concat('app.bundle.min.js'))
            .pipe(
                gulp.dest(CONFIG.distFolder)
            );
    });

    gulp.task('clean-temporary-files', function (done) {
        rmdir(CONFIG.distFolder+'/tmp');
        done();
    });

    gulp.task('bundle', gulp.series(
        'clean',
        gulp.parallel('index-page', 'sass', 'assets', 'typescript', 'libraries'),
        'application',
        'concat-libraries-and-application',
        'clean-temporary-files',
        function (done) {
            done();
        }
    ));
})();
