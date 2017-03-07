//noinspection ThisExpressionReferencesGlobalObjectJS
/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  var systemLocate = System.locate;
  System.locate = function (load) {
    return Promise.resolve(systemLocate.call(this, load)).then(function (address) {
      return address + '?v=' + ((new Date).getTime());
    });
  };

  var config = {
    map: {
      'app': 'app',
      '@angular': 'node_modules/@angular'
    },
    packages: {
      'app': {main: 'boot.js'},
      '@angular/common': {main: 'bundles/common.umd.min.js'},
      '@angular/compiler': {main: 'bundles/compiler.umd.min.js'},
      '@angular/core': {main: 'bundles/core.umd.min.js'},
      '@angular/forms': {main: 'bundles/forms.umd.min.js'},
      '@angular/http': {main: 'bundles/http.umd.min.js'},
      '@angular/platform-browser': {main: 'bundles/platform-browser.umd.min.js'},
      '@angular/platform-browser-dynamic': {main: 'bundles/platform-browser-dynamic.umd.min.js'},
      '@angular/router': {main: 'bundles/router.umd.min.js'}
    }
  };

  var addDefaultExtension = function (config) {

    for (var key in config.packages) {
      if (!config.packages.hasOwnProperty(key)) {
        continue;
      }

      config.packages[key].defaultExtension = config.packages[key].defaultExtension || 'js';
    }

    return config;
  };

  System.config(addDefaultExtension(config));
})(this);
