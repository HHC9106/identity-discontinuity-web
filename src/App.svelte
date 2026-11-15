<script lang="ts">
	import { onMount } from 'svelte';
	import NetworkStage from './components/NetworkStage.svelte';
	import { categories, edges, sampleWarning, years } from './data/developmentSample';
	import { motion, visual } from './config/phase1';

	type Scene = 'network' | 'chapter1' | 'opening';

	let scene: Scene = 'network';
	let selectedEdgeId = '';
	let diffuseGradient = false;
	let reducedMotion = false;
	let sceneMessage = 'Clean Network · synthetic sample';

	$: selectedEdge = edges.find((edge) => edge.id === selectedEdgeId);

	onMount(() => {
		const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
		const updatePreference = () => {
			reducedMotion = preference.matches;
			if (reducedMotion && scene === 'opening') finishOpening();
		};

		updatePreference();
		preference.addEventListener?.('change', updatePreference);
		return () => preference.removeEventListener?.('change', updatePreference);
	});

	function showScene(nextScene: Scene) {
		if (nextScene === 'opening') {
			playOpening();
			return;
		}
		scene = nextScene;
		sceneMessage = nextScene === 'chapter1' ? 'Chapter 1 texture study · synthetic sample' : 'Clean Network · synthetic sample';
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
	<meta name="description" content="Development-only visual study using synthetic, non-historical sample data." />
</svelte:head>

<div class="app-shell" style={`--phase1-background:${visual.background};--phase1-paper:${visual.foreground};--phase1-muted:${visual.muted};--phase1-grid:${visual.grid};--phase1-red:${visual.diffuse};--phase1-blue:${visual.crisp};--phase1-accent:${visual.accent};--phase1-line-width:${visual.dataLineWidth}px;--phase1-selected-line-width:${visual.selectedLineWidth}px;--phase1-halo-width:${visual.diffuseHaloWidth}px;--phase1-blur:${visual.diffuseBlur}px;--reduced-motion-duration:${motion.reducedMotionDurationMs}ms`}>
	<header class="topbar">
		<a class="wordmark" href="#top" aria-label="Identity Discontinuity home">
			<span class="wordmark-mark" aria-hidden="true">ID</span>
			<span>IDENTITY<br />DISCONTINUITY</span>
		</a>
		<div class="edition-note">
			<span class="edition-kicker">INTERACTIVE ARTWORK · 2026</span>
			<span class="edition-title">Classification is a choice.</span>
		</div>
		<div class="review-stamp"><span>LOCAL</span><span>STUDY 01</span></div>
	</header>

	<main id="top">
		<section class="intro-row" aria-labelledby="page-title">
			<div class="chapter-mark"><span>PHASE 01</span><span>VISUAL FOUNDATION</span></div>
			<div class="intro-copy">
				<h1 id="page-title">A network,<br /><em>before it carries history.</em></h1>
				<p>Testing how a classification line can change in texture without changing what it connects.</p>
			</div>
			<p class="sample-warning"><span class="warning-symbol" aria-hidden="true">!</span>{sampleWarning}</p>
		</section>

		<section class="workbench" aria-label="Visual prototype">
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
				<span class="caption-count">{categories.length} SAMPLE LABELS <b>·</b> {years.length} SAMPLE YEARS <b>·</b> {edges.length} SAMPLE EDGES</span>
			</div>

			<div class="network-frame" class:chapter-one={scene === 'chapter1'}>
				<NetworkStage {selectedEdgeId} effectMode={scene === 'chapter1' ? 'chapter1' : 'network'} {diffuseGradient} onSelect={(edgeId) => (selectedEdgeId = edgeId)} />

				{#if scene === 'opening'}
					  <div class="opening-overlay" style={`--opening-duration:${motion.openingDurationMs}ms; --trace-duration:${motion.traceDurationMs}ms; --fragment-stagger:${motion.fragmentStaggerMs}ms`} onanimationend={finishOpening} aria-label="Opening montage feasibility prototype">
						<svg class="opening-traces" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true">
								<path class="trace trace-red" style={`--trace-delay:${Math.round(motion.fragmentStaggerMs * 0.65)}ms`} d="M0 428 C210 410 280 90 560 186 S870 460 1200 96" />
								<path class="trace trace-blue" style={`--trace-delay:${Math.round(motion.fragmentStaggerMs * 1.65)}ms`} d="M0 112 C260 220 315 518 650 356 S930 104 1200 472" />
								<path class="trace trace-white" style={`--trace-delay:${Math.round(motion.fragmentStaggerMs * 2.6)}ms`} d="M120 600 C410 435 500 55 810 168 S1040 360 1200 270" />
						</svg>
							<div class="montage-note note-one" style={`--fragment-delay:${motion.fragmentStaggerMs}ms`}><span>FORM / 01</span><i></i><i></i><i></i><small>PLACEHOLDER</small></div>
							<div class="montage-note note-two" style={`--fragment-delay:${motion.fragmentStaggerMs * 2}ms`}><span>FIELD NOTE / 02</span><b>NAME<br />THE FRAME</b><small>TEXT-ONLY STUDY</small></div>
							<div class="montage-note note-three" style={`--fragment-delay:${motion.fragmentStaggerMs * 3}ms`}><span>MAP / 03</span><div class="map-lines"><i></i><i></i><i></i><i></i></div><small>ABSTRACT SHAPE</small></div>
							<div class="montage-center" style={`--center-delay:${motion.centerDelayMs}ms`}><span>OPENING FEASIBILITY</span><b>Many traces.<br />One frame.</b></div>
						<span class="opening-disclaimer">SYNTHETIC LAYERS · NO ARCHIVAL IMAGES</span>
					</div>
				{/if}
			</div>

			<div class="stage-footer">
				<label class="mobile-edge-picker">
					<span>FOCUS A SAMPLE EDGE</span>
					<select bind:value={selectedEdgeId} aria-label="Select a synthetic category-to-year edge">
							<option value="">Choose a sample edge</option>
						{#each edges as edge (edge.id)}
							{@const category = categories.find((item) => item.id === edge.categoryId)}
							{@const year = years.find((item) => item.id === edge.yearId)}
							<option value={edge.id}>{category?.label} → {year?.label}</option>
						{/each}
					</select>
				</label>
				<div class="legend" aria-label="Line texture legend">
					<span><i class="legend-line legend-diffuse"></i> Diffuse sample</span>
					<span><i class="legend-line legend-crisp"></i> Crisp sample</span>
				</div>
				{#if scene === 'chapter1'}
					<button class="gradient-toggle" aria-pressed={diffuseGradient} onclick={() => (diffuseGradient = !diffuseGradient)}>
						<span aria-hidden="true">◒</span> {diffuseGradient ? 'Gradient wash on' : 'Try gradient wash'}
					</button>
				{/if}
				<p class="identity-note">LINE GEOMETRY STAYS FIXED <b>·</b> TEXTURE CHANGES</p>
			</div>
			{#if scene === 'chapter1' && diffuseGradient}
				<p class="gradient-note">ABSTRACT COLOR CONTINUUM ONLY · NOT A SKIN-TONE OR IDENTITY SCALE</p>
			{/if}

			<div class="study-note" aria-live="polite">
				<span class="study-index">EDGE FOCUS</span>
				{#if selectedEdge}
					<p><b>{categories.find((category) => category.id === selectedEdge.categoryId)?.label}</b> connects to <b>{years.find((year) => year.id === selectedEdge.yearId)?.label}</b>.</p>
					<span class="study-id">{selectedEdge.id}</span>
				{:else}
					<p class="empty-study-hint">Select or focus a sample line to inspect its stable ID.</p>
					<span class="study-id">NO EDGE SELECTED</span>
				{/if}
			</div>
		</section>

		<section class="argument-row" aria-label="Study notes">
			<div><span class="section-label">THE QUESTION</span><p>A straight line records a relationship. Its texture can expose how that relationship is interpreted.</p></div>
			<div><span class="section-label">CHAPTER 01 STUDY</span><p>Diffusion and precision are visual contrasts only. These synthetic edges make no statement about a real Census year or group.</p></div>
			<div><span class="section-label">OPENING TEST</span><p>Archive-like forms and colored traces arrive together, overlap briefly, then recede to the explorable network.</p></div>
		</section>

		<footer class="page-footer">
			<span>IDENTITY DISCONTINUITY</span>
			<span>VISUAL FOUNDATION · DEVELOPMENT ONLY</span>
			<span>HISTORICAL DATA NOT VERIFIED</span>
		</footer>
	</main>
</div>
