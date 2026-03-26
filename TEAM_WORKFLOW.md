# Team Workflow

## 1) Start a Task

```bash
git checkout main
git pull
git checkout -b feat/<short-name>
```

For bugfixes/chore/docs:

- `fix/<short-name>`
- `chore/<short-name>`
- `docs/<short-name>`

## 2) Local Development

Start stack and initialize project:

```bash
make bootstrap
```

Optional: recreate demo content:

```bash
make seed-demo
```

## 3) Before Opening PR

Run local checks:

```bash
make ci
```

Rebase branch on latest `main`:

```bash
git fetch origin
git rebase origin/main
```

Push branch:

```bash
git push -u origin <branch-name>
```

## 4) Pull Request

- Fill PR template sections: `Summary`, `Why`, `Test Plan`, `Checklist`.
- Ensure CI is green.
- Keep PR scope focused (one feature/fix/chore per PR).

## 5) Merge Policy

- Preferred merge strategy: **Squash and merge**.
- Delete branch after merge (remote + local).

## 6) After Merge

```bash
git checkout main
git pull
git branch -d <branch-name>
```

If remote branch was not auto-deleted:

```bash
git push origin --delete <branch-name>
```
