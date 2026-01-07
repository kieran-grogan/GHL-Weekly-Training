# 07 — AI Co-pilot Spec (Mentor, Not Autopilot)

## 1) Goal
Help learners at tough spots WITHOUT replacing thinking.

## 2) Co-pilot modes
### Concept coach
- defines terminology
- explains node behavior and patterns
- gives examples in plain English

### Build coach (hint ladder)
- uses validation errors to guide next steps
- escalates hints gradually

### Debug coach
- reads simulation logs
- explains why a branch was taken
- suggests what to test next
- points out misconfigurations

### Teach-back coach
- checks if explanation includes key items:
  - trigger
  - step sequence
  - branch conditions
  - outcomes
  - guardrails/stop rules
  - debug plan

## 3) Hint ladder
- L1: restate requirement
- L2: point to what to inspect (trigger config, missing edge)
- L3: suggest a pattern (guardrail check, no-response pattern)
- L4: provide skeleton of nodes + order (no exact text)
- L5: solution reveal (admin-gated, logged)

## 4) Context injection (critical)
Co-pilot receives:
- scenario objectives + requirements
- allowed nodes
- learner workflow summary (nodes+configs)
- validation errors
- latest simulation logs (if any)
- glossary snippets

## 5) UI integration points
- “Ask Co-pilot” on every module
- “Explain this error” next to each validation error
- “Help me debug” near logs
- “Coach my teach-back” in teach-back editor
