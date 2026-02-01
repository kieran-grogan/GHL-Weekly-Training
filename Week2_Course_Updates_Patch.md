# StrategixAI — Week 2 Course Updates (Patch Spec)

**Purpose:** Apply the following edits to the existing Week 2 course so the *Practice* experience matches the *Lesson* intent and is not “workflow-only” by default.

**Priority order (do these first):**
1. Replace **L2.8 Practice** (currently too advanced: workflow portfolio / documentation package / client implementation plan).
2. Upgrade **L2.1 Practice** to include *location/timezone*, *conversations ownership*, and *pipelines/opportunities*.
3. Add **global safety rails** (TRAINING__ naming, duplicate-first rule, no outbound sends).

---

## 0) Global Safety Rails (add once, visible to all Week 2 modules)

Add this block at the **top of Week 2** (course intro page) and/or at the top of **L2.1**.

### Training rules (StrategixAI standard)
- **Never edit production assets directly.** Duplicate first, then work in the duplicate.
- Prefix all training assets with: **`TRAINING__`**
  - `TRAINING__Test Contact — <name>`
  - `TRAINING__Support Pipeline`
  - `TRAINING__Pets Workflow — FIXED — YYYY-MM-DD`
- **No outbound sending to real contacts** during training (email/SMS/social). Use test contacts only.
- If stuck **> 15 minutes**, stop and log the blocker (don’t spiral).

### Evidence + naming conventions (recommended)
- Loom naming: `Week2_L2.X_<Name>_<ShortTitle>`
- Screenshot naming: `Week2_L2.X_<Name>_<WhatItShows>.png`

---

## 1) L2.1 Practice — Replace / Upgrade Checklist

**Current issue:** L2.1 practice is good, but it doesn’t force the highest-risk ops checks:  
- correct location + timezone  
- assigned/unassigned conversations and internal notes  
- pipelines/opportunities (core to sales and support tickets)

### Replace L2.1 Practice items with the following checklist

> **L2.1 Practice — Complete GHL Orientation (Evidence Required)**  
> Complete all items below in the correct sub-account.

1) **Verify correct Location + Timezone (MANDATORY)**
- Action: Confirm the correct location/sub-account (top-left) and verify **Business Profile → Timezone**.
- Evidence required: **Screenshot** showing location name + timezone.

2) **Navigation scavenger hunt (fast)**
- Action: Open and identify where these live (no edits):
  - Dashboard
  - Contacts
  - Conversations
  - Opportunities / Pipelines
  - Automation → Workflows
  - Marketing → Social Planner
  - Settings
- Evidence required: **Loom (60–90 seconds)** walking through the above.

3) **Contacts competency**
- Action:
  - Create a test contact: `TRAINING__Test Contact — <YourName>`
  - Open the contact record and locate **tags**, **timeline/activity**, and **custom fields** section.
- Evidence required: **Screenshot** of the contact record.

4) **Conversations competency (ownership + internal note)**
- Action:
  - Find **Assigned vs Unassigned** filters.
  - Open any thread (training/test preferred) and add **one internal note** (no sending).
- Evidence required: **Screenshot** showing the internal note + thread.

5) **Opportunities / Pipelines competency (MANDATORY)**
- Action:
  - Create a **test opportunity** in the correct pipeline (or training pipeline).
  - Move it across **two stages**.
- Evidence required: **2 screenshots** (before + after stage move).

6) **Workflows visibility**
- Action:
  - Search for a workflow.
  - Locate **execution logs** / history (where you confirm it’s running).
- Evidence required: **Screenshot** of workflow logs/history location.

7) **3 questions (blocker awareness)**
- Action: Write 3 questions you still have about the platform OR 3 “failure modes” you think would break a build.
- Evidence required: **Text** submission.

**Pass requirement (L2.1):**
- Includes proof of **Location + Timezone** and **Pipelines**.
- Loom shows ability to find core modules quickly and confidently.

---

## 2) L2.8 Practice — FULL REPLACEMENT (Week 2 Capstone)

**Current issue:** L2.8 practice is currently asking for:
- 3 client-ready workflows
- full documentation package
- client implementation plan

That scope belongs in **Week 3/4**, not Week 2.  
Week 2 should prove: **Navigation + Social Planner + Support intake path + Workflow fix proof + Teach-back prep**.

### Replace the entire L2.8 Practice section with this checklist

> **L2.8 Practice — Week 2 Capstone (Artifacts Required)**  
> Submit the artifacts below. Explanations without artifacts do not pass.

1) **Orientation proof**
- Evidence required:
  - Screenshot: correct **Location + Timezone**
  - Loom (60–90s): show Contacts / Conversations / Opportunities / Social Planner / Workflows

2) **Social Planner demo**
- Evidence required:
  - Screenshot: Social Planner queue/calendar showing scheduled posts
  - Loom (2–3 min): schedule **2 manual posts** on different days/times
  - If CSV is used this week: screenshot of successful CSV import + at least **5 posts** visible in queue

3) **Support intake path (system proof)**
- Evidence required:
  - Screenshot: Support pipeline stages
  - Screenshot: a test support ticket/opportunity created and assigned
  - Loom (2–4 min): submit intake form → ticket created → assignment + task/notification fired

4) **Strategix Pets workflow fix proof**
- Evidence required:
  - Screenshot: the **bad/stuck step** you fixed
  - Screenshot or Loom: execution log / contact timeline showing a test contact moved past the stuck step
  - Text: 5–10 line change log (what changed + why + how tested)

5) **Teach-back prep**
- Evidence required (text):
  - 5 bullets: what I learned this week
  - 3 bullets: top failure modes I can now diagnose
  - 3 bullets: what still confuses me / what I need clarified

**Pass condition (L2.8):**
- All 5 sections submitted with evidence.
- Ownership/escalation is stated correctly (Diana → Brian → Hunter; billing/finance → Mark).

**Fail condition (L2.8):**
- Missing artifacts or only describing what you “would do.”

---

## 3) (Optional) Add a “Stop Condition” to every Practice page

Add this to the bottom of each module’s Practice page:

> If you are stuck for more than 15 minutes:  
> 1) Write what you tried (3 bullets).  
> 2) Screenshot the error / the screen you’re on.  
> 3) Ask for help with a **specific question**, not “it’s broken.”

---

## 4) (Optional) Move “Workflow Portfolio / Documentation Package / Client Implementation Plan” to Week 3/4

If you like those sections (they’re valuable), relocate them as:
- **Week 3:** Workflow portfolio (build 2–3 workflows) + workflow documentation
- **Week 4:** Client implementation plan + troubleshooting FAQ + handoff SOPs

This preserves the ambition without crushing Week 2.

---

## 5) Quick Audit Checklist (after edits)

After implementing this patch, confirm:
- L2.1 Practice includes **Pipelines** + **Location/Timezone** evidence
- L2.8 Practice matches the Week 2 capstone described in the L2.8 lesson
- Trainees cannot “pass” without artifacts (screenshots/loom)
- TRAINING__ naming is enforced culturally (and ideally in UI hints)

