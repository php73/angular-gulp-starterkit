(function () {
    const gulp = require('gulp');
    const fs = require('fs');
    const path = require('path');
    const TypeScriptWatcher = require('../components/typescript-watcher');
    const CONFIG = require('../config');

    gulp.task('watch', function () {
        /**
         * Наблюдаем за изменением Typescript и шаблонов
         */
        (new TypeScriptWatcher()).watch(CONFIG.typescriptFolder);

        /**
         * Наблюдаем за изменением Sass
         */
        gulp.watch(CONFIG.sassFolder + '/**/*.scss', gulp.series('sass-dev'));

        /**
         * Наблюдаем за изменением индексной страницы
         */
        gulp.watch(path.dirname(CONFIG.indexHtmlTemplate) + '/**/*.twig', gulp.series('index-page-dev'));

        /**
         * Наблюдаем за изменением ассетов
         */
        (function () {
            for (var i = 0; i < CONFIG.assets.length; i++) {
                var asset = CONFIG.assets[i];
                var watchExpr = fs.existsSync(asset.from) ? (path.dirname(CONFIG.indexHtmlTemplate) + '/**/'+path.basename(asset.from)) : asset.from;

                gulp.watch(watchExpr, gulp.parallel('assets-'+asset.name));
            }
        })();
    });
})();