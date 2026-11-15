export type SourcePhase = 1 | 2 | 3 | 4 | 5;
export type VerificationStatus = 'source-derived / historically unverified';

export interface SourceCategory {
	id: string;
	label: string;
	order: number;
	color: string;
	labelLines: string[];
	labelSourceVariable: 'ethnics';
	colorSourceVariable: 'ethnicColors';
	labelWrappingFunction: 'splitLabel';
	verificationStatus: VerificationStatus;
}

export interface SourceYear {
	id: string;
	year: number;
	order: number;
	role: 'historical-label' | 'speculative-marker';
	sourceVariable: 'yearLabels';
	verificationStatus: VerificationStatus;
}

export interface RawDrawRecord {
	id: string;
	phase: SourcePhase;
	subPhase?: 'static' | 'animated';
	categoryId: string;
	yearId: string;
	sourceVariable: string;
	sourceLocation: string;
	route?: string;
	occurrence: number;
}

export interface NormalizedSourceEdge {
	id: string;
	categoryId: string;
	yearId: string;
	rawDrawRecordIds: string[];
	verificationStatus: VerificationStatus;
}

export interface ExhibitionSupplementEdge {
	id: string;
	categoryId: string;
	yearId: string;
	provenance: 'prior physical exhibition mapping';
	verificationStatus: 'exhibition-derived / user-confirmed mapping; year-level historical equivalence unverified';
	sourceReference: string;
}

export type DisplayNetworkEdge = (NormalizedSourceEdge & { provenance: '2024 script' }) | ExhibitionSupplementEdge;

export const sourceReference = '2024 ref/pacific-islands-4k.js';
export const verificationStatus: VerificationStatus = 'source-derived / historically unverified';

export const sourceLocations = {
	categoryOrder: `${sourceReference}#L104-L138 ethnics`,
	labelWrapping: `${sourceReference}#L138-L179 splitLabel`,
	categoryColors: `${sourceReference}#L181-L218 ethnicColors`,
	firstGroups: `${sourceReference}#L250-L301 firstGroups`,
	secondGroupsInactive: `${sourceReference}#L303-L315 secondGroups (declared but not used by the active Chapter 1 loop)`,
	secondGroupsByYears: `${sourceReference}#L317-L374 secondGroupsByYears`,
	thirdGroups: `${sourceReference}#L376-L385 thirdGroups`,
	fourthGroups: `${sourceReference}#L387-L394 fourthGroups`,
	islandGroups: `${sourceReference}#L397-L426 islandGroups`,
	fifthGroup: `${sourceReference}#L430-L441 fifthGroup`,
	yearLabels: `${sourceReference}#L443-L446 yearLabels`,
	openingLoop: `${sourceReference}#L529-L545 setup / Phase 1`,
	chapter1Loop: `${sourceReference}#L547-L573 setup / Phase 2`,
	chapter2Loop: `${sourceReference}#L675-L705 setup / Phase 3`,
	chapter3Loop: `${sourceReference}#L708-L795 setup / Phase 4`,
	chapter4Loop: `${sourceReference}#L804-L901 setup / Phase 5`,
} as const;

export const exhibitionMappingBasis = {
	status: 'exhibition-derived / user-confirmed mapping; year-level historical equivalence unverified',
	userConfirmation: 'Creative Director confirmed the prior physical exhibition represented condensed White and Black categories with lines across the historical year sequence.',
	interpretation: 'White and Black are condensed exhibition category labels; they do not assert identical wording or classification mechanisms on every historical Census schedule.',
	officialHistoryReferences: [
		'https://www.census.gov/programs-surveys/decennial-census/technical-documentation/questionnaires.1790_Census.html',
		'https://www.census.gov/programs-surveys/decennial-census/technical-documentation/questionnaires.1820_Census.html',
		'https://www.census.gov/programs-surveys/decennial-census/technical-documentation/questionnaires.1850_Census.html',
		'https://www.census.gov/programs-surveys/decennial-census/technical-documentation/questionnaires.1890_Census.html',
		'https://www.census.gov/programs-surveys/decennial-census/technical-documentation/questionnaires.1930_Census.html',
		'https://www.census.gov/programs-surveys/decennial-census/technical-documentation/questionnaires.1940_Census.html',
		'https://www.census.gov/programs-surveys/decennial-census/technical-documentation/questionnaires.2020_Census.html',
	],
} as const;

