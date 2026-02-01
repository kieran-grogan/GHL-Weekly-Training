# Week 2 Vercel Course — Revision Plan (Notion‑Aligned)
**Audience:** Cursor Agent (code + content updates)  
**Goal:** Bring the deployed Week 2 course (https://ghl-weekly-training.vercel.app/) into tight alignment with the Notion Week 2 board and improve the trainee UX and practical competence.

---

## 0) Context (what Week 2 is supposed to accomplish)
From Notion Week 2, the trainee must be able to **operate GoHighLevel day‑to‑day** for StrategixAI:
- Social Media Planner deep dive
- Master the Social Media Planner (CSV + QA)
- Build functional customer support process
- Replicate Strategix Pets workflow (fix broken wait/filter logic)
- Review how we use GHL for clients (Strategix operating model)
- Shadow Kieran/Hunter on a client task (convert to SOP)
- Complete GHL orientation (dashboard, contacts, conversations)
- Prep for Friday teach‑back (proof artifacts, not just explanations)

**Priority:** practical application > quizzes.  
**Grading:** artifact‑based (screenshots, Looms, working builds, execution logs).

---

## 1) Current Issues (what must be fixed)
### 1.1 Practice drift (major)
- The course currently shows **workflow‑portfolio** style practice in the Week 2 capstone (e.g., “3 client‑ready workflows”, “documentation package”, “client implementation plan”).
- That is **Week 3/4 scope** and will overwhelm trainees and misalign the week.

✅ Fix: Replace Week 2 capstone practice with Week 2‑appropriate artifacts (Social + Support + Pets workflow fix + teach‑back prep).

### 1.2 Missing pipelines/opportunities competency (major)
Week 2 must include at least one practical pipeline task:
- Create a test opportunity
- Move it through stages
- Show where pipeline “truth” lives

✅ Fix: Add an Opportunities/Pipelines practice requirement in L2.1 (orientation) and optionally in capstone.

### 1.3 Missing conversations ownership + escalation proof (major)
Week 2 needs to explicitly train:
- Assigned vs unassigned conversations
- Internal notes + next steps
- Escalation path (Diana → Brian → Hunter; billing → Mark)

✅ Fix: Add conversations practice item with proof (screenshot + internal note).

### 1.4 Social Planner setup gaps (medium)
Social Planner training should include:
- Connection verification
- Time zone verification
- Scheduling + editing
- CSV import + validation
- Failure handling

✅ Fix: Expand L2.3/L2.4 practice checklists to explicitly include these.

### 1.5 Safety rails not enforced (medium/high)
Week 2 must prevent trainees from breaking production:
- Duplicate before edit
- TRAINING__ prefix for training assets
- No outbound to real contacts

✅ Fix: Add global “Training Rules” banner (Week 2 intro + L2.1 top).

---

## 2) What to Implement (P0 / P1 / P2)
### P0 — Must ship immediately
1) Replace **L2.8 Practice** (capstone) with Week 2 artifact checklist.
2) Upgrade **L2.1 Practice** to include:
   - location + timezone proof
   - conversations ownership proof
   - pipelines/opportunities proof
3) Add global **Training Rules** block.

### P1 — Should ship next
4) Ensure Social Planner modules include:
   - connection QA
   - time zone QA
   - manual schedule + edit
   - CSV import + validate
5) Support Process module requires:
   - support pipeline stages
   - intake form
   - workflow creates ticket + assigns owner + creates task

### P2 — Nice-to-have (but recommended)
6) Add “Stop Condition”: if stuck > 15 minutes, log blocker + screenshot.
7) Add “Single Week Scenario” narrative to unify the week.

---

## 3) Module‑by‑Module Required Changes (Week 2)

### L2.1 — Complete GHL Orientation (Dashboard, Contacts, Conversations)
**Add / enforce in Practice:**
- Verify correct location + Business Profile time zone (screenshot)
- Find Assigned vs Unassigned conversations + add internal note (screenshot)
- Create TRAINING__ test contact (screenshot)
- Create TRAINING__ test opportunity + move 2 stages (2 screenshots)
- Find workflow logs/history (screenshot)
- 3 questions / failure modes (text)

✅ Pass = has location/timezone + pipelines proof + Loom navigation.

---

### L2.2 — Review how we use GHL for clients
**Practice should be deliverable‑based, not workflow‑based:**
- 1‑page playbook (markdown/text) with:
  1) What we sell (1 paragraph)
  2) How leads enter
  3) How comms are handled (ownership + escalation)
  4) How status is tracked (pipelines/tasks)
  5) How we automate (workflows/fields/values)
  6) How support works post‑handoff

✅ Pass = explains escalation path + identifies “truth lives here” examples.

---

### L2.3 — Social Planner Deep Dive
**Practice checklist must include:**
- show connected accounts (screenshot) OR document what’s missing
- verify time zone (screenshot)
- create + schedule 2 manual posts (screenshot + Loom)
- edit one scheduled post and resave (Loom)
- write 5‑bullet failure checklist (text)

✅ Pass = posts visible in queue/calendar.

---

### L2.4 — Master Social Planner CSV
**Practice checklist must include:**
- locate CSV import function (screenshot)
- import sample CSV and confirm no errors (screenshot)
- verify ≥ 5 posts appear in queue (screenshot)
- edit one imported post (Loom)
- write SOP (10–15 lines) “How we bulk schedule posts”

