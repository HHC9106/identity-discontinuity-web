export const chapterOrder = ['opening', 'chapter1', 'chapter2', 'chapter3', 'chapter4'] as const;
export type Chapter = typeof chapterOrder[number];

export function nextChapter(chapter: Chapter) {
	return chapterOrder[chapterOrder.indexOf(chapter) + 1];
}

export function revealRole(emphasis: readonly Chapter[], current: Chapter) {
	const index = chapterOrder.indexOf(current);
	if (emphasis.includes(current)) return 'current';
	if (index > 0 && emphasis.includes(chapterOrder[index - 1])) return 'previous';
	return chapterOrder.slice(0, Math.max(0, index - 1)).some((chapter) => emphasis.includes(chapter)) ? 'older' : 'unrevealed';
}

export const narrativeVisual = {
	current: 0.94,
	previous: 0.23,
	older: 0.1,
	unrevealed: 0.025,
	yearSkeleton: 0.44,
	currentHalo: 0.62,
};

export const narrativeMotion = {
	enter: 5400,
	redStart: 900,
	blueStart: 1450,
	lineGrowth: 3100,
	memory: 900,
	placeholder: 720,
};

export const chapterOneEmphasis = {
	scriptPhase: 2,
	diffuseCategory: 'mixed-black',
	exhibitionCategory: 'black',
};