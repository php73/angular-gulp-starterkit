module.exports = {
    tsConfigPath: './src/tsconfig.json',
    systemjsConfigPath: './src/systemjs.config.js',
    indexHtmlTemplate: './src/index.twig',
    typescriptFolder: './src/app',
    sassFolder: './src/assets/sass',
    sassTargetFolder: 'assets/css',
    typescriptEntry: 'boot.production',
    typescriptEntryDev: 'boot.development',
    buildFolder: './build',
    distFolder: './dist',
    assets: [
        {name: 'favicon', from: './src/favicon.ico', to: ''},
        {name: 'systemjs', from: './src/systemjs.config.js', to: ''},
        {name: 'img', from: './src/assets/img/**/*', to: 'assets/img'}
    ],
    libraries: [
        './node_modules/zone.js/dist/zone.min.js',
        './node_modules/reflect-metadata/Reflect.js'
    ],
    inlineNg2Template: {
        target: 'es5',
        useRelativePaths: true,
        indent: 0,
        removeLineBreaks: true,
        supportNonExistentFiles: false
    },
    inlineNg2TemplateDev: {
        target: 'es5',
        useRelativePaths: true,
        indent: 0,
        removeLineBreaks: true,
        supportNonExistentFiles: true
    }
};
