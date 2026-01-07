# M24: Daily Ops Checklist (Scheduler)

**Phase:** 6 (Advanced Ops)

## What this means
You will practice: Daily Ops Checklist (Scheduler).

## Why this matters
This keeps daily ops running without manual work.

## Where this is in HighLevel
- Workflows -> + Add Trigger -> Schedule
- Workflows -> + Add Action -> Create Task, Internal Notification

## Practice steps
1) Add the trigger: Schedule.
2) Add the actions you need: Create Task, Internal Notification.
3) Add logic steps if needed.
4) Fill required fields (marked with *).
5) Run a test run.

## Allowed steps (mock builder)
### Triggers
- Schedule
### Actions
- Create Task
- Internal Notification
### Logic
- None

## Requirements checklist
- Trigger is Schedule
- Includes Create Task
- Includes Internal Notification

## Test run cases
### Scheduler run
Event: Schedule
Expected outcomes:
- Creates system task with: prospect list
- Sends system notification with: Daily ops

## Teach-back prompt
Explain what a scheduler workflow is and why it is different from contact-triggered automations.

## Hints
- Hint 1: Use the Schedule trigger (system run) instead of a contact trigger.
- Hint 2: Ensure the test run outputs systemTasksCreated and systemNotifications.

## Admin notes (do not show learners)
### Acceptable variants (should pass)
- Add a webhook send to an external list-builder service.
### Common mistakes (what checks should catch)
- Trying to send SMS or email without a contact context.
- Scheduler module not supported by test run engine.
