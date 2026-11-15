# Development Workflow — Identity Discontinuity 2026

**Hard publication target:** Nov 29, 2026. **Current status:** Phase 0 environment baseline passes; Phase 0 remains IN PROGRESS pending data/rights and publication-safety checks. Phase 1 has not been authorized or started. This workflow records the latest approved plan; dates are target gates, not guarantees.

## Working rules
- Codex owns implementation, routine debugging, tests and technical QC within an approved phase. Creative Director review is concentrated at the three gates below; routine code questions do not require user action.
- Keep `develop-framework` as the working baseline. Treat `local-prototype-preserved` as a read-only selective reference; do not switch branches or merge it wholesale. Never modify `2024 ref/`.
- No package/environment change, Git stage/commit/push, deployment or history change without explicit authorization for the named action. This plan is not authorization for Phase 1 or publication.
- Record actual QC as PASS / FAIL / BLOCKED / NOT RUN. Build success does not equal visual approval or live-site verification.

## Architecture and responsibilities
Use Svelte + Vite + TypeScript with native SVG/CSS/HTML. `App.svelte` owns chapter, selection and archive state; child components receive data through props and return actions through callbacks. Prefer one shared network renderer and small semantic layers over four separate chapter systems.

- Historical data: stable category/year IDs, cited edges, question type, geographic scope and verification status.
- Geometry/rendering: responsive layout separate from factual data; straight SVG category/year lines.
- Chapter motion: per-scene behavior and adjustable presets, without changing historical endpoints.
- Archive: source/rights metadata and editorial navigation links distinct from data edges.
- Interaction/navigation: chapter controls, focus/hover preview, detail, close/return and focus restoration.
- Speculation: future nodes/edges stored and rendered separately from recorded history.
- Adjustable parameters: CSS variables for background/type/breakpoints; visual config for colors/line widths/glow; motion config for timing/easing; chapter config for effect selection. Values remain subject to creative review.

Core libraries: Svelte, TypeScript, Vite, SVG/CSS/HTML. GSAP (complex timelines) and Playwright (automated functional tests) are optional and require dependency approval. Do not introduce D3, PixiJS, Canvas, ScrollTrigger or global stores without a demonstrated need. Node `22.23.5 darwin arm64` is installed in the project-specific NVM directory; startup is documented in `README.md`. The project has no current Playwright test script.

## Data and archive minimum
- Publish only selected, source-verified historical examples sufficient for the four chapter arguments. Each displayed historical edge must have a source for that category/year and explicit race/origin question type and geographic scope. Do not describe a verified subset as a complete Census graph.
- Keep race, origin, territorial/editorial, archive-navigation and speculative relationships distinct in both data and visual treatment.
- Minimum archive set: one rights-cleared documentary anchor/source record per chapter and one complete preview/detail/return path. Reuse an approved item in the Opening where appropriate. No uncleared image in `public/` or `dist/`.
- Rights fallback: use an approved official/public-domain document or a cited text/link treatment; do not use an uncleared image as an authentic placeholder or infer a subject's Census identity.

## Phase 0 — Baseline, environment, Git safety, data and rights (Nov 15–16)
**Outcome:** reproducible local check/build/dev baseline and documented safe publication/data scope. The native Node environment, `npm ci`, typecheck, production build and browser smoke have passed. **Phase 0 is not complete:** source/rights verification, full Git/history/publication audit, intended tracking policy and Linux CI compatibility remain open.

**Next Phase 0 work:** start historical source and archive-rights verification in parallel with a read-only review of Git refs/history, `dist/` exposure and publication boundaries. Keep the existing private recovery copy until the work is safely versioned. Current `.gitignore` excludes `docs/`, `project/` and `AGENTS.md`; do not change it or stage files without explicit approval.

**Exit gate:** current `npm run check`, `npm run build`, `npm run dev` remain reproducible; every proposed historical edge/claim has a source/status or is excluded; archive rights/fallbacks are listed; Git/publication boundary is understood; Linux CI limitation is recorded or separately resolved. No deployment occurs in Phase 0.

## Phase 1 — Clean Network, Chapter 1 and Opening feasibility (Nov 17–18)
**Outcome:** runnable responsive Clean Network, one Chapter 1 red/pink diffuse vs blue crisp study, and a small test of simultaneous archive+line emergence into the network (not a complete Opening).

**Likely files:** `src/data/`, `src/layout.ts`, `src/NetworkStage.svelte`, `src/config/visual.ts`, `src/OpeningLayer.svelte` or a small temporary stage layer, `src/style.css`. Prepare a dist-only Pages workflow and publication allowlist by Nov 19 so a Nov 20 rehearsal is technically possible; the current worktree has no Pages workflow. No dependency addition without approval.

