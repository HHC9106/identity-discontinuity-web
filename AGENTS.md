# Identity Discontinuity — Project & Codex Working Agreement

> **Status:** Current project-level instructions for the 2026 interactive web adaptation.
>
> **Target public release:** **2026-11-29** (internal deadline).
>
> **Primary developer:** Knows basic JavaScript; is new to Svelte, TypeScript, GSAP and D3.

## 1. Purpose and artistic direction

- Build *Identity Discontinuity* as an **original, research-led interactive web artwork**, not a literal port of the 2024 projection animation or a conventional Census-history dashboard.
- Investigate **who defines identity** and the contradictions and political logic of U.S. Census racial/ethnic classification over approximately 230 years. Do not present the work as a neutral, complete historical chronology.
- Preserve the **category ↔ year network as a central visual language**, while allowing new interactive, archival and spatial forms. The 2024 source is a visual/technical reference, **not** the mandatory implementation architecture or an automatically verified source of historical facts.
- Compose primarily for a **wide, horizontally oriented scene with spatially fluid camera/navigation**. Do **not** assume mandatory left-to-right scrolling, scroll-driven chapters, or a fixed 2024 playback order.
- Working background direction: **deep graphite `#111315`**, not pure black. Preserve and test the original category palette before changing it; this color scheme remains open to visual QC.
- Prefer a **coherent, complete Opening + Chapters 1–4 + archive experience** over ambitious unfinished features. Surface scope/time trade-offs early.

## 2. Data truth, line grammar and chapter behavior

**Do not mix factual edges with artistic metaphors.**

1. **Historical data edges:** straight category ↔ Census-year lines indicating that a classification label appears in the cited historical source/period. They do **not** indicate people moving, population size, or a specific individual's Census response. Preserve category/year identity when animating; do not invent edges.
2. **Territorial/frame relationships:** long curves arriving **from outside the central network frame into category nodes** in Ch.3. These are political/geographic editorial relationships, not factual migration paths or Census category-year edges. Island anchors may be outside the *network rectangle* while still inside the browser canvas.
3. **Archive-navigation connections:** visually distinct short traces, angles or curves linking a selected network element to historical documents, imagery or source excerpts; these are **editorial guides**, not historical identity assignments.
4. **Future/speculative connections:** Ch.4 future-year dots and multiple branching/overlapping/fading lines move **temporally outward beyond the historical frame**; clearly distinguish possibilities from verified official Census data.

**Chapter vocabulary** (artistically directed, subject to focused prototyping):

- **Opening:** archival photos, forms, maps and colored lines **emerge together in one dense montage**, then archival material recedes/dissolves into a clean network. Do not replace this with a generic document-by-document slideshow.
- **Ch.1 — Nationality vs Color:** diffuse red/pink halo for historical Black/mixed-Black classification versus precise blue Asian national-origin lines; avoid implying the same classification rule applied in all eras.
- **Ch.2 — Origin vs Descent:** arbitrariness/randomness without changing factual endpoints. The **2024 full source implements color shuffling**, whereas **reordering/snap/interruption** are 2026 candidate approaches. Test them; **neither approach is automatically final**. Data lines remain straight unless a separately approved design decision changes this.
- **Ch.3 — Beyond the Border:** long territorial curves **outside → in** toward category nodes, distinct from category → year straight lines; respect islands' differing legal/political statuses.
- **Ch.4 — Undefined:** historical Other/mixed overlaps plus the **proposed 2026 future extension** (outward year dots, multiple possible connections, overlap, fade). Do not misrepresent this future branching as already implemented by the 2024 source.

**Archive visibility:** default = clean network, without persistent images. Archives appear in the Opening montage, briefly at chapter entrances, or in line hover/focus previews; click/tap opens details, close/return restores context. Not every line needs an archival item.

**Historical and rights safeguards:**
- Keep historical data, geographic/editorial relationships, speculative future mappings and archival metadata **separate in code and visual treatment**.
- The 2024 JavaScript category/year arrays are **unverified working mappings**; do not silently treat them as a fact-checked database. Flag missing White/Black edges, duplicated Mixed Black 1880, and race versus Hispanic-origin question-type distinctions rather than automatically “fixing” them.
- Do not imply an archival subject belonged to a specific Census category without evidence. Keep immigration records and Census records distinct.
- Verify historical claims, quotations, source credits and image rights before publication. No uncleared archival images in the public build.

## 3. Project documents and decision precedence

