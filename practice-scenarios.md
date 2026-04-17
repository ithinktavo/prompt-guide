# Practice Scenarios

> **What this is**: Many exercises in the Hands-On Workbook ask you to "use a real task from your work." If you're between projects, between clients, or just want a neutral practice case, pick one of the 10 scenarios below. Each one is realistic, self-contained, and varied enough to exercise different prompting techniques.

---

## How to Use This Section

For any exercise that says *"pick a real task"*, *"use a real bug from your project"*, or *"think of a real client requirement"*:

1. Skim the scenarios below
2. Pick one that interests you (or just match the task type the exercise expects — bug fix, code review, etc.)
3. Use it as if it were your real work
4. Move on to the next exercise

You can use the same scenario across multiple exercises (e.g., scope it in Exercise 32, build a template for it in Exercise 33, validate it in Exercise 34).

---

## Scenario 1 — Slow PostgreSQL Query

**Task type**: Bug fix / performance / SQL

**Stack**: PostgreSQL 15, Node.js backend, ~50M-row `orders` table

**Situation**: A nightly reporting query that joins `orders` and `shipments` has gradually slowed from 30 seconds to 12 minutes over the past 6 months. The team suspects it's due to data growth + missing indexes, but no one has profiled it.

**Suggested prompt**: Optimize the query, suggest indexes, or rewrite it as multiple staged queries.

---

## Scenario 2 — React Component Re-Renders Excessively

**Task type**: Bug fix / performance / React

**Stack**: React 18 + TypeScript, Redux Toolkit, ~200 components

**Situation**: A `UserDashboard` component re-renders ~40 times when the user navigates to the page. Profiling shows it's reacting to unrelated Redux store updates. `React.memo` was tried; no improvement.

**Suggested prompt**: Diagnose the over-rendering and propose a minimal fix. Don't change the Redux store shape.

---

## Scenario 3 — NullPointerException in Spring Boot Service

**Task type**: Bug fix / Java

**Stack**: Java 17, Spring Boot 3.2, PostgreSQL, JUnit 5

**Situation**: `OrderService.cancelOrder()` throws `NullPointerException` intermittently in production but never in local dev or staging. Stack trace points to line 142, where `order.getCustomer().getEmail()` is called. Logs suggest the NPE only happens for orders older than 90 days.

**Suggested prompt**: Diagnose root cause, propose minimal fix, add a regression test.

---

## Scenario 4 — Refactor: Extract Duplicated Validation Logic

**Task type**: Code generation / refactor

**Stack**: TypeScript / Node.js / Express

**Situation**: Five different REST controllers (`/users`, `/orders`, `/payments`, `/shipments`, `/refunds`) each have their own request-body validation logic, all 80% similar but slightly different. The team wants a shared `ValidationMiddleware` that uses Zod schemas.

**Suggested prompt**: Design the middleware, refactor one controller as a worked example.

---

## Scenario 5 — Generate Unit Tests for a Service Class

**Task type**: Test generation

**Stack**: Java 17, Spring Boot, JUnit 5, Mockito, Testcontainers

**Situation**: A new `PaymentReconciliationService` class has 6 public methods and 0 tests. PRs require 80% coverage before merging. Existing tests in the same module use `@ExtendWith(MockitoExtension.class)` and follow Given/When/Then naming.

**Suggested prompt**: Generate tests for all 6 methods, matching the existing style, covering happy path + 1 edge case + 1 error case each.

---

## Scenario 6 — Write API Documentation from Existing Code

**Task type**: Documentation

**Stack**: Express + TypeScript, OpenAPI 3.1 spec

**Situation**: The `/api/v2/billing` endpoints (12 routes) have working code but no documentation. The team wants OpenAPI spec entries written from the route handlers, including request/response schemas, status codes, and error responses.

**Suggested prompt**: Document one route as a worked example, then provide a template for the remaining 11.

---

## Scenario 7 — Architecture Decision: Monorepo vs. Multi-Repo

**Task type**: Architecture / decision document

**Stack**: 4 microservices (Java, Node.js, Python, Go), 6-developer team, Kubernetes deployment

**Situation**: Currently 4 separate repos, each with its own CI/CD. Builds are getting harder to coordinate and shared library changes require 4 PRs. The team is debating consolidating into a monorepo (Nx or Turborepo).

**Suggested prompt**: Multi-persona analysis (developer / DevOps / tech lead) → recommendation → ADR.

---

## Scenario 8 — Database Migration: Add NOT NULL Column to Large Table

**Task type**: Migration script / risk assessment

**Stack**: PostgreSQL 15, ~50M-row `users` table, Flyway migrations

**Situation**: Need to add a `last_login_at TIMESTAMPTZ NOT NULL` column to `users`. A naive `ALTER TABLE ... ADD COLUMN ... NOT NULL DEFAULT now()` would lock the table for ~15 minutes — unacceptable in production.

**Suggested prompt**: Propose a safe staged migration (add as nullable → backfill in batches → add NOT NULL constraint). Include rollback plan.

---

## Scenario 9 — Code Review: Security Audit of Authentication Endpoint

**Task type**: Code review / security

**Stack**: Express + TypeScript, JWT, bcrypt, PostgreSQL

**Situation**: A junior dev just submitted a PR for `/api/auth/login` and `/api/auth/reset-password`. Before merging, you want a focused security review covering: input validation, timing attacks on password compare, token expiry, rate limiting, error messages that leak user existence.

**Suggested prompt**: Multi-persona review (security engineer + senior backend dev) → issues by severity → suggested fixes.

---

## Scenario 10 — Bug: Intermittent Test Failure in CI

**Task type**: Debugging / flaky test

**Stack**: Jest + React Testing Library, GitHub Actions CI

**Situation**: `OrderForm.test.tsx` passes locally 100% of the time but fails in CI roughly 1 in 10 runs. Failure message: *"Unable to find element with text: 'Order placed'"*. The test uses `waitFor` with default 1000ms timeout. CI runs are slower than local.

**Suggested prompt**: Diagnose probable causes (timing, async state, mock leakage), recommend fix, add safeguards to prevent recurrence.

---

## Tips for Using These Scenarios

- **Don't switch scenarios mid-module.** If you start Module 8 with Scenario 5, finish Module 8 with Scenario 5 — you'll see how a single task evolves through scoping → template → validation.
- **Match scenario to module.** Module 1's foundational exercises work with any scenario. Module 5's Copilot exercises work best with Scenarios 1, 3, 4, or 5 (where you have actual code to reference). Module 8's client work fits best with Scenarios 4–6 (clear deliverables).
- **Substitute your own stack.** If you don't work with PostgreSQL/Java/React, mentally swap to MongoDB/Python/Vue. The scenarios are about *task shape*, not specific tech.
- **Combine scenarios for the End-to-End Challenge** (Exercise 35). Pick a multi-step one like Scenario 7 (architecture decision → ADR → implementation plan) for the most thorough practice.