**QC:** check/build PASS; dev page and browser console; desktop 16:9 and mobile focus/exploration strategy (not merely scaled desktop); edge IDs/endpoints remain unchanged; opening technique observed on desktop/mobile. **Creative Review A (Nov 18):** runnable preview, desktop/mobile screenshots, short animation capture where feasible, changes summary, adjustable-parameter map, QC statuses, and specific decisions on composition, line density/palette/texture, mobile exploration and Opening technique.

**Proceed/fallback:** do not proceed with invented edges or a broken preview. If the montage strains mobile/performance, reduce layers/asset size or motion detail while preserving simultaneous emergence; do not switch rendering engines without measured need.

## Phase 2 — Chapter 2 A/B, Archive loop and early Pages rehearsal target (Nov 19–20)
**Nov 19 deliverable:** two minimal Chapter 2 motion studies: original color shuffling versus reordering/snap. They are comparisons, not two full chapter systems. Keep factual edge endpoints and category/year identity intact.

**Nov 20 deliverable:** target Creative Director choice for Chapter 2 and one complete chapter -> line focus/hover -> archive preview -> detail -> close/return interaction. Check mouse, keyboard, touch, focus restoration and reduced motion. Likely files include `src/config/motion.ts`, chapter/archive data and the archive panel; Playwright/test configuration only if approved.

**Pages rehearsal:** target Nov 20, using only an audited publication allowlist and `dist/`. This is a real public action. It remains blocked until the user explicitly authorizes staging, committing, pushing and deployment and the destination/site settings are checked. Do not publish `2024 ref/`, research or uncleared assets.

## Phase 3 — Four chapters navigable at MVP level (Nov 21–23)
**Outcome by Nov 23:** all four chapter arguments can be navigated with one essential visual behavior each: Ch.1 diffuse/crisp contrast; Ch.2 selected A/B treatment; Ch.3 incoming territorial curves outside-to-in; Ch.4 visibly speculative future nodes/branching/fade. Keep archive guides separate from data lines.

**Creative Review B (Nov 23):** runnable end-to-end preview, desktop/mobile screenshots, short motion recording where feasible, changes summary, parameter map, QC evidence and decisions on narrative continuity, motion, interaction and Ch.2. If all four chapters are not navigable by Nov 23, stop secondary feature work; protect the four arguments, basic navigation, archive loop, sources and rights.

## Phase 4 — Opening integration and feature freeze (Nov 24)
Integrate the tested Opening montage into a one-time dense emergence -> archive recession -> Clean Network transition. No new complex systems after this date. Check normal and reduced-motion paths, fallback for missing assets, mobile controls and production build. Reduce decorative motion if integration threatens stability; do not turn the Opening into a document-by-document slideshow.

## Phase 5 — Release candidate and final creative review (Nov 25–27)
Run typecheck/build and approved browser tests; verify desktop/mobile readability, keyboard/touch, reduced motion, performance, source/citation claims, rights/credits, asset failures and publication output. **Creative Review C (Nov 27):** full runnable preview, desktop/mobile screenshots, short motion recording if feasible, changes summary, parameter map, QC statuses and focused decisions on final experience, history/rights and usability. Any unresolved required factual claim or image right blocks release.

**Nov 28–29:** contingency and publication preparation. Nov 29 is the hard public-ready target. Any actual deployment requires separate explicit approval and live-URL verification; local build/rehearsal is not live-site proof.

## Scope control
**MUST HAVE:** four coherent chapter arguments and navigation; shared Clean Network; one core behavior per chapter; Opening-to-network transition; one accessible archive loop; source-verified selected data; rights-safe credits/assets; usable desktop/mobile exploration; tested build and authorized publication.

**SHOULD HAVE:** one distinct rights-cleared archive anchor per chapter, richer line previews, additional verified edges and nonessential replay controls.

**POST-LAUNCH:** extra archive objects, free camera/zoom, secondary map excursions, exhaustive graph coverage, shaders and decorative animation polish.

If behind schedule, remove extra archives first, then free camera/secondary excursions, then decorative motion layers and nonessential data breadth. Do not remove historical accuracy, rights checks, chapter meaning or the selected Chapter 2 argument.

## Review packet and QC record
For each creative gate, Codex supplies a runnable preview, desktop 16:9 and mobile screenshots, a short animation recording when feasible (otherwise NOT RUN with reason), a concise change summary, parameter map, and Technical / Historical-rights / Visual QC as PASS / FAIL / BLOCKED / NOT RUN. Ask only specific artistic decisions; Codex resolves routine engineering issues within the approved phase.

Record each phase: date/scope; changed files and dependencies; commands/results; manual device/browser; PASS/FAIL/BLOCKED/NOT RUN; unverified assumptions; preview/artifacts; next gate. Do not claim visual, historical or publication success from a passing build alone.
