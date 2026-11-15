# Decisions — Identity Discontinuity 2026

Status labels distinguish approved decisions from conditional architecture and open artistic questions. Exploratory prototypes do not settle an artistic choice until the Creative Director reviews them.

## Accepted / conditional
| Date | Status | Decision | Consequence |
| --- | --- | --- | --- |
| 2026-11-15 | ACCEPTED | `2024 ref/` and its p5.js project are read-only visual/technical references, not the 2026 architecture or verified historical data. | Do not modify the source or treat its category/year arrays as fact-checked. |
| 2026-11-15 | ACCEPTED | Keep `develop-framework` as the working baseline; consult `local-prototype-preserved` selectively without switching or merging it wholesale. | Preserve current untracked work and branch history. |
| 2026-11-15 | CONDITIONALLY ACCEPTED | Use Vite + Svelte + TypeScript with SVG/CSS/HTML for the minimum app architecture. | Continue after the local runtime/build baseline is verified; adjust only on measured need. |
| 2026-11-15 | CONDITIONALLY ACCEPTED | GSAP may support complex narrative timelines; Playwright may automate functional tests. | Both require dependency/browser approval. No D3, PixiJS, Canvas, ScrollTrigger or global store without a demonstrated need. |
| 2026-11-15 | ACCEPTED | Use project-scoped Node `22.23.5 darwin arm64` in the dedicated NVM directory. | Do not alter system Node, shared NVM versions, shell profiles, package manifests or lockfile. Startup is documented in `README.md`. |
| 2026-11-15 | ACCEPTED | Historical data, territorial/editorial links, archive navigation and speculative future relationships are separate semantic layers. | Data edges stay factual and straight; animation does not invent or change endpoints. |
| 2026-11-15 | ACCEPTED | Nov 29, 2026 is the hard publication target; artistic reviews are Nov 18, Nov 23 and Nov 27. | Nov 20 Pages rehearsal is an early target only, requiring explicit authorization for staging, committing, pushing and deployment. |
| 2026-11-15 | ACCEPTED | No package/environment modification or Git publication/history action without explicit approval for that action. | Phase approval does not grant install, stage, commit, push or deployment permission. |

## Unresolved artistic choices
- Chapter 2: choose color shuffling or reordering/snap after the small A/B studies due Nov 19; target decision Nov 20. Only the selected treatment becomes a full chapter behavior.
- Opening: approve montage density, image/line layering, transition and motion at Review A; the feasibility test is not a commitment to a specific final effect.
- Mobile exploration: review a usable focus strategy at Review A; do not merely scale down the wide graph.
- Chapter archive anchors and rights-safe fallback: confirm one source/rights-cleared documentary anchor per chapter; omit uncleared imagery and use an approved citation/text treatment where needed.
- Historical scope: until every displayed edge is sourced, describe the network as selected, source-verified examples, not a complete Census history.

## Unresolved technical and publication gates
- Verify historical sources, question type, geographic scope and archive rights for the examples used in all four chapters.
- Confirm the long-term publication tracking policy: `.gitignore` continues to ignore new files under `/docs/`, `/project/` and `AGENTS.md`. Before this authorized cleanup, only `LICENSE` was tracked; this cleanup versions selected working documents while leaving application code untracked. Do not change ignore rules or stage additional files without approval.
- Test Linux CI/GitHub Pages dependency compatibility separately. Current local ARM64 success does not establish cross-platform lockfile compatibility.
- Verify all relevant Git refs/history, actual Pages settings and the public `dist/` allowlist before any rehearsal or release. No such publication check or deployment has been completed.
