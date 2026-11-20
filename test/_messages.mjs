import plugin from '@csstools/postcss-sass';
import postcss from 'postcss';
import test from 'node:test';
import assert from 'node:assert/strict';

test('emits dependency messages', async () => {
	const source = '@import "components/colors";';

	const result = await postcss([plugin]).process(source, {
		from: 'test/basic.scss',
	});

	assert.deepStrictEqual(result.warnings(), []);
	assert.deepStrictEqual(
		result.messages.map((x) => {
			x.file = x.file.split('test')[1];
			x.parent = x.parent.split('test')[1];

			return x;
		}),
		[
			{
				type: 'dependency',
				plugin: 'postcss-sass',
				file: '/components/colors.scss',
				parent: '/basic.scss',
			},
		],
	);
});

test('emits dependency messages with custom importer', async () => {
	const source = `
		@import "custom:colors";
		@import "components/fonts";
		@import "components/page";
	`;

	const result = await postcss([plugin({
		importer: (id, parentId, done) => {
			if (id === 'custom:colors') {
				done({ file: 'test/components/colors.scss', contents: '$primary-color: #333;' });
			}
		},
	})]).process(source, {
		from: 'test/basic.scss',
	});

	assert.deepStrictEqual(result.warnings(), []);
	assert.deepStrictEqual(
		result.messages.map((x) => {
			x.file = x.file.split('test')[1];
			x.parent = x.parent.split('test')[1];

			return x;
		}),
		[
			{
				type: 'dependency',
				plugin: 'postcss-sass',
				file: '/components/colors.scss',
				parent: '/basic.scss',
			},
			{
				type: 'dependency',
				plugin: 'postcss-sass',
				file: '/components/colors.scss',
				parent: '/basic.scss',
			},
			{
				type: 'dependency',
				plugin: 'postcss-sass',
				file: '/components/fonts.scss',
				parent: '/basic.scss',
			},
			{
				type: 'dependency',
				plugin: 'postcss-sass',
				file: '/components/page.scss',
				parent: '/basic.scss',
			}],
	);
});

test('emits dependency messages (modern api)', async () => {
	const source = '@import "components/colors";';

	const result = await postcss([plugin({ api: 'modern' })]).process(source, {
		from: 'test/basic.scss',
	});

	assert.deepStrictEqual(result.warnings(), []);
	assert.deepStrictEqual(
		result.messages.map((x) => ({ ...x, file: x.file.split('test')[1], parent: x.parent.split('test')[1] })),
		[
			{
				type: 'dependency',
				plugin: 'postcss-sass',
				file: '/components/colors.scss',
				parent: '/basic.scss',
			},
		],
	);
});

test('modern api supports includePaths and custom importers', async () => {
	const source = `
		@import "custom:colors";
		@import "fonts";
	`;

	const result = await postcss([plugin({
		api: 'modern',
		includePaths: ['test/components'],
		importers: [{
			canonicalize: (url) => url === 'custom:colors' ? new URL('custom:colors') : null,
			load: () => ({ contents: '$primary-color: #333;', syntax: 'scss' }),
		}],
	})]).process(source, {
		from: 'test/basic.scss',
	});

	assert.deepStrictEqual(result.warnings(), []);
	assert.deepStrictEqual(
		result.messages.map((x) => x.file.split('test')[1]),
		['/components/fonts.scss'],
	);
});

test('modern api rejects on sass errors', async () => {
	await assert.rejects(
		postcss([plugin({ api: 'modern' })]).process('a { b: $missing }', { from: 'test/basic.scss' }),
		/Undefined variable/,
	);
});
