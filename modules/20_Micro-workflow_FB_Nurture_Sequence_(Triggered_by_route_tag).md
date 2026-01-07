# M20: Facebook Follow-up Mini-Workflow

**Phase:** 5 (Systems + Micro-workflows)

## What this means
You will practice: Facebook Follow-up Mini-Workflow.

## Why this matters
This helps you follow up without being spammy.

## Where this is in HighLevel
- Workflows -> + Add Trigger -> Contact Tag
- Workflows -> + Add Action -> Remove Contact Tag, Add Contact Tag, Send Email, Wait

## Practice steps
1) Add the trigger: Contact Tag.
2) Add the actions you need: Remove Contact Tag, Add Contact Tag, Send Email.
3) Add logic steps if needed: Wait.
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

## Requirements checklist
- Trigger is Contact Tag
- Trigger field tag equals route:nurture_fb
- Includes Remove Contact Tag
- Includes Add Contact Tag
- Includes Wait
- Includes Send Email
- Order: Remove Contact Tag -> Send Email -> Wait -> Send Email
- Email message includes "FB Nurture 1"
- Email message includes "FB Nurture 2"
- Adds tag: stage:nurturing
- Removes tag: route:nurture_fb

## Test run cases
### route tag triggers nurture
Event: Contact Tag
Expected outcomes:
- Email message includes "FB Nurture 1"
- Email message includes "FB Nurture 2"
- Adds tag: stage:nurturing
- Removes tag: route:nurture_fb

## Teach-back prompt
Explain how this micro-workflow is triggered and why it removes the route tag immediately.

## Hints
- Hint 1: Your trigger must be Tag Added route:nurture_fb.
- Hint 2: Remove the route tag early to prevent re-trigger loops.
- Hint 3: If the second email does not appear, advance time to pass the wait.

## Admin notes (do not show learners)
### Acceptable variants (should pass)
- Use SMS for the second touch if consent is present.
### Common mistakes (what checks should catch)
- Not removing the route tag.
- No wait between touches.
