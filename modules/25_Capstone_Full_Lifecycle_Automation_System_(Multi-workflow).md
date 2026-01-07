# M25: Capstone: Full Lead-to-Appointment System

**Phase:** 6 (Capstone)

## What this means
You will practice: Capstone: Full Lead-to-Appointment System.

## Why this matters
This keeps appointments on track and reduces no-shows.

## Where this is in HighLevel
- Workflows -> + Add Trigger -> Form Submitted, Contact Tag, Customer Replied, Appointment Status
- Workflows -> + Add Action -> Add Contact Tag, Create Task, Internal Notification, Remove Contact Tag, Send Email, If/Else, Wait

## Workflows in this lesson

### Intake router workflow
#### Practice steps
1) Add the trigger: Form Submitted.
2) Add the actions you need: Add Contact Tag, Create Task, Internal Notification.
3) Add logic steps if needed: If/Else.
4) Fill required fields (marked with *).
5) Run a test run.

#### Allowed steps (mock builder)
##### Triggers
- Form Submitted
##### Actions
- Add Contact Tag
- Create Task
- Internal Notification
##### Logic
- If/Else

#### Requirements checklist
- Trigger is Form Submitted
- Includes Add Contact Tag
- Includes Create Task
- Includes Internal Notification
- Has at least 1 If/Else step
- Adds tag: route:nurture_fb
- Adds tag: route:nurture_general

#### Test run cases
##### FB lead routes to FB nurture
Event: Form Submitted
Expected outcomes:
- Adds tag: route:nurture_fb

##### General lead routes to general nurture
Event: Form Submitted
Expected outcomes:
- Adds tag: route:nurture_general

##### Missing info path escalates
Event: Form Submitted
Expected outcomes:
- Creates task with: missing contact info
- Sends internal notification with: missing contact info

### FB nurture workflow
#### Practice steps
1) Add the trigger: Contact Tag.
2) Add the actions you need: Remove Contact Tag, Add Contact Tag, Send Email.
3) Add logic steps if needed: Wait.
4) Fill required fields (marked with *).
5) Run a test run.

#### Allowed steps (mock builder)
##### Triggers
- Contact Tag
##### Actions
- Remove Contact Tag
- Add Contact Tag
- Send Email
##### Logic
- Wait

#### Requirements checklist
- Trigger is Contact Tag
- Trigger field tag equals route:nurture_fb
- Includes Remove Contact Tag
- Includes Send Email
- Includes Wait

#### Test run cases
No test cases listed.

### General nurture workflow
#### Practice steps
1) Add the trigger: Contact Tag.
2) Add the actions you need: Remove Contact Tag, Add Contact Tag, Send Email.
3) Add logic steps if needed: Wait, If/Else.
4) Fill required fields (marked with *).
5) Run a test run.

#### Allowed steps (mock builder)
##### Triggers
- Contact Tag
##### Actions
- Remove Contact Tag
- Add Contact Tag
- Send Email
##### Logic
- Wait
- If/Else

#### Requirements checklist
- Trigger is Contact Tag
- Trigger field tag equals route:nurture_general
- Has at least 1 If/Else step
- Includes Wait
- Email message includes "General Nurture 1"

#### Test run cases
##### Reply ends nurture follow-up
Event: Contact Tag
Expected outcomes:
- Email message includes "General Nurture 1"

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

#### Test run cases
No test cases listed.

### Booking assist workflow
#### Practice steps
1) Add the trigger: Contact Tag.
2) Add the actions you need: Remove Contact Tag, Send Email, Create Task, Internal Notification.
3) Add logic steps if needed: Wait, If/Else.
4) Fill required fields (marked with *).
5) Run a test run.

#### Allowed steps (mock builder)
##### Triggers
- Contact Tag
##### Actions
- Remove Contact Tag
- Send Email
- Create Task
- Internal Notification
##### Logic
- Wait
- If/Else

#### Requirements checklist
- Trigger is Contact Tag
- Trigger field tag equals route:booking
- Includes Wait
- Has at least 1 If/Else step
- Includes Create Task
- Email message includes "Book your call"

#### Test run cases
##### Booked ends escalation
Event: Contact Tag
Expected outcomes:
- Email message includes "Book your call"

### Appointment confirmation workflow
#### Practice steps
1) Add the trigger: Appointment Status.
2) Add the actions you need: Add Contact Tag, Send Email, Internal Notification.
3) Add logic steps if needed.
4) Fill required fields (marked with *).
5) Run a test run.

#### Allowed steps (mock builder)
##### Triggers
- Appointment Status
##### Actions
- Add Contact Tag
- Send Email
- Internal Notification
##### Logic
- None

#### Requirements checklist
- Trigger is Appointment Status
- Includes Add Contact Tag
- Includes Send Email
- Includes Internal Notification

#### Test run cases
No test cases listed.

## Teach-back prompt
Explain each workflow and how they work together.
