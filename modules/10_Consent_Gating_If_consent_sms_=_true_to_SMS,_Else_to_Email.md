# M10: Consent Check: Only Text if Allowed

**Phase:** 2 (Branching + Guardrails)

## What this means
You will practice: Consent Check: Only Text if Allowed.

## Why this matters
This keeps you compliant and avoids unwanted texts.

## Where this is in HighLevel
- Workflows -> + Add Trigger -> Contact Tag
- Workflows -> + Add Action -> Send SMS, Send Email, If/Else

## Practice steps
1) Add the trigger: Contact Tag.
2) Add the actions you need: Send SMS, Send Email.
3) Add logic steps if needed: If/Else.
4) Fill required fields (marked with *).
5) Run a test run.

## Allowed steps (mock builder)
### Triggers
- Contact Tag
### Actions
- Send SMS
- Send Email
### Logic
- If/Else

## Requirements checklist
- Trigger is Contact Tag
- Trigger field tag equals stage:new
- Has at least 1 If/Else step
- Includes Send SMS
- Includes Send Email
- SMS message includes "Texting you"
- Email message includes "Emailing you"

## Test run cases
### consent_sms true
Event: Contact Tag
Expected outcomes:
- SMS message includes "Texting you"

### consent_sms false
Event: Contact Tag
Expected outcomes:
- Email message includes "Emailing you"

## Teach-back prompt
Explain consent gating and how this workflow prevents incorrect channel usage.

## Hints
- Hint 1: Condition should be field consent_sms equals true.
- Hint 2: Use distinct words in SMS vs Email so test cases can detect which branch ran.

## Admin notes (do not show learners)
### Acceptable variants (should pass)
- Add a tag like log:sent_sms or log:sent_email after the send.
### Common mistakes (what checks should catch)
- Using tagExists for consent when consent is stored as a field.
- Reversing the boolean check.