✅ Pass = posts present + SOP includes header/time zone gotchas.

---

### L2.5 — Build Functional Customer Support Process
**Practice must be SYSTEM_BUILD (pipeline + form + workflow), not just workflow:**
Required components:
- Support pipeline stages (screenshot)
- Support intake form fields (screenshot)
- Workflow: form submit → create ticket/opportunity → assign Diana → create triage task → notify (Loom)
- Test submission proof: ticket created + assigned + task created (Loom)

Add explicit escalation rule text:
- Diana → Brian → Hunter
- Billing → Mark

✅ Pass = real end‑to‑end test works.

---

### L2.6 — Replicate Strategix Pets Workflow
**Keep workflow practice UI here (this is the one workflow‑heavy module in Week 2):**
- Duplicate/clone workflow first (screenshot)
- Identify hard‑coded date/day filter (screenshot)
- Replace with evergreen wait logic (screenshot)
- Enroll 2–3 test contacts and prove they progress (execution log / timeline Loom)
- 5–10 line change log (text)

✅ Pass = test contacts move past stuck step.

---

### L2.7 — Shadow Client Task Checklist
**Practice should be deliverable‑based:**
- produce SOP draft v0.1 with:
  - goal of task
  - where in GHL it happens (modules)
  - steps
  - QA checklist
  - failure modes + fixes
  - escalation points

✅ Pass = SOP is executable by Diana without additional questions.

---

### L2.8 — Week 2 Capstone + Teach‑Back Prep (REPLACE PRACTICE)
**Remove:**
- workflow portfolio
- full documentation package
- client implementation plan

**Replace with Week 2 Capstone artifacts (required):**
1) Orientation proof (location/timezone screenshot + 60–90s Loom showing modules)
2) Social Planner demo (queue screenshot + 2 manual posts Loom + optional CSV proof)
3) Support intake path (pipeline screenshot + ticket screenshot + Loom submission → ticket → assignment/task)
4) Pets workflow fix proof (bad step screenshot + execution proof + change log)
5) Teach‑back prep (bullets: learnings, failure modes, remaining questions)

✅ Pass = artifacts exist; explanations alone do not pass.

---

## 4) Practice Engine Implementation Notes (App)
The app currently tends to render **workflow practice** too broadly.

### Required: module-specific practice types
Implement (or enforce) support for `practice_type` per module:
- `checklist`
- `deliverable`
- `workflow_build`
- `system_build`
- `capstone`

**Routing rule:**
- Only L2.6 (and part of L2.5) should render the workflow builder UI.
- L2.1/L2.3/L2.4 should render checklist UI with evidence fields.
- L2.2/L2.7 should render deliverable UI.
- L2.8 should render capstone artifact checklist UI.

If the project already uses YAML practice specs, update them according to this plan.

---

## 5) Global UX Improvements (Week 2)
### 5.1 Add a “Training Rules” banner (Week 2)
Add to Week 2 landing page and L2.1:
- Duplicate before edit
- TRAINING__ prefix
- no outbound to real contacts
- stop condition (15 min)

### 5.2 Add “Where to submit evidence”
Each practice item should have:
- expected evidence type (loom/screenshot/text)
- placeholder input field
- naming convention guidance

### 5.3 Align capstone with Friday teach‑back agenda
Capstone artifacts should map 1:1 to what they demo on Friday.

---

## 6) Acceptance Criteria (Definition of Done)
This revision is complete when:

1) L2.8 Practice no longer asks for workflow portfolio / full documentation / client implementation plan.
2) L2.1 Practice requires:
   - location/timezone proof
   - conversations internal note proof
   - pipeline/opportunity stage movement proof
3) Social Planner practice requires both manual scheduling and CSV scheduling validation.
4) Support process practice results in a ticket created + assigned + task/notification fired (verified by test submission).
5) Only L2.6 uses the workflow practice UI; other modules render appropriate practice types.
6) Global Training Rules are visible and reduce production risk.

---

## 7) Files / Locations (for agent)
- Update Week 2 module markdown files (if practice is embedded there)
- OR update practice spec files (YAML/JSON) if the app renders practice from structured data.
- Update module routing/config so L2.8 practice type is `capstone`, not `workflow_portfolio`.

---

## 8) Copy/Paste Capstone Checklist (for L2.8 Practice UI)
Use this exact text if you need to paste into UI config:

**Week 2 Capstone — Required Artifacts**
1) Orientation proof:
- Screenshot: correct Location + Timezone
- Loom (60–90s): Contacts / Conversations / Opportunities / Social Planner / Workflows

2) Social Planner demo:
- Screenshot: queue/calendar with scheduled posts
- Loom (2–3 min): schedule 2 manual posts
- (Optional) CSV import: screenshot showing ≥ 5 imported posts

3) Support intake path:
- Screenshot: support pipeline stages
- Screenshot: test ticket created + assigned owner
- Loom (2–4 min): form submit → ticket created → task/notification

4) Strategix Pets workflow fix:
- Screenshot: the bad step you fixed
- Execution proof: logs/timeline showing a test contact moved past the stuck step
- Text: 5–10 line change log (what/why/how tested)

5) Teach‑back prep (text):
- 5 bullets: what I learned
- 3 bullets: failure modes I can diagnose now
- 3 bullets: what still confuses me / what I need clarified

**Pass = all artifacts submitted.**

