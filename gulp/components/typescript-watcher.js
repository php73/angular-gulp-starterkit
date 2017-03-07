const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const Parser = require('gulp-inline-ng2-template/parser');
const gutil = require('gulp-util');
const chalk = require('chalk');
const typescript = require('typescript');
const CONFIG = require('../config');
const glob = require('glob');
const mkdirp = require('mkdirp');
const timer = require('./timer');

function TypeScriptWatcher() {}

TypeScriptWatcher.prototype = {};

TypeScriptWatcher.prototype.buildFileObject = function (filePath) {
    return {path: filePath};
};

TypeScriptWatcher.prototype.safe = function (context, callback) {
    return function () {
        try {
            callback.apply(context, arguments);
        } catch (e) {
            console.error(chalk.red(e))
        }
    };
};

TypeScriptWatcher.prototype.compileTypescript = function (filePath) {
    if (!fs.existsSync(filePath)) {
        return;
    }
    var done = timer();

    var file = this.buildFileObject(filePath);
    var tsconfig = require('../../src/tsconfig.json');
    tsconfig.compilerOptions.sourceMap = true;
    try {
        var typescriptCode = fs.readFileSync(file.path, 'utf8');
        var result = typescript.transpileModule(
            typescriptCode,
            {
                compilerOptions: tsconfig.compilerOptions,
                fileName: filePath,
                reportDiagnostics: true
            }
        );
        file.contents = result.outputText;
        file.map = JSON.parse(result.sourceMapText);
        file.map.sourcesContent = [typescriptCode];
        file.map = JSON.stringify(file.map);

        var parser = Parser(file, CONFIG.inlineNg2TemplateDev);
    } catch (e) {
        console.error(chalk.cyan(e.toString()));
        console.error(chalk.cyan(e.trace));
        return;
    }

    parser(function (err, contents) {
        if (err) {
            console.error(err);
            return;
        }

        var relativePath = path.relative(CONFIG.typescriptFolder, file.path);
        var relativeDir = path.dirname(relativePath);
        var name = path.basename(relativePath, '.ts');
        var targetPath = CONFIG.buildFolder+'/'+path.basename(CONFIG.typescriptFolder) + '/' + relativeDir + '/' + name + '.js';
        var targetMapPath = targetPath + '.map';

        var targetDir = path.dirname(targetPath);
        if (!fs.existsSync(targetDir)) {
            mkdirp.sync(targetDir);
            gutil.log(chalk.gray('Directory created: ' + targetDir));
        }
        fs.writeFileSync(targetPath, contents);
        fs.writeFileSync(targetMapPath, file.map);

        done(targetPath, 'recompiled');
    });
};

TypeScriptWatcher.prototype.unlinkTypescript = function (filePath) {
    var done = timer();

    var file = this.buildFileObject(filePath);
    var relativePath = path.relative(CONFIG.typescriptFolder, file.path);
    var relativeDir = path.dirname(relativePath);
    var name = path.basename(relativePath, '.ts');
    var targetPath = CONFIG.buildFolder+'/'+path.basename(CONFIG.typescriptFolder) + '/' + relativeDir + '/' + name + '.js';

    if (fs.existsSync(targetPath)) {
        fs.unlink(targetPath);
    }

    done(targetPath, 'removed');
};

TypeScriptWatcher.prototype.compileAssociatedScripts = function (htmlFilePath) {
    var watcher = this;
    var baseName = path.basename(htmlFilePath);
    glob(CONFIG.typescriptFolder+'/**/*.ts', {statCache: false}, function (er, files) {
        for (var i = 0; i < files.length; i++) {
            (function (tsFile) {
                fs.readFile(files[i], function (err, content) {
                    if (content.toString().indexOf(baseName) > -1) {
                        watcher.compileTypescript(tsFile)
                    }
                })
            })(files[i]);
        }
    });
};

TypeScriptWatcher.prototype.watch = function (folder) {
    gulp.watch([folder + '/**/*.ts'])
        .on('add', this.safe(this, this.compileTypescript))
        .on('change', this.safe(this, this.compileTypescript))
        .on('unlink', this.safe(this, this.unlinkTypescript))
    ;
    gulp.watch([folder + '/**/*.html'])
        .on('add', this.safe(this, this.compileAssociatedScripts))
        .on('change', this.safe(this, this.compileAssociatedScripts))
        .on('unlink', this.safe(this, this.compileAssociatedScripts))
    ;
};

module.exports = TypeScriptWatcher;