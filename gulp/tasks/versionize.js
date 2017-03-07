(function () {
    const gulp = require('gulp');
    const md5File = require('md5-file');
    const fs = require('fs');
    const path = require('path');
    const CONFIG = require('../config');

    gulp.task('versionize', function (done) {

        var cssPath = CONFIG.distFolder + '/assets/css/app.min.css';
        var cssHash = md5File.sync(cssPath).substr(0, 7);
        var jsPath = CONFIG.distFolder + '/app.bundle.min.js';
        var jsHash = md5File.sync(jsPath).substr(0, 7);

        var newCssPath = cssPath.split('.min.').join('.'+cssHash+'.');
        fs.renameSync(cssPath, newCssPath);
        var newJsPath = jsPath.split('.min.').join('.'+jsHash+'.');
        fs.renameSync(jsPath, newJsPath);

        var html = fs.readFileSync(CONFIG.distFolder + '/index.html').toString()
            .split('app.min.css').join(path.basename(newCssPath))
            .split('app.bundle.min.js').join(path.basename(newJsPath));
        fs.writeFileSync(CONFIG.distFolder + '/index.html', html);

        done();
    });

})();