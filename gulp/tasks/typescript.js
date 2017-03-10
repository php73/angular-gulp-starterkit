(function () {
    const gulp = require('gulp');
    const tsc = require('gulp-typescript');
    const path = require('path');
    const inlineNg2Template = require('gulp-inline-ng2-template');
    const typescript = require('typescript');
    const sourcemaps = require('gulp-sourcemaps');
    const CONFIG = require('../config');

    function typescriptTask(dev) {
        return function () {
            var tsProject = tsc.createProject(CONFIG.tsConfigPath, { typescript: typescript});

            var src = tsProject.src();
            if (dev) {
                src = src.pipe(sourcemaps.init())
            }

            var js = src.pipe(tsProject(tsc.reporter.longReporter())).js;

            js = js.pipe(inlineNg2Template(CONFIG.inlineNg2Template));

            if (dev) {
                return js.pipe(sourcemaps.write('.')).pipe(gulp.dest(CONFIG.buildFolder+'/'+path.basename(CONFIG.typescriptFolder)));
            }

            return js.pipe(gulp.dest(CONFIG.distFolder+'/tmp'));
        }
    }

    gulp.task('typescript', typescriptTask());
    gulp.task('typescript-dev', typescriptTask(true));
})();

