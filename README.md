# Identity Discontinuity 2026

This is the development workspace for an original, research-led interactive artwork. The local Phase 1 app reconstructs 161 unique Category–Year edges from the 2024 script and adds 48 separately marked White/Black mappings confirmed as lines in the prior physical exhibition. Those additions are not part of the 2024 code extraction; their year-level historical equivalence is unverified. `2024 ref/` is read-only source material and has not been independently fact-checked. The combined 209-connection network is shown in two provisional desktop layouts.

## Runtime

The validated runtime is Node `22.23.5` for Apple Silicon (`darwin arm64`), installed in a project-specific NVM directory outside the repository. In a new terminal, start an ARM64 shell and initialize that runtime without changing shell profiles or shared NVM versions:

```sh
arch -arm64 zsh -l
export NVM_DIR="$HOME/.local/share/identity-discontinuity-web/nvm"
source "$HOME/.nvm/nvm.sh" --no-use
nvm use 22.23.5
node -p 'process.version + " " + process.platform + " " + process.arch'
npm --version
```

Run project commands in that same shell:

```sh
npm run check
npm run build
npm run dev
```

Verify the source extraction against the original p5 `setup()` draw output with:

```sh
node --experimental-strip-types scripts/verify-original-network.mjs
```

The development URL is <http://127.0.0.1:5173/identity-discontinuity-web/>. After a successful build, `make preview` serves `dist/` at port 4173 under the same base path. `make install` runs `npm ci`; use it only for an explicitly approved dependency reinstallation, not routine startup.

Dependencies are project-local in `node_modules/`; this project does not use a Python virtual environment. `package.json` and `package-lock.json` define the approved dependency set. Do not change them or install additional tools without approval.

## Research and publication boundary

`public/archives/` is the only intended location for reviewed, publication-safe web assets; it is currently empty. Verify each item's source, rights, credit and relationship context before publishing. Do not imply that an archival subject belonged to a Census category without evidence. Do not publish `2024 ref/`, research, private material, credentials or uncleared assets.

The current working branch is `develop-framework`. Local commits now track the selected documentation and initial Svelte/Vite scaffold. `AGENTS.md` is a local ignored working agreement and is not in the index; `.vscode/settings.json` remains an untracked personal terminal-approval setting. Ignored files may still exist in Git history, and ignore rules do not make a publication safe. No deployment workflow is present in the current worktree.

Staging, committing, pushing and deployment each require explicit authorization. A local build or Pages rehearsal is not proof of a tested live URL.