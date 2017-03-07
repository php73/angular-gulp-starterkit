const gulp = require('gulp');
const chalk = require('chalk');
const child_process = require('child_process');
const versionCompare = require('./version-compare');

module.exports = function () {
    var currentGulpVersion = child_process.execSync(process.argv[0] + ' ' + process.argv[1] + ' --version').toString().match(/CLI version ([0-9\.]{5})/)[1];
    if (versionCompare(currentGulpVersion, '2.0.0') == 1) {
        console.error(
            chalk.red('Please use Gulp#4.0 as minimal')
        );
        console.info(
            chalk.cyan('You use local copy of gulp - "./bin/gulp" instead of global version - "'+process.mainModule.filename+'"')
        );
        process.exit(777);
    }
};
