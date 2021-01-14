const processOptions = {
	map: {
		inline: true,
		sourcesContent: true
	}
};

module.exports = {
	'basic': {
		message: 'supports basic usage',
		processOptions,
		source: 'basic.scss'
	},
	'basic:sassopts': {
		message: 'supports sass options usage',
		options: {
			indentType: 'tab',
			indentWidth: 1,
			outputStyle: 'expanded'
		},
		processOptions,
		source: 'basic.scss'
	},
	'basic:mixed': {
		message: 'supports mixed (postcss-unroot, postcss-sass) usage',
		plugin: require('postcss')([
			// In the previous test, unroot wouldn't do anything.
			// I'm pretty sure that is a bug, so I changed the expected css file
			require('postcss-unroot'),
			require('.')
		]),
		processOptions,
		source: 'basic.scss'
	},
	'imports': {
		message: 'supports imports usage',
		plugin: require('postcss')(
			require('.')
		),
		processOptions,
		source: 'imports.scss'
	},
	'postcss-imports': {
		message: 'supports imports (postcss-sass, postcss-import) usage',
		plugin: require('postcss')(
			// Unsure what happened to postcss-import but it no longer imports without .scss at the end
			require('.'),
			require('postcss-import')
		),
		processOptions: Object.assign({}, processOptions, {
			syntax: require('postcss-scss')
		}),
		source: 'postcss-imports.scss'
	}
};
