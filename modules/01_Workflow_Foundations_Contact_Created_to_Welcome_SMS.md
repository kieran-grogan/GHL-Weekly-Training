# M01: Send a Welcome Text to a New Lead

**Phase:** 1 (Fundamentals)

## What this means
You will practice: Send a Welcome Text to a New Lead.

## Why this matters
Simple, clear workflows help your team respond fast and avoid mistakes.

## Where this is in HighLevel
- Workflows -> + Add Trigger -> Contact Created
- Workflows -> + Add Action -> Send SMS

## Practice steps
1) Add the trigger: Contact Created.
2) Add the actions you need: Send SMS.
3) Add logic steps if needed.
4) Fill required fields (marked with *).
5) Run a test run.

## Allowed steps (mock builder)
### Triggers
- Contact Created
### Actions
- Send SMS
### Logic
- None

## Requirements checklist
- Trigger is Contact Created
- Includes Send SMS
- SMS message includes "Welcome"

## Test run cases
### New contact created
Event: Contact Created
Expected outcomes:
- SMS message includes "Welcome"

## Teach-back prompt
Explain what triggers this workflow, what message is sent, and how you would verify it worked.

## Hints
- Hint 1: Start with the Contact Created trigger and connect it directly to Send SMS.
- Hint 2: If check fails, check the SMS body field is not empty and includes the word 'Welcome'.
- Hint 3: Run the test run for the test case and confirm the SMS shows in the timeline log.

## Admin notes (do not show learners)
### Acceptable variants (should pass)
- Add a tag like log:welcome_sent after sending SMS.
### Common mistakes (what checks should catch)
- SMS step exists but not connected to the trigger.
- SMS body is blank.
- No end of path.
