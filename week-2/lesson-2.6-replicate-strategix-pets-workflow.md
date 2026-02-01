# Lesson 2.6 — Replicate “Strategix Pets” Workflow (and Fix the Logic)

## Outcome
You can safely duplicate an existing email outreach workflow, correct broken wait/filter logic, and prove it works using test contacts.

This mirrors the real issue discussed in meetings:
contacts stuck due to a **bad date/day filter**.

---

## Rule #1
**Never fix a live workflow first.** Duplicate it, fix the duplicate, test, then swap.

---

## Step‑by‑Step (60–90 min)

### 1) Locate the source workflow
- Automation → Workflows
- Find “Strategix Pets” brand awareness / outreach workflow (or the closest matching name)

### 2) Duplicate it
- Duplicate/clone workflow
- Rename: `Strategix Pets – FIXED – {date}`

### 3) Identify the blocker
Common blockers:
- Wait step with an extra filter like:
  - “Current day of month equals X”
  - “Current year equals 2026”
  - “Current day is the ninth” (hard-coded)

These fail the moment the calendar changes.

### 4) Replace “hard-coded date logic” with safe logic
Preferred strategies:
- Use **relative waits** (e.g., wait 2 days, wait 48 hours)
- Use **calendar logic** that is evergreen (e.g., “wait until next weekday at 9am”)
- Avoid filters that require “today is exactly the 9th”

### 5) Test the workflow (proof-based)
- Create 2–3 test contacts with a unique tag `SRC:Test`
- Enroll them in the FIXED workflow
- Watch execution:
  - workflow execution logs
  - contact timeline events
- Confirm that contacts progress past the previous “stuck” step

### 6) Swap plan
Once tested:
- Document the changes
- Only then apply changes to production (or replace by turning off old + turning on fixed)

---

## Failure Modes
- Fixing the live workflow and breaking production.
- “Wait until X date” without considering time zone.
- Filters that depend on “today’s day-of-month.”

---

## Practical Assignment
Submit:
- Loom showing:
  - the original workflow (read-only)
  - the duplicated fixed version
  - the step you changed
  - proof test contacts moved past the stuck step

## Quiz (10)
1) Why duplicate before editing?
2) What caused the stuck contacts in the meeting example?
3) What is a “hard-coded date filter”?
4) What’s a safer replacement for date/day filters?
5) Where do you check if a workflow executed?
6) How do you test without risking production?
7) What is an evergreen wait step?
8) Why does time zone matter in wait logic?
9) When is it safe to swap workflows?
10) What must your Loom prove?

