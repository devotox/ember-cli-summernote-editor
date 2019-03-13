/* eslint-env node */
'use strict';
const { name } = require('./package');
const FastbootTransform = require('fastboot-transform');

module.exports = {
    name,
    options: {
      nodeAssets: {
        'popper.js': {
          srcDir: 'dist/umd',
          import: ['popper.js'],
          vendor: ['popper.js.map'],
          processTree(input) {
            return FastbootTransform(input);
          }
        },
        bootstrap: {
          import: [
            'dist/js/bootstrap.js',
            'dist/css/bootstrap.css'
          ],
          vendor: ['dist/js/bootstrap.js.map'],
          processTree(input) {
            return FastbootTransform(input);
          }
        },
        summernote: {
          srcDir: 'dist',
          destDir: 'assets',
          import: [
            'summernote-bs4.js',
            'summernote-bs4.css',
            'font/summernote.eot',
            'font/summernote.ttf',
            'font/summernote.woff'
          ],
          vendor: ['summernote-bs4.js.map'],
          processTree(input) {
           return FastbootTransform(input);
          }
        }
      }
    }
  };
