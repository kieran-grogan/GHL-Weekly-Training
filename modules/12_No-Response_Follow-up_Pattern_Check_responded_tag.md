# M12: Follow Up Only if They Did Not Reply

**Phase:** 3 (Sequences + Timing)

## What this means
You will practice: Follow Up Only if They Did Not Reply.

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
- Includes Add Contact Tag
- Order: Wait -> If/Else
- Email message includes "Initial Outreach"
- Email message includes "Follow-up"
- Adds tag: log:followup_sent

## Test run cases
### No response
Event: Contact Tag
Expected outcomes:
- Email message includes "Initial Outreach"
- Email message includes "Follow-up"
- Adds tag: log:followup_sent

### Responded before follow-up
Event: Contact Tag
Expected outcomes:
- Email message includes "Initial Outreach"

## Teach-back prompt
Explain how this pattern prevents sending follow-ups to someone who already replied and how you would implement end-on-response thinking.

## Hints
- Hint 1: After the Wait, add an If/Else that checks for tag status:responded.
- Hint 2: The follow-up email must be on the Else path only.
- Hint 3: If TC2 sends Follow-up, your condition or branches are reversed.

## Admin notes (do not show learners)
### Acceptable variants (should pass)
- Add internal notification on response path before Endping.
### Common mistakes (what checks should catch)
- Follow-up email placed on the True branch.
- Missing wait so follow-up happens immediately.
- Condition checks wrong tag name.
