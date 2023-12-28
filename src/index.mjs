// tooling
import mergeSourceMaps from './merge-source-maps';
import sassResolve from '@csstools/sass-import-resolve';
import * as sass from 'sass';
import { dirname, resolve as pathResolve } from 'path';

const requiredPostConfig = {
	map: {
		annotation: false,
		inline: false,
		sourcesContent: true,
	},
};

const requiredSassConfig = {
	omitSourceMapUrl: true,
	sourceMap: true,
	sourceMapContents: true,
};

// transform css with sass
const plugin = (opts = {}) => {
	return {
		postcssPlugin: 'postcss-sass',
		Once (root, { result, parse }) {
			// postcss configuration
			const postConfig = Object.assign(
				{},
				result.opts,
				requiredPostConfig,
			);

			// postcss results
			const { css: postCSS, map: postMap } = root.toResult(postConfig);

			// include paths
			const includePaths = [].concat(opts && opts.includePaths || []);

			// sass engine to use
			const sassEngine = opts && opts.sass || sass;

			// sass resolve cache
			const cache = {};

			// replication of the default sass file importer
			const defaultSassImporter = (id, parentId, done) => {
				// resolve the absolute parent
				const parent = pathResolve(parentId);

				// cwds is the list of all directories to search
				const cwds = [dirname(parent)]
					.concat(includePaths)
					.map((includePath) => pathResolve(includePath));

				cwds.reduce(
					// resolve the first available files
					(promise, cwd) =>
						promise.catch(() =>
							sassResolve(id, {
								cwd,
								cache,
								readFile: true,
							}),
						),
					Promise.reject(),
				).then(
					({ file, contents }) => {
						// pass the file and contents back to sass
						done({ file, contents });
					},
					(importerError) => {
						// otherwise, pass the error
						done(importerError);
					},
				);
			};

			// sass importer
			const sassImporter = opts && opts.importer || defaultSassImporter;

			return new Promise(
				// promise sass results
				(resolve, reject) =>
					sassEngine.render(
						// pass options directly into node-sass
						Object.assign({}, opts, requiredSassConfig, {
							file: `${postConfig.from}#sass`,
							outFile: postConfig.from,
							data: postCSS,
							importer(id, parentId, done) {
								const doneWrap = (importerResult) => {
									const file = importerResult && importerResult.file;

									if (file) {
										const parent = pathResolve(parentId);

										// push the dependency to watch tasks
										result.messages.push({
											type: 'dependency',
											file,
											parent,
										});
									}

									done(importerResult);
								};

								// strip the #sass suffix we added
								const prev = parentId.replace(/#sass$/, '');

								// call the sass importer and catch its output
								sassImporter.call(this, id, prev, doneWrap);
							},
						}),
						(sassError, sassResult) =>
							sassError ? reject(sassError) : resolve(sassResult),
					),
			).then(({ css: sassCSS, map: sassMap, stats }) => {
				const parent = pathResolve(postConfig.from);

				// use stats.includedFiles to get the full list of dependencies.  Importer will not receive relative imports.  See https://github.com/sass/dart-sass/issues/574
				for (const includedFile of stats.includedFiles) {
					// strip the #sass suffix we added
					const file = pathResolve(includedFile.replace(/#sass$/, ''));

					// don't include the parent as a dependency of itself
					if (file === parent) {
						continue;
					}

					// push the dependency to watch tasks
					result.messages.push({
						type: 'dependency',
						plugin: 'postcss-sass',
						file,
						parent,
					});
				}

				return mergeSourceMaps(postMap.toJSON(), JSON.parse(sassMap)).then(
					(prev) => {
						// update root to post-node-sass ast
						result.root = parse(
							sassCSS.toString(),
							Object.assign({}, postConfig, {
								map: { prev },
							}),
						);
					},
				);
			});
		},
	};
};

plugin.postcss = true;

export default plugin;
