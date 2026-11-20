<script lang="ts">
	import {
		categories,
		edges as sourceScriptEdges,
		displayEdges,
		rawDrawRecords,
		years,
	} from '../data/sourceDerived2024';
	import { createNetworkLayout, type LayoutPresetId } from '../layout';
	import { visual } from '../config/phase1';

	type EffectMode = 'network' | 'chapter1';
	type Target = { kind: 'category' | 'edge'; id: string };

	export let selectedEdgeId = '';
	export let effectMode: EffectMode = 'network';
	export let layoutPreset: LayoutPresetId = 'A';
	export let artworkView = false;
	export let diffuseGradient = false;
	export let onSelect: (edgeId: string) => void = () => {};

	const categoryById = Object.fromEntries(categories.map((category) => [category.id, category]));
	const yearById = Object.fromEntries(years.map((year) => [year.id, year]));
	const rawDrawById = Object.fromEntries(rawDrawRecords.map((record) => [record.id, record]));
	const phase2EdgeIds = new Set(sourceScriptEdges
		.filter((edge) => edge.rawDrawRecordIds.some((id) => rawDrawById[id]?.phase === 2))
		.map(({ id }) => id));
	const phase2CategoryIds = new Set(sourceScriptEdges
		.filter((edge) => phase2EdgeIds.has(edge.id) && edge.categoryId !== 'mixed-black')
		.map(({ categoryId }) => categoryId));
	const edges = displayEdges;
	const edgeById = new Map(edges.map((edge) => [edge.id, edge]));
	let pointerPreview: Target | undefined;
	let keyboardPreview: Target | undefined;
	let svg: SVGSVGElement;
	let selectedCategoryId = '';
	let networkLayout = createNetworkLayout(categories.map(({ id }) => id), years, layoutPreset);
	$: networkLayout = createNetworkLayout(categories.map(({ id }) => id), years, layoutPreset);
	$: activeEdges = edges;
	$: activeCategories = categories;
	$: activeYears = years;
	$: if (selectedEdgeId) selectedCategoryId = '';
	$: selection = selectedEdgeId ? { kind: 'edge', id: selectedEdgeId } : selectedCategoryId ? { kind: 'category', id: selectedCategoryId } : undefined;
	$: inspected = pointerPreview ?? keyboardPreview ?? selection;
	$: inspectedEdge = inspected?.kind === 'edge' ? edgeById.get(inspected.id) : undefined;
	$: inspectedCategoryId = inspected?.kind === 'category' ? inspected.id : '';
	$: inspectedCategory = categories.find(({ id }) => id === inspectedCategoryId);
	$: inspectedCategoryEdges = inspectedCategory ? edges.filter(({ categoryId }) => categoryId === inspectedCategory.id) : [];
	$: inspectedScriptEdgeCount = inspectedCategoryEdges.filter(({ provenance }) => provenance !== 'prior physical exhibition mapping').length;
	$: inspectedExhibitionEdgeCount = inspectedCategoryEdges.length - inspectedScriptEdgeCount;
	$: inspectedConnectedYears = inspectedCategoryEdges.slice().sort((left, right) => Number(yearById[left.yearId].year) - Number(yearById[right.yearId].year));
	$: inspectedYearIds = new Set(inspectedEdge ? [inspectedEdge.yearId] : inspectedCategoryEdges.map(({ yearId }) => yearId));
	$: panelCategory = inspectedEdge ? categoryById[inspectedEdge.categoryId] : inspectedCategory;

	function targetAt(event: MouseEvent): Target | undefined {
		if (!(event.target instanceof Element)) return;
		const category = event.target.closest<SVGGElement>('[data-category-id]');
		if (category?.dataset.categoryId) return { kind: 'category', id: category.dataset.categoryId };

		const hit = event.target.closest<SVGLineElement>('.edge-hit');
		const transform = svg.getScreenCTM();
		if (!hit || !transform) return;
		const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(transform.inverse());
		const limit = parseFloat(getComputedStyle(hit).strokeWidth) / 2;
		let nearestId = '';
		let nearestDistance = Infinity;
		let previousDistance = Infinity;
		for (const edge of edges) {
			const start = networkLayout.categoryPoints[edge.categoryId];
			const end = networkLayout.yearPoints[edge.yearId];
			const dx = end.x - start.x;
			const dy = end.y - start.y;
			const fraction = ((point.x - start.x) * dx + (point.y - start.y) * dy) / (dx * dx + dy * dy);
			if (fraction < 0 || fraction > 1) continue;
			const distance = Math.abs((point.x - start.x) * dy - (point.y - start.y) * dx) / Math.hypot(dx, dy);
			if (distance > limit) continue;
			if (pointerPreview?.kind === 'edge' && pointerPreview.id === edge.id) previousDistance = distance;
			if (distance < nearestDistance) {
				nearestDistance = distance;
				nearestId = edge.id;
			}
		}
		if (pointerPreview && previousDistance <= nearestDistance + 0.75 && previousDistance < Infinity) return pointerPreview;
		return nearestId ? { kind: 'edge', id: nearestId } : undefined;
	}

	function previewPointer(event: PointerEvent) {
		if (event.pointerType === 'touch') return;
		const next = targetAt(event);
		if (next?.id !== pointerPreview?.id || next?.kind !== pointerPreview?.kind) pointerPreview = next;
	}

	function previewKeyboard(event: FocusEvent, target: Target) {
		if (event.currentTarget instanceof Element && event.currentTarget.matches(':focus-visible')) {
			pointerPreview = undefined;
			keyboardPreview = target;
		}
	}

	function lock(target: Target) {
		pointerPreview = undefined;
		keyboardPreview = undefined;
		selectedCategoryId = target.kind === 'category' ? target.id : '';
		onSelect(target.kind === 'edge' ? target.id : '');
	}

	function clickEdge(event: MouseEvent, edgeId: string) {
		const target = event.detail === 0 ? { kind: 'edge' as const, id: edgeId } : targetAt(event);
		if (target?.kind !== 'edge') return;
		svg.querySelector<SVGLineElement>(`[data-edge-id="${CSS.escape(target.id)}"]`)?.focus({ preventScroll: true });
		lock(target);
	}

	function clear() {
		pointerPreview = undefined;
		keyboardPreview = undefined;
		selectedCategoryId = '';
		onSelect('');
	}

	function activate(event: KeyboardEvent, target: Target) {
		if (event.key !== 'Enter' && event.key !== ' ') return;
		event.preventDefault();
		lock(target);
	}

