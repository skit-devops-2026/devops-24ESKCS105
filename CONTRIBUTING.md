# Contributing to Skill Swapify

Thanks for contributing! This project follows a simple branch-and-pull-request
workflow so `main` always stays green.

## Branches

Never commit directly to `main`. Create a short-lived branch for every change:

- `feature/<short-name>` - new functionality, e.g. `feature/skills-api`
- `docs/<short-name>` - documentation only, e.g. `docs/readme-guide`
- `fix/<short-name>` - bug fixes, e.g. `fix/health-endpoint`

## Commits

Write descriptive commit messages: say what changed and why.
Good: `Add /api/skills endpoint for the frontend skills board`
Bad: `update`, `fix`, `changes`, `final`

## Pull requests

1. Push your branch and open a pull request into `main`.
2. **Always write a description**: what the change does, why it is needed,
   and how you tested it. Pull requests without a description may be sent back.
3. Wait for the CI workflow (GitHub Actions) to pass - it runs the test suite.
   The pipeline must genuinely fail when tests fail; do not bypass it.
4. Merge the pull request once CI is green. Keep the branch after merging so
   the project history stays visible.

## Running the checks locally

```bash
make install   # install backend dependencies
make test      # run the automated test suite
make build     # verify the static frontend files
docker compose up --build   # full stack: app, Prometheus, Grafana
```
