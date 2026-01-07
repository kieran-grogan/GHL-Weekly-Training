# M14: Appointment Booked: Confirm + Update Status

**Phase:** 3 (Sequences + Timing)

## What this means
You will practice: Appointment Booked: Confirm + Update Status.

## Why this matters
This keeps appointments on track and reduces no-shows.

## Where this is in HighLevel
- Workflows -> + Add Trigger -> Appointment Status
- Workflows -> + Add Action -> Add Contact Tag, Send Email, Internal Notification, Remove Contact Tag

## Practice steps
1) Add the trigger: Appointment Status.
2) Add the actions you need: Add Contact Tag, Send Email, Internal Notification, Remove Contact Tag.
3) Add logic steps if needed.
4) Fill required fields (marked with *).
5) Run a test run.

## Allowed steps (mock builder)
### Triggers
- Appointment Status
### Actions
- Add Contact Tag
- Send Email
- Internal Notification
- Remove Contact Tag
### Logic
- None

## Requirements checklist
- Trigger is Appointment Status
- Includes Add Contact Tag
- Includes Send Email
- Includes Internal Notification
- Email message includes "Confirmed"
- Adds tag: stage:booked

## Test run cases
### Appointment booked
Event: Appointment Status
Expected outcomes:
- Email message includes "Confirmed"
- Adds tag: stage:booked
- Sends internal notification with: appointment

## Teach-back prompt
Explain why booking should end nurture and what state changes this workflow makes.

## Hints
- Hint 1: Use the Appointment Status trigger, not tagAdded.
- Hint 2: Add the tag stage:booked before sending confirmations.

## Admin notes (do not show learners)
### Acceptable variants (should pass)
- Remove tag stage:contacted after adding stage:booked.
### Common mistakes (what checks should catch)
- Using wrong trigger instead of Appointment Status.
- Forgetting to add booked tag.