</script>

<svelte:window onkeydowncapture={(event) => { if (event.key === 'Escape' && inspected) clear(); }} />

<div class="network-focus-anchor">{@render focusPanel()}</div>

<svg
	bind:this={svg}
	tabindex="-1"
	class="network-svg"
	class:reference-preset={layoutPreset === 'A'}
	class:web-preset={layoutPreset === 'B'}
	viewBox={`0 0 ${networkLayout.stage.width} ${networkLayout.stage.height}`}
	role="group"
	onpointermove={previewPointer}
	onpointerleave={() => (pointerPreview = undefined)}
	onpointercancel={() => (pointerPreview = undefined)}
	aria-label={`2024 source-derived graph plus prior exhibition mappings, historically unverified. ${categories.length} category labels, ${years.length} year markers, ${edges.length} displayed category-year connections.`}
>
	<defs>
		<filter id="diffuse-halo" filterUnits="userSpaceOnUse" x="-32" y="-32" width={networkLayout.stage.width + 64} height={networkLayout.stage.height + 64}>
			<feGaussianBlur stdDeviation={visual.diffuseBlur} />
		</filter>
		{#if effectMode === 'chapter1' && diffuseGradient}
			{#each activeEdges.filter((edge) => (edge.categoryId === 'mixed-black' && phase2EdgeIds.has(edge.id)) || (edge.categoryId === 'black' && edge.provenance === 'prior physical exhibition mapping')) as edge (edge.id)}
				{@const start = networkLayout.categoryPoints[edge.categoryId]}
				{@const end = networkLayout.yearPoints[edge.yearId]}
				<linearGradient id={`diffuse-gradient-${edge.id}`} gradientUnits="userSpaceOnUse" x1={start.x} y1={start.y} x2={end.x} y2={end.y}>
					<stop offset="0%" stop-color={visual.diffuseGradientStart} />
					<stop offset="100%" stop-color={visual.diffuseGradientEnd} />
				</linearGradient>
			{/each}
		{/if}
	</defs>

	{#if networkLayout.frame}
		<rect class="reference-frame" x={networkLayout.frame.left * networkLayout.stage.width} y={networkLayout.frame.top * networkLayout.stage.height} width={networkLayout.frame.width * networkLayout.stage.width} height={networkLayout.frame.height * networkLayout.stage.height} />
	{/if}
	{#if !artworkView}
		<text class="axis-caption" x={networkLayout.preset.networkBounds.left * networkLayout.stage.width} y={networkLayout.preset.networkBounds.top * networkLayout.stage.height - 14}>{layoutPreset === 'A' ? 'CATEGORY LABELS · ORIGINAL SOURCE ORDER' : 'CATEGORY LABELS · ORIGINAL PALETTE GROUPS'}</text>
		<text class="axis-caption" x={networkLayout.preset.networkBounds.left * networkLayout.stage.width} y={networkLayout.preset.networkBounds.bottom * networkLayout.stage.height + 23}>CENSUS YEAR LABELS · 2050* IS SPECULATIVE</text>
	{/if}

	<g class="edge-layer">
		{#each activeEdges as edge (edge.id)}
			{@const category = categoryById[edge.categoryId]}
			{@const year = yearById[edge.yearId]}
			{@const start = networkLayout.categoryPoints[edge.categoryId]}
			{@const end = networkLayout.yearPoints[edge.yearId]}
			{@const categoryFocusEdge = inspectedCategoryId === edge.categoryId}
			{@const lineFocusEdge = inspectedEdge?.id === edge.id}
			{@const exhibitSupplement = edge.provenance === 'prior physical exhibition mapping'}
			{@const chapter1SourceEdge = effectMode === 'chapter1' && phase2EdgeIds.has(edge.id)}
			{@const chapter1ExhibitionBlack = effectMode === 'chapter1' && exhibitSupplement && edge.categoryId === 'black'}
			{@const chapter1FocusEdge = chapter1SourceEdge || chapter1ExhibitionBlack}
			{@const diffuse = effectMode === 'chapter1' && (chapter1SourceEdge && edge.categoryId === 'mixed-black' || chapter1ExhibitionBlack)}
			{@const crisp = chapter1SourceEdge && edge.categoryId !== 'mixed-black'}
			{@const color = diffuse ? (diffuseGradient ? `url(#diffuse-gradient-${edge.id})` : visual.diffuse) : crisp ? visual.crisp : category.color}
			{@const baseOpacity = effectMode === 'chapter1' ? (chapter1FocusEdge ? (diffuse ? visual.diffuseOpacity : visual.crispOpacity) : visual.chapter1ContextOpacity) : visual.neutralOpacity}
			{@const edgeOpacity = categoryFocusEdge || lineFocusEdge ? 1 : inspectedEdge ? baseOpacity * 0.72 : inspectedCategoryId ? Math.min(baseOpacity, visual.categoryFocusContextOpacity) : baseOpacity}
			{#if diffuse}
				<line class="edge-halo" x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={color} stroke-width={visual.diffuseHaloWidth} filter="url(#diffuse-halo)" opacity={inspected && !categoryFocusEdge && !lineFocusEdge ? 0.3 : 0.62} aria-hidden="true" />
			{/if}
			<line
				class="data-edge"
				class:line-focus-edge={lineFocusEdge}
				class:diffuse-edge={diffuse}
				class:crisp-edge={crisp}
				class:category-focus-edge={categoryFocusEdge}
				class:exhibition-edge={exhibitSupplement}
				x1={start.x}
				y1={start.y}
				x2={end.x}
				y2={end.y}
				stroke={color}
				stroke-width={lineFocusEdge || categoryFocusEdge ? visual.selectedLineWidth : visual.dataLineWidth}
				opacity={edgeOpacity}
				aria-hidden="true"
			/>
			<line
				class="edge-hit"
				data-edge-id={edge.id}
				x1={start.x}
				y1={start.y}
				x2={end.x}
				y2={end.y}
				role="button"
				tabindex="0"
				aria-label={`${category.label} to ${year.year}, ${exhibitSupplement ? 'prior exhibition mapping, year-level equivalence unverified' : `2024 source-derived edge, present in ${edge.rawDrawRecordIds.length} raw draw records`}`}
				aria-pressed={selectedEdgeId === edge.id}
				onfocus={(event) => previewKeyboard(event, { kind: 'edge', id: edge.id })}
				onblur={() => (keyboardPreview = undefined)}
				onclick={(event) => clickEdge(event, edge.id)}
				onkeydown={(event) => activate(event, { kind: 'edge', id: edge.id })}
			/>
		{/each}
	</g>

	<g class="category-layer">
		{#each activeCategories as category (category.id)}
			{@const point = networkLayout.categoryPoints[category.id]}
			{@const labelLines = layoutPreset === 'A' ? category.labelLines : [networkLayout.preset.categoryLabel.displayLabels?.[category.id] ?? category.label]}
			{@const labelY = point.y + networkLayout.preset.categoryLabel.offsetY - (labelLines.length - 1) * networkLayout.preset.categoryLabel.lineStep}
			<g data-category-id={category.id} role="button" tabindex="0" aria-label={`Focus category ${category.label}`} aria-pressed={selectedCategoryId === category.id}
				onfocus={(event) => previewKeyboard(event, { kind: 'category', id: category.id })}
				onblur={() => (keyboardPreview = undefined)}
				onclick={() => lock({ kind: 'category', id: category.id })}
				onkeydown={(event) => activate(event, { kind: 'category', id: category.id })}>
			<circle class="category-hit" cx={point.x} cy={point.y} r="11" aria-hidden="true" />
			<circle class="category-node" class:diffuse-node={effectMode === 'chapter1' && (category.id === 'mixed-black' || category.id === 'black')} class:crisp-node={effectMode === 'chapter1' && phase2CategoryIds.has(category.id)} class:inspected-node={inspectedCategoryId === category.id || selectedCategoryId === category.id} class:line-endpoint={inspectedEdge?.categoryId === category.id} cx={point.x} cy={point.y} r={layoutPreset === 'A' ? 2.2 : 4} aria-hidden="true" style={`--source-category-color:${category.color}`} />
			<text class="category-label" class:inspected={inspectedCategoryId === category.id} x={point.x} y={labelY} text-anchor="middle" style={`font-size:${networkLayout.preset.categoryLabel.fontSize}px`}>
				{#each labelLines as line, index (index)}
					<tspan x={point.x} dy={index === 0 ? 0 : networkLayout.preset.categoryLabel.lineStep}>{line}</tspan>
				{/each}
			</text>
			</g>
		{/each}
	</g>

	<g class="year-layer">
		{#each activeYears as year (year.id)}
			{@const point = networkLayout.yearPoints[year.id]}
			<path class="year-tick" class:connected-year={inspectedYearIds.has(year.id)} class:context-year={Boolean(inspectedCategoryId) && !inspectedYearIds.has(year.id)} d={`M${point.x} ${point.y - 7} v14`} />
			<circle class:speculative-node={year.role === 'speculative-marker'} class:connected-year={inspectedYearIds.has(year.id)} class:context-year={Boolean(inspectedCategoryId) && !inspectedYearIds.has(year.id)} class="year-node" cx={point.x} cy={point.y} r={layoutPreset === 'A' ? 1.6 : 3.5} />
			<text class="year-label" class:connected-year={inspectedYearIds.has(year.id)} class:context-year={Boolean(inspectedCategoryId) && !inspectedYearIds.has(year.id)} x={point.x} y={point.y + networkLayout.preset.yearLabel.offsetY} text-anchor="middle" style={`font-size:${networkLayout.preset.yearLabel.fontSize}px`}>{year.year}{year.role === 'speculative-marker' ? '*' : ''}</text>
		{/each}
	</g>
</svg>

{#snippet focusPanel()}
{#if panelCategory}
	<section class="category-focus-panel" style={`--focus-category-color:${panelCategory.color}`} aria-label="Network focus">
		{#if selection}<button class="clear-network-focus" onclick={() => { svg.focus(); clear(); }}>Clear focus</button>{/if}
		<div aria-live="polite" aria-atomic="true" data-focus-kind={inspectedEdge ? 'edge' : 'category'}>
		{#if inspectedEdge}
			<span class="focus-panel-kicker">CATEGORY–YEAR RELATIONSHIP</span>
			<h2>{panelCategory.label} · {yearById[inspectedEdge.yearId].year}</h2>
			<p class="focus-panel-caveat">{inspectedEdge.provenance === 'prior physical exhibition mapping' ? 'Prior-exhibition curatorial mapping · Year-level Census equivalence unverified.' : '2024 script-derived connection · Census classification not independently verified.'}</p>
		{:else}
		<span class="focus-panel-kicker">CATEGORY FOCUS · {inspectedCategoryEdges.length} CONNECTIONS</span>
		<h2>{panelCategory.label}</h2>
		<div class="focus-panel-provenance">
			{#if inspectedScriptEdgeCount}<span>{inspectedScriptEdgeCount} · 2024 SCRIPT</span>{/if}
			{#if inspectedExhibitionEdgeCount}<span class="focus-exhibition-count">{inspectedExhibitionEdgeCount} · PRIOR EXHIBITION</span>{/if}
		</div>
		<p class="focus-panel-caveat">{inspectedExhibitionEdgeCount ? 'Prior-exhibition mappings; year-level Census equivalence is unverified.' : '2024 source-derived relationships; historical equivalence is unverified.'}</p>
		<ol class="focus-year-list" aria-label="Connected year labels">
			{#each inspectedConnectedYears as edge (edge.id)}
				{@const exhibitionMapping = edge.provenance === 'prior physical exhibition mapping'}
				<li class:exhibition-year={exhibitionMapping} aria-label={`${yearById[edge.yearId].year}${exhibitionMapping ? ', prior exhibition mapping, year-level equivalence unverified' : ', 2024 source-derived edge'}`}>{yearById[edge.yearId].year}</li>
			{/each}
		</ol>
		{/if}
		</div>
	</section>
{/if}
{/snippet}

{#if !artworkView}
	<div class="network-readout" aria-live="polite">
		<span class="readout-hint">{categories.length} source labels · {years.length - 1} historical years · 1 speculative marker · {sourceScriptEdges.length} 2024-script edges + {edges.length - sourceScriptEdges.length} prior-exhibition mappings</span>
	</div>
{/if}