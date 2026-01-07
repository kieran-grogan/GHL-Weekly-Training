# M07: Different Message for Facebook Leads

**Phase:** 2 (Branching + Guardrails)

## What this means
You will practice: Different Message for Facebook Leads.

## Why this matters
Simple, clear workflows help your team respond fast and avoid mistakes.

## Where this is in HighLevel
- Workflows -> + Add Trigger -> Contact Tag
- Workflows -> + Add Action -> Send Email, If/Else

## Practice steps
1) Add the trigger: Contact Tag.
2) Add the actions you need: Send Email.
3) Add logic steps if needed: If/Else.
4) Fill required fields (marked with *).
5) Run a test run.

## Allowed steps (mock builder)
### Triggers
- Contact Tag
### Actions
- Send Email
### Logic
- If/Else

## Requirements checklist
- Trigger is Contact Tag
- Trigger field tag equals stage:new
- Has at least 1 If/Else step
- Includes Send Email
- Email message includes "Facebook"
- Email message includes "General"

## Test run cases
### Facebook lead
Event: Contact Tag
Expected outcomes:
- Email message includes "Facebook"

### Google lead
Event: Contact Tag
Expected outcomes:
- Email message includes "General"

## Teach-back prompt
Explain how field-based segmentation works and what happens for a Google lead vs a Facebook lead.

## Hints
- Hint 1: Condition should be field lead_source equals Facebook.
- Hint 2: Use distinct email subjects so check can detect which branch ran.
- Hint 3: If both test cases produce the same subject, check your branch connections.

## Admin notes (do not show learners)
### Acceptable variants (should pass)
- Use SMS instead of Email if consent is present, with distinct outputs.
### Common mistakes (what checks should catch)
- Checking leadSource (typo) rather than lead_source.
- Inconsistent field values causing branch failures.
- Else branch missing.