const categorySource: Array<[string, string, string[]]> = [
	['white', 'White', ['White']],
	['chinese', 'Chinese', ['Chinese']],
	['japanese', 'Japanese', ['Japanese']],
	['hindu', 'Hindu', ['Hindu']],
	['korean', 'Korean', ['Korean']],
	['philippino', 'Philippino', ['Philippino']],
	['vietnamese', 'Vietnamese', ['Vietnamese']],
	['asian-indian', 'Asian Indian', ['Asian', 'Indian']],
	['samoan', 'Samoan', ['Samoan']],
	['guamanian-or-chamorro', 'Guamanian or Chamorro', ['Guamanian or', 'Chamorro']],
	['guamanian', 'Guamanian', ['Guamanian']],
	['part-hawaiian', 'Part Hawaiian', ['Part', 'Hawaiian']],
	['hawaiian', 'Hawaiian', ['Hawaiian']],
	['other-asian', 'Other Asian', ['Other', 'Asian']],
	['other-api', 'Other API', ['Other', 'API']],
	['other-pacific-islander', 'Other Pacific Islander', ['Other Pacific', 'Islander']],
	['other-spanish', 'Other Spanish', ['Other', 'Spanish']],
	['other-spanish-or-hispanic', 'Other Spanish or Hispanic', ['Other Spanish', 'or Hispanic']],
	['other-spanish-hispanic-or-latino', 'Other Spanish, Hispanic, or Latino', ['Other Spanish,', 'Hispanic or Latino']],
	['other', 'Other', ['Other']],
	['alaska-native', 'Alaska Native', ['Alaska Native']],
	['eskimo', 'Eskimo', ['Eskimo']],
	['american-indian', 'American Indian', ['American Indian']],
	['aleut', 'Aleut', ['Aleut']],
	['indian', 'Indian', ['Indian']],
	['mexican', 'Mexican', ['Mexican']],
	['cuban', 'Cuban', ['Cuban']],
	['puerto-rican', 'Puerto Rican', ['Puerto', 'Rican']],
	['central-or-south-american', 'Central or South American', ['Central or South', 'American']],
	['mexican-mexican-american-chicano', 'Mexican, Mexican-American, Chicano', ['Mexican-Am.,', 'Mexican, Chicano']],
	['mixed-black', 'Mixed Black', ['Mixed', 'Black']],
	['black', 'Black', ['Black']],
];

export const categories: SourceCategory[] = categorySource.map(([id, label, labelLines], order) => ({
	id,
	label,
	order,
	labelLines,
	color: '',
	labelSourceVariable: 'ethnics',
	colorSourceVariable: 'ethnicColors',
	labelWrappingFunction: 'splitLabel',
	verificationStatus,
}));

export const categoryColors: Record<string, string> = {
	White: '#56804d',
	Chinese: '#799ae0',
	Japanese: '#64e8ed',
	Hindu: '#42b7ed',
	Korean: '#5789f2',
	Philippino: '#a6e3f7',
	Vietnamese: '#009dff',
	'Asian Indian': '#478ff5',
	Samoan: '#b694ff',
	'Guamanian or Chamorro': '#9c43e0',
	Guamanian: '#bb77e6',
	'Part Hawaiian': '#bca4db',
	Hawaiian: '#8955cf',
	'Other Asian': '#70c4ff',
	'Other API': '#7086ff',
	'Other Pacific Islander': '#7649f2',
	'Other Spanish': '#828c16',
	'Other Spanish or Hispanic': '#b3ad15',
	'Other Spanish, Hispanic, or Latino': '#d1c32a',
	Other: '#757575',
	'Alaska Native': '#ffc496',
	Eskimo: '#f78025',
	'American Indian': '#eb9e1a',
	Aleut: '#ff6200',
	Indian: '#db8348',
	Mexican: '#f3ff73',
	Cuban: '#e8d900',
	'Puerto Rican': '#cfa81d',
	'Central or South American': '#adb519',
	'Mexican, Mexican-American, Chicano': '#f2e89b',
	'Mixed Black': '#de6f6f',
	Black: '#FFC0CB',
};

