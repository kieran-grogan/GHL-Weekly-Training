# M03: When a Tag is Added: Tell the Team + Create a Task

**Phase:** 1 (Fundamentals)

## What this means
You will practice: When a Tag is Added: Tell the Team + Create a Task.

## Why this matters
This keeps your data clean for future steps.

## Where this is in HighLevel
- Workflows -> + Add Trigger -> Contact Tag
- Workflows -> + Add Action -> Internal Notification, Create Task, Add Contact Tag

## Practice steps
1) Add the trigger: Contact Tag.
2) Add the actions you need: Internal Notification, Create Task, Add Contact Tag.
3) Add logic steps if needed.
4) Fill required fields (marked with *).
5) Run a test run.

## Allowed steps (mock builder)
### Triggers
- Contact Tag
### Actions
- Internal Notification
- Create Task
- Add Contact Tag
### Logic
- None

## Requirements checklist
- Trigger is Contact Tag
- Trigger field tag equals stage:new
- Includes Internal Notification
- Includes Create Task
- Includes Add Contact Tag
- Order: Internal Notification -> Create Task -> Add Contact Tag
- Adds tag: stage:contacted

## Test run cases
### stage:new tag applied
Event: Contact Tag
Expected outcomes:
- Adds tag: stage:contacted
- Creates task with: Follow up
- Sends internal notification with: New lead

### Different tag applied
Event: Contact Tag
Expected outcomes:
- No expected outcomes listed.

## Teach-back prompt
Explain how tag-based triggers enable modular automation systems and what this workflow accomplishes operationally.

## Hints
- Hint 1: Set the Tag Added trigger to the exact tag name: stage:new.
- Hint 2: Make sure the notify and task steps are connected in the main path.
- Hint 3: If TC2 fails, your trigger filter may be missing or incorrect.

## Admin notes (do not show learners)
### Acceptable variants (should pass)
- Add an extra tag like log:followup_task_created for auditing.
### Common mistakes (what checks should catch)
- Trigger tag filter is empty (fires for all tags).
- Task title left blank.
- Notify configured to wrong channel or empty recipient.
