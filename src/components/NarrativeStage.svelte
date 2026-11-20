<script lang="ts">
	import { tick, type Snippet } from 'svelte';
	import NetworkStage from './NetworkStage.svelte';
	import { narrativeMotion, nextChapter, type Chapter } from '../config/narrative';
	import type { LayoutPresetId } from '../layout';

	export let layoutPreset: LayoutPresetId;
	export let reducedMotion: boolean;
	export let opening: Snippet<[() => void]>;

	type Phase = 'overview' | 'enter' | 'explore' | 'continue';
	let chapter: Chapter = 'opening';
	let phase: Phase = 'overview';
	let selectedEdgeId = '';
	let overviewButton: HTMLButtonElement;
	let continueButton: HTMLButtonElement;
	let destination: HTMLElement;
	let keyboardNavigation = false;
	$: displayChapter = phase === 'continue' ? nextChapter(chapter) : chapter;
	$: interactive = phase === 'overview' || (chapter === 'chapter1' && phase === 'explore');
	$: if (reducedMotion) settleWithoutMotion(chapter, phase);

	function settleWithoutMotion(current: Chapter, state: Phase) {
		if (state === 'continue') finishContinue();
		if (state === 'enter' && current === 'opening') finishOpening();
		if (state === 'enter' || state === 'continue') finishEnter();
	}

	function begin(event: MouseEvent) {
		keyboardNavigation = event.detail === 0;
		selectedEdgeId = '';
		chapter = 'opening';
		phase = 'enter';
	}

	function finishOpening() {
		if (chapter === 'opening' && phase === 'enter') chapter = 'chapter1';
	}

	async function finishEnter() {
		if (phase !== 'enter') return;
		phase = 'explore';
		await tick();
		if (keyboardNavigation) {
			if (chapter === 'chapter1') continueButton?.focus();
			else destination?.focus();
		}
	}

	function advance(event: MouseEvent) {
		if (phase !== 'explore' || chapter !== 'chapter1') return;
		keyboardNavigation = event.detail === 0;
		selectedEdgeId = '';
		phase = 'continue';
	}

	function finishContinue() {
		if (phase !== 'continue') return;
		chapter = nextChapter(chapter) ?? chapter;
		phase = 'enter';
	}

	async function returnToOverview() {
		chapter = 'opening';
		phase = 'overview';
		await tick();
		overviewButton?.focus();
	}
</script>

<div class="narrative-stage" data-chapter={chapter} data-narrative-phase={phase}
	style={`--chapter-enter:${narrativeMotion.enter}ms;--chapter-memory:${narrativeMotion.memory}ms;--chapter-placeholder:${narrativeMotion.placeholder}ms;--red-start:${narrativeMotion.redStart}ms;--blue-start:${narrativeMotion.blueStart}ms;--line-growth:${narrativeMotion.lineGrowth}ms`}>
	<div class="narrative-network" inert={!interactive}>
		<NetworkStage {layoutPreset} artworkView={true} {selectedEdgeId} onSelect={(id) => (selectedEdgeId = id)}
			chapter={phase === 'overview' || displayChapter === 'opening' ? undefined : displayChapter}
			chapterEntering={chapter === 'chapter1' && phase === 'enter'} interactionEnabled={interactive} />
	</div>

	{#if phase === 'overview'}
		<button class="narrative-action" bind:this={overviewButton} onclick={begin}>Begin</button>
	{:else if chapter === 'opening'}
		{@render opening(finishOpening)}
	{:else if phase === 'continue'}
		<div class="memory-pause" aria-hidden="true" onanimationend={finishContinue}></div>
	{:else if chapter === 'chapter1'}
		{#if phase === 'enter'}
			<div class="narrative-caption chapter-enter" onanimationend={(event) => { if (event.target === event.currentTarget) finishEnter(); }}>
				<p>01</p>
				<h1>Nationality vs Color</h1>
				<p>Classification did not follow one rule.</p>
			</div>
		{:else}
			<button class="narrative-action" bind:this={continueButton} onclick={advance}>Continue <span aria-hidden="true">→</span></button>
		{/if}
	{:else if chapter === 'chapter2'}
		<div class="narrative-caption" class:placeholder-enter={phase === 'enter'} tabindex="-1" bind:this={destination}
			onanimationend={(event) => { if (event.target === event.currentTarget) finishEnter(); }}>
			<p>02 · NEXT CHAPTER STUDY</p>
			<h2>Origin vs Descent</h2>
			{#if phase === 'explore'}<button class="return-action" onclick={returnToOverview}>Return to overview</button>{/if}
		</div>
	{/if}
</div>

<style>
	.narrative-stage, .narrative-network { position: absolute; inset: 0; }
	.narrative-network[inert] { pointer-events: none; }
	.narrative-caption { position: absolute; z-index: 4; left: 8%; top: 5%; max-width: 80%; color: var(--paper); }
	.narrative-caption h1, .narrative-caption h2 { margin: 4px 0; font: 400 clamp(18px, 3rem, 48px)/1.08 Georgia, serif; }
	.narrative-caption p { margin: 0; color: var(--muted); font: 12px/1.35 "SFMono-Regular", Consolas, monospace; }
	.chapter-enter { pointer-events: none; animation: chapter-title var(--chapter-enter) ease both; }
	.placeholder-enter { animation: placeholder-title var(--chapter-placeholder) ease both; }
	.memory-pause { animation: hold-memory var(--chapter-memory) linear; }
	.narrative-action, .return-action { border: 0; border-bottom: 1px solid currentColor; padding: 5px 0; color: var(--paper); background: transparent; cursor: pointer; }
	.narrative-action { position: absolute; z-index: 4; right: 4%; bottom: 3%; }
	.return-action { margin-top: 12px; font-size: 12px; }
	@keyframes chapter-title { 0% { opacity: 0; } 15%, 66% { opacity: 1; } 100% { opacity: 0; } }
	@keyframes placeholder-title { from { opacity: 0; } to { opacity: 1; } }
	@keyframes hold-memory { from { opacity: 0; } to { opacity: 1; } }
	@media (max-width: 800px) { .narrative-caption h1, .narrative-caption h2 { font-size: 18px; } .narrative-caption p { font-size: 9px; } .narrative-action { font-size: 12px; } }
	@media (prefers-reduced-motion: reduce) { .chapter-enter, .placeholder-enter, .memory-pause { animation: none; } }
</style>