for (const category of categories) {
	category.color = categoryColors[category.label];
}

const historicalYears = [
	1790, 1800, 1810, 1820, 1830, 1840, 1850, 1860, 1870, 1880, 1890, 1900, 1910,
	1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020,
];

export const years: SourceYear[] = [
	...historicalYears.map((year, order) => ({
		id: `year-${year}`,
		year,
		order,
		role: 'historical-label' as const,
		sourceVariable: 'yearLabels' as const,
		verificationStatus,
	})),
	{
		id: 'year-2050',
		year: 2050,
		order: historicalYears.length,
		role: 'speculative-marker',
		sourceVariable: 'yearLabels',
		verificationStatus,
	},
];

export const sourceMaps = {
	firstGroups: {
		White: [],
		Chinese: [1860, 1870, 1880, 1890, 1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020],
		Japanese: [1890, 1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020],
		Hindu: [1920, 1930, 1940],
		Korean: [1920, 1930, 1940, 1970, 1980, 1990, 2000, 2010, 2020],
		Philippino: [1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020],
		Vietnamese: [1980, 1990, 2000, 2010, 2020],
		'Asian Indian': [1980, 1990, 2000, 2010, 2020],
		'Guamanian or Chamorro': [2000, 2010, 2020],
		'Samoan': [1980, 1990, 2000, 2010, 2020],
		Guamanian: [1980, 1990, 2000],
		'Part Hawaiian': [1960],
		Hawaiian: [1960, 1970, 1980, 1990, 2000, 2010],
		'Other API': [1990],
		'Other Asian': [2000, 2010, 2020],
		'Other Pacific Islander': [2000, 2010],
		'Other Spanish': [1970],
		'Other Spanish or Hispanic': [1980, 1990],
		'Other Spanish, Hispanic, or Latino': [2000, 2010, 2020],
		Other: [1790, 1800, 1810, 1820, 1830, 1840, 1910, 1920, 1930, 1940, 1950, 1970, 1980, 1990, 2000, 2010, 2020],
		'Alaska Native': [2000, 2010, 2020],
		Eskimo: [1960, 1980],
		Aleut: [1960, 1970, 1980, 1990],
		'American Indian': [1960, 1970, 1980, 1990],
		Indian: [1860, 1870, 1880, 1890, 1900, 1910, 1920, 1930, 1940, 1950],
		Cuban: [1970, 1980, 1990, 2000, 2010, 2020],
		'Puerto Rican': [1970, 1980, 1990, 2000, 2010, 2020],
		'Central or South American': [1970],
		'Mexican, Mexican-American, Chicano': [1980, 1990, 2000, 2010, 2020],
		Mexican: [1930, 1970],
		'Mixed Black': [1850, 1860, 1870, 1880, 1880, 1890, 1910, 1920],
		Black: [],
	} satisfies Record<string, number[]>,
	secondGroupsInactive: {
		Black: [],
		'Mixed Black': [1850, 1860, 1870, 1880, 1880, 1890, 1910, 1920],
		Chinese: [1860, 1870, 1880, 1890, 1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020],
		Japanese: [1890, 1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020],
		Hindu: [1920, 1930, 1940],
		Korean: [1920, 1930, 1940, 1970, 1980, 1990, 2000, 2010, 2020],
		Philippino: [1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020],
		Vietnamese: [1980, 1990, 2000, 2010, 2020],
		'Asian Indian': [1980, 1990, 2000, 2010, 2020],
	} satisfies Record<string, number[]>,
	secondGroupsByYears: {
		1850: ['Mixed Black'],
		1860: ['Chinese', 'Mixed Black'],
		1870: ['Chinese', 'Mixed Black'],
		1880: ['Chinese', 'Mixed Black'],
		1890: ['Chinese', 'Japanese', 'Mixed Black'],
		1900: ['Chinese', 'Japanese'],
		1910: ['Chinese', 'Japanese', 'Mixed Black'],
		1920: ['Chinese', 'Japanese', 'Hindu', 'Korean', 'Philippino', 'Mixed Black'],
		1930: ['Chinese', 'Japanese', 'Hindu', 'Korean', 'Philippino'],
		1940: ['Chinese', 'Japanese', 'Hindu', 'Korean', 'Philippino'],
		1950: ['Chinese', 'Japanese', 'Philippino'],
		1960: ['Chinese', 'Japanese', 'Philippino'],
		1970: ['Chinese', 'Japanese', 'Korean', 'Philippino'],
		1980: ['Chinese', 'Japanese', 'Korean', 'Philippino', 'Vietnamese', 'Asian Indian'],
		1990: ['Chinese', 'Japanese', 'Korean', 'Philippino', 'Vietnamese', 'Asian Indian'],
		2000: ['Chinese', 'Japanese', 'Korean', 'Philippino', 'Vietnamese', 'Asian Indian'],
		2010: ['Chinese', 'Japanese', 'Korean', 'Philippino', 'Vietnamese', 'Asian Indian'],
		2020: ['Chinese', 'Japanese', 'Korean', 'Philippino', 'Vietnamese', 'Asian Indian'],
	} satisfies Record<number, string[]>,
	thirdGroups: {
		Mexican: [1930, 1970],
		'Mexican, Mexican-American, Chicano': [1980, 1990, 2000, 2010, 2020],
		Indian: [1860, 1870, 1880, 1890, 1900, 1910, 1920, 1930, 1940, 1950],
		'American Indian': [1960, 1970, 1980, 1990],
		'Central or South American': [1970],
		'Other Spanish': [1970],
		'Other Spanish, Hispanic, or Latino': [2000, 2010, 2020],
		'Other Spanish or Hispanic': [1980, 1990],
	} satisfies Record<string, number[]>,
	fourthGroups: {
		Hawaiian: [1960, 1970, 1980, 1990, 2000, 2010],
		'Part Hawaiian': [1960],
		Guamanian: [1980, 1990, 2000],
		Samoan: [1980, 1990, 2000, 2010, 2020],
		'Guamanian or Chamorro': [2000, 2010, 2020],
		'Other Pacific Islander': [2000, 2010],
	} satisfies Record<string, number[]>,
	fifthGroup: {
		'Other API': [1990],
		'Other Asian': [2000, 2010, 2020],
		'Other Pacific Islander': [2000, 2010],
		'Other Spanish': [1970],
		'Other Spanish or Hispanic': [1980, 1990],
		'Other Spanish, Hispanic, or Latino': [2000, 2010, 2020],
		Other: [1790, 1800, 1810, 1820, 1830, 1840, 1910, 1920, 1930, 1940, 1950, 1970, 1980, 1990, 2000, 2010, 2020],
	} satisfies Record<string, number[]>,
	islandGroups: [
		{ label: 'Hawaii', groups: ['Hawaiian', 'Part Hawaiian'], x: 1080, y: 80 },
		{ label: 'Guam', groups: ['Guamanian', 'Guamanian or Chamorro'], x: 930, y: 90 },
		{ label: 'Northern Mariana', groups: ['Guamanian or Chamorro'], x: 880, y: 75 },
		{ label: 'American Samoa', groups: ['Samoan'], x: 1000, y: 110 },
		{ label: 'Other Pacific', groups: ['Other Pacific Islander'], x: 1050, y: 90 },
	],
};

