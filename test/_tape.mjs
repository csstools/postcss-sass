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
});
