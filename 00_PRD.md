# 00 — PRD: GHL Workflow Mastery + Mock Workflow Builder
**Date:** January 2026

## 1) Problem
Team members can “generate” workflows using AI, but do not reliably:
- choose the correct trigger/action/logic pattern for a business problem
- configure steps correctly (missing config is the most common failure)
- explain the workflow back
- debug misfires, wrong branches, and stalled sequences

Result: automation quality is inconsistent; production builds require heavy oversight.

## 2) Goal
Train VAs/staff from **ground-zero** to **confident real-world automation builders**.

After completion, learners can:
1) Translate business outcomes → workflow design
2) Build correctly in a GHL-like environment
3) Configure steps correctly
4) Explain and teach workflows back in plain English
5) Debug using execution traces and validation feedback
6) Apply patterns to real client subaccounts safely

## 3) Product
A custom course application with:
- 20–25 progressive modules (practice-first)
- Embedded mock workflow builder (GHL-like mental model)
- Auto-validation (invariant-based; multiple solutions allowed)
- Simulation runner (timeline logs)
- Teach-back requirement (written explanation)
- AI co-pilot (mentor-style guidance)

## 4) Course loop (every module)
1) **Learn** (concepts + patterns + terminology)
2) **Build** in mock builder
3) **Validate** (pass/fail + actionable errors)
4) **Simulate** (run test cases; inspect logs)
5) **Teach-back** (explain what triggers it + what happens + why)

## 5) Key requirements
### 5.1 Mock builder must train the GHL mental model
- Triggers start the workflow
- Actions do work (messages, tags, fields, tasks, internal notifs)
- Logic controls path/timing (If/Else, Wait, Stop)
- Branching must be explicit and traceable
- Simulation must be deterministic and explain “why”

### 5.2 Validation must support multiple correct solutions
Validate invariants (must-haves + outcomes) rather than exact graph matching.

### 5.3 AI co-pilot is mandatory
Learners must have support at “tough spots” without skipping thinking:
- concept explanations
- hint ladder tied to validation errors
- debug coaching via simulation logs
- teach-back coaching via rubric prompts

## 6) MVP scope
### In scope
- Course shell: modules, progress gating, attempt tracking
- Graph editor: drag/drop nodes, edges, inspector
- Node catalog: curated set (MVP) + expansion path (V1)
- Scenario ingestion from JSON-like data (embedded in modules, or a scenario folder)
- Validation engine + simulation runner
- Teach-back capture (text)
- AI co-pilot (basic text chat + “explain error”)

### Out of scope
- Real SMS/email sending
- Full GHL node catalog replication
- Multi-tenant agency user controls
- AI auto-grading as the only grading (manual acceptable)

## 7) Non-functional requirements
- Deterministic simulation (same input → same output)
- Clear, teachable error messages
- Small cohort scale acceptable (10–50 learners)
- Secure data handling (no API keys in browser)
- Fast UX (validate/simulate in <1s for typical workflows)

## 8) Success metrics
- Module pass rate and attempts per module
- Time to pass per module
- Reduction in production workflow errors after training
- Teach-back rubric scores (clarity + correctness)
- Debug competency: time-to-fix broken workflow modules

## 9) Acceptance criteria
- Learners can complete modules sequentially with progress saved
- Mock builder supports building connected workflows
- Validator correctly passes/fails with actionable feedback
- Simulation shows timeline logs and executed nodes
- Teach-back responses recorded per module
- Admin can add modules/scenarios without code changes (data-driven)
