export interface Point {
	x: number;
	y: number;
}

export type LayoutPresetId = 'A' | 'B';

interface LayoutPreset {
	id: LayoutPresetId;
	label: string;
	stage: { width: number; height: number };
	frame?: { left: number; top: number; width: number; height: number };
	networkBounds: { left: number; right: number; top: number; bottom: number };
	categoryRow: number;
	categorySlots: { start: number; end: number };
	categoryGroups?: Array<{ id: string; categoryIds: readonly string[] }>;
	categoryGroupGap?: number;
	yearRow: number;
	historicalYearSlots: { start: number; end: number };
	futureYearSlots: Record<string, number>;
	mobileCanvasWidth: number;
	edgeHitWidth: number;
	mobileEdgeHitWidth: number;
	categoryLabel: { offsetY: number; lineStep: number; fontSize: number; displayLabels?: Record<string, string> };
	yearLabel: { offsetY: number; fontSize: number };
	reserved: {
		chapterNavigation: 'above-network';
		contextualText: 'caption-and-readout';
		archiveOverlayInset: { top: number; right: number; bottom: number; left: number };
	};
}

const webCategoryGroups = [
	{ id: 'white-green', categoryIds: ['white'] },
	{
		id: 'asian-blue-cyan',
		categoryIds: ['chinese', 'japanese', 'hindu', 'korean', 'philippino', 'vietnamese', 'asian-indian', 'other-asian', 'other-api'],
	},
	{
		id: 'pacific-violet',
		categoryIds: ['samoan', 'guamanian-or-chamorro', 'guamanian', 'part-hawaiian', 'hawaiian', 'other-pacific-islander'],
	},
	{
		id: 'origin-olive',
		categoryIds: ['other-spanish', 'other-spanish-or-hispanic', 'other-spanish-hispanic-or-latino', 'mexican', 'cuban', 'puerto-rican', 'central-or-south-american', 'mexican-mexican-american-chicano'],
	},
	{ id: 'other-gray', categoryIds: ['other'] },
	{ id: 'indigenous-orange', categoryIds: ['alaska-native', 'eskimo', 'american-indian', 'aleut', 'indian'] },
	{ id: 'black-rose', categoryIds: ['mixed-black', 'black'] },
];

const sourcePlot = {
	left: 100 / 1920,
	width: 1440 / 1920,
	margin: 30 / 1920,
	categoryY: 250 / 1080,
	yearY: 510 / 1080,
};

export const layoutPresets: Record<LayoutPresetId, LayoutPreset> = {
	A: {
		id: 'A',
		label: 'A · Original Composition Reference',
		stage: { width: 1920, height: 1080 },
		frame: { left: sourcePlot.left, top: 200 / 1080, width: sourcePlot.width, height: 340 / 1080 },
		networkBounds: {
			left: sourcePlot.left,
			right: sourcePlot.left + sourcePlot.width,
			top: 200 / 1080,
			bottom: 540 / 1080,
		},
		categoryRow: sourcePlot.categoryY,
		categorySlots: {
			start: sourcePlot.left + sourcePlot.margin,
			end: sourcePlot.left + sourcePlot.width - sourcePlot.margin,
		},
		yearRow: sourcePlot.yearY,
		historicalYearSlots: {
			start: sourcePlot.left + sourcePlot.margin,
			end: sourcePlot.left + sourcePlot.width - sourcePlot.margin,
		},
		futureYearSlots: {
			'year-2050': sourcePlot.left + sourcePlot.width - sourcePlot.margin + (sourcePlot.width - sourcePlot.margin * 2) / 23,
		},
		mobileCanvasWidth: 1480,
		edgeHitWidth: 12,
		mobileEdgeHitWidth: 18,
		categoryLabel: { offsetY: -6.25, lineStep: 5.625, fontSize: 3.75 },
		yearLabel: { offsetY: 3.75, fontSize: 6.25 },
		reserved: {
			chapterNavigation: 'above-network',
			contextualText: 'caption-and-readout',
			archiveOverlayInset: { top: 0.04, right: 0.16, bottom: 0.46, left: 0.04 },
		},
	},
	B: {
		id: 'B',
		label: 'B · Web-Native Composition Study',
		stage: { width: 1920, height: 1080 },
		networkBounds: { left: 0.035, right: 0.965, top: 0.15, bottom: 0.93 },
		categoryRow: 0.24,
		categorySlots: { start: 0.035, end: 0.965 },
		categoryGroups: webCategoryGroups,
		categoryGroupGap: 0.018,
		yearRow: 0.86,
		historicalYearSlots: { start: 0.045, end: 0.88 },
		futureYearSlots: { 'year-2050': 0.96 },
		mobileCanvasWidth: 1480,
		edgeHitWidth: 12,
		mobileEdgeHitWidth: 18,
		categoryLabel: {
			offsetY: -8,
			lineStep: 8,
			fontSize: 12,
			displayLabels: {
				white: 'White',
				chinese: 'Chin.',
				japanese: 'Japan',
				hindu: 'Hindu',
				korean: 'Kore.',
				philippino: 'Phil.',
				vietnamese: 'Viet.',
				'asian-indian': 'A.Ind',
				samoan: 'Sam.',
				'guamanian-or-chamorro': 'G/Ch.',
				guamanian: 'Guam.',
				'part-hawaiian': 'P.Haw',
				hawaiian: 'Hawa.',
				'other-asian': 'O.Asn',
				'other-api': 'O.API',
				'other-pacific-islander': 'O.Pac',
				'other-spanish': 'O.Spn',
				'other-spanish-or-hispanic': 'O.Hsp',
				'other-spanish-hispanic-or-latino': 'O.Lat',
				other: 'Other',
				'alaska-native': 'Alas.',
				eskimo: 'Esk.',
				'american-indian': 'AmInd',
				aleut: 'Aleut',
				indian: 'Ind.',
				mexican: 'Mex.',
				cuban: 'Cuban',
				'puerto-rican': 'P.Ric',
				'central-or-south-american': 'C/SAm',
				'mexican-mexican-american-chicano': 'Mex/C',
				'mixed-black': 'M.Blk',
				black: 'Black',
			},
		},
		yearLabel: { offsetY: 25, fontSize: 15 },
		reserved: {
			chapterNavigation: 'above-network',
			contextualText: 'caption-and-readout',
			archiveOverlayInset: { top: 0.12, right: 0.08, bottom: 0.08, left: 0.08 },
		},
	},
};

