<script lang="ts">
	import { onMount } from 'svelte';
	import NetworkStage from './components/NetworkStage.svelte';
	import { categories, displayEdges as edges, edges as sourceScriptEdges, exhibitionSupplementEdges, extractionSummary, knownAnomalies, rawDrawRecords, years } from './data/sourceDerived2024';
	import { motion, visual } from './config/phase1';
	import { layoutPresets, type LayoutPresetId } from './layout';

	type Scene = 'network' | 'chapter1' | 'opening';
	type ViewMode = 'artwork' | 'review';

	let viewMode: ViewMode = 'artwork';
	let scene: Scene = 'network';
	let layoutPreset: LayoutPresetId = 'B';
	let layoutManuallySelected = false;
	let isNarrowLayout = false;
	let mobileView: 'index' | 'network' = 'network';
	let edgeSearch = '';
	let selectedEdgeId = '';
	let diffuseGradient = false;
	let reducedMotion = false;
	let sceneMessage = 'Full source-derived network · historically unverified';

	$: selectedEdge = edges.find((edge) => edge.id === selectedEdgeId);
	$: activeLayout = layoutPresets[layoutPreset];
	$: filteredEdges = edges.filter((edge) => {
		const category = categories.find(({ id }) => id === edge.categoryId);
		const year = years.find(({ id }) => id === edge.yearId);
		const query = edgeSearch.trim().toLocaleLowerCase();
		return !query || `${category?.label} ${year?.year} ${edge.id}`.toLocaleLowerCase().includes(query);
	});

	onMount(() => {
		const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
		const narrowLayout = window.matchMedia('(max-width: 800px)');
		const updatePreference = () => {
			reducedMotion = preference.matches;
			if (reducedMotion && scene === 'opening') finishOpening();
		};
		const updateLayout = () => {
			isNarrowLayout = narrowLayout.matches;
			if (!layoutManuallySelected) layoutPreset = 'B';
			if (isNarrowLayout && viewMode === 'artwork') viewMode = 'review';
		};

		updatePreference();
		updateLayout();
		preference.addEventListener?.('change', updatePreference);
		narrowLayout.addEventListener?.('change', updateLayout);
		return () => {
			preference.removeEventListener?.('change', updatePreference);
			narrowLayout.removeEventListener?.('change', updateLayout);
		};
	});

	function chooseLayout(preset: LayoutPresetId) {
		layoutManuallySelected = true;
		layoutPreset = preset;
	}

	function phasesForEdge(edgeId: string): string {
		const edge = edges.find(({ id }) => id === edgeId);
		if (!edge || !('rawDrawRecordIds' in edge)) return 'prior exhibition mapping';
		const rawIds = new Set(edge.rawDrawRecordIds);
		return [...new Set(rawDrawRecords.filter(({ id }) => rawIds.has(id)).map(({ phase }) => phase))]
			.sort((a, b) => a - b)
			.join(', ');
	}

	function showScene(nextScene: Scene) {
		if (nextScene === 'opening') {
			playOpening();
			return;
		}
		scene = nextScene;
		sceneMessage = nextScene === 'chapter1' ? 'Chapter 1 contrast over full network · historically unverified' : 'Full source-derived network · historically unverified';
	}

	function playOpening() {
		if (reducedMotion) {
			scene = 'network';
			sceneMessage = 'Opening skipped · reduced motion preference';
			return;
		}
		scene = 'opening';
		sceneMessage = 'Opening feasibility study running';
	}

	function finishOpening(event?: AnimationEvent) {
		if (event && event.target !== event.currentTarget) return;
		scene = 'network';
		sceneMessage = 'Clean Network · Opening study complete';
	}
</script>

<svelte:head>
	<title>Identity Discontinuity · Visual Foundation Study</title>
		<meta name="description" content="Source-derived reconstruction of the 2024 Identity Discontinuity network; historical relationships are not independently verified." />
