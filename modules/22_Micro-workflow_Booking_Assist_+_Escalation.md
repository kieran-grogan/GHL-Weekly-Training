# M22: Booking Helper: Follow Up Then Escalate

**Phase:** 5 (Systems + Micro-workflows)

## What this means
You will practice: Booking Helper: Follow Up Then Escalate.

## Why this matters
Simple, clear workflows help your team respond fast and avoid mistakes.

## Where this is in HighLevel
- Workflows -> + Add Trigger -> Contact Tag
- Workflows -> + Add Action -> Remove Contact Tag, Send Email, Create Task, Internal Notification, Wait, If/Else

## Practice steps
1) Add the trigger: Contact Tag.
2) Add the actions you need: Remove Contact Tag, Send Email, Create Task, Internal Notification.
3) Add logic steps if needed: Wait, If/Else.
4) Fill required fields (marked with *).
5) Run a test run.

## Allowed steps (mock builder)
### Triggers
- Contact Tag
### Actions
- Remove Contact Tag
- Send Email
- Create Task
- Internal Notification
### Logic
- Wait
- If/Else

## Requirements checklist
- Trigger is Contact Tag
- Trigger field tag equals route:booking
- Includes Remove Contact Tag
- Includes Send Email
- Includes Wait
- Has at least 1 If/Else step
- Includes Create Task
- Includes Internal Notification
- Order: Remove Contact Tag -> Send Email -> Wait -> If/Else
- Email message includes "Book your call"
- Email message includes "Reminder to book"

## Test run cases
### Not booked, escalation happens
Event: Contact Tag
Expected outcomes:
- Email message includes "Book your call"
- Email message includes "Reminder to book"
- Creates task with: Call lead
- Sends internal notification with: not booked

### Already booked, no escalation
Event: Contact Tag
Expected outcomes:
- Email message includes "Book your call"

## Teach-back prompt
Explain how this workflow escalates to a human and why it ends when stage:booked exists.

## Hints
- Hint 1: After the wait, check for stage:booked. Only escalate on Else.
- Hint 2: Make sure you create both a task and a notification in the escalation branch.

## Admin notes (do not show learners)
### Acceptable variants (should pass)
- Send SMS reminder instead of email reminder if consent exists.
### Common mistakes (what checks should catch)
- Escalation triggers even for booked contacts.
- No task created for human follow-up.
