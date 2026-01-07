# M17: Deal Won: Start Onboarding

**Phase:** 4 (Pipeline + Ops)

## What this means
You will practice: Deal Won: Start Onboarding.

## Why this matters
This helps the team act when a deal changes.

## Where this is in HighLevel
- Workflows -> + Add Trigger -> Opportunity Status Changed
- Workflows -> + Add Action -> Add Contact Tag, Update Contact Field, Send Email, Create Task, Internal Notification

## Practice steps
1) Add the trigger: Opportunity Status Changed.
2) Add the actions you need: Add Contact Tag, Update Contact Field, Send Email, Create Task, Internal Notification.
3) Add logic steps if needed.
4) Fill required fields (marked with *).
5) Run a test run.

## Allowed steps (mock builder)
### Triggers
- Opportunity Status Changed
### Actions
- Add Contact Tag
- Update Contact Field
- Send Email
- Create Task
- Internal Notification
### Logic
- None

## Requirements checklist
- Trigger is Opportunity Status Changed
- Trigger field stageName equals Won
- Includes Add Contact Tag
- Includes Update Contact Field
- Includes Send Email
- Includes Create Task
- Includes Internal Notification
- Email message includes "Welcome"
- Adds tag: stage:won
- Sets field customer_type to Customer

## Test run cases
### Deal won
Event: Opportunity Status Changed
Expected outcomes:
- Email message includes "Welcome"
- Adds tag: stage:won
- Sets field customer_type to Customer
- Creates task with: fulfillment
- Sends internal notification with: Deal won

## Teach-back prompt
Explain how this workflow changes the lifecycle from prospecting to onboarding and why it includes both customer and internal actions.

## Hints
- Hint 1: Start with stageName Won. Then set state (tag/field) before sending welcome.
- Hint 2: Ensure the task title includes fulfillment or onboarding wording.

## Admin notes (do not show learners)
### Acceptable variants (should pass)
- Notify user before creating task.
### Common mistakes (what checks should catch)
- Sending welcome email but not updating state.
- Missing internal ops task or notification.
