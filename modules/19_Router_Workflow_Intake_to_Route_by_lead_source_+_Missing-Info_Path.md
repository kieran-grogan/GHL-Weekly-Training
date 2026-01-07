# M19: Intake Router: Decide What Happens Next

**Phase:** 5 (Systems + Micro-workflows)

## What this means
You will practice: Intake Router: Decide What Happens Next.

## Why this matters
Simple, clear workflows help your team respond fast and avoid mistakes.

## Where this is in HighLevel
- Workflows -> + Add Trigger -> Form Submitted
- Workflows -> + Add Action -> Add Contact Tag, Create Task, Internal Notification, If/Else

## Practice steps
1) Add the trigger: Form Submitted.
2) Add the actions you need: Add Contact Tag, Create Task, Internal Notification.
3) Add logic steps if needed: If/Else.
4) Fill required fields (marked with *).
5) Run a test run.

## Allowed steps (mock builder)
### Triggers
- Form Submitted
### Actions
- Add Contact Tag
- Create Task
- Internal Notification
### Logic
- If/Else

## Requirements checklist
- Trigger is Form Submitted
- Includes Add Contact Tag
- Includes Create Task
- Includes Internal Notification
- Has at least 1 If/Else step
- Adds tag: stage:new
- Adds tag: route:nurture_fb
- Adds tag: route:nurture_general

## Test run cases
### Facebook lead with email
Event: Form Submitted
Expected outcomes:
- Adds tag: stage:new
- Adds tag: route:nurture_fb

### Google lead with phone
Event: Form Submitted
Expected outcomes:
- Adds tag: stage:new
- Adds tag: route:nurture_general

### Missing email and phone
Event: Form Submitted
Expected outcomes:
- Creates task with: missing contact info
- Sends internal notification with: missing contact info

## Teach-back prompt
Explain the router pattern, what routes it creates, and why the missing-info path exists.

## Hints
- Hint 1: Start by tagging stage:new, then decide if enough contact info exists.
- Hint 2: If OR is not supported, nest If/Else checks for email and phone.
- Hint 3: Use distinct route tags: route:nurture_fb vs route:nurture_general.

## Admin notes (do not show learners)
### Acceptable variants (should pass)
- Notify user on successful route as well.
### Common mistakes (what checks should catch)
- Routing everyone even when contact info is missing.
- Missing lead_source branching.
- No missing-info escalation path.
