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
	let hoveredEdgeId = '';
	let focusedEdgeId = '';
	let selectedCategoryId = '';
	let networkLayout = createNetworkLayout(categories.map(({ id }) => id), years, layoutPreset);
	$: networkLayout = createNetworkLayout(categories.map(({ id }) => id), years, layoutPreset);
	$: activeEdges = edges;
	$: activeCategories = categories;
	$: activeYears = years;
	$: selectedEdge = edges.find((edge) => edge.id === selectedEdgeId);
	$: inspectedCategoryId = hoveredCategoryId || selectedCategoryId;
	$: inspectedCategory = categories.find(({ id }) => id === inspectedCategoryId);
	$: selectedDraws = selectedEdge && 'rawDrawRecordIds' in selectedEdge
		? selectedEdge.rawDrawRecordIds.map((id) => rawDrawById[id]).filter(Boolean)
		: [];
	$: selectedPhases = [...new Set(selectedDraws.map(({ phase }) => phase))].sort((a, b) => a - b).join(', ');

	let hoveredCategoryId = '';

	function reportActiveEdge() {
		onSelect(focusedEdgeId || hoveredEdgeId);
	}

	function handlePointerEnter(edgeId: string) {
		hoveredEdgeId = edgeId;
		reportActiveEdge();
	}

	function handlePointerLeave(event: PointerEvent, edgeId: string) {
		if (hoveredEdgeId !== edgeId) return;
		hoveredEdgeId = '';
		const target = event.currentTarget;
		const focusVisible = target instanceof SVGElement && target.matches(':focus-visible');
		if (focusedEdgeId === edgeId && !focusVisible) focusedEdgeId = '';
		reportActiveEdge();
	}

	function handleFocus(edgeId: string) {
		focusedEdgeId = edgeId;
		reportActiveEdge();
	}

	function handleBlur(edgeId: string) {
		if (focusedEdgeId !== edgeId) return;
		focusedEdgeId = '';
		reportActiveEdge();
	}

	function activateEdge(event: KeyboardEvent, edgeId: string) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onSelect(edgeId);
		}
	}

	function inspectCategory(categoryId: string) {
		hoveredCategoryId = categoryId;
	}

	function clearCategoryInspection(categoryId: string) {
		if (hoveredCategoryId === categoryId) hoveredCategoryId = '';
	}

	function toggleCategorySelection(categoryId: string) {
		selectedCategoryId = selectedCategoryId === categoryId ? '' : categoryId;
	}

	function activateCategory(event: KeyboardEvent, categoryId: string) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggleCategorySelection(categoryId);
		}
	}

</script>

