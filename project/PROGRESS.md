# Progress — Identity Discontinuity 2026

- **Hard public-ready target:** 2026-11-29
- **Current phase:** Phase 0 — baseline, data/rights and publication safety
- **Status:** IN PROGRESS; the environment subtask is complete, but Phase 0 is not.
- **Last verified:** 2026-11-15

The working tree is an initial Vite + Svelte + TypeScript scaffold, not the artwork. Native ARM64 Node and local dependencies are operational. The historical data, archive-rights and Git/publication audits remain open. No application phase has started.

## Phase status
| Phase | Status | Last reviewed | Evidence / blocker |
| --- | --- | --- | --- |
| 0 Baseline / data / rights / publication safety | IN PROGRESS | 2026-11-15 | Environment QC PASS. Data/rights verification, complete history/publication boundary audit and Linux CI compatibility remain NOT RUN/BLOCKED. |
| 1 Clean Network + Ch.1 + Opening feasibility | NOT STARTED | Nov 17–18 | `src/App.svelte` remains a static placeholder; implementation awaits Phase 0 exit and approval. |
| 2 Ch.2 A/B + Archive loop + Pages rehearsal target | NOT STARTED | Nov 19–20 | No chapter/archive code or Pages workflow exists on the current worktree. Rehearsal requires separate Git/publication authorization. |
| 3 Four chapters navigable at MVP level | NOT STARTED | Nov 21–23 | No chapters implemented; Nov 23 scope-cut gate applies. |
| 4 Opening integration / feature freeze | NOT STARTED | Nov 24 | Opening feasibility and integration remain unimplemented. |
| 5 Release candidate / Review C | NOT STARTED | Nov 25–27 | No release candidate or full history/rights/browser audit. |

## Current baseline and blockers
- `develop-framework` is the working branch. Local commits `a3e797d` and `38a9a43` now track the README correction and initial scaffold. `.gitignore` continues to exclude new files under `/docs/`, `/project/` and `AGENTS.md`; `AGENTS.md` remains a local ignored working agreement. `.vscode/settings.json` is the only remaining untracked personal setting. No push or deployment was performed.
- `public/archives/` is empty. `2024 ref/` remains ignored/read-only. Its history and all eventual production output have not been comprehensively audited.
- Project runtime: `$HOME/.local/share/identity-discontinuity-web/nvm/versions/node/v22.23.5/bin/node`, verified `v22.23.5 darwin arm64`; npm `10.9.9`. Use the startup procedure in `README.md`; it sources shared `nvm.sh` with `--no-use`, then selects the project runtime. System Node remains unchanged.
- `npm ci --include=optional` installed the lockfile dependencies and the Rollup Darwin arm64 native binding. npm reported 3 low-severity advisories; no audit fix was run.
- Private recovery at `/Users/haoche/identity-discontinuity-recovery/identity-discontinuity-web-20261115-014904` remains intact. It contains the original 240 MB dependency tree and source/configuration snapshot. A second pre-reinstall dependency copy is also retained. Do not delete either until the project is safely versioned/recoverable; external recovery cleanup requires separate approval.
- `package.json` SHA-256: `24fcbce89a28fc054956f8a970ee7dc306b50f982fb74d11a81c50665cde0cf9`. `package-lock.json` SHA-256: `240d527c6af8dd0f7533282f12a69fbd5485939ab086fcfcbaf1cff45dbd968b`. Both remain unchanged.
- The current app is still the static “Framework study” placeholder. `dist/` is normal ignored build output, not a source deliverable. Dev preview is at `http://127.0.0.1:5173/identity-discontinuity-web/`.
- Remaining Phase 0 blockers: verify the source for every historical edge/claim used, complete archive rights/credit inventory and fallback choices, audit Git refs/history and publication outputs, decide intended tracking of ignored planning files, and verify Linux CI/Pages dependency compatibility. No deployment has been tested or authorized.

## Phase 0 QC record — 2026-11-15
| Check | Status | Evidence |
| --- | --- | --- |
| Governance/spec/workflow and repository state reviewed | PASS | Read `AGENTS.md`, `docs/CURRENT_BUILD_SPEC.md`, and all three files in `project/`; inspected source, package scripts, Git status/branch/remote/tracked files. |
| Native Node runtime | PASS | Node `v22.23.5 darwin arm64`; npm `10.9.9`; installed under project-specific NVM_DIR. |
| Dependency install / Rollup binding | PASS | `npm ci --include=optional`, exit 0; 46 packages added / 47 audited; Rollup 4.68.3 Darwin arm64 Mach-O present. npm reported 3 low-severity advisories. |
| Svelte/TypeScript check | PASS | Latest `npm run check` under Node v22.23.5 arm64; 0 errors and 0 warnings; exit 0. Earlier recovery log: `logs/npm-check-arm64-20261115-020219.log`. |
| Production build | PASS | Latest `npm run build`; Vite 7.3.8 transformed 110 modules and completed in 183 ms; exit 0. Earlier recovery log: `logs/npm-build-arm64-20261115-020221.log`. |
| Development server | PASS | `npm run dev -- --strictPort`; Vite ready in 183 ms at `http://127.0.0.1:5173/identity-discontinuity-web/`. Log: recovery `logs/npm-dev-arm64-20261115-020247.log`; server remains running. |
| Browser smoke | PASS | Page title and placeholder heading correct; reload produced no console/page errors; desktop and 390x844 viewport had no horizontal overflow. This is scaffold smoke only, not artwork/visual approval. |
| Manifest/lockfile and recovery integrity | PASS | `package.json`/lockfile match original snapshots; both old dependency copies remain preserved. |
| In-project temporary-file review | PASS | No `.log`, `.tmp`, `.bak` or editor backup files found. Removed only root `.DS_Store` and `docs/.DS_Store`; preserved `2024 ref/.DS_Store`, source images, standard `dist/`, `node_modules/` and all external recovery data. |
| Local Git commits / status | PASS with boundary note | Commits `a3e797d` (README tracking clarification), `38a9a43` (initial scaffold), and this progress update are local only. `.vscode/settings.json` remains untracked; AGENTS is ignored/untracked. No push or deployment. |
| History/source/rights and publication output audit | NOT RUN | No completeness claim; archive directory empty; full history/`dist` safety audit remains required before publication. |
| Linux CI / Pages / live deployment | BLOCKED / NOT RUN | Local ARM64 success does not prove Linux install or Pages. Nov 20 rehearsal is conditional on a separate authorization for each Git/publication action. |
| Chapter interaction, reduced motion and artwork layout | NOT RUN | These behaviors do not exist in the scaffold. |

## Current next steps
1. Complete Phase 0 source/rights inventory, publish-safety/history audit and tracking-policy decision without staging or publishing.
2. Verify Linux CI dependency compatibility as a separate task; do not change the lockfile without approval.
3. Request Phase 1 approval. Proposed first deliverable is the runnable Clean Network + Chapter 1 study + Opening feasibility test by Nov 18.

Phase 1 remains NOT STARTED. No artistic review gate has occurred. The checked-in scaffold is still only a placeholder.
