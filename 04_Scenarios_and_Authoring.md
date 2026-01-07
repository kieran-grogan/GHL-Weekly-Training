# 04 — Scenarios and Authoring (Data-Driven Labs)

## 1) Scenario concept
Every module’s lab is driven by a scenario definition:
- allowed nodes
- requirements (invariants)
- test cases (events + expected outcomes)
- hints ladder
- teach-back prompt and rubric

This allows adding new modules without rewriting the app.

---

## 2) Scenario schema (recommended)
```json
{
  "id": "m01_welcome_sms",
  "title": "New Contact → Welcome SMS",
  "phase": 1,
  "estimatedMinutes": 12,
  "objectives": ["..."],
  "allowedNodes": { "triggers": [], "actions": [], "logic": [] },
  "requirements": [
    { "type": "triggerIs", "value": "contact.created" },
    { "type": "mustHaveNode", "value": "sms.send" }
  ],
  "testCases": [
    {
      "name": "Contact created",
      "event": { "type": "contact.created" },
      "initialState": { "tags": [], "fields": { "first_name": "Sam" } },
      "expect": { "messages": [{ "channel": "sms", "contains": ["Welcome"] }] }
    }
  ],
  "teachBackPrompt": "Explain what triggers this workflow and what happens next.",
  "hints": [
    { "level": 1, "text": "..." },
    { "level": 2, "text": "..." }
  ],
  "adminNotes": {
    "acceptableVariants": ["..."],
    "commonMistakes": ["..."]
  }
}
```

---

## 3) Authoring rules (instructional design)
1) Introduce one primary new concept per module
2) Validate invariants, not exact graphs
3) Include at least:
   - one happy path test
   - one negative test (should not run OR else path)
4) Hints must teach thinking, not give the full solution immediately
5) Teach-back must force explanation of trigger + steps + branches + outcomes

---

## 4) Multi-workflow scenarios (for micro-workflows)
For modules that teach micro-workflows, the scenario can define multiple workflows:
```json
{
  "workflows": [
    { "workflowId": "router", "scenario": { ... } },
    { "workflowId": "nurture_fb", "scenario": { ... } }
  ],
  "systemRules": { "autoTriggerOnTagAdded": true }
}
```

Simulation then:
- runs the first workflow
- when tag.add happens, it can trigger other workflows whose trigger matches

---

## 5) Scenario linter requirements
Before runtime, validate scenario definitions:
- node types exist in catalog
- rule types are valid
- test case expectations use supported outcome checks
- no contradictory requirements
