# Branch Protection for `main`

Use these GitHub UI settings to enforce the repository workflow.

## Steps

1. Open repository settings: `Settings -> Branches`.
2. In **Branch protection rules**, click **Add rule**.
3. Set **Branch name pattern** to `main`.
4. Enable:
   - **Require a pull request before merging**
   - **Require status checks to pass before merging**
   - Select CI check: `CI / validate`
   - **Require branches to be up to date before merging**
5. (Recommended) Enable:
   - **Require approvals** (1 minimum)
   - **Dismiss stale pull request approvals when new commits are pushed**
6. Enable **Do not allow bypassing the above settings** for strict enforcement.
7. Save the rule.

## Expected Result

- Direct pushes to `main` are blocked.
- PR is required for every change.
- Merge is allowed only after successful CI.
