# Release Operations

This document catalogues the manual steps and prerequisites for the release workflow. The automated flow lives in `.github/workflows/`. Each publish channel is gated on a repository variable — when the variable is `true` and the corresponding secret is configured, publishing is automatic. Otherwise the channel is skipped and the steps below serve as the manual fallback.

## Prerequisites (one-time setup)

### GitHub

- **`RELEASE_PR_TOKEN`** secret: a Personal Access Token with repo contents-write. Used by `release-pr.yml` to push the bump commit to `dev` and open the release PR. The default `GITHUB_TOKEN` is avoided because PRs opened with it don't trigger CI.
- **`dev`** branch as the default branch. Feature work lands on `dev`; only release PRs go `dev → main`.
- Branch protection on `main` (PR + required CI) and `dev` (required CI on PRs).

### VS Code Marketplace

- A publisher account named `synthpunk` on the [VS Code Marketplace](https://marketplace.visualstudio.com/manage).
- **`VS_MARKETPLACE_TOKEN`** secret: a Personal Access Token from the Marketplace publisher dashboard.
- **`PUBLISH_VSCODE`** variable set to `true` to enable auto-publishing.

### OpenVSX

- An account on [OpenVSX](https://open-vsx.org).
- **`OVSX_TOKEN`** secret: an access token from your OpenVSX settings.
- **`PUBLISH_OPENVSX`** variable set to `true` to enable auto-publishing.

### Zed

- A Zed account with extension publishing access.
- **`ZED_PUBLISH_TOKEN`** secret: the publish token (if the `zed extension publish` CLI supports it — confirm the exact mechanism).
- **`PUBLISH_ZED`** variable set to `true` to enable auto-publishing.

### Neovim (synthpunk.nvim)

- An empty `slowdini/synthpunk.nvim` repository on GitHub.
- **`SYNTHPUNK_NVIM_DEPLOY_KEY`** secret: an SSH deploy key with write access to `slowdini/synthpunk.nvim`.
- **`PUBLISH_NVIM`** variable set to `true` to enable auto-publishing.

## Manual publishing (when a channel is not automated)

If a publish variable is not set (or the secret is missing), the corresponding job is skipped. Run these commands manually after the GitHub release is created:

### VS Code Marketplace

```sh
git checkout vX.Y.Z
cd themes/vscode
npx @vscode/vsce publish -p <VS_MARKETPLACE_TOKEN>
```

### OpenVSX

```sh
git checkout vX.Y.Z
cd themes/vscode
npx @vscode/vsce package -o synthpunk-vX.Y.Z.vsix
npx ovsx publish synthpunk-vX.Y.Z.vsix -p <OVSX_TOKEN>
```

### Zed

```sh
git checkout vX.Y.Z
cd themes/zed
zed extension publish
```

### Neovim (synthpunk.nvim)

```sh
git checkout vX.Y.Z
git clone git@github.com:slowdini/synthpunk.nvim.git /tmp/synthpunk.nvim
cd /tmp/synthpunk.nvim
rm -rf -- */
cp -r /path/to/synthpunk/themes/neovim/* .
git add -A
git commit -m "chore: release vX.Y.Z"
git tag vX.Y.Z
git push origin main
git push origin vX.Y.Z
```

## Release flow summary

1. **Trigger**: Actions → "Release PR" workflow → Run with version `X.Y.Z`.
2. **Bump**: `release-pr.yml` bumps all manifests, commits to `dev`, opens `dev → main` PR.
3. **Review**: Edit the PR body with release notes, merge into `main`.
4. **Auto-release**: `release.yml` on push to `main`:
   - Tags `vX.Y.Z`, creates GitHub Release (notes from PR body or auto-generated).
   - Builds all themes, uploads Starship + WezTerm files to the release.
   - Builds VS Code VSIX, publishes to Marketplace/OpenVSX if configured.
   - Publishes Zed extension if configured.
   - Splits `themes/neovim/` to `slowdini/synthpunk.nvim` if configured.
5. **Back-sync**: Merge `main` back into `dev`.
