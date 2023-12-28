# Changes to PostCSS Sass

### 5.1.1 (December 28, 2023)

- Make PostCSS dependency messages more consistent.

### 5.1.0 (December 28, 2023)

- Updated: `dart-sass` to 1.69.5 (minor)
- Updated: `source-map` to 0.7.4 (patch)

### 5.0.1 (March 8, 2022)

- Fixes an issue with import files not being sent for processors to pick up. [#31](https://github.com/csstools/postcss-sass/pull/31)

### 5.0.0 (February 14, 2022)

- Updated to support PostCSS 8 (breaking)

### 4.0.0 (January 23, 2018)

- Replaced: `node-sass` with `dart-sass`
- Updated: `postcss` to 7.0.14 (patch)

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