Read **only relevant material** for the current task; do not ingest every Notion export before routine code edits.

1. **This `AGENTS.md` governs collaboration, approvals, Git/deployment safeguards and QC.** It is not a substitute for the artistic specifications.
2. `docs/CURRENT_BUILD_SPEC.md` is the **active implementation scope and deadline-oriented spec**. Do not maintain a second dated copy with competing instructions.
3. `project/DECISIONS.md` records **explicitly approved decisions**; new exploratory suggestions do not override them. The latest explicit instruction from the developer takes precedence over older project proposals.
4. `docs/` Narrative v3, Storyboard v2 and Line Grammar Spec v1 contain important artistic reasoning, but **some sentences were written before the full 2024 source audit** and may contain superseded candidates. Check conflicts against the current brief and approved decisions; **ask, do not silently reconcile**.
5. Visual Archive Shortlist and Visual References are **research/reference libraries**, not a mandate to implement all assets or interactions.
6. `2024 ref/` is **read-only source and visual evidence**, not the source of truth for historical validity or the 2026 architecture.

Find the **actual filenames** in `docs/` rather than assuming punctuation or Unicode in exported filenames. If the current spec or project logs do not exist, report their absence and request permission before creating them.

## 4. Developer collaboration: teach, explain and ask before changing scope

- Assume **basic JavaScript familiarity but no prior Svelte, TypeScript, GSAP or D3 experience**. When introducing these, explain their purpose, key concepts and relationship to plain JavaScript in concise, practical terms.
- Before meaningful implementation, state **the problem, the proposed approach, why it fits, material alternatives/trade-offs, affected files and how it will be tested**.
- Prefer minimal, understandable, reversible code and small components. Avoid adding libraries or abstractions just because they are fashionable.
- Explain errors and uncertainties plainly. Never claim that code, a browser interaction, source verification or deployment was tested unless it actually was.
- Keep existing user work intact. Never overwrite or relocate original source assets or silently undertake major architectural refactoring.
- Codex owns routine implementation, debugging, tests and technical QC within an approved phase. Ask the Creative Director at the named artistic gates and for major technical/scope decisions, not for routine code edits or debugging.

## 5. Approval boundaries — mandatory

**No Git publication or Git-history changes without separate explicit approval for the exact action.**

- Allowed without additional approval: **read-only** `git status`, `git diff`, `git log`, `git ls-files`, `git remote -v`, and other non-mutating inspection.
- Commit only when the result is coherent and reviewable. Avoid excessive micro-commits, but prefer more than one commit if that makes review clearer.
- **Do not run `git push`, `git push --force`, branch creation/deletion, history rewrite, release creation, repository visibility changes, or deployment** unless the developer explicitly authorizes the specific action. Approval to implement a feature is **not** Git/push/deployment approval.
- **Do not install/update/remove any package, runtime, extension or system tool without explicit approval.** This includes `npm install`, `npm ci`, `pnpm install`, `npx` invocations that can download tools, Corepack downloads, Homebrew and global installs. Before requesting approval, list package/version constraints, purpose, exact command, affected files, installation location, and alternatives.
- **Environment isolation:** **all package installation and environment setup must be isolated from system/global tools**. Before any setup, propose a **Dev Container or other project-scoped Node runtime** (the developer may approve a project-local Node version manager setup as a lighter alternative). Inside the approved environment, install JavaScript dependencies **only in the project** (`node_modules/`, with a lockfile); never install global npm packages. **Python `.venv` does not isolate Svelte/npm**; if Python tooling is needed, use a project-local `.venv` after approval. Do not install or configure the isolation mechanism itself without approval.
- **Current validated Node runtime:** Node `22.23.5` for `darwin arm64` is installed in `$HOME/.local/share/identity-discontinuity-web/nvm`. Use the project startup instructions in `README.md`; they source the existing shared `nvm.sh` with `--no-use`, then explicitly select `22.23.5`. This is documentation of the approved current runtime, not permission to reinstall or upgrade it.
- Do not change shell profiles, system Node, PATH, OS configuration, credentials, secrets, `.env` values, or GitHub settings without permission. Do not expose secrets in logs or responses.
- **Never modify `2024 ref/`.** Do not commit/publish that directory, unpublished research, private content, uncleared images or credentials.
- `.gitignore` does **not** remove previously tracked files or historical commits. Inspect and report exposure concerns; **never perform cleanup, history rewrite or force-push on your own**.

## 6. Development workflow — mandatory small phases

