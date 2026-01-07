# M04: Form Submitted: Save Info + Alert the Team

**Phase:** 1 (Fundamentals)

## What this means
You will practice: Form Submitted: Save Info + Alert the Team.

## Why this matters
Simple, clear workflows help your team respond fast and avoid mistakes.

## Where this is in HighLevel
- Workflows -> + Add Trigger -> Form Submitted
- Workflows -> + Add Action -> Add Contact Tag, Update Contact Field, Create Task, Internal Notification

## Practice steps
1) Add the trigger: Form Submitted.
2) Add the actions you need: Add Contact Tag, Update Contact Field, Create Task, Internal Notification.
3) Add logic steps if needed.
4) Fill required fields (marked with *).
5) Run a test run.

## Allowed steps (mock builder)
### Triggers
- Form Submitted
### Actions
- Add Contact Tag
- Update Contact Field
- Create Task
- Internal Notification
### Logic
- None

## Requirements checklist
- Trigger is Form Submitted
- Includes Add Contact Tag
- Includes Update Contact Field
- Includes Create Task
- Includes Internal Notification
- Adds tag: stage:new
- Sets field lead_source to Website Form

## Test run cases
### Contact Us form submitted
Event: Form Submitted
Expected outcomes:
- Adds tag: stage:new
- Sets field lead_source to Website Form
- Creates task with: website
- Sends internal notification with: form submission

## Teach-back prompt
Explain what structured data this workflow saves and how that helps later automations.

## Hints
- Hint 1: Use Form Submitted as the trigger and the field key lead_source.
- Hint 2: If field check fails, check spelling and case of the field key.
- Hint 3: Use test run to confirm the field update appears in final state.

## Admin notes (do not show learners)
### Acceptable variants (should pass)
- Notify before task creation (still acceptable if both occur).
### Common mistakes (what checks should catch)
- Using Contact Created instead of Form Submitted.
- Field key typo (leadSource vs lead_source).
- No tag added for later routing.
