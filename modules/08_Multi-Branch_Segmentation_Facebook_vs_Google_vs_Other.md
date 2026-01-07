# M08: Facebook vs Google vs Other (3 Paths)

**Phase:** 2 (Branching + Guardrails)

## What this means
You will practice: Facebook vs Google vs Other (3 Paths).

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
- If/Else has at least 2 paths
- Includes Send Email
- Email message includes "FB Path"
- Email message includes "Google Path"
- Email message includes "Other Path"

## Test run cases
### Facebook
Event: Contact Tag
Expected outcomes:
- Email message includes "FB Path"

### Google
Event: Contact Tag
Expected outcomes:
- Email message includes "Google Path"

### Other
Event: Contact Tag
Expected outcomes:
- Email message includes "Other Path"

## Teach-back prompt
Explain why branch order matters and what the Else branch protects you from.

## Hints
- Hint 1: Add multiple branches to If/Else: Facebook, then Google, then Else.
- Hint 2: Ensure each branch sends a distinct email subject.
- Hint 3: If TC3 fails, your Else branch may not be enabled or connected.

## Admin notes (do not show learners)
### Acceptable variants (should pass)
- Use tags per branch instead of sending different emails, with distinct outcomes.
### Common mistakes (what checks should catch)
- Else branch disabled or unconnected.
- Branch conditions swapped causing wrong messages.
- Same email subject across branches.
