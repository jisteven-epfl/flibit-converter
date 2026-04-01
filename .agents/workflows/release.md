---
description: Perform a routine version release, update changelog, and create a PR.
---
# Version Release and Pull Request Workflow

This workflow automates the process of preparing a new version release, updating documentation, and submitting the PR for review.

## Steps:

1. **Calculate the New Version**: Determine if this is a MAJOR, MINOR, or PATCH release based on the changes made.
   - Use `npm version <major|minor|patch> --no-git-tag-version` to update `package.json`.

2. **Update CHANGELOG.md**:
   - Add a new section at the top of the file for the new version.
   - Follow the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.
   - Categorize changes under: `### Added`, `### Changed`, `### Fixed`, `### Removed`.

3. **Branching**:
   - Create a specific release branch from `main`: `git checkout -b release/v[VERSION]` or `feature/v[VERSION]-[DESCRIPTION]`.

4. **Staging and Committing**:
   - `git add .`
   - `git commit -m "docs: release version [VERSION]"` or a more descriptive message.

5. **Push to GitHub**:
   - `git push -u origin [BRANCH_NAME]`

6. **Submit Pull Request**:
   - Use the `mcp_github-mcp-server_create_pull_request` tool.
   - Target `main` from your new release branch.
   - Provide a comprehensive summary of what was refactored or added.

7. **Tagging (Optional)**:
   - After merging, tag the release using `git tag v[VERSION]` and `git push origin v[VERSION]` to trigger CI/CD deployment.