</svelte:head>

	<div class="app-shell" class:artwork-mode={viewMode === 'artwork'} style={`--phase1-background:${visual.background};--phase1-paper:${visual.foreground};--phase1-muted:${visual.muted};--phase1-grid:${visual.grid};--phase1-red:${visual.diffuse};--phase1-blue:${visual.crisp};--phase1-accent:${visual.accent};--phase1-line-width:${visual.dataLineWidth}px;--phase1-selected-line-width:${visual.selectedLineWidth}px;--phase1-halo-width:${visual.diffuseHaloWidth}px;--phase1-blur:${visual.diffuseBlur}px;--network-mobile-width:${activeLayout.mobileCanvasWidth}px;--edge-hit-width:${activeLayout.edgeHitWidth}px;--edge-hit-width-mobile:${activeLayout.mobileEdgeHitWidth}px;--archive-overlay-inset-top:${activeLayout.reserved.archiveOverlayInset.top * 100}%;--archive-overlay-inset-right:${activeLayout.reserved.archiveOverlayInset.right * 100}%;--archive-overlay-inset-bottom:${activeLayout.reserved.archiveOverlayInset.bottom * 100}%;--archive-overlay-inset-left:${activeLayout.reserved.archiveOverlayInset.left * 100}%;--reduced-motion-duration:${motion.reducedMotionDurationMs}ms`}>
	{#if viewMode === 'review'}
	<header class="topbar">
		<a class="wordmark" href="#top" aria-label="Identity Discontinuity home">
			<span class="wordmark-mark" aria-hidden="true">ID</span>
			<span>IDENTITY<br />DISCONTINUITY</span>
		</a>
		<div class="edition-note">
			<span class="edition-kicker">INTERACTIVE ARTWORK · 2026</span>
			<span class="edition-title">Classification is a choice.</span>
		</div>
		<div class="review-stamp"><span>LOCAL</span><span>STUDY 01</span><button class="artwork-view-button" onclick={() => (viewMode = 'artwork')}>Open Artwork View</button></div>
	</header>

	<main id="top">
		<section class="intro-row" aria-labelledby="page-title">
			<div class="chapter-mark"><span>PHASE 01</span><span>VISUAL FOUNDATION</span></div>
			<div class="intro-copy">
				<h1 id="page-title">A network,<br /><em>before it carries history.</em></h1>
				<p>Reconstructing the original Category–Year network before evaluating how its composition carries history.</p>
			</div>
			<p class="sample-warning"><span class="warning-symbol" aria-hidden="true">!</span>2024 SOURCE + EXHIBITION MAPPINGS · HISTORICAL EQUIVALENCE UNVERIFIED</p>
		</section>

		<section class="workbench" aria-label="Visual prototype">
			<div class="layout-review-bar">
				<span class="layout-review-label">PROVISIONAL LAYOUT</span>
				<div class="layout-presets" role="group" aria-label="Compare layout presets">
					<button class:active={layoutPreset === 'A'} aria-pressed={layoutPreset === 'A'} onclick={() => chooseLayout('A')}>A · Original reference</button>
					<button class:active={layoutPreset === 'B'} aria-pressed={layoutPreset === 'B'} onclick={() => chooseLayout('B')}>B · Web-native study</button>
				</div>
				<span class="layout-review-count">{sourceScriptEdges.length} SCRIPT + {exhibitionSupplementEdges.length} EXHIBIT · PROVISIONAL</span>
			</div>
			<div class="workbench-head">
				<div class="scene-tabs" role="group" aria-label="Choose visual study">
					<button class:active={scene === 'network'} aria-pressed={scene === 'network'} onclick={() => showScene('network')}>
						<span class="tab-index">00</span> Clean network
					</button>
					<button class:active={scene === 'chapter1'} aria-pressed={scene === 'chapter1'} onclick={() => showScene('chapter1')}>
						<span class="tab-index">01</span> Color / origin
					</button>
				</div>
				<button class="opening-button" onclick={playOpening} disabled={scene === 'opening'}>
					<span aria-hidden="true">↗</span> Run Opening study
				</button>
			</div>

			<div class="scene-caption">
				<span class="caption-state"><i class:state-live={scene === 'opening'}></i>{sceneMessage}</span>
				<span class="caption-count">{extractionSummary.categoryCount} LABELS <b>·</b> {extractionSummary.historicalYearCount} HISTORICAL YEARS <b>·</b> {sourceScriptEdges.length} SCRIPT EDGES + {exhibitionSupplementEdges.length} EXHIBIT LINES</span>
			</div>

			{#if isNarrowLayout}
				<div class="mobile-explorer-tabs" role="group" aria-label="Mobile network exploration mode">
					<button class:active={mobileView === 'network'} aria-pressed={mobileView === 'network'} onclick={() => (mobileView = 'network')}>Network view</button>
					<button class:active={mobileView === 'index'} aria-pressed={mobileView === 'index'} onclick={() => (mobileView = 'index')}>Edge index <span>{edges.length}</span></button>
				</div>
				{#if mobileView === 'index'}
					<section class="mobile-edge-index" aria-label="Complete source-derived category-year edge index">
						<label class="edge-index-search">
							<span>SEARCH CATEGORY OR YEAR</span>
							<input bind:value={edgeSearch} type="search" placeholder="e.g. Chinese, Mixed Black, 1930" />
						</label>
						<p class="edge-index-status">Showing {filteredEdges.length} of {edges.length} displayed connections: {sourceScriptEdges.length} from the 2024 script and {exhibitionSupplementEdges.length} from the prior exhibition.</p>
						<div class="edge-index-list">
							{#each filteredEdges as edge (edge.id)}
								{@const category = categories.find(({ id }) => id === edge.categoryId)}
								{@const year = years.find(({ id }) => id === edge.yearId)}
								<button class="edge-index-row" class:chosen={selectedEdgeId === edge.id} aria-pressed={selectedEdgeId === edge.id} onclick={() => (selectedEdgeId = edge.id)}>
									<span class="edge-index-swatch" style={`--edge-index-color:${category?.color}`}></span>
									<span class="edge-index-name">{category?.label}</span>
									<span class="edge-index-year">{year?.year}</span>
									<span class="edge-index-meta">{'rawDrawRecordIds' in edge ? `${edge.rawDrawRecordIds.length} script draw records · phase ${phasesForEdge(edge.id)}` : `prior exhibition line · ${phasesForEdge(edge.id)} · year mapping unverified`}</span>
								</button>
							{/each}
							{#if filteredEdges.length === 0}<p class="edge-index-empty">No matching source-derived edges.</p>{/if}
						</div>
						{#if selectedEdge}
							<div class="edge-index-selection">
								<p><b>{categories.find(({ id }) => id === selectedEdge.categoryId)?.label}</b> · {years.find(({ id }) => id === selectedEdge.yearId)?.year}</p>
								<button onclick={() => (mobileView = 'network')}>View selected edge in network</button>
							</div>
						{/if}
					</section>
				{/if}
			{/if}

			{#if !isNarrowLayout || mobileView === 'network'}
			<div class="network-frame" class:chapter-one={scene === 'chapter1'}>
				<NetworkStage {selectedEdgeId} {layoutPreset} effectMode={scene === 'chapter1' ? 'chapter1' : 'network'} {diffuseGradient} onSelect={(edgeId) => (selectedEdgeId = edgeId)} />

				{#if scene === 'opening'}
					  <div class="opening-overlay" style={`--opening-duration:${motion.openingDurationMs}ms; --trace-duration:${motion.traceDurationMs}ms; --fragment-stagger:${motion.fragmentStaggerMs}ms`} onanimationend={finishOpening} aria-label="Opening montage feasibility prototype">
						<svg class="opening-traces" viewBox={`0 0 ${activeLayout.stage.width} ${activeLayout.stage.height}`} preserveAspectRatio="none" aria-hidden="true">
								<path class="trace trace-red" style={`--trace-delay:${Math.round(motion.fragmentStaggerMs * 0.65)}ms`} d="M0 428 C210 410 280 90 560 186 S870 460 1200 96" />
								<path class="trace trace-blue" style={`--trace-delay:${Math.round(motion.fragmentStaggerMs * 1.65)}ms`} d="M0 112 C260 220 315 518 650 356 S930 104 1200 472" />
								<path class="trace trace-white" style={`--trace-delay:${Math.round(motion.fragmentStaggerMs * 2.6)}ms`} d="M120 600 C410 435 500 55 810 168 S1040 360 1200 270" />
						</svg>
							<div class="montage-note note-one" style={`--fragment-delay:${motion.fragmentStaggerMs}ms`}><span>FORM / 01</span><i></i><i></i><i></i><small>PLACEHOLDER</small></div>
							<div class="montage-note note-two" style={`--fragment-delay:${motion.fragmentStaggerMs * 2}ms`}><span>FIELD NOTE / 02</span><b>NAME<br />THE FRAME</b><small>TEXT-ONLY STUDY</small></div>
							<div class="montage-note note-three" style={`--fragment-delay:${motion.fragmentStaggerMs * 3}ms`}><span>MAP / 03</span><div class="map-lines"><i></i><i></i><i></i><i></i></div><small>ABSTRACT SHAPE</small></div>
							<div class="montage-center" style={`--center-delay:${motion.centerDelayMs}ms`}><span>OPENING FEASIBILITY</span><b>Many traces.<br />One frame.</b></div>
						<span class="opening-disclaimer">SOURCE-DERIVED NETWORK · ABSTRACT ARCHIVE PLACEHOLDERS ONLY</span>
					</div>
				{/if}
			</div>
			{#if isNarrowLayout}<p class="orientation-note">ONE-ROW NETWORK · SWIPE LEFT/RIGHT TO EXPLORE ALL LABELS</p>{/if}

			<div class="stage-footer">
				<label class="mobile-edge-picker">
					<span>FOCUS A SOURCE EDGE</span>
					<select bind:value={selectedEdgeId} aria-label="Select a source-derived category-to-year edge">
							<option value="">Choose a category-to-year edge</option>
						{#each edges as edge (edge.id)}
							{@const category = categories.find((item) => item.id === edge.categoryId)}
							{@const year = years.find((item) => item.id === edge.yearId)}
							<option value={edge.id}>{category?.label} → {year?.year}</option>
						{/each}
					</select>
				</label>
				<div class="legend" aria-label="Chapter 1 line texture key">
					<span><i class="legend-line legend-diffuse"></i> Mixed Black · diffuse study</span>
					<span><i class="legend-line legend-crisp"></i> Asian labels · crisp study</span>
				</div>
				{#if scene === 'chapter1'}
					<button class="gradient-toggle" aria-pressed={diffuseGradient} onclick={() => (diffuseGradient = !diffuseGradient)}>
						<span aria-hidden="true">◒</span> {diffuseGradient ? 'Gradient wash on' : 'Try gradient wash'}
					</button>
				{/if}
				<p class="identity-note">ENDPOINTS STAY FIXED <b>·</b> 48 WHITE/BLACK LINES FROM PRIOR EXHIBITION</p>
			</div>
			{#if scene === 'chapter1' && diffuseGradient}
				<p class="gradient-note">ABSTRACT COLOR CONTINUUM ONLY · NOT A SKIN-TONE OR IDENTITY SCALE</p>
			{/if}

			{/if}
		</section>

		<details class="source-anomalies">
			<summary>EXTRACTION CAVEATS · {knownAnomalies.length}</summary>
			<ul>
				{#each knownAnomalies as anomaly (anomaly)}
					<li>{anomaly}</li>
				{/each}
			</ul>
		</details>

		<section class="argument-row" aria-label="Study notes">
			<div><span class="section-label">SOURCE STATUS</span><p>161 connections are extracted from the 2024 script. Another 48 White/Black lines reconstruct the prior physical exhibition across the 24 historical year labels. Historical equivalence is not independently verified.</p></div>
			<div><span class="section-label">CHAPTER 1 STUDY</span><p>The complete graph remains visible. Original Phase 2 Mixed Black edges and prior-exhibition Black mappings diffuse in red; Asian-origin source edges sharpen in blue, while other connections recede as context.</p></div>
			<div><span class="section-label">OPENING TEST</span><p>Abstract archival forms and traces overlap the full source-derived network, then recede to reveal it.</p></div>
		</section>

		<footer class="page-footer">
			<span>IDENTITY DISCONTINUITY</span>
			<span>VISUAL FOUNDATION · DEVELOPMENT ONLY</span>
			<span>HISTORICAL DATA NOT VERIFIED</span>
		</footer>
	</main>
	{:else}
		<main class="artwork-viewport" aria-label="Artwork View · full Category-Year network">
			<div class="artwork-network-frame" class:chapter-one={scene === 'chapter1'}>
				<NetworkStage {selectedEdgeId} {layoutPreset} effectMode="network" artworkView={true} {diffuseGradient} onSelect={(edgeId) => (selectedEdgeId = edgeId)} />
			</div>
			<button class="artwork-review-button" onclick={() => (viewMode = 'review')}>Review / Debug</button>
		</main>
	{/if}
</div>
