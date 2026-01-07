# 03 — Node Catalog (Curated) + Config Schemas

## 1) Design intent
The mock builder must replicate the **workflow thinking** of GoHighLevel:
- trigger starts flow
- actions mutate state / communicate
- logic controls path and timing
- test cases and debug logs teach causality

## 2) Node taxonomy
- kind: trigger | action | logic
- type: subtype string (e.g., contact.created, sms.send)
- config: node-specific object

---

## 3) MVP node catalog

### Triggers
#### contact.created
Config: none

#### contact.tagAdded
Config: { tag: string }

#### form.submitted
Config: { formName?: string, formId?: string }

#### appointment.scheduled
Config: { calendarName?: string, calendarId?: string }

#### opportunity.stageChanged
Config: { pipelineName?: string, stageName?: string }

### Actions
#### sms.send
Config: { body: string }

#### email.send
Config: { subject: string, body: string }

#### tag.add
Config: { tag: string }

#### tag.remove
Config: { tag: string }

#### field.update
Config: { fieldKey: string, value: string|number|boolean|null }

#### task.create
Config: { title: string, assignedTo?: string, dueInMinutes?: number }

#### user.notify
Config: { channel: "inApp"|"email"|"sms", recipient: string, message: string }

#### webhook.send (optional in MVP)
Config: { url: string, method: "POST"|"GET", payloadTemplate?: string }

### Logic
#### wait.duration
Config: { durationSeconds: number }

#### ifElse
Config:
{
  branches: [
    { id: string, label: string, condition: { anyAll: "all"|"any", rules: Rule[] } }
  ],
  elseEnabled: boolean
}

Rules (MVP):
- tagExists: { tag }
- fieldExists: { fieldKey }
- fieldEquals: { fieldKey, value }

Behavior:
- evaluate branches top-to-bottom
- take first true branch; else path if enabled

#### stop
Config: none

---

## 4) V1 expansions (recommended)
### Triggers
- conversation.reply (simulate a response event)
- scheduler.daily (contactless)
- email.opened / email.clicked (engagement events) (optional)

### Actions
- workflow.enroll (enroll into another workflow by id) OR “micro-workflow trigger tag” pattern
- workflow.goto (jump to node id) (optional)
- tag.toggle (optional)
- field.increment (optional)

### Logic
- wait.untilTime (run at a time window) (optional)
- goal (jump if condition met) (optional)
- throttle (drip) (optional)

---

## 5) Workflow-level settings (optional but recommended)
Model as workflow config (not a node), used for teaching:
- allowReentry: boolean
- quietHours: { start, end } (conceptual)
- stopOnResponse: boolean (conceptual; implemented by responded tag checks)
