# M23: Send Data Out (Webhook) + Log It

**Phase:** 5 (Systems + Micro-workflows)

## What this means
You will practice: Send Data Out (Webhook) + Log It.

## Why this matters
This connects HighLevel to other tools.

## Where this is in HighLevel
- Workflows -> + Add Trigger -> Contact Tag
- Workflows -> + Add Action -> Webhook, Add Contact Tag, Internal Notification

## Practice steps
1) Add the trigger: Contact Tag.
2) Add the actions you need: Webhook, Add Contact Tag, Internal Notification.
3) Add logic steps if needed.
4) Fill required fields (marked with *).
5) Run a test run.

## Allowed steps (mock builder)
### Triggers
- Contact Tag
### Actions
- Webhook
- Add Contact Tag
- Internal Notification
### Logic
- None

## Requirements checklist
- Trigger is Contact Tag
- Trigger field tag equals stage:qualified
- Includes Webhook
- Includes Add Contact Tag
- Includes Internal Notification
- Adds tag: log:webhook_sent

## Test run cases
### Qualified lead triggers webhook
Event: Contact Tag
Expected outcomes:
- Adds tag: log:webhook_sent
- Sends internal notification with: Webhook
- Sends webhook to URL containing: example.com/webhook

## Teach-back prompt
Explain what a webhook does and why you add a logging tag after firing it.

## Hints
- Hint 1: Your webhook step must include the URL so the validator can confirm it fired.
- Hint 2: Add tag log:webhook_sent after the webhook to create an audit trail.

## Admin notes (do not show learners)
### Acceptable variants (should pass)
- Create a task instead of notify, as long as a human gets alerted.
### Common mistakes (what checks should catch)
- Webhook URL missing or blank.
- Webhook placed after end step.