<svg
	class="network-svg"
	class:reference-preset={layoutPreset === 'A'}
	class:web-preset={layoutPreset === 'B'}
	viewBox={`0 0 ${networkLayout.stage.width} ${networkLayout.stage.height}`}
	role="group"
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
	{#if inspectedCategory}
		<text class="category-inspector" x={networkLayout.stage.width / 2} y="38" text-anchor="middle" fill={inspectedCategory.color}>{inspectedCategory.label} · {edges.filter(({ categoryId }) => categoryId === inspectedCategory.id).length} CONNECTIONS</text>
	{/if}

	<g class="edge-layer">
		{#each activeEdges as edge (edge.id)}
			{@const category = categoryById[edge.categoryId]}
			{@const year = yearById[edge.yearId]}
			{@const start = networkLayout.categoryPoints[edge.categoryId]}
			{@const end = networkLayout.yearPoints[edge.yearId]}
			{@const categoryFocusEdge = inspectedCategoryId === edge.categoryId}
			{@const exhibitSupplement = edge.provenance === 'prior physical exhibition mapping'}
			{@const chapter1SourceEdge = effectMode === 'chapter1' && phase2EdgeIds.has(edge.id)}
			{@const chapter1ExhibitionBlack = effectMode === 'chapter1' && exhibitSupplement && edge.categoryId === 'black'}
			{@const chapter1FocusEdge = chapter1SourceEdge || chapter1ExhibitionBlack}
			{@const diffuse = effectMode === 'chapter1' && (chapter1SourceEdge && edge.categoryId === 'mixed-black' || chapter1ExhibitionBlack)}
			{@const crisp = chapter1SourceEdge && edge.categoryId !== 'mixed-black'}
			{@const color = diffuse ? (diffuseGradient ? `url(#diffuse-gradient-${edge.id})` : visual.diffuse) : crisp ? visual.crisp : category.color}
			{@const edgeOpacity = effectMode === 'chapter1'
				? categoryFocusEdge
					? 1
					: chapter1FocusEdge
						? (diffuse ? visual.diffuseOpacity : visual.crispOpacity)
						: visual.chapter1ContextOpacity
				: inspectedCategoryId
					? (categoryFocusEdge ? 1 : visual.chapter1ContextOpacity)
					: visual.neutralOpacity}
			{#if diffuse}
				<line class="edge-halo" x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={color} stroke-width={visual.diffuseHaloWidth} filter="url(#diffuse-halo)" opacity="0.62" aria-hidden="true" />
			{/if}
			<line
				class="data-edge"
				class:selected={selectedEdgeId === edge.id}
				class:diffuse-edge={diffuse}
				class:crisp-edge={crisp}
				class:category-focus-edge={categoryFocusEdge}
				class:exhibition-edge={exhibitSupplement}
				x1={start.x}
				y1={start.y}
				x2={end.x}
				y2={end.y}
				stroke={color}
				stroke-width={selectedEdgeId === edge.id || categoryFocusEdge ? visual.selectedLineWidth : visual.dataLineWidth}
				opacity={edgeOpacity}
				aria-hidden="true"
			/>
			<line
				class="edge-hit"
				x1={start.x}
				y1={start.y}
				x2={end.x}
				y2={end.y}
				role="button"
				tabindex="0"
				aria-label={`${category.label} to ${year.year}, ${exhibitSupplement ? 'prior exhibition mapping, year-level equivalence unverified' : `2024 source-derived edge, present in ${edge.rawDrawRecordIds.length} raw draw records`}`}
				aria-pressed={selectedEdgeId === edge.id}
				onpointerenter={() => handlePointerEnter(edge.id)}
				onpointerleave={(event) => handlePointerLeave(event, edge.id)}
				onfocus={() => handleFocus(edge.id)}
				onblur={() => handleBlur(edge.id)}
				onclick={() => onSelect(edge.id)}
				onkeydown={(event) => activateEdge(event, edge.id)}
			/>
		{/each}
	</g>

	<g class="category-layer">
		{#each activeCategories as category (category.id)}
			{@const point = networkLayout.categoryPoints[category.id]}
			{@const labelLines = layoutPreset === 'A' ? category.labelLines : [networkLayout.preset.categoryLabel.displayLabels?.[category.id] ?? category.label]}
			{@const labelY = point.y + networkLayout.preset.categoryLabel.offsetY - (labelLines.length - 1) * networkLayout.preset.categoryLabel.lineStep}
			<circle class="category-node" class:diffuse-node={effectMode === 'chapter1' && (category.id === 'mixed-black' || category.id === 'black')} class:crisp-node={effectMode === 'chapter1' && phase2CategoryIds.has(category.id)} class:inspected-node={inspectedCategoryId === category.id} cx={point.x} cy={point.y} r={layoutPreset === 'A' ? 2.2 : 4} role="img" aria-label={category.label} style={`--source-category-color:${category.color}`} onpointerenter={() => inspectCategory(category.id)} onpointerleave={() => clearCategoryInspection(category.id)} />
			<text class="category-label" class:inspected={inspectedCategoryId === category.id} x={point.x} y={labelY} text-anchor="middle" role="button" tabindex="0" aria-label={`Focus category ${category.label} and its source-derived edges`} aria-pressed={selectedCategoryId === category.id} style={`font-size:${networkLayout.preset.categoryLabel.fontSize}px`} onpointerenter={() => inspectCategory(category.id)} onpointerleave={() => clearCategoryInspection(category.id)} onfocus={() => inspectCategory(category.id)} onblur={() => clearCategoryInspection(category.id)} onclick={() => toggleCategorySelection(category.id)} onkeydown={(event) => activateCategory(event, category.id)}>
				<title>{category.label}</title>
				{#each labelLines as line, index (index)}
					<tspan x={point.x} dy={index === 0 ? 0 : networkLayout.preset.categoryLabel.lineStep}>{line}</tspan>
				{/each}
			</text>
		{/each}
	</g>

	<g class="year-layer">
		{#each activeYears as year (year.id)}
			{@const point = networkLayout.yearPoints[year.id]}
			<path class="year-tick" d={`M${point.x} ${point.y - 7} v14`} />
			<circle class:speculative-node={year.role === 'speculative-marker'} class="year-node" cx={point.x} cy={point.y} r={layoutPreset === 'A' ? 1.6 : 3.5} />
			<text class="year-label" x={point.x} y={point.y + networkLayout.preset.yearLabel.offsetY} text-anchor="middle" style={`font-size:${networkLayout.preset.yearLabel.fontSize}px`}>{year.year}{year.role === 'speculative-marker' ? '*' : ''}</text>
		{/each}
	</g>
</svg>

<div class="network-readout" aria-live="polite">
	{#if selectedEdge}
		<span class="readout-dot" style={`--readout-color:${categoryById[selectedEdge.categoryId].color}`}></span>
		<span>{categoryById[selectedEdge.categoryId].label}</span>
		<span class="readout-connector">to</span>
		<span>{yearById[selectedEdge.yearId].year}</span>
		<span class="readout-type">{artworkView ? ('provenance' in selectedEdge && selectedEdge.provenance === 'prior physical exhibition mapping' ? 'PRIOR EXHIBITION MAPPING · HISTORICAL EQUIVALENCE UNVERIFIED' : 'SOURCE-DERIVED · HISTORICALLY UNVERIFIED') : ('provenance' in selectedEdge && selectedEdge.provenance === 'prior physical exhibition mapping' ? 'PRIOR EXHIBITION MAPPING · YEAR EQUIVALENCE UNVERIFIED' : `2024 SOURCE EDGE · ${selectedEdge.id} · PHASES ${selectedPhases} · ${selectedDraws.length} RAW DRAW RECORDS`)}</span>
	{:else if inspectedCategory}
		<span class="readout-dot" style={`--readout-color:${inspectedCategory.color}`}></span>
		<span class="readout-category-kicker">CATEGORY</span>
		<strong class="readout-full-category">{inspectedCategory.label}</strong>
		<span class="readout-type">{edges.filter(({ categoryId }) => categoryId === inspectedCategory.id).length} {artworkView ? 'CONNECTIONS' : 'DISPLAYED CONNECTIONS · MIXED PROVENANCE'}</span>
	{:else}
		<span class="readout-hint">{artworkView ? 'Select an edge or category to focus the network' : `${categories.length} source labels · ${years.length - 1} historical years · 1 speculative marker · ${sourceScriptEdges.length} 2024-script edges + ${edges.length - sourceScriptEdges.length} prior-exhibition mappings`}</span>
	{/if}
</div>