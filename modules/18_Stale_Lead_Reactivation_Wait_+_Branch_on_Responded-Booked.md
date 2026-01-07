# M18: Reactivate Old Leads Safely

**Phase:** 4 (Pipeline + Ops)

## What this means
You will practice: Reactivate Old Leads Safely.

## Why this matters
Simple, clear workflows help your team respond fast and avoid mistakes.

## Where this is in HighLevel
- Workflows -> + Add Trigger -> Contact Tag
- Workflows -> + Add Action -> Send Email, Add Contact Tag, Wait, If/Else

## Practice steps
1) Add the trigger: Contact Tag.
2) Add the actions you need: Send Email, Add Contact Tag.
3) Add logic steps if needed: Wait, If/Else.
4) Fill required fields (marked with *).
5) Run a test run.

## Allowed steps (mock builder)
### Triggers
- Contact Tag
### Actions
- Send Email
- Add Contact Tag
### Logic
- Wait
- If/Else

## Requirements checklist
- Trigger is Contact Tag
- Trigger field tag equals stage:contacted
- Includes Wait
- Has at least 1 If/Else step
- Includes Send Email
- Includes Add Contact Tag
- Order: Wait -> If/Else
- Email message includes "Checking in"
- Adds tag: stage:reactivation

## Test run cases
### Stale, no progress -> reactivation sends
Event: Contact Tag
Expected outcomes:
- Email message includes "Checking in"
- Adds tag: stage:reactivation

### Already booked -> no reactivation
Event: Contact Tag
Expected outcomes:
- No expected outcomes listed.

## Teach-back prompt
Explain how you prevent reactivation from hitting someone who already progressed and how you would implement the OR logic.

## Hints
- Hint 1: After the wait, add a check that detects progress (responded/booked/won) and ends.
- Hint 2: If OR is not supported in one condition, nest If/Else checks before sending.

## Admin notes (do not show learners)
### Acceptable variants (should pass)
- Use SMS for reactivation if consent exists, with fallback email.
### Common mistakes (what checks should catch)
- Reactivation sends even when booked because end condition is missing.
- Wait too short so reactivation fires immediately.
