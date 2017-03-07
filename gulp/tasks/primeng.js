(function () {
    const gulp = require('gulp');
    const CONFIG = require('../config');
    const Builder = require("systemjs-builder");

    gulp.task('primeng', function (done) {
        if (!CONFIG.withPrimeng) {
            return done();
        }

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
                "rxjs/*": "node_modules/rxjs/*.js",
                "primeng/*": "node_modules/primeng/*.js"
            },
            map: {
                '@angular': 'node_modules/@angular',
                '@angular/router': 'node_modules/@angular/router',
                "rxjs": "node_modules/rxjs",
                "primeng": "node_modules/primeng"
            },
            packages: {
                '@angular/common': {main: 'bundles/common.umd.min.js', defaultExtension: 'js'},
                '@angular/compiler': {main: 'bundles/compiler.umd.min.js', defaultExtension: 'js'},
                '@angular/core': {main: 'bundles/core.umd.min.js', defaultExtension: 'js'},
                '@angular/forms': {main: 'bundles/forms.umd.min.js', defaultExtension: 'js'},
                '@angular/http': {main: 'bundles/http.umd.min.js', defaultExtension: 'js'},
                '@angular/platform-browser': {main: 'bundles/platform-browser.umd.min.js', defaultExtension: 'js'},
                '@angular/platform-browser-dynamic': {
                    main: 'bundles/platform-browser-dynamic.umd.min.js',
                    defaultExtension: 'js'
                },
                '@angular/router': {main: 'bundles/router.umd.min.js', defaultExtension: 'js'},
                "rxjs": {main: "Rx.js", defaultExtension: "js"},
                "primeng": {main: "primeng.js", defaultExtension: "js"}
            }
        });

        return builder.bundle('primeng', CONFIG.buildFolder+'/primeng.umd.min.js', options);
    });
})();