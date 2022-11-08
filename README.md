# semantic-release-tools

## is-release-branch.js

NodeJS script which returns exit code `0` if the string in `GIT_BRANCH` (environment variable) is a valid release branch in the semantic-release configuration.

### Requirements

```
npm install --save micromatch
```

### Usage

```
info: validating 'feature-foo' against the following configuration
[
  '+([0-9])?(.{+([0-9]),x}).x',
  'master',
  'next',
  'next-major',
  { name: 'beta', prerelease: true },
  { name: 'alpha', prerelease: true }
]
info: no matches found - branch 'feature-foo' is NOT a release branch

-bash$ GIT_BRANCH=1.x node is-release-branch.js
info: validating '1.x' against the following configuration
[
  '+([0-9])?(.{+([0-9]),x}).x',
  'master',
  'next',
  'next-major',
  { name: 'beta', prerelease: true },
  { name: 'alpha', prerelease: true }
]
info: branch 1.x matches pattern '+([0-9])?(.{+([0-9]),x}).x'
info: matches found - branch '1.x' is a release branch
```
