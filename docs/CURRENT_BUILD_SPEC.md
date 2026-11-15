# Identity Discontinuity — CURRENT BUILD SPEC

**Version:** 2026-11-15 / Sprint v1

**Hard public-ready target:** November 29, 2026 (America/New_York)

**Early GitHub Pages rehearsal target:** November 20, 2026, subject to explicit authorization for staging, committing, pushing and deployment

**Competition:** The Pudding Cup 2026 — official deadline November 30, 2026; requires a publicly accessible 2026 non-commercial original project URL.
**Status:** This file is the **current implementation brief**, not the complete research archive. Items explicitly marked *candidate* remain editable.

## 0. Working agreement

- **This file is authoritative for implementation decisions until updated.** `docs/` Notion exports remain research/background and may contain superseded proposals.
- `2024 ref/` is **read-only historical/visual source code**. Do not modify or treat its category/year mappings as independently verified Census data.
- If two files conflict, **flag the conflict** and follow this current spec for visual/technical scope. Historical factual claims must still be verified against source materials.
- Make changes in small, working increments and verify visually in a browser after each feature. Codex owns routine engineering within an approved phase; the Creative Director reviews artistic gates, not individual code edits.
- Staging, committing, pushing, deployment and package/environment changes each require explicit authorization. A phase or implementation approval does not grant those actions.
- Assess features against the hard November 29 target. Do not add a dependency without a demonstrated need and explicit approval.

## 1. Artistic question and scope

Not a chronological encyclopedia of Census changes. The artwork interrogates the **political contradictions of racial classification**: Who establishes categories, how different groups are judged by inconsistent rules, how borders and administrative frames divide identities, and what categories cannot capture.

- Central structure: **category ↔ U.S. Census year** network. This is category presence/label relationship, not population flow, an individual’s personal identity trajectory, or migration.
- Overall **horizontal composition**, but no rule that scenes or camera travel monotonically left→right.
- Main field: **deep graphite #111315**, not pure black. Historical photographs and paper need their own authentic colors.
- Archival material is **conditional**, not constantly visible.

## 2. Three line families

1. **Data lines**: straight category ↔ historical census year edges. Historical pairings are factual data, not animation variables.
2. **Territorial/frame lines**: longer curves from **outside the internal visual frame into category nodes** in Ch.3. They are conceptual territorial relations, *not* evidenced individual migration paths; island anchor positions may be outside the central graph but still inside the browser canvas.
3. **Archive guides**: temporary, localized tracing paths/curves from curated data focus to a document, photograph, map or text detail. They are **editorial navigation**, not data edges. Their visual vocabulary must be distinguishable from Ch.3 long arcs.

**Geometry communicates relationship type. Texture/opacity/motion communicate artistic arguments.** Never alter historical edge endpoints to create randomness.

## 3. Narrative and motion

### Opening — archival emergence
- Only at the beginning: selected archival images, Census forms, photographs, maps and colored lines **emerge together as a visually dense composite**.
- Archives recede/dissolve, revealing the clean, spacious horizontal data network.
- Do not make the entire site a constantly photograph-filled collage.

### Ch.1 — Nationality vs Color
- Data lines stay straight; **red/pink diffuse halo** versus **sharp blue**. The one-drop-like/ancestry comparison is a historically situated visual critique, not a universal rule in all years.
- Chapter entrance may reveal 1930 enumerator instructions or Ng Shee 1931 immigration documents; differentiate immigration records from actual Census enumeration.

### Ch.2 — Origin vs Descent
- Distinguish cross-border Indigenous continuity, national border, 1930 *Indian* / *Mexican* classification, disappearance of *Mexican* as a standalone race label in 1940, and later Hispanic-origin questions (not a simple rename).
- **Keep data lines straight.** Randomness should operate through appearance/visual assignment, not fictional category–year pairings.
- **Candidate A — source fidelity:** original 2024 color shuffling. **Candidate B — visual development:** node reordering / snap while preserving truthful graph edges. Decide by a brief side-by-side test, not by an assumption that old code is optimal.
- Present minimal A/B motion studies on Nov 19; target the Creative Director's selection by Nov 20. Implement only the selected treatment as the chapter behavior.
- Wichita / Virginia Martinez imagery remains rights-sensitive, not automatically publication-cleared.

