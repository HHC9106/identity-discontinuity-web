# Identity Discontinuity 2026

This is the development workspace for an original, research-led interactive artwork. The current app is a framework placeholder; the network, chapters and archive interactions have not been implemented. `2024 ref/` is read-only visual/technical reference material, not the required architecture or a verified data source.

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

The development URL is <http://127.0.0.1:5173/identity-discontinuity-web/>. After a successful build, `make preview` serves `dist/` at port 4173 under the same base path. `make install` runs `npm ci`; use it only for an explicitly approved dependency reinstallation, not routine startup.

Dependencies are project-local in `node_modules/`; this project does not use a Python virtual environment. `package.json` and `package-lock.json` define the approved dependency set. Do not change them or install additional tools without approval.

## Research and publication boundary

`public/archives/` is the only intended location for reviewed, publication-safe web assets; it is currently empty. Verify each item's source, rights, credit and relationship context before publishing. Do not imply that an archival subject belonged to a Census category without evidence. Do not publish `2024 ref/`, research, private material, credentials or uncleared assets.

The current working branch is `develop-framework`. The local documentation baseline tracks `README.md`, `docs/CURRENT_BUILD_SPEC.md` and the `project/` workflow files; `AGENTS.md` is a local ignored working agreement and is not in the index. Application/configuration files remain untracked until explicitly selected. Ignored files may still exist in Git history, and ignore rules do not make a publication safe. No deployment workflow is present in the current worktree.

Staging, committing, pushing and deployment each require explicit authorization. A local build or Pages rehearsal is not proof of a tested live URL.