export interface NetworkLayout {
	preset: LayoutPreset;
	stage: LayoutPreset['stage'];
	frame?: LayoutPreset['frame'];
	categoryPoints: Record<string, Point>;
	yearPoints: Record<string, Point>;
	categoryOrder: string[];
	yearOrder: string[];
}

function evenlySpaced(count: number, start: number, end: number): number[] {
	if (count <= 1) return [(start + end) / 2];
	return Array.from({ length: count }, (_, index) => start + ((end - start) * index) / (count - 1));
}

function groupedPositions(categoryIds: readonly string[], preset: LayoutPreset): Map<string, number> {
	const groups = (preset.categoryGroups ?? [])
		.map((group) => ({ ...group, categoryIds: group.categoryIds.filter((id) => categoryIds.includes(id)) }))
		.filter((group) => group.categoryIds.length > 0);
	const groupedIds = new Set(groups.flatMap((group) => group.categoryIds));
	const ungroupedIds = categoryIds.filter((id) => !groupedIds.has(id));
	if (ungroupedIds.length) groups.push({ id: 'unassigned', categoryIds: ungroupedIds });

	const totalCount = groups.reduce((total, group) => total + group.categoryIds.length, 0);
	const gap = preset.categoryGroupGap ?? 0;
	const usableSpan = preset.categorySlots.end - preset.categorySlots.start - gap * Math.max(0, groups.length - 1);
	const positions = new Map<string, number>();
	let cursor = preset.categorySlots.start;

	for (const group of groups) {
		const groupSpan = totalCount ? usableSpan * (group.categoryIds.length / totalCount) : 0;
		const nodeStep = group.categoryIds.length ? groupSpan / group.categoryIds.length : 0;
		group.categoryIds.forEach((id, index) => positions.set(id, cursor + nodeStep * (index + 0.5)));
		cursor += groupSpan + gap;
	}
	return positions;
}

export function createNetworkLayout(
	categoryIds: readonly string[],
	years: readonly { id: string; role: 'historical-label' | 'speculative-marker' }[],
	presetId: LayoutPresetId,
): NetworkLayout {
	const preset = layoutPresets[presetId];
	const groupedCategoryOrder = preset.categoryGroups
		? [...preset.categoryGroups.flatMap((group) => group.categoryIds), ...categoryIds.filter((id) => !preset.categoryGroups?.some((group) => group.categoryIds.includes(id)))]
			.filter((id) => categoryIds.includes(id))
		: categoryIds.slice();
	const categoryPositions = preset.categoryGroups
		? groupedPositions(categoryIds, preset)
		: new Map(categoryIds.map((id, index) => [id, evenlySpaced(categoryIds.length, preset.categorySlots.start, preset.categorySlots.end)[index]]));
	const categoryPoints: Record<string, Point> = {};
	for (const id of groupedCategoryOrder) {
		categoryPoints[id] = {
			x: (categoryPositions.get(id) ?? preset.categorySlots.start) * preset.stage.width,
			y: preset.categoryRow * preset.stage.height,
		};
	}

	const historicalYears = years.filter(({ role }) => role === 'historical-label');
	const speculativeYears = years.filter(({ role }) => role === 'speculative-marker');
	const historicalPositions = evenlySpaced(historicalYears.length, preset.historicalYearSlots.start, preset.historicalYearSlots.end);
	const yearPositionById = new Map(historicalYears.map(({ id }, index) => [id, historicalPositions[index]]));
	for (const year of speculativeYears) yearPositionById.set(year.id, preset.futureYearSlots[year.id] ?? 0.97);
	const yearPoints: Record<string, Point> = {};
	for (const { id } of years) {
		yearPoints[id] = {
			x: (yearPositionById.get(id) ?? 0) * preset.stage.width,
			y: preset.yearRow * preset.stage.height,
		};
	}

	return {
		preset,
		stage: preset.stage,
		frame: preset.frame,
		categoryPoints,
		yearPoints,
		categoryOrder: groupedCategoryOrder,
		yearOrder: years.map(({ id }) => id),
	};
}