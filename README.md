# PostCSS Sass [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![test](https://github.com/csstools/postcss-sass/actions/workflows/test.yml/badge.svg)](https://github.com/csstools/postcss-sass/actions/workflows/test.yml)
[<img alt="Discord" src="https://shields.io/badge/Discord-5865F2?logo=discord&logoColor=white">][discord]

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
npm install postcss @csstools/postcss-sass --save-dev
```

#### Node

Use [PostCSS Sass] to process your CSS:

```js
require('@csstools/postcss-sass').process(YOUR_CSS);
```

#### PostCSS

Use [PostCSS Sass] as a plugin:

```js
postcss([
  require('@csstools/postcss-sass')(/* dart-sass options */)
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
  syntax: require('postcss-scss')
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
      require('@csstools/postcss-sass')(/* dart-sass options */)
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
        require('@csstools/postcss-sass')(/* dart-sass options */)
      ]
    },
    dist: {
      src: '*.css'
    }
  }
});
```

## Options

[PostCSS Sass] options are directly forwarded to [dart-sass options], along
with the plugin option below.

### api

`api` selects which Sass JavaScript API is used: `'legacy'` or `'modern'`.
It defaults to `'legacy'`; set `'modern'` to opt in.

| `api` | Sass API | Options reference |
| --- | --- | --- |
| `'legacy'` (default) | `sass.render` | [legacy options][legacy api] |
| `'modern'` | `sass.compileStringAsync` | [modern options][modern api] |

```js
postcssSass({ api: 'modern', loadPaths: ['node_modules'] })
```

- **`'legacy'`** keeps the behavior of previous releases. Dart Sass deprecates
  the legacy API and removes it in 2.0, so it prints deprecation warnings on
  recent versions.
- **`'modern'`** opts in to the modern API, which needs a Sass release that
  provides `compileStringAsync` (1.45 or newer) and keeps working once the
  legacy API is removed. Pass modern options such as `importers`, `loadPaths`
  and `style` instead of the legacy `importer`, `outputStyle` and
  `indentType`. `includePaths` and `sass` work with both.

[cli-img]: https://img.shields.io/travis/jonathantneal/postcss-sass.svg
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/@csstools/postcss-sass.svg
[npm-url]: https://www.npmjs.com/package/@csstools/postcss-sass

[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[dart-sass]: https://github.com/sass/dart-sass
[dart-sass options]: https://github.com/sass/dart-sass#javascript-api
[legacy api]: https://sass-lang.com/documentation/js-api/interfaces/legacystringoptions/
[modern api]: https://sass-lang.com/documentation/js-api/interfaces/stringoptions/
[PostCSS]: https://github.com/postcss/postcss
[PostCSS Sass]: https://github.com/csstools/postcss-sass
[Sass]: https://github.com/sass/dart-sass
[SCSS Parser]: https://github.com/postcss/postcss-scss
[discord]: https://discord.gg/bUadyRwkJS
