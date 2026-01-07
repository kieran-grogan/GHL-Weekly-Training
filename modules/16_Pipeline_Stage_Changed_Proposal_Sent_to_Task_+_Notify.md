# M16: Pipeline Stage Change: Tell the Team

**Phase:** 4 (Pipeline + Ops)

## What this means
You will practice: Pipeline Stage Change: Tell the Team.

## Why this matters
This helps the team act when a deal changes.

## Where this is in HighLevel
- Workflows -> + Add Trigger -> Opportunity Status Changed
- Workflows -> + Add Action -> Internal Notification, Create Task, Add Contact Tag

## Practice steps
1) Add the trigger: Opportunity Status Changed.
2) Add the actions you need: Internal Notification, Create Task, Add Contact Tag.
3) Add logic steps if needed.
4) Fill required fields (marked with *).
5) Run a test run.

## Allowed steps (mock builder)
### Triggers
- Opportunity Status Changed
### Actions
- Internal Notification
- Create Task
- Add Contact Tag
### Logic
- None

## Requirements checklist
- Trigger is Opportunity Status Changed
- Trigger field stageName equals Proposal Sent
- Includes Internal Notification
- Includes Create Task
- Includes Add Contact Tag
- Adds tag: stage:proposal-sent

## Test run cases
### Stage becomes Proposal Sent
Event: Opportunity Status Changed
Expected outcomes:
- Adds tag: stage:proposal-sent
- Creates task with: proposal
- Sends internal notification with: Proposal sent

## Teach-back prompt
Explain why stage-change triggers are useful and what could go wrong if the stage filter is wrong.

## Hints
- Hint 1: Set the stageName filter to exactly 'Proposal Sent'.
- Hint 2: If the workflow fires in other stages, your filter is missing.

## Admin notes (do not show learners)
### Acceptable variants (should pass)
- Add a customer email confirming proposal delivery.
### Common mistakes (what checks should catch)
- Trigger stage filter not set.
- Task title empty or generic.
