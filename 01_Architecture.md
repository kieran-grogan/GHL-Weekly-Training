# 01 — Architecture (No Code): Course + Builder + Validator + Simulation

## 1) System overview
The system is a course app with an embedded workflow builder. Each module is defined by:
- lesson content
- a scenario definition (allowed nodes, invariants, test cases)
- teach-back prompt and rubric

Learners build workflows as graphs. The validator checks invariants and simulates test cases.

---

## 2) Recommended stack (TypeScript)
- Next.js + React + TypeScript
- Graph UI: React Flow (or similar)
- State: Zustand
- Persistence: LocalStorage (MVP), DB (V1)
- AI co-pilot: server-side API route calling an LLM (never expose keys client-side)

---

## 3) Core components
### 3.1 Course engine
- module list + gating
- stores progress:
  - module status: locked / available / completed
  - attempts: validate attempts, simulate runs
  - teach-back submission text
- shows module tabs: Learn / Build / Validate / Simulate / Teach-back

### 3.2 Workflow builder (graph editor)
- node palette (sidebar)
- canvas graph (nodes + edges)
- inspector (config)
- workflow settings (optional panel):
  - allow re-entry (simulate as “can trigger again”)
  - stop rules (simulate as tags/fields + checks)
- exports workflow graph to JSON

### 3.3 Validation engine
- checks:
  1) structural invariants (graph connectedness, required nodes)
  2) config completeness (required fields)
  3) requirement rules (scenario-defined)
  4) simulation test case outcomes

### 3.4 Simulation engine
- event-driven execution
- deterministic If/Else evaluation:
  - top-down branch evaluation
  - first matching branch continues
- Wait nodes:
  - pause and resume on time advance
- outputs:
  - timeline log (timestamped)
  - executed nodes list
  - final contact/system state

### 3.5 AI co-pilot
Modes:
- concept coach (definitions, patterns)
- build coach (hint ladder)
- debug coach (reads logs + errors)
- teach-back coach (rubric prompts)

Context injection:
- scenario objectives + requirements
- learner graph summary
- validation errors
- simulation logs
- glossary

---

## 4) Data model (conceptual)
### 4.1 Workflow graph
- nodes: { id, type, kind, config, position }
- edges: { id, source, target, sourceHandle, targetHandle }

### 4.2 State model
**Contact-based runs (most modules)**
- tags: string[]
- fields: Record<string, string|number|boolean|null>
- messages: [{channel, subject?, body}]
- tasks: [{title, assignedTo?, dueAt?}]
- notifications: [{channel, recipient, message}]
- webhooks: [{url, method, payloadPreview}]

**System-based runs (scheduler modules)**
- systemTasks: [...]
- systemNotifications: [...]
- systemLogs: [...]

---

## 5) Key design decisions (to preserve learning)
- Validation should not reveal the whole solution graph.
- Provide teachable errors and progressive hints.
- Simulation should explain WHY (conditions evaluated).
- “Teach-back” is required to pass a module.

---

## 6) Extensibility
- Node catalog is data-driven.
- Scenarios are data-driven.
- Add new modules by adding a new module markdown + scenario block.
- V1 expands node catalog (scheduler trigger, workflow goto, response triggers).
