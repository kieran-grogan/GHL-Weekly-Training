# M09: Do Not Contact: Stop Messages

**Phase:** 2 (Branching + Guardrails)

## What this means
You will practice: Do Not Contact: Stop Messages.

## Why this matters
This prevents sending messages to the wrong people.

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
- Email message includes "Allowed"

## Test run cases
### Contact flagged do-not-contact
Event: Contact Tag
Expected outcomes:
- No expected outcomes listed.

### Normal contact
Event: Contact Tag
Expected outcomes:
- Email message includes "Allowed"

## Teach-back prompt
Explain what the end path accomplishes and why it must occur before any send actions.

## Hints
- Hint 1: Put If/Else immediately after trigger. Condition: tagExists status:do-not-contact.
- Hint 2: Ensure the True branch contains only end and no send actions.
- Hint 3: If TC1 sends an email, your guardrail check is missing or reversed.

## Admin notes (do not show learners)
### Acceptable variants (should pass)
- Add an internal-only notify action before Endping.
### Common mistakes (what checks should catch)
- Guardrail check placed after messaging.
- Checking wrong tag name.
- Else branch missing.
