# M11: 2-Step Follow-up With a Delay

**Phase:** 3 (Sequences + Timing)

## What this means
You will practice: 2-Step Follow-up With a Delay.

## Why this matters
This helps you follow up without being spammy.

## Where this is in HighLevel
- Workflows -> + Add Trigger -> Contact Tag
- Workflows -> + Add Action -> Send Email, Wait

## Practice steps
1) Add the trigger: Contact Tag.
2) Add the actions you need: Send Email.
3) Add logic steps if needed: Wait.
4) Fill required fields (marked with *).
5) Run a test run.

## Allowed steps (mock builder)
### Triggers
- Contact Tag
### Actions
- Send Email
### Logic
- Wait

## Requirements checklist
- Trigger is Contact Tag
- Trigger field tag equals stage:contacted
- Includes Wait
- Includes Send Email
- Order: Send Email -> Wait -> Send Email
- Email message includes "Touch 1"
- Email message includes "Touch 2"

## Test run cases
### Sequence runs with time advance
Event: Contact Tag
Expected outcomes:
- Email message includes "Touch 1"
- Email message includes "Touch 2"

## Teach-back prompt
Explain how the wait works and how you would test it using test run controls.

## Hints
- Hint 1: Place a Wait step between the first and second email.
- Hint 2: If only Touch 1 appears, advance time in test run to pass the wait.
- Hint 3: Use a duration of at least 1 hour to satisfy the validator rule.

## Admin notes (do not show learners)
### Acceptable variants (should pass)
- Use SMS for Touch 2 if consent is present.
### Common mistakes (what checks should catch)
- No wait between messages.
- Wait placed after the second message.
- Second message not connected after the wait.
