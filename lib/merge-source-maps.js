// tooling
import { SourceMapConsumer, SourceMapGenerator } from 'source-map';

// special sass source matcher
const sassMatch = /#sass$/;

// returns merged source maps
export default (...maps) => {
	// new sourcemap
	const generator = new SourceMapGenerator();

	// existing sourcemaps
	const consumersPromise = Promise.all(maps.map(
		map => new SourceMapConsumer(map)
	));

	return consumersPromise.then(
		consumers => consumers.forEach(
			consumer => {
				// copy each original mapping to the new sourcemap
				consumer.eachMapping(
					mapping => {
						const originalPosition = originalPositionFor(mapping, consumers);

						if (originalPosition.source) {
							generator.addMapping({
								generated: {
									line: mapping.generatedLine,
									column: mapping.generatedColumn
								},
								original: {
									// use positive numbers to work around sass/libsass#2312
									line: Math.abs(originalPosition.line),
									column: Math.abs(originalPosition.column)
								},
								source: originalPosition.source,
								name: originalPosition.name
							});
						}
					}
				);

				// copy each original source to the new sourcemap
				consumer.sources.forEach(
					source => {
						generator._sources.add(source);

						const content = consumer.sourceContentFor(source);

						if (content !== null) {
							generator.setSourceContent(source, content);
						}
					}
				);
			}
		)
	).then(
		() => {
			// merged map as json
			const mergedMap = JSON.parse(generator);

			// clean all special sass sources in merged map
			mergedMap.sources = mergedMap.sources.map(
				source => source.replace(sassMatch, '')
			);

			return mergedMap;
		}
	);
}

function originalPositionFor(mapping, consumers) {
	// initial positioning
	let originalPosition = {
		line: mapping.generatedLine,
		column: mapping.generatedColumn
	};

	// special sass sources are mapped in reverse
	consumers.slice(0).reverse().forEach(
		consumer => {
			const possiblePosition = consumer.originalPositionFor(originalPosition);

			if (possiblePosition.source) {
				if (sassMatch.test(possiblePosition.source)) {
					originalPosition = possiblePosition;
				}
			}
		}
	);

	// regular sources are mapped regularly
	consumers.forEach(
		consumer => {
			const possiblePosition = consumer.originalPositionFor(originalPosition);

			if (possiblePosition.source) {
				if (!sassMatch.test(possiblePosition.source)) {
					originalPosition = possiblePosition;
				}
			}
		}
	);

	return originalPosition;
}
