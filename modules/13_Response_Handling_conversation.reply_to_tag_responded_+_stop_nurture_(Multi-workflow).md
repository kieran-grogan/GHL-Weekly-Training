# M13: Reply Handler: Stop Follow-ups When They Reply

**Phase:** 3 (Sequences + Timing)

## What this means
You will practice: Reply Handler: Stop Follow-ups When They Reply.

## Why this matters
This helps you follow up without being spammy.

## Where this is in HighLevel
- Workflows -> + Add Trigger -> Contact Tag, Customer Replied
- Workflows -> + Add Action -> Send Email, Add Contact Tag, Internal Notification, Wait, If/Else

## Workflows in this lesson

### Nurture workflow
#### Practice steps
1) Add the trigger: Contact Tag.
2) Add the actions you need: Send Email.
3) Add logic steps if needed: Wait, If/Else.
4) Fill required fields (marked with *).
5) Run a test run.

#### Allowed steps (mock builder)
##### Triggers
- Contact Tag
##### Actions
- Send Email
##### Logic
- Wait
- If/Else

#### Requirements checklist
- Trigger is Contact Tag
- Trigger field tag equals stage:contacted
- Includes Wait
- Has at least 1 If/Else step
- Order: Wait -> If/Else
- Email message includes "Initial Outreach"

#### Test run cases
##### Reply occurs and follow-up is prevented
Event: Contact Tag
Expected outcomes:
- Email message includes "Initial Outreach"
##### Note
Inject a Customer Replied event before the wait completes so status:responded ends follow-up.

### Response handler workflow
#### Practice steps
1) Add the trigger: Customer Replied.
2) Add the actions you need: Add Contact Tag, Internal Notification.
3) Add logic steps if needed.
4) Fill required fields (marked with *).
5) Run a test run.

#### Allowed steps (mock builder)
##### Triggers
- Customer Replied
##### Actions
- Add Contact Tag
- Internal Notification
##### Logic
- None

#### Requirements checklist
- Trigger is Customer Replied
- Includes Add Contact Tag
- Includes Internal Notification
- Adds tag: status:responded

#### Test run cases
##### Reply event tags responded
Event: Customer Replied
Expected outcomes:
- Adds tag: status:responded
- Sends internal notification with: Lead replied

## Teach-back prompt
Explain each workflow and how they work together.
