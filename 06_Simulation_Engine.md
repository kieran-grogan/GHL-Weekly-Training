# 06 — Simulation Engine (Event-Driven, Deterministic)

## 1) Purpose
Simulation teaches the debugging mindset:
- what ran
- what branch was taken
- what state changed
- why something did NOT run

## 2) Inputs
- workflow graph (nodes + edges)
- event { type, payload }
- initial state:
  - contact-based runs: tags + fields
  - system-based runs (scheduler): system state

## 3) Execution model
1) Match trigger:
   - event.type must match trigger.type
   - trigger filters must match payload (e.g., tag name)
2) Traverse graph:
   - execute nodes in order along edges
   - If/Else chooses exactly one branch (first-match)
   - Wait pauses and resumes after time advance
   - Stop ends the run
3) Log every step to timeline

## 4) Logging requirements
Each step log entry includes:
- timestamp (relative or absolute)
- node id/type
- result summary (tag added, message emitted, etc.)
- branch decision details (condition evaluations)

## 5) Wait handling (MVP)
- wait.duration pauses with a scheduled resume time
- UI supports:
  - “advance time by X”
  - “jump to next scheduled resume”

## 6) Multi-workflow simulation (for micro-workflows)
If enabled, the engine:
- observes tag.add events
- triggers other workflows with contact.tagAdded trigger matching that tag
- prevents infinite loops:
  - max total executed nodes per run
  - loop detection (same workflow triggered repeatedly by same tag)

## 7) Output comparisons (for validation)
Expectations supported:
- messages contains substring(s)
- tagsAdded/tagsRemoved
- fieldsEqual
- tasksCreated contains text
- notifications contains text
- webhooksFired urlContains

## 8) Determinism requirements
- no randomness unless explicitly configured
- same input → same log output
