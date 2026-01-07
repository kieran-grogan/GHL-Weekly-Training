# M21: General Follow-up Mini-Workflow (Stops on Reply)

**Phase:** 5 (Systems + Micro-workflows)

## What this means
You will practice: General Follow-up Mini-Workflow (Stops on Reply).

## Why this matters
This helps you follow up without being spammy.

## Where this is in HighLevel
- Workflows -> + Add Trigger -> Contact Tag
- Workflows -> + Add Action -> Remove Contact Tag, Add Contact Tag, Send Email, Wait, If/Else

## Practice steps
1) Add the trigger: Contact Tag.
2) Add the actions you need: Remove Contact Tag, Add Contact Tag, Send Email.
3) Add logic steps if needed: Wait, If/Else.
4) Fill required fields (marked with *).
5) Run a test run.

## Allowed steps (mock builder)
### Triggers
- Contact Tag
### Actions
- Remove Contact Tag
- Add Contact Tag
- Send Email
### Logic
- Wait
- If/Else

## Requirements checklist
- Trigger is Contact Tag
- Trigger field tag equals route:nurture_general
- Includes Remove Contact Tag
- Includes Add Contact Tag
- Includes Wait
- Has at least 1 If/Else step
- Order: Remove Contact Tag -> Send Email -> Wait -> If/Else
- Email message includes "General Nurture 1"
- Email message includes "General Nurture 2"

## Test run cases
### No response, second touch sends
Event: Contact Tag
Expected outcomes:
- Email message includes "General Nurture 1"
- Email message includes "General Nurture 2"

### Responded, second touch Endped
Event: Contact Tag
Expected outcomes:
- Email message includes "General Nurture 1"

## Teach-back prompt
Explain how this micro-workflow prevents over-messaging and what would happen if you forgot the response check.

## Hints
- Hint 1: After the wait, check for status:responded before sending the second email.
- Hint 2: If TC2 still sends the second email, your condition is reversed or branches are swapped.

## Admin notes (do not show learners)
### Acceptable variants (should pass)
- Use SMS instead of second email if consent exists.
### Common mistakes (what checks should catch)
- Second message sends even when responded tag exists.
- Route tag not removed causing repeated triggers.
