# Changes to PostCSS Sass

### 3.0.0 (October 4, 2018)

- Fixed: issue with sourcemaps 0.7.x returning a Promise instead of an Object
- Updated: `node-sass` to 4.9.3 (minor)
- Updated: `postcss` to 7.0.5 (major)
- Updated: `source-map` to 0.7.3 (major for this project)

### 2.0.0 (December 25, 2017)

- Added: custom `source-map` implemention with fix for
  [sass/libsass#2312](https://github.com/sass/libsass/issues/2312)
- Changed: `index.mjs` module for `index.js` module
- Changed: `merge-source-map` dependency for custom `source-map` implemention
- Changed: first plugin detection for custom `source-map` implemention

### 1.0.0 (November 2, 2017)

- Initial version