### Ch.3 — Beyond the Border
- Long curved **off-frame incoming** territorial paths connect Pacific island anchors to category nodes; category→year edges remain straight.
- Island Areas have distinct political statuses. Hawaiian annexation resistance archive is historical context, not proof of a direct Census classification causal link.

### Ch.4 — Undefined
- Show historical Other / mixed / race-versus-ethnicity classification tensions.
- **New hypothetical future year dots extend outside the historical temporal frame**; multiple straight lines branch, overlap, and fade. Distinguish speculative future nodes from verified census years.
- Ch.3: spatial outside→inside. Ch.4: temporal inside→outside.
- Avoid the superseded “incomplete archive docking” as the concluding visual premise.

## 4. Archive interaction states

- `opening-montage`: many carefully curated assets animate together, once.
- `clean-network`: default; labels, lines, negative space, no persistent archive images.
- `chapter-entrance`: show **one key archival item per chapter** initially; optionally reveal a second only if time and rights allow. Archive then recedes.
- `line-hover`: highlight a **curated relevant connection** and show concise category/year/source and optional small preview; not all lines require archives. Use a generous invisible pointer hit target and resolve overlaps safely.
- `archive-detail`: click/tap opens document/image at readable size, with citation, credit, rights and close/back. Touch and keyboard fallback required.
- On return: recover the prior network state without restarting the entire story.
- If image rights cannot be established, omit the image and use an approved source link or rights-cleared documentary/text treatment; never publish an uncleared image as an authentic placeholder.

## 5. Technical design — recommended minimal architecture

**Preferred minimum:** `Vite + Svelte + TypeScript + SVG/CSS/HTML`. GSAP is optional for complex, controllable narrative timelines and requires approval. Playwright is optional for automated functional testing and requires approval of the package/browser setup.

- **Svelte/HTML**: chapter controls, labels, accessible archive panel, responsive UI.
- **SVG**: data lines, territorial curves, nodes, labels, pointer hit areas; unique element keys mapped to stable IDs.
- **GSAP (optional):** per-scene, reversible/seekable timelines only if the Opening/motion study demonstrates value; explicit state transitions, not a global animation frameCounter.
- **Data module**: category ID, year, relationship type/question type, source reference, geographic scope and `verificationStatus`; treat future separately.
- **Layout module**: scales/coordinates based on container; no historical meaning embedded in pixel positions.
- Do not introduce D3, Canvas, PixiJS, ScrollTrigger or global stores without a demonstrated need and explicit approval where packages/setup are involved. Chapter navigation is state-based, not tied to scroll position.
- The validated local runtime is Node `22.23.5 darwin arm64` in the project-specific NVM directory. The exact startup procedure is in `README.md`; no system Node or shell profile change is required.

### Minimal state model
`intro → overview → chapter-entrance → chapter-explore → (archive-preview | archive-detail) → chapter-explore → overview/next-chapter`

### Data cautions from 2024 source
- Includes ~32 labels, historical years through 2020 and a *2050* speculative marker, but not per-edge citations.
- `White` / `Black` year arrays empty in portions; do not invent edges.
- `Mixed Black` includes duplicate 1880 and needs cleanup after historical verification.
- Race and Hispanic-origin selections are mixed in one array; separate by question type in the new model.
- The original Ch.2 shuffles **colors**, not endpoints; original Ch.3 curves are cubic Béziers; original future marker does not implement the newly proposed branching network.

## 6. Deliverable for November 29 (MVP acceptance criteria)

1. Public **2026** non-commercial URL loads without errors and visibly credits/links sources and creative process.
2. Opening montage transitions successfully to an attractive, legible clean network on #111315.
3. All **four chapters** exist and communicate their distinct visual/narrative questions.
4. Ch.1 blur/firm, Ch.2 controlled straight-line randomness, Ch.3 long off-frame territorial curves, Ch.4 future dots + overlap/fade each work at least in one complete scene.
5. One curated archival object per chapter appears at entrance; at least one polished hover/tap → preview → readable detail → return interaction demonstrates the archive grammar (expand to other curated links only as time permits).
6. Year/category mappings used in the released visual are reviewed; uncertain mappings are removed, marked, or limited rather than asserted as facts. Source/rights metadata included.
7. Browser testing on desktop and mobile: no hard crash, readable labels or an approved mobile exploration strategy (not merely a scaled desktop graph), accessible click/tap targets, basic keyboard path and reduced-motion fallback.
8. Every historical edge shown is source-verified and explicitly scoped. The released graph is described as a selected verified subset unless it has actually been checked for completeness; race and origin question types remain distinct.
9. Deployed and tested by **Nov 29**. An early Pages rehearsal is targeted for Nov 20 only after explicit authorization for each required Git/publication action.

