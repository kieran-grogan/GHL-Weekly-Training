# M15: Appointment Reminders + Cancellation Safety

**Phase:** 3 (Sequences + Timing)

## What this means
You will practice: Appointment Reminders + Cancellation Safety.

## Why this matters
This keeps appointments on track and reduces no-shows.

## Where this is in HighLevel
- Workflows -> + Add Trigger -> Appointment Status
- Workflows -> + Add Action -> Send Email, Send SMS, Wait, If/Else

## Practice steps
1) Add the trigger: Appointment Status.
2) Add the actions you need: Send Email, Send SMS.
3) Add logic steps if needed: Wait, If/Else.
4) Fill required fields (marked with *).
5) Run a test run.

## Allowed steps (mock builder)
### Triggers
- Appointment Status
### Actions
- Send Email
- Send SMS
### Logic
- Wait
- If/Else

## Requirements checklist
- Trigger is Appointment Status
- Includes Wait
- Has at least 2 If/Else step
- Includes Send Email
- Includes Send SMS
- Email message includes "Confirmed"
- Email message includes "Reminder 24h"
- SMS message includes "Reminder 1h"

## Test run cases
### Not canceled; reminders send
Event: Appointment Status
Expected outcomes:
- Email message includes "Confirmed"
- Email message includes "Reminder 24h"
- SMS message includes "Reminder 1h"

### Canceled; reminders do not send
Event: Appointment Status
Expected outcomes:
- Email message includes "Confirmed"

## Teach-back prompt
Explain how cancel guardrails work and where you would place checks in a reminder workflow.

## Hints
- Hint 1: You need a cancel check before each reminder send.
- Hint 2: If TC2 still sends reminders, your cancel condition is missing or on the wrong branch.
- Hint 3: Use test run logs to confirm the cancel check evaluated true and Endped execution.

## Admin notes (do not show learners)
### Acceptable variants (should pass)
- Swap channels (SMS for 24h, email for 1h) if tests are adjusted.
### Common mistakes (what checks should catch)
- Only checking cancellation once at the beginning.
- Wait durations set to 0.
- Reminder steps not connected after waits.
