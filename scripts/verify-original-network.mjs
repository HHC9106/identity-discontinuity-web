import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInContext, createContext } from 'node:vm';
import {
	rawDrawRecords,
	categories,
	years,
	edges,
	displayEdges,
	exhibitionSupplementEdges,
	extractionSummary,
} from '../src/data/sourceDerived2024.ts';

const originalPath = new URL('../2024 ref/pacific-islands-4k.js', import.meta.url);
const originalSource = await readFile(originalPath, 'utf8');

function p5Color(value, green = 0, blue = 0) {
	if (typeof value !== 'string') return { r: value ?? 0, g: green, b: blue };
	const hex = value.replace('#', '');
	return {
		r: Number.parseInt(hex.slice(0, 2), 16),
		g: Number.parseInt(hex.slice(2, 4), 16),
		b: Number.parseInt(hex.slice(4, 6), 16),
	};
}

const context = createContext({
	console: { warn() {} },
	RGB: 'RGB',
	HSL: 'HSL',
	NORMAL: 'NORMAL',
	createCanvas() {},
	colorMode() {},
	textFont() {},
	textStyle() {},
	color: p5Color,
	red: (color) => color.r,
	green: (color) => color.g,
	blue: (color) => color.b,
	map: (value, start1, stop1, start2, stop2) => start2 + ((value - start1) / (stop1 - start1)) * (stop2 - start2),
});

runInContext(originalSource, context, { filename: originalPath.pathname });
runInContext('setup()', context);

const originalRecords = JSON.parse(runInContext(`JSON.stringify(connections.map((connection) => ({
	phase: connection.phase,
	subPhase: connection.subPhase ?? null,
	category: connection.top.name,
	year: connection.bottom.year,
	route: connection.phase === 4 ? islandConnections[connections.filter((item) => item.phase === 4).indexOf(connection)].top.label : null
})))`, context));
const originalCategoryLabels = JSON.parse(runInContext('JSON.stringify(ethnics)', context));
const originalLabelLines = JSON.parse(runInContext('JSON.stringify(ethnics.map((label) => splitLabel(label)))', context));
const originalColorByLabel = JSON.parse(runInContext('JSON.stringify(ethnicColors)', context));
const originalYearLabels = JSON.parse(runInContext('JSON.stringify(yearLabels)', context));

const extractedRecords = rawDrawRecords.map((record) => ({
	phase: record.phase,
	subPhase: record.subPhase ?? null,
	category: categories.find(({ id }) => id === record.categoryId)?.label,
	year: years.find(({ id }) => id === record.yearId)?.year,
	route: record.route ?? null,
}));

const mismatchIndex = extractedRecords.findIndex((record, index) =>
	JSON.stringify(record) !== JSON.stringify(originalRecords[index]),
);
if (mismatchIndex !== -1 || extractedRecords.length !== originalRecords.length) {
	console.error(JSON.stringify({
		status: 'FAIL',
		extractedCount: extractedRecords.length,
		originalCount: originalRecords.length,
		firstMismatchIndex: mismatchIndex,
		extracted: extractedRecords[mismatchIndex],
		original: originalRecords[mismatchIndex],
	}, null, 2));
	process.exitCode = 1;
} else {
	assert.deepEqual(categories.map(({ label }) => label), originalCategoryLabels, 'Category labels or order differ from ethnics.');
	assert.deepEqual(categories.map(({ labelLines }) => labelLines), originalLabelLines, 'Label wrapping differs from splitLabel().');
	assert.deepEqual(Object.fromEntries(categories.map(({ label, color }) => [label, color])), originalColorByLabel, 'Original category colors differ from ethnicColors.');
	assert.deepEqual(years.map(({ year }) => year), originalYearLabels, 'Year labels or order differ from yearLabels.');
	assert.equal(categories.length, 32, 'Unexpected source category count.');
	assert.equal(years.length, 25, 'Expected 24 historical labels plus 2050.');
	assert.equal(rawDrawRecords.length, 475, 'Unexpected active source draw-record count.');
	assert.equal(edges.length, 161, 'Unexpected unique category-year edge count.');
		assert.equal(exhibitionSupplementEdges.length, 48, 'Expected 24 prior-exhibition mappings each for White and Black.');
		assert.equal(displayEdges.length, 209, 'Expected 161 source edges plus 48 exhibition supplements.');
		assert.equal(exhibitionSupplementEdges.filter(({ categoryId }) => categoryId === 'white').length, 24);
		assert.equal(exhibitionSupplementEdges.filter(({ categoryId }) => categoryId === 'black').length, 24);
		assert.ok(exhibitionSupplementEdges.every(({ yearId }) => yearId !== 'year-2050'), 'Speculative 2050 must have no exhibition category edge.');
	assert.deepEqual(
		new Set(edges.map(({ categoryId, yearId }) => `${categoryId}:${yearId}`)),
		new Set(originalRecords.map(({ category, year }) => `${categories.find((item) => item.label === category)?.id}:${years.find((item) => item.year === year)?.id}`)),
		'Normalized edge endpoints do not match the original draw records.',
	);

	console.log(JSON.stringify({
		status: 'PASS',
		...extractionSummary,
		originalSetupRecordsCompared: originalRecords.length,
		duplicatesRetainedInRawRecords: rawDrawRecords.length - edges.length,
	}, null, 2));
}