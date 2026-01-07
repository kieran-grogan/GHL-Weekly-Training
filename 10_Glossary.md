# 10 — Glossary (Beginner-Friendly Workflow Terminology)

## Core terms
- **Workflow:** automation steps that run after a trigger event.
- **Trigger:** event that starts the workflow.
- **Action:** a step that does something (send, tag, update, task).
- **Logic:** steps that control timing/path (Wait, If/Else, Stop).
- **Node:** one block in the workflow.
- **Edge:** a connection between nodes.
- **Branch:** a path chosen after a condition.
- **Condition:** a rule (tag exists, field equals).
- **Tag:** label attached to a contact (often used as state).
- **Custom field:** structured data value (lead_source, consent_sms).
- **State:** tags + fields at a given moment.
- **Sequence:** the ordered steps in the workflow.
- **Guardrail:** a check that prevents unsafe actions.
- **Micro-workflow:** modular workflow triggered by a handoff event (often a tag).
- **Validation:** automated checks that your workflow meets requirements.
- **Simulation:** test run that shows step-by-step execution logs.
- **Teach-back:** explain the workflow in plain English like teaching it.

## Debug words
- **Misfire:** workflow didn’t start (trigger didn’t match).
- **Stall:** workflow paused (often at Wait).
- **Wrong branch:** If/Else took unexpected path (condition wrong).
- **No-op:** action ran but made no change (tag remove didn’t apply).
