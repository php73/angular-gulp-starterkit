(function () {
    const gulp = require('gulp');
    const Builder = require("systemjs-builder");
    const CONFIG = require('../config');

    gulp.task('rxjs', function () {
        var options = {
            normalize: true,
            runtime: false,
            sourceMaps: false,
            sourceMapContents: false,
            minify: true,
            mangle: true
        };
        var builder = new Builder('./');
        builder.config({
            paths: {
                "n:*": "node_modules/*",
                "rxjs/*": "node_modules/rxjs/*.js"
            },
            map: {
                "rxjs": "n:rxjs"
            },
            packages: {
                "rxjs": {main: "Rx.js", defaultExtension: "js"}
            }
        });

        return builder.bundle('rxjs', CONFIG.buildFolder+'/rxjs.umd.min.js', options);
    });
})();