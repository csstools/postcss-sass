const processOptions = {
	map: {
		inline: true,
		sourcesContent: true
	}
};

module.exports = {
	'postcss-sass': {
		'basic': {
			message: 'supports basic usage',
			processOptions: processOptions,
			source: 'basic.scss'
		},
		'basic:sassopts': {
			message: 'supports sass options usage',
			options: {
				indentType: 'tab',
				indentWidth: 1,
				outputStyle: 'expanded'
			},
			processOptions: processOptions,
			source: 'basic.scss'
		},
		'basic:mixed': {
			message: 'supports mixed (postcss-unroot, postcss-sass) usage',
			plugin: () => require('postcss')(
				require('postcss-unroot'),
				require('.')
			),
			processOptions: processOptions,
			source: 'basic.scss'
		},
		'imports': {
			message: 'supports imports usage',
			plugin: () => require('postcss')(
				require('.')
			),
			processOptions: processOptions,
			source: 'imports.scss'
		},
		'css-imports': {
			message: 'supports imports (postcss-import, postcss-sass) usage',
			plugin: () => require('postcss')(
				require('postcss-import'),
				require('.')
			),
			processOptions: processOptions,
			source: 'css-imports.scss'
		}
	}
};
