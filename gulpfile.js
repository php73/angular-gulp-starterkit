const gulp = require('gulp');
require('./gulp/components/version-check')();

require('./gulp/tasks/clean');
require('./gulp/tasks/index-page');
require('./gulp/tasks/assets');
require('./gulp/tasks/sass');
require('./gulp/tasks/rxjs');
require('./gulp/tasks/primeng');
require('./gulp/tasks/typescript');
require('./gulp/tasks/bundle');
require('./gulp/tasks/node-modules');
require('./gulp/tasks/watch');
require('./gulp/tasks/webserver');
require('./gulp/tasks/versionize');

gulp.task('dev-build', gulp.series(
    gulp.series('clean-dev',  gulp.parallel('rxjs', 'primeng', 'index-page-dev', 'assets-dev', 'sass-dev', 'typescript-dev', 'node-modules')),
    function (done) {
        done();
    }
));

gulp.task('build', gulp.series(
    gulp.series('clean', 'bundle'),
    function (done) {
        done();
    }
));

gulp.task('default', gulp.series(
    gulp.series('dev-build', 'webserver'),
    function (done) {
        done();
    }
));


