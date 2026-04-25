# Contributing to iland

Thank you for your interest in contributing to iland! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Documentation Guidelines](#documentation-guidelines)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)
- [Support](#support)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for details.

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js 18+** installed
- **npm or yarn** package manager
- **Git** for version control
- **GitHub account** for pull requests
- **Code editor** with TypeScript support (VS Code recommended)

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/iland.git
   cd iland
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/original-owner/iland.git
   ```

## Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

```bash
# Copy environment template
cp env.example .env.local
```

Update `.env.local` with your development configuration. See [README.md](./README.md) for detailed setup instructions.

### 3. Set Up Git Hooks

```bash
npm run prepare
```

This installs Husky hooks for pre-commit linting and formatting.

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your changes.

## Code Style Guidelines

### TypeScript

- Use **strict TypeScript** configuration
- Prefer **explicit types** over `any`
- Use **interfaces** for object shapes
- Use **type aliases** for unions and complex types
- Follow **naming conventions**:
  - `PascalCase` for types, interfaces, classes
  - `camelCase` for variables, functions, methods
  - `UPPER_SNAKE_CASE` for constants

### React Components

- Use **functional components** with hooks
- Prefer **named exports** over default exports
- Use **TypeScript interfaces** for props
- Follow **component naming**: `PascalCase`
- Keep components **small and focused**

### File Organization

```
src/
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components
│   ├── ui/                # Base UI components
│   └── [feature]/         # Feature-specific components
├── lib/                   # Utility functions and configurations
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript type definitions
```

### Import Order

1. **React and Next.js imports**
2. **Third-party libraries**
3. **Internal utilities and types**
4. **Relative imports**

```typescript
import React from "react";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/user";
```

## Testing Guidelines

### Test Structure

```
tests/
├── unit/                  # Unit tests
├── integration/           # Integration tests
├── e2e/                   # End-to-end tests
├── fixtures/              # Test data
└── utils/                 # Test utilities
```

### Writing Tests

- **Unit tests** for individual functions and components
- **Integration tests** for API endpoints and workflows
- **E2E tests** for critical user journeys
- Use **descriptive test names**
- Follow **AAA pattern** (Arrange, Act, Assert)

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Examples

```typescript
// Unit test example
describe('Button Component', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

// API test example
describe('POST /api/contact', () => {
  it('should return 400 for missing fields', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({ name: 'Test' });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('email');
  });
});
```

## Documentation Guidelines

### JSDoc Comments

All public functions, classes, and interfaces must have JSDoc comments:

````typescript
/**
 * Creates a new user account with the provided information
 *
 * @param userData - User registration data
 * @param userData.email - User's email address
 * @param userData.password - User's password (min 8 characters)
 * @param userData.name - User's full name
 * @returns Promise<User> - Created user object
 *
 * @example
 * ```typescript
 * const user = await createUser({
 *   email: 'user@example.com',
 *   password: 'securepassword123',
 *   name: 'John Doe'
 * });
 * ```
 *
 * @throws {ValidationError} When user data is invalid
 * @throws {DuplicateEmailError} When email already exists
 */
async function createUser(userData: CreateUserData): Promise<User> {
  // Implementation
}
````

### README Files

- Keep README files **up to date**
- Include **setup instructions**
- Provide **usage examples**
- Document **configuration options**
- Add **troubleshooting sections**

### API Documentation

- Document **all endpoints**
- Include **request/response examples**
- Specify **error codes**
- Provide **authentication details**
- Add **rate limiting information**

## Pull Request Process

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

- Write **clean, well-documented code**
- Add **comprehensive tests**
- Update **documentation**
- Follow **coding standards**

### 3. Commit Your Changes

Use **conventional commit messages**:

```bash
git commit -m "feat: add user authentication system

- Add login/logout functionality
- Implement JWT token management
- Add password reset feature
- Include comprehensive tests

Closes #123"
```

**Commit Types**:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Build/tooling changes

### 4. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Create a pull request on GitHub with:

- **Clear title** describing the change
- **Detailed description** of what was changed
- **Screenshots** for UI changes
- **Test instructions** for reviewers
- **Related issues** linked

### 5. PR Review Process

- **Automated checks** must pass
- **Code review** from maintainers
- **Address feedback** promptly
- **Squash commits** before merge

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No console errors
- [ ] No TypeScript errors

## Screenshots (if applicable)

Add screenshots for UI changes

## Related Issues

Closes #123
```

## Release Process

### Versioning

We follow **Semantic Versioning** (SemVer):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backward-compatible new features
- **PATCH** version for backward-compatible bug fixes

### Release Steps

1. **Update version** in `package.json`
2. **Update changelog** with new features/fixes
3. **Create release branch** from master
4. **Run full test suite** and checks
5. **Deploy to staging** for final testing
6. **Merge to main** and tag release
7. **Deploy to production**
8. **Create GitHub release** with notes

### Pre-release Checklist

- [ ] All tests passing
- [ ] No linting errors
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped
- [ ] Staging deployment successful
- [ ] Security audit completed

## Support

### Getting Help

- **GitHub Issues** for bug reports and feature requests
- **GitHub Discussions** for questions and ideas
- **Email** for security issues: security@iland.com

### Communication Channels

- **Slack** for real-time discussions
- **Discord** for community chat
- **Email** for formal communications

### Resources

- [Project Documentation](./README.md)
- [API Documentation](./API_DOCUMENTATION.md)
- [Development Setup](./README.md#development-setup)
- [Testing Guide](./tests/README.md)

## Recognition

Contributors will be recognized in:

- **README.md** contributors section
- **Release notes** for significant contributions
- **GitHub contributors** page
- **Project documentation**

Thank you for contributing to iland! 🚀
