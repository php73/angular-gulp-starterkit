const gutil = require('gulp-util');
const chalk = require('chalk');

function timer() {
    var startAt = new Date().getTime();

    return function (file, action) {
        action = action || 'processed';
        gutil.log(
            'File',
            '"' + chalk.cyan(file) + '"',
            action,
            'after',
            chalk.magenta((new Date().getTime()) - startAt),
            'ms'
        );
    }
}

module.exports = timer;