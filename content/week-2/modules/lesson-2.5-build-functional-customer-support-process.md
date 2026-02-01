# Lesson 2.5 — Build a Functional Customer Support Process (GHL)

## Outcome
You implement a support process that works in production:
**intake → triage → assignment → escalation → resolution → follow‑up**.

This should reduce “random Slack pings” and ensure accountability.

---

## Design Principles (StrategixAI)
- **Diana = first response + triage**
- **Brian = ops/system fixes + coordination**
- **Hunter = technical/dev escalations only**
- **Mark = billing/finance**
- Every support item must have:
  - owner
  - status
  - next step
  - deadline/SLA expectation

---

## Implementation Blueprint

### A) Support Pipeline (ticket-style)
Create a pipeline (or confirm one exists):
- New
- Waiting on Client
- In Progress
- Escalated to Dev (Hunter)
- Resolved
- Closed

**Rules:**
- New tickets must be assigned to Diana (default).
- Escalation requires an internal note describing:
  - issue
  - reproduction steps
  - expected outcome
  - screenshots/links

### B) Support Intake Methods (choose at least one to start)
1) **Support form** (recommended)
2) Inbound email to a support address routed into Conversations
3) Inbound SMS/chat routed into Conversations

### C) Workflow Automation (minimum viable)
Create/confirm a workflow that:
- Trigger: Support form submitted (or tag added `INTENT:Support`)
- Actions:
  - create/associate an opportunity in the Support pipeline at “New”
  - assign owner (Diana)
  - notify Diana (in-app/email/SMS)
  - add internal note template (auto) with fields to fill

### D) Escalation logic (simple at first)
- If category = “Technical bug / integration” → notify Brian, then Hunter only if needed
- If category = “Billing” → notify Mark
- If category = “How do I / training” → Diana handles, optional Brian

---

## Step-by-Step (60–90 min)
1) Create or validate the Support Pipeline stages.
2) Create a Support Intake Form with required fields:
   - Name
   - Email
   - Phone
   - “What’s broken?” (long text)
   - “Priority” (Low/Normal/Urgent)
   - “Screenshots/links” (field + instructions)
3) Create the workflow:
   - Trigger: form submitted
   - Create opportunity in Support pipeline (New)
   - Assign to Diana
   - Create task “Triage support request” due same day
   - Notify Diana + Brian (optional)
4) Test end-to-end:
   - submit the form yourself
   - confirm a ticket/opportunity appears
   - confirm assignment and notification happened
   - move ticket to In Progress and add internal note

---

## Failure Modes
- Tickets created with no owner.
- Support requests land in conversations but never become trackable.
- Escalations sent without reproduction details.
- No SLA expectations = chaos.

---

## Practical Assignment
Build the support pipeline + intake form + workflow and submit a Loom showing:
- the pipeline stages
- the form fields
- the workflow trigger/actions
- a test submission creating a ticket

## Quiz (10)
1) Why do we use a support pipeline?
2) Who owns first response by default?
3) What must be included before escalation to Hunter?
4) What are the minimum ticket stages?
5) What trigger should start the support workflow?
6) What’s the difference between “Waiting on Client” and “In Progress”?
7) What does a good internal note include?
8) What is an SLA and why do we need one?
9) What’s the fastest failure mode to eliminate?
10) What should happen on a test submission?

