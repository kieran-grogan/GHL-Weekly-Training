# M02: New Lead Setup: Tag + Email + Text

**Phase:** 1 (Fundamentals)

## What this means
You will practice: New Lead Setup: Tag + Email + Text.

## Why this matters
This keeps your data clean for future steps.

## Where this is in HighLevel
- Workflows -> + Add Trigger -> Contact Created
- Workflows -> + Add Action -> Add Contact Tag, Send Email, Send SMS

## Practice steps
1) Add the trigger: Contact Created.
2) Add the actions you need: Add Contact Tag, Send Email, Send SMS.
3) Add logic steps if needed.
4) Fill required fields (marked with *).
5) Run a test run.

## Allowed steps (mock builder)
### Triggers
- Contact Created
### Actions
- Add Contact Tag
- Send Email
- Send SMS
### Logic
- None

## Requirements checklist
- Trigger is Contact Created
- Includes Add Contact Tag
- Includes Send Email
- Includes Send SMS
- Add Contact Tag has tag
- Send Email has subject, body
- Send SMS has body
- Order: Add Contact Tag -> Send Email -> Send SMS
- Email message includes "Welcome"
- SMS message includes "Welcome"
- Adds tag: stage:new

## Test run cases
### Contact created has email + phone
Event: Contact Created
Expected outcomes:
- Email message includes "Welcome"
- SMS message includes "Welcome"
- Adds tag: stage:new

## Teach-back prompt
Explain why the tag is added before messages, and what would break if the email/SMS configuration is missing.

## Hints
- Hint 1: Your workflow needs three actions in order: Add Contact Tag -> Send Email -> Send SMS.
- Hint 2: If email check fails, check both subject and body are filled.
- Hint 3: Use test run logs to verify the tag was added before messages were emitted.

## Admin notes (do not show learners)
### Acceptable variants (should pass)
- Add end immediately after the last message.
### Common mistakes (what checks should catch)
- Forgetting email subject or body.
- Placing Add Contact Tag after messages.
- Leaving SMS body without the required keyword.
