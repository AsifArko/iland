# Contributing to iLand

Thank you for your interest in contributing. This document explains how to work
on the project in a way that keeps reviews smooth and the codebase healthy.

## Code of conduct

Participation is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By
interacting with this project you agree to uphold it.

## How to contribute

- **Bug reports**: Use the Bug Report issue template and include steps to
  reproduce, expected vs actual behavior, and environment details (OS, Node
  version, browser if relevant).
- **Feature ideas**: Use the Feature Request template and describe the problem
  you are solving, not only the solution you prefer.
- **Pull requests**: Keep changes focused, explain the “why” in the PR
  description, and link related issues when applicable.

## Development setup

1. **Node.js**: Use Node.js **22+** (see `package.json` `engines`).
2. **Install**: `npm install`
3. **Environment**: Copy `env.example` and configure variables required for the
   area you are changing (Stripe, Sanity, email, etc.). Do not commit secrets.
4. **Run locally**: `npm run dev`

See the main [README](README.md) for fuller setup and deployment notes.

## Before you open a PR

Run these from the repository root and fix any failures:

```bash
npm run lint
npm run type-check
npm run format:check
npm test
```

For changes that touch automated tests, prefer adding or updating tests in
`tests/` when it is practical.

## Style and conventions

- Match existing patterns for components, API routes, and Sanity-related code.
- Use TypeScript types deliberately; avoid `any` unless there is a strong
  reason.
- Prefer small, reviewable commits with clear messages.

## Security

If you believe you have found a security vulnerability, **do not** open a public
issue. Follow [SECURITY.md](SECURITY.md) instead.

## Questions

If something in this guide is unclear, open a discussion issue or ask in your PR
so maintainers can clarify and we can improve this document.
