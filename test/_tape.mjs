import { postcssTape } from '@csstools/postcss-tape';
import plugin from '@csstools/postcss-sass';
import postcssImport from 'postcss-import';

postcssTape(plugin)({
	'basic': {
		message: 'supports basic usage',
		source: 'basic.scss',
	},
	'basic:sassopts': {
		message: 'supports sass options usage',
		options: {
			indentType: 'tab',
			indentWidth: 1,
			outputStyle: 'expanded',
		},
		source: 'basic.scss',
	},
	'basic:modern': {
		message: 'supports the modern sass api',
		options: { api: 'modern' },
		source: 'basic.scss',
		expect: 'basic.expect.css',
		result: 'basic.expect.css',
	},
	'empty': {
		message: 'supports empty files',
		source: 'empty.scss',
	},
	'empty:modern': {
		message: 'supports empty files (modern api)',
		options: { api: 'modern' },
		source: 'empty.scss',
		expect: 'empty.expect.css',
		result: 'empty.expect.css',
	},
	'imports:modern': {
		message: 'supports imports usage (modern api)',
		options: { api: 'modern' },
		source: 'imports.scss',
		expect: 'imports.expect.css',
		result: 'imports.expect.css',
	},
	'basic:legacy': {
		message: 'supports explicit legacy api',
		options: { api: 'legacy' },
		source: 'basic.scss',
		expect: 'basic.expect.css',
		result: 'basic.expect.css',
	},
	'imports': {
		message: 'supports imports usage',
		source: 'imports.scss',
	},
	'postcss-imports': {
		message: 'supports imports (postcss-sass, postcss-import) usage',
		plugins: [
			plugin(),
			postcssImport(),
		],
		source: 'postcss-imports.scss',
	},
	'postcss-imports:modern': {
		message: 'supports imports (postcss-sass, postcss-import) usage (modern api)',
		plugins: [
			plugin({ api: 'modern' }),
			postcssImport(),
		],
		source: 'postcss-imports.scss',
		expect: 'postcss-imports.expect.css',
		result: 'postcss-imports.expect.css',
	},
});
