// tooling
import mergeSourceMaps from './lib/merge-source-maps';
import postcss from 'postcss';
import sassResolve from '@csstools/sass-import-resolve';
import sass from 'sass';
import { dirname, resolve as pathResolve } from 'path';

// transform css with sass
export default postcss.plugin('postcss-sass', opts => (root, result) => {
	// postcss configuration
	const postConfig = Object.assign({}, result.opts, requiredPostConfig);

	// postcss results
	const { css: postCSS, map: postMap } = root.toResult(postConfig);

	// include paths
	const includePaths = [].concat(opts && opts.includePaths || []);

	// sass resolve cache
	const cache = {};

	return new Promise(
		// promise sass results
		(resolve, reject) => sass.render(
			// pass options directly into node-sass
			Object.assign({}, opts, requiredSassConfig, {
				file: `${postConfig.from}#sass`,
				outFile: postConfig.from,
				data: postCSS,
				importer(id, parentId, done) {
					// resolve the absolute parent
					const parent = pathResolve(parentId);

					// cwds is the list of all directories to search
					const cwds = [dirname(parent)].concat(includePaths).map(includePath => pathResolve(includePath));

					cwds.reduce(
						// resolve the first available files
						(promise, cwd) => promise.catch(
							() => sassResolve(id, { cwd, cache, readFile: true })
						),
						Promise.reject()
					).then(
						({ file, contents }) => {
							// push the dependency to watch tasks
							result.messages.push({ type: 'dependency', file, parent });

							// pass the file and contents back to sass
							done({ file, contents });
						},
						importerError => {
							// otherwise, pass the error
							done(importerError);
						}
					);
				}
			}),
			(sassError, sassResult) => sassError ? reject(sassError) : resolve(sassResult)
		)
	).then(
		({ css: sassCSS, map: sassMap }) => mergeSourceMaps(
			postMap.toJSON(),
			JSON.parse(sassMap)
		).then(prev => {
			// update root to post-node-sass ast
			result.root = postcss.parse(
				sassCSS.toString(),
				Object.assign({}, postConfig, {
					map: { prev }
				})
			);
		})
	);
});

const requiredPostConfig = {
	map: {
		annotation: false,
		inline: false,
		sourcesContent: true
	}
};

const requiredSassConfig = {
	omitSourceMapUrl: true,
	sourceMap: true,
	sourceMapContents: true
};
