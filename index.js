/* eslint-env node */
'use strict';

const fastbootTransform = require('fastboot-transform');

module.exports = {
    name: 'ember-cli-summernote-editor',
    options: {
      nodeAssets: {
        'popper.js': {
          srcDir: 'dist/umd',
          import: ['popper.js'],
          vendor: ['popper.js.map'],
          processTree(input) {
            return fastbootTransform(input);
          }
        },
        bootstrap: {
          import: [
            'dist/js/bootstrap.js',
            'dist/css/bootstrap.css'
          ],
          vendor: ['dist/js/bootstrap.js.map'],
          processTree(input) {
            return fastbootTransform(input);
          }
        },
        summernote: {
          srcDir: 'dist',
          destDir: 'assets',
          import: [
            'summernote-bs4.css',
            'summernote-bs4.js',
            'font/summernote.eot',
            'font/summernote.ttf',
            'font/summernote.woff'
          ],
          processTree(input) {
           return fastbootTransform(input);
          }
        }
      }
    }
  };