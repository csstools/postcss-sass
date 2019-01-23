# PostCSS Sass [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Linux Build Status][cli-img]][cli-url]
[![Windows Build Status][win-img]][win-url]
[![Support Chat][git-img]][git-url]

[PostCSS Sass] lets you use [Sass] as a [PostCSS] plugin.

```scss
$font-stack:    Helvetica, sans-serif;
$primary-color: #333;

:root {
  color: $primary-color;
  font: 100% $font-stack;
}

/* becomes */

:root {
  color: #333;
  font: 100% Helvetica, sans-serif;
}
```

[PostCSS Sass] uses [dart-sass], letting you safely run transforms before and
after Sass, watching for changes to Sass imports, and preserving source maps.

## Usage

Add [PostCSS Sass] to your build tool:

```sh
npm install @csstools/postcss-sass --save-dev
```

#### Node

Use [PostCSS Sass] to process your CSS:

```js
require('@csstools/postcss-sass').process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```sh
npm install postcss --save-dev
```

Use [PostCSS Sass] as a plugin:

```js
postcss([
  require('@csstools/postcss-sass')(/* node-sass options */)
]).process(YOUR_CSS);
```

The standard CSS parser included with PostCSS may not be able to parse SCSS
specific features like inline comments. To accurately parse SCSS, use
the [SCSS Parser].

```bash
npm install postcss-scss --save-dev
```

```js
const postcss = require('postcss');
const postcssSass = require('@csstools/postcss-sass');

postcss([
  postcssSass(/* pluginOptions */)
]).process(YOUR_CSS, {
  syntax: 'postcss-scss'
});
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```sh
npm install gulp-postcss --save-dev
```

Use [PostCSS Sass] in your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
  return gulp.src('./src/*.css').pipe(
    postcss([
      require('@csstools/postcss-sass')(/* node-sass options */)
    ])
  ).pipe(
    gulp.dest('.')
  );
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```sh
npm install grunt-postcss --save-dev
```

Use [PostCSS Sass] in your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
  postcss: {
    options: {
      use: [
        require('@csstools/postcss-sass')(/* node-sass options */)
      ]
    },
    dist: {
      src: '*.css'
    }
  }
});
```

## Options

[PostCSS Sass] options are directly forwarded to [dart-sass options].

[cli-img]: https://img.shields.io/travis/jonathantneal/postcss-sass.svg
[cli-url]: https://travis-ci.org/jonathantneal/postcss-sass
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/@csstools/postcss-sass.svg
[npm-url]: https://www.npmjs.com/package/@csstools/postcss-sass
[win-img]: https://img.shields.io/appveyor/ci/jonathantneal/postcss-sass.svg
[win-url]: https://ci.appveyor.com/project/jonathantneal/postcss-sass

[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[dart-sass]: https://github.com/sass/dart-sass
[dart-sass options]: https://github.com/sass/dart-sass#javascript-api
[PostCSS]: https://github.com/postcss/postcss
[PostCSS Sass]: https://github.com/jonathantneal/postcss-sass
[Sass]: https://github.com/sass/dart-sass
[SCSS Parser]: https://github.com/postcss/postcss-scss
