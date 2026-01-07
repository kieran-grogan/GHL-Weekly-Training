# M05: Lead Source Basics (Field vs Tag)

**Phase:** 1 (Fundamentals)

## What this means
You will practice: Lead Source Basics (Field vs Tag).

## Why this matters
This keeps your data clean for future steps.

## Where this is in HighLevel
- Workflows -> + Add Trigger -> Contact Tag
- Workflows -> + Add Action -> Update Contact Field, Add Contact Tag

## Practice steps
1) Add the trigger: Contact Tag.
2) Add the actions you need: Update Contact Field, Add Contact Tag.
3) Add logic steps if needed.
4) Fill required fields (marked with *).
5) Run a test run.

## Allowed steps (mock builder)
### Triggers
- Contact Tag
### Actions
- Update Contact Field
- Add Contact Tag
### Logic
- None

## Requirements checklist
- Trigger is Contact Tag
- Trigger field tag equals src:facebook
- Includes Update Contact Field
- Includes Add Contact Tag
- Adds tag: seg:facebook
- Sets field lead_source to Facebook

## Test run cases
### src:facebook tag applied
Event: Contact Tag
Expected outcomes:
- Adds tag: seg:facebook
- Sets field lead_source to Facebook

## Teach-back prompt
Explain the difference between using a field vs a tag for lead source, and why consistent values matter.

## Hints
- Hint 1: Your trigger filter must match the exact tag name src:facebook.
- Hint 2: Make sure the field key is lead_source and the value is exactly Facebook.

## Admin notes (do not show learners)
### Acceptable variants (should pass)
- Add an extra tag log:source_set.
### Common mistakes (what checks should catch)
- Storing lead source as a tag only.
- Inconsistent values like facebook vs Facebook.
