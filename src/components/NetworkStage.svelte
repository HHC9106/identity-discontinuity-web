<script lang="ts">
  import { categories, edges, years } from '../data/developmentSample';
  import { categoryPoint, stageSize, yearPoint } from '../layout';
  import { visual } from '../config/phase1';

  export let selectedEdgeId = '';
  export let effectMode: 'network' | 'chapter1' = 'network';
  export let diffuseGradient = false;
  export let onSelect: (edgeId: string) => void = () => {};

  $: selectedEdge = edges.find((edge) => edge.id === selectedEdgeId);

  function activateEdge(event: KeyboardEvent, edgeId: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(edgeId);
    }
  }
</script>

<svg
  class="network-svg"
  viewBox={`0 0 ${stageSize.width} ${stageSize.height}`}
  role="group"
  aria-label="Synthetic development network. Sample categories connect to sample years; no line represents verified Census history."
>
  <defs>
    <filter id="diffuse-halo" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation={visual.diffuseBlur} />
    </filter>
    {#each edges.filter((edge) => edge.texture === 'diffuse') as edge (edge.id)}
      {@const categoryIndex = categories.findIndex((category) => category.id === edge.categoryId)}
      {@const yearIndex = years.findIndex((year) => year.id === edge.yearId)}
      {@const start = categoryPoint(categoryIndex)}
      {@const end = yearPoint(yearIndex)}
      <linearGradient
        id={`diffuse-gradient-${edge.id}`}
        gradientUnits="userSpaceOnUse"
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
      >
        <stop offset="0%" stop-color={visual.diffuseGradientStart} />
        <stop offset="100%" stop-color={visual.diffuseGradientEnd} />
      </linearGradient>
    {/each}
  </defs>

  <path class="axis-rule" d="M52 72 H1148" />
  <text class="axis-caption" x="52" y="48">SYNTHETIC CATEGORY SET</text>
  <text class="axis-caption" x="52" y="478">SYNTHETIC YEAR POINTS</text>

  <g class="edge-layer">
    {#each edges as edge (edge.id)}
      {@const categoryIndex = categories.findIndex((category) => category.id === edge.categoryId)}
      {@const yearIndex = years.findIndex((year) => year.id === edge.yearId)}
      {@const category = categories[categoryIndex]}
      {@const start = categoryPoint(categoryIndex)}
      {@const end = yearPoint(yearIndex)}
      {@const useGradient = effectMode === 'chapter1' && diffuseGradient && edge.texture === 'diffuse'}
      {@const color = effectMode === 'chapter1' ? (edge.texture === 'diffuse' ? (useGradient ? `url(#diffuse-gradient-${edge.id})` : visual.diffuse) : visual.crisp) : visual.neutralLine}
      {@const edgeOpacity = selectedEdgeId === edge.id
        ? visual.selectedOpacity
        : effectMode === 'chapter1'
          ? (edge.texture === 'crisp' ? visual.crispOpacity : visual.diffuseOpacity)
          : visual.neutralOpacity}
      {#if effectMode === 'chapter1' && edge.texture === 'diffuse'}
        <line
          class="edge-halo"
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          stroke={useGradient ? `url(#diffuse-gradient-${edge.id})` : color}
          stroke-width={visual.diffuseHaloWidth}
          filter="url(#diffuse-halo)"
          opacity="0.62"
          aria-hidden="true"
        />
      {/if}
      <line
        class="data-edge"
        class:selected={selectedEdgeId === edge.id}
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke={color}
        stroke-width={selectedEdgeId === edge.id ? visual.selectedLineWidth : visual.dataLineWidth}
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
        aria-label={`${category.label} to ${years[yearIndex].label}, development sample edge`}
        aria-pressed={selectedEdgeId === edge.id}
        onpointerenter={() => onSelect(edge.id)}
        onfocus={() => onSelect(edge.id)}
        onclick={() => onSelect(edge.id)}
        onkeydown={(event) => activateEdge(event, edge.id)}
      />
    {/each}
  </g>

  <g class="category-layer">
    {#each categories as category, index (category.id)}
      {@const point = categoryPoint(index)}
      <circle
        class="category-node"
        class:diffuse-node={effectMode === 'chapter1' && category.texture === 'diffuse'}
        class:crisp-node={effectMode === 'chapter1' && category.texture === 'crisp'}
        cx={point.x}
        cy={point.y}
        r="6"
      />
      <text class="category-label" x={point.x} y={point.y - 27} text-anchor="middle">{category.label}</text>
      <text class="category-kind" x={point.x} y={point.y - 43} text-anchor="middle">{category.groupLabel}</text>
    {/each}
  </g>

  <g class="year-layer">
    {#each years as year, index (year.id)}
      {@const point = yearPoint(index)}
      <path class="year-tick" d={`M${point.x} ${point.y - 12} v24`} />
      <circle class="year-node" cx={point.x} cy={point.y} r="5" />
      <text class="year-label" x={point.x} y={point.y + 31} text-anchor="middle">{year.label}</text>
    {/each}
  </g>
</svg>

<div class="network-readout" aria-live="polite">
  {#if selectedEdge}
    <span class="readout-dot" class:readout-diffuse={selectedEdge.texture === 'diffuse'}></span>
    <span>{categories.find((category) => category.id === selectedEdge?.categoryId)?.label}</span>
    <span class="readout-connector">to</span>
    <span>{years.find((year) => year.id === selectedEdge?.yearId)?.label}</span>
    <span class="readout-type">SAMPLE EDGE · {selectedEdge.id}</span>
  {:else}
    <span class="readout-hint">Focus or select a line to inspect its sample ID.</span>
  {/if}
</div>