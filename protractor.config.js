"use strict";

exports.config = {
    baseUrl: 'http://www.hiteshbalar.com',
  specs: ['./specs_notes/*_spec.js'],
  directConnect: true,
  framework: 'jasmine2',
  capabilities: {
    'browserName': 'chrome'
  },
  useAllAngular2AppRoots: true,

  onPrepare: function () {

    
    beforeEach(function () {
        browser.get('/preserver/notes'),
        browser.sleep(1000);
    });

    afterEach(function () {
            browser.manage().deleteAllCookies();
            browser.executeScript('window.sessionStorage.clear(); '
                + 'window.localStorage.clear();'
                + 'window.indexedDB.deleteDatabase("_pouch_bin_notes_table");'
                + 'window.indexedDB.deleteDatabase("_pouch_archive_notes_table");')
                .then(undefined,
                    function (err) {
                        // Errors will be thrown when browser is on default data URL.
                        // Session and Local storage is disabled for data URLs
                    });
    });

    let JasmineReporter = require('jasmine2-reporter').Jasmine2Reporter

    let options = {
      pendingSpec: false,
      symbols: {
        pending: '*  '.strikethrough,
      }
    };
    
    jasmine.getEnv().addReporter(new JasmineReporter(options));
  }

  
};