The project uses `project/WORKFLOW.md`, `project/PROGRESS.md` and `project/DECISIONS.md` where available.

For **every phase or scoped task**, follow this loop:

1. **Orient (read-only):** read the current spec, decisions, progress, affected code and Git status. Note any conflicts or uncertainty.
2. **Plan and request approval:** for a new phase, propose its deliverable, likely files, non-goals, risks, dependencies, acceptance criteria and QC. Once a phase is approved, Codex may make routine edits and resolve technical issues inside that scope without approval for each edit. Major scope/artistic decisions, package/environment changes, and each Git publication action retain their separate approval boundaries.
3. **Implement only the approved scope:** make changes in small increments; maintain a runnable project. Do not automatically begin the next phase.
4. **Test continuously:** run relevant already-available checks after meaningful edits, **not only at the end**. Do not install missing tools without permission. Where browser inspection is unavailable, mark it NOT RUN and provide manual instructions.
5. **Report QC evidence:** commands run, observed output, screenshots/reproduction steps when possible, files changed, known defects, assumptions and what still needs human review.
6. **Record:** after approved work, update `project/PROGRESS.md` with date, scope, status, files and QC outcomes; log important **approved** choices in `project/DECISIONS.md`. Do not imply that draft documentation is an approved decision.
7. **Stop and ask:** do not move to another phase, stage/commit/push or deploy unless separately authorized.

### QC status language

Record **PASS / FAIL / BLOCKED / NOT RUN** with evidence. Never mark a phase complete when required tests have not been performed or known blockers remain, unless the developer explicitly accepts a documented exception.

At each relevant phase verify:
- Existing test scripts and TypeScript checks, plus a **production build** (if available and dependencies installed).
- Dev-server smoke test, **browser console**, desktop 16:9 layout and narrow/mobile width (manual review if no browser access).
- Hover, click/tap, close/return, keyboard/focus and reduced motion **when implemented**.
- Factually unchanged category-year connections despite animation; clearly separate data/territory/archive/speculative lines.
- Source credits, image permissions, failed-image fallbacks and accessibility/alt text for published archives.
- Restricted files/assets absent from Git tracking and the **built `dist/` output** before publishing.

A passing build is **not** proof of visual correctness. A local build is **not** proof that GitHub Pages is working. Report those separately.

### Review gates

- The current dates and phase deliverables live in `docs/CURRENT_BUILD_SPEC.md` and `project/WORKFLOW.md`; do not maintain a competing timeline here.
- The current targets are Creative Review A (Nov 18), Chapter 2 choice and Pages rehearsal target (Nov 20), Review B/all chapters navigable (Nov 23), feature freeze (Nov 24), Review C (Nov 27), and hard public-ready target (Nov 29). A Pages rehearsal or release requires separate explicit authorization for each Git/publication action.
- Each creative packet includes a runnable preview, desktop/mobile screenshots, a short motion recording when feasible, change summary, adjustable-parameter map, PASS/FAIL/BLOCKED/NOT RUN evidence, and focused artistic decisions. Codex resolves routine engineering issues within the approved phase.
- If at risk, preserve all four core arguments and source/rights integrity; reduce secondary features according to the fallback order in `project/WORKFLOW.md`.

## 7. Architecture: currently recommended, not immutable

- **Conditionally approved baseline:** Vite + Svelte + TypeScript + SVG/CSS/HTML. GSAP for complex, controllable narrative timelines and Playwright for automated functional testing are optional and require dependency approval. Do not introduce D3, PixiJS, Canvas, ScrollTrigger or global stores without a demonstrated need and explicit approval where packages/setup are involved.
- Separate **historical data**, **layout/geometry**, **rendering**, **animation/chapter state**, **archive metadata**, and **interaction state**.
- Design for pause/replay/return and potentially non-linear navigation; do not architect solely around 2024 frame counters or mandatory ScrollTrigger.
- Test artistic trade-offs with small visual spikes rather than assuming the old rendering or this proposed stack is automatically optimal.

## 8. Start-of-session behavior

At the beginning of a new Codex session:
1. Read this `AGENTS.md`, `docs/CURRENT_BUILD_SPEC.md`, `project/PROGRESS.md`, `project/DECISIONS.md` and the **current section** of `project/WORKFLOW.md`.
2. Report **current phase, last verified checkpoint, unverified items and next smallest task**.
3. If no phase is approved, **inspect and propose only**; do not edit, install, stage, commit, push, or deploy.
4. Ask for approval before moving from plan to implementation.
