# GHL Workflow Mastery — Build Document Set (Markdown)
**Date:** January 2026

This folder contains the complete markdown document set to enable an AI coding agent (Build AI) to implement:

1) A **20–25 module** progressive training course: learn → build → validate → simulate → teach-back  
2) A **GHL-like mock workflow builder** (drag/drop graph)  
3) An **invariant-based validator** (multiple correct solutions supported)  
4) A **simulation runner** (timeline logs + executed nodes + branch decisions)  
5) An **AI co-pilot** (concept coach, build coach, debug coach, teach-back coach)

## How to use these docs
- Start with `00_PRD.md` and `01_Architecture.md` to implement the platform.
- Implement the node catalog described in `03_Node_Catalog.md`.
- Implement scenario ingestion per `04_Scenarios_and_Authoring.md`.
- Implement validation per `05_Validation_Engine.md` and simulation per `06_Simulation_Engine.md`.
- Implement the AI co-pilot per `07_AI_CoPilot.md`.
- Populate the course modules using the module files in `/modules/`.
  - Each module contains:
    - lesson content outline
    - lab challenge spec
    - allowed nodes
    - invariants
    - test cases
    - hints ladder
    - teach-back prompt + rubric
    - “Real GHL mapping” notes

## File index
- `00_PRD.md` — Product requirements and acceptance criteria
- `01_Architecture.md` — Technical architecture (no code) + data flow
- `02_Curriculum_Index.md` — Module sequence and difficulty ramp
- `03_Node_Catalog.md` — Node types + config schemas (MVP + V1 expansion)
- `04_Scenarios_and_Authoring.md` — Scenario definition schema + authoring rules
- `05_Validation_Engine.md` — Invariant-based validation design + rule types
- `06_Simulation_Engine.md` — Event-driven simulation design + timeline logs
- `07_AI_CoPilot.md` — Co-pilot modes, hint ladder, context injection
- `08_UX_UI_Spec.md` — UX/UI requirements for the course + builder
- `09_Rubrics_and_Review.md` — Teach-back rubric + reviewer workflow
- `10_Glossary.md` — Beginner-friendly workflow terminology
- `/modules/` — Module content specs (25 modules, progressive)

## Non-goals (MVP)
- No real sending of SMS/email.
- No complete 1:1 replication of every GHL node (catalog is curated but expandable).
- No agency multi-tenant user management.
