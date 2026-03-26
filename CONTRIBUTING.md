# Contributing Guide

## Workflow Overview

Use short-lived branches and open a Pull Request for every change. Do not push directly to `main`.

Recommended flow:

1. Sync `main`:
   - `git checkout main`
   - `git pull`
2. Create a branch from `main`.
3. Commit small logical changes.
4. Run validation locally (`make ci`) before opening PR.
5. Rebase onto latest `main` before merge review:
   - `git fetch origin`
   - `git rebase origin/main`
6. Merge PR with **Squash and merge**.
7. Delete merged branch locally and remotely.

## Branch Naming

Use one of the following prefixes:

- `feat/<short-description>` - new functionality
- `fix/<short-description>` - bug fixes
- `chore/<short-description>` - maintenance, infra, deps
- `docs/<short-description>` - documentation-only updates

Examples:

- `feat/portfolio-contact-form`
- `fix/graphql-proxy-target`
- `chore/update-ci-workflow`

## Commit Message Convention

Use conventional-style prefixes:

- `feat: ...`
- `fix: ...`
- `chore: ...`
- `docs: ...`
- `refactor: ...`
- `test: ...`

Examples:

- `feat: add automated wordpress bootstrap flow`
- `fix: use wordpress service for vite graphql proxy`
- `docs: update readme for make targets`

## Pull Request Rules

Each PR should:

- Target one clear scope (feature/fix/chore).
- Include a short "why" and a test plan.
- Pass local checks before submission.
- Include Figma source context for UI changes:
  - Figma frame URL
  - design version/date
  - list of affected sections/components
  - UI acceptance criteria

Required local command before PR:

```bash
make ci
```

For full pre-PR gate:

```bash
make prepr
```

For UI component changes, also verify stories:

```bash
npm --prefix frontend run storybook:build
```

If your change affects Docker/bootstrap flow, also run:

```bash
make bootstrap
```

## Merge Strategy

Default merge strategy: **Squash and merge**.

Why:

- Keeps `main` history clean and readable.
- Makes rollback easier (one commit per PR).

Use `Rebase and merge` only when preserving multiple commits in `main` is intentional and reviewed.

## Figma-to-Code Contract

For any visual feature, PR must include:

1. `Figma Frame URL`
2. `Design Version` (date or tag)
3. `Target Components` (e.g. `HeroSection`, `ProjectsGrid`)
4. `Acceptance Criteria` (responsive states, spacing, typography, interactions)
5. `Design Sign-off` (approved / pending)

## UI Structure Conventions (Figma-aligned)

Use this frontend structure for UI work:

- `frontend/src/components/section/*` for page-level sections (`HeroSection`, `ProjectsSection`)
- `frontend/src/components/ui/*` for reusable primitives (`TagChip`, `SectionCard`)
- `frontend/src/pages/*` for route-level composition
- `frontend/src/styles/tokens.css` for shared design tokens

If a component in `frontend/src/components/ui/*` changes, update/create its Storybook story.

Component naming should match Figma semantics when possible (`HeroSection`, `SkillsSection`, `ExperienceCard`).

## Branch Cleanup

After merge:

```bash
git checkout main
git pull
git branch -d <branch-name>
git push origin --delete <branch-name>
```
