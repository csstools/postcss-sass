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
			processOptions: processOptions
		},
		'basic:sassopts': {
			message: 'supports sass options usage',
			options: {
				indentType: 'tab',
				indentWidth: 1,
				outputStyle: 'expanded'
			},
			processOptions: processOptions
		},
		'basic:mixed': {
			message: 'supports mixed (postcss-unroot, postcss-sass) usage',
			plugin: () => require('postcss')(
				require('postcss-unroot'),
				require('.')
			),
			processOptions: processOptions
		},
		'imports': {
			message: 'supports imports usage',
			plugin: () => require('postcss')(
				require('.')
			),
			processOptions: processOptions
		},
		'imports:postcss': {
			message: 'supports imports (postcss-import, postcss-sass) usage',
			plugin: () => require('postcss')(
				require('postcss-import'),
				require('.')
			),
			processOptions: processOptions
		}
	}
};