## 7. Timebox and flexible checkpoints

| Date | Goal | Gate |
|---|---|---|
| **Nov 15–16** | Phase 0: environment baseline, Git/publication safety, begin historical source and archive-rights verification in parallel | Local check/build/dev reproducible; selected-data and rights inventory started; publication boundary documented |
| **Nov 17–18** | Phase 1: runnable Clean Network, Ch.1 visual study, small Opening montage feasibility test; prepare dist-only Pages workflow and publication allowlist | **Creative Review A:** preview, desktop/mobile screenshots, short motion capture where feasible, changes/parameter map, QC evidence |
| **Nov 19** | Phase 2: minimal Ch.2 A/B motion studies (color shuffle vs reorder/snap) | Two comparable runnable studies; factual endpoints unchanged |
| **Nov 20** | Target Ch.2 choice and first complete Archive interaction loop; early Pages rehearsal target | Chapter -> line -> preview -> detail -> close/return works; Pages rehearsal only with separate explicit authorization for staging/commit/push/deploy |
| **Nov 21–23** | Phase 3: all four chapters navigable at MVP level; one essential visual behavior per chapter | **Creative Review B Nov 23:** coherent end-to-end preview; if all four chapters are not navigable, stop secondary feature work |
| **Nov 24** | Phase 4: integrate Opening transition and freeze features | Simultaneous montage resolves into Clean Network; no new complex systems |
| **Nov 25–27** | Phase 5: release candidate, source/rights/accessibility/performance/browser QC | **Creative Review C Nov 27:** full preview, screenshots, motion capture where feasible, changes/parameter map, focused final decisions |
| **Nov 28–29** | Contingency and publication preparation; Nov 29 is the hard public-ready target | Any actual deployment requires separate explicit authorization and live-URL verification |

**Contingency rules:** If behind schedule, preserve all four chapter arguments, one core behavior each, navigation, one complete Archive path, sources and rights. Remove extra archives first, then free camera/secondary excursions, then decorative motion detail. Do not claim a complete graph from a verified subset, sacrifice source accuracy, or introduce a second renderer to solve an unmeasured performance concern.

## 8. Sources / status of older docs

- **Narrative v3:** core questions/chapter argument; generally authoritative for creative intent.
- **Storyboard v2:** scene inventory; opening and selective archive use updated, but some Ch.2/ending motion language superseded.
- **Line Grammar Spec v1:** line family semantics valid, Ch.2 priority is no longer locked to reordering/snap; compare source-fidelity color shuffle too.
- **Visual Archive Shortlist:** source/reuse/permissions research only; not a requirement to implement all candidates.
- **Visual References:** inspiration only, not design requirements.
- **Mother project page:** background/citation bank and **historical hypotheses**, not current architecture; original ScrollTrigger-first direction superseded.

Notion source pages:
- Narrative: https://app.notion.com/p/4198f8a1b64c81369d41cea47f295e54
- Storyboard: https://app.notion.com/p/4198f8a1b64c8151a0d9eeeeb137995f
- Line Grammar: https://app.notion.com/p/4198f8a1b64c8152b5b3c44a6f2097e4
- Archives: https://app.notion.com/p/4198f8a1b64c817bb5fbd9d2dd9ef439
- Visual References: https://app.notion.com/p/4198f8a1b64c815cb03bf830111edd32
- Mother project: https://app.notion.com/p/4198f8a1b64c81c7b6f6c8b314e33833

## 9. Implementation handoff

This file is the active Build Spec. Use it with `AGENTS.md` and the three `project/` workflow documents. The local environment baseline passes, but Phase 0 remains open for data/rights and publication-safety checks. Do not begin Phase 1 until the Creative Director approves it. Notion remains a research library, not an automatically synchronized development database.
