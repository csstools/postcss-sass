import plugin from '@csstools/postcss-sass';
import postcss from 'postcss';
import test from 'node:test';
import assert from 'node:assert/strict';

const source = `$font-stack:    Helvetica, sans-serif;
$primary-color: #333;

:root {
	color: $primary-color;
	font: 100% $font-stack;
}
`;

const expect = `:root {
  color: #333;
  font: 100% Helvetica, sans-serif;
}`;

test('produces correct sourcemaps', async () => {
	const result = await postcss([plugin]).process(source, {
		from: 'basic.scss',
	});

	assert.equal(result.css, expect);
	assert.equal(result.warnings().length, 0);

	const actual = result.map.toJSON();
	actual.sources.splice(0, 1);

	assert.deepStrictEqual(
		actual,
		{
			version: 3,
			sources: [
				'basic.scss',
			],
			names: [],
			mappings: 'AAGA;ECFA,WAAA;EDIC,gCAAA;ACFD',
			file: 'basic.scss',
			sourcesContent: [
				'$font-stack:    Helvetica, sans-serif;\n' +
				'$primary-color: #333;\n' +
				'\n' +
				':root {\n' +
				'\tcolor: $primary-color;\n' +
				'\tfont: 100% $font-stack;\n' +
				'}\n',
				'$font-stack:    Helvetica, sans-serif;\n' +
				'$primary-color: #333;\n' +
				'\n' +
				':root {\n' +
				'\tcolor: $primary-color;\n' +
				'\tfont: 100% $font-stack;\n' +
				'}\n',
			],
		},
	);
});

test('produces inline sourcemaps', async () => {
	const result = await postcss([plugin]).process(source, {
		from: 'basic.scss',
		map: { inline: true },
	});

	assert.ok(result.css.includes('/*# sourceMappingURL='));
	assert.equal(result.warnings().length, 0);
});
