(function () {
    const gulp = require('gulp');
    const CONFIG = require('../config');

    function buildAssetsTasks(dev) {
        var assetsTasks = [];
        for (var i = 0; i < CONFIG.assets.length; i++) {
            var asset = CONFIG.assets[i];

            (function (asset) {
                var task = 'assets-'+asset.name;
                gulp.task(task, function () {
                    return gulp
                        .src(asset.from)
                        .pipe(
                            gulp.dest((dev ? CONFIG.buildFolder : CONFIG.distFolder) + '/' + asset.to),
                            {overwrite: true}
                        )
                });
                assetsTasks.push(task)
            })(asset);
        }
        assetsTasks.push(function (done) {
            done();
        });

        return assetsTasks;
    }

    gulp.task('assets', gulp.parallel.apply(gulp, buildAssetsTasks()));
    gulp.task('assets-dev', gulp.parallel.apply(gulp, buildAssetsTasks(true)));
})();