const sourceMapsForLoops = sourceMaps as {
	firstGroups: Record<string, number[]>;
	secondGroupsInactive: Record<string, number[]>;
	secondGroupsByYears: Record<number, string[]>;
	thirdGroups: Record<string, number[]>;
	fourthGroups: Record<string, number[]>;
	fifthGroup: Record<string, number[]>;
	islandGroups: Array<{ label: string; groups: string[]; x: number; y: number }>;
};

const categoryIdByLabel = new Map(categories.map(({ id, label }) => [label, id]));
const yearIdByValue = new Map(years.map(({ id, year }) => [year, id]));
const activeYearValues = new Set(historicalYears);
const occurrenceCounts = new Map<string, number>();

function categoryId(label: string): string {
	const id = categoryIdByLabel.get(label);
	if (!id) throw new Error(`Unknown source category: ${label}`);
	return id;
}

function appendRawDraw(
	output: RawDrawRecord[],
	phase: SourcePhase,
	label: string,
	year: number,
	sourceVariable: string,
	sourceLocation: string,
	subPhase?: 'static' | 'animated',
	route?: string,
) {
	if (!activeYearValues.has(year)) return;
	const category = categoryId(label);
	const yearId = yearIdByValue.get(year);
	if (!yearId) throw new Error(`Unknown source year: ${year}`);
	const occurrenceKey = [phase, subPhase ?? 'main', category, yearId, route ?? ''].join(':');
	const occurrence = (occurrenceCounts.get(occurrenceKey) ?? 0) + 1;
	occurrenceCounts.set(occurrenceKey, occurrence);
	const routeId = route ? `-${route.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : '';
	output.push({
		id: `raw-p${phase}-${subPhase ?? 'main'}-${category}-${year}-${occurrence}${routeId}`,
		phase,
		...(subPhase ? { subPhase } : {}),
		categoryId: category,
		yearId,
		sourceVariable,
		sourceLocation,
		...(route ? { route } : {}),
		occurrence,
	});
}

export function extractActiveDrawRecords(): RawDrawRecord[] {
	const records: RawDrawRecord[] = [];

	for (const { label } of categories) {
		for (const year of sourceMapsForLoops.firstGroups[label] ?? []) {
			appendRawDraw(records, 1, label, year, 'firstGroups', sourceLocations.openingLoop);
		}
	}

	for (const year of Object.keys(sourceMapsForLoops.secondGroupsByYears).map(Number).sort((a, b) => a - b)) {
		const labels = sourceMapsForLoops.secondGroupsByYears[year];
		for (const { label } of categories) {
			if (labels.includes(label)) appendRawDraw(records, 2, label, year, 'secondGroupsByYears', sourceLocations.chapter1Loop);
		}
	}

	const chapter2Order = ['Mexican', ...Object.keys(sourceMapsForLoops.thirdGroups).filter((label) => label !== 'Mexican')];
	for (const label of chapter2Order) {
		for (const year of sourceMapsForLoops.thirdGroups[label]) {
			appendRawDraw(records, 3, label, year, 'thirdGroups', sourceLocations.chapter2Loop);
		}
	}

	const islandRoutes = sourceMapsForLoops.islandGroups.flatMap((island) =>
		island.groups.flatMap((label) =>
			(sourceMapsForLoops.fourthGroups[label] ?? []).map((year) => ({ island: island.label, label, year })),
		),
	).sort((a, b) => a.year - b.year);
	for (const { island, label, year } of islandRoutes) {
		appendRawDraw(records, 4, label, year, 'fourthGroups + islandGroups', sourceLocations.chapter3Loop, undefined, island);
	}

	for (const label of Object.keys(sourceMapsForLoops.firstGroups)) {
		for (const year of sourceMapsForLoops.firstGroups[label]) {
			appendRawDraw(records, 5, label, year, 'firstGroups', sourceLocations.chapter4Loop, 'static');
		}
	}

	const fifthByYear = new Map<number, string[]>();
	for (const label of Object.keys(sourceMapsForLoops.fifthGroup)) {
		for (const year of sourceMapsForLoops.fifthGroup[label]) {
			const labels = fifthByYear.get(year) ?? [];
			labels.push(label);
			fifthByYear.set(year, labels);
		}
	}
	for (const year of [...fifthByYear.keys()].sort((a, b) => a - b)) {
		for (const label of fifthByYear.get(year) ?? []) {
			appendRawDraw(records, 5, label, year, 'fifthGroup', sourceLocations.chapter4Loop, 'animated');
		}
	}

	return records;
}

export const rawDrawRecords = extractActiveDrawRecords();

const normalizedByPair = new Map<string, NormalizedSourceEdge>();
for (const record of rawDrawRecords) {
	const pairKey = `${record.categoryId}:${record.yearId}`;
	let edge = normalizedByPair.get(pairKey);
	if (!edge) {
		edge = {
			id: `edge-${record.categoryId}-${record.yearId}`,
			categoryId: record.categoryId,
			yearId: record.yearId,
			rawDrawRecordIds: [],
			verificationStatus,
		};
		normalizedByPair.set(pairKey, edge);
	}
	edge.rawDrawRecordIds.push(record.id);
}

export const edges = [...normalizedByPair.values()];
const exhibitionCategoryIds = ['white', 'black'] as const;
export const exhibitionSupplementEdges: ExhibitionSupplementEdge[] = exhibitionCategoryIds.flatMap((categoryId) =>
	years.filter(({ role }) => role === 'historical-label').map((year) => ({
		id: `exhibition-edge-${categoryId}-${year.id}`,
		categoryId,
		yearId: year.id,
		provenance: 'prior physical exhibition mapping' as const,
		verificationStatus: 'exhibition-derived / user-confirmed mapping; year-level historical equivalence unverified' as const,
		sourceReference: 'Creative Director confirmation: the prior exhibition represented these condensed categories with physical lines across historical years.',
	})),
);
export const displayEdges: DisplayNetworkEdge[] = [
	...edges.map((edge) => ({ ...edge, provenance: '2024 script' as const })),
	...exhibitionSupplementEdges,
];
export const phase2CategoryIds = [...new Set(rawDrawRecords.filter(({ phase }) => phase === 2).map(({ categoryId }) => categoryId))];
export const sourceVisibleChapter1CategoryIds = [...phase2CategoryIds, categoryId('Black')];

export const extractionSummary = {
	categoryCount: categories.length,
	historicalYearCount: historicalYears.length,
	speculativeYearCount: years.length - historicalYears.length,
	rawDrawRecordCount: rawDrawRecords.length,
	uniqueEdgeCount: edges.length,
	exhibitionSupplementEdgeCount: exhibitionSupplementEdges.length,
	displayedEdgeCount: displayEdges.length,
	phaseRawCounts: {
		1: rawDrawRecords.filter(({ phase }) => phase === 1).length,
		2: rawDrawRecords.filter(({ phase }) => phase === 2).length,
		3: rawDrawRecords.filter(({ phase }) => phase === 3).length,
		4: rawDrawRecords.filter(({ phase }) => phase === 4).length,
		5: rawDrawRecords.filter(({ phase }) => phase === 5).length,
	},
	phaseUniqueCounts: Object.fromEntries([1, 2, 3, 4, 5].map((phase) => [
		phase,
		new Set(rawDrawRecords.filter((record) => record.phase === phase).map(({ categoryId, yearId }) => `${categoryId}:${yearId}`)).size,
	])),
};

export const knownAnomalies = [
	'The 2024 script has empty White and Black arrays in firstGroups; White/Black overview connections are supplied separately from the prior physical exhibition and are not 2024-script edges.',
	'The prior exhibition maps the condensed White and Black labels across the 24 historical year nodes; Census terminology and classification methods varied, so those exhibit mappings are separate and do not claim identical year-by-year labels.',
	'firstGroups and the repeated Chapter 4 static pass each contain Mixed Black–1880 twice; raw occurrences are retained, normalized visual edge is one.',
	'Chapter 3 routes Guamanian or Chamorro–2000/2010/2020 through both Guam and Northern Mariana; raw routed records are retained while normalized category-year pairs are unique.',
	'Race/color, national-origin, Hispanic-origin and other labels are mixed; the source has no per-edge question-type or citation metadata.',
	'2050 is appended as a future marker, not a decennial census year and has no category-year edge.',
	'secondGroups is declared but inactive in the active Chapter 1 draw loop; secondGroupsByYears is the map actually consumed.',
] as const;