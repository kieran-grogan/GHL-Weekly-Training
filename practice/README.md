# Practice Specifications

This directory contains YAML files that define module-specific practice requirements. Each file is named `{moduleId}.yaml` and specifies how the practice tab should behave for that module.

## Practice Types

### 1. workflow_build
Uses the existing workflow simulator (default behavior).

```yaml
moduleId: "M01"
practiceType: "workflow_build"
title: "Build Welcome SMS Workflow"
description: "Build an automated welcome SMS workflow"
```

### 2. checklist
Shows a checklist of items with required evidence submission.

```yaml
moduleId: "L2.1"
practiceType: "checklist"
title: "Complete GHL Orientation"
description: "Complete all orientation tasks"

checklistItems:
  - id: "unique-id"
    description: "Task description"
    requiredEvidence:
      - "screenshot"  # Options: screenshot, loom, text
      - "loom"
```

### 3. deliverable
Shows deliverable templates with submission requirements.

```yaml
moduleId: "L2.4"
practiceType: "deliverable"
title: "Submit Social Media Planner"
description: "Create and submit your planner"

deliverables:
  - id: "deliverable-id"
    name: "Deliverable Name"
    description: "What to submit"
    template: |
      Optional template content
      Can be multiline
    fileTypes:
      - ".csv"
      - ".xlsx"
      - "Google Sheets link"
```

### 4. system_build
Shows multi-part checklist for building complete systems.

```yaml
moduleId: "L2.5"
practiceType: "system_build"
title: "Build Customer Support System"
description: "Build pipeline + forms + workflows"

systemParts:
  - id: "part-id"
    type: "pipeline"  # Options: pipeline, form, workflow, other
    title: "Pipeline Setup"
    steps:
      - id: "step-id"
        description: "Step description"
    testProof:
      required: true
      description: "What proof to submit"
```

### 5. capstone
Shows artifact checklist and teach-back agenda preparation.

```yaml
moduleId: "L2.8"
practiceType: "capstone"
title: "Week 2 Capstone"
description: "Complete all artifacts and teach-back"

capstoneArtifacts:
  - id: "artifact-id"
    name: "Artifact Name"
    description: "What this artifact is"
    checklistItems:
      - id: "item-id"
        description: "Item description"

teachBackAgenda:
  - topic: "Topic Name"
    duration: "10 minutes"
    keyPoints:
      - "Key point 1"
      - "Key point 2"
```

## Usage

1. Create a YAML file named `{moduleId}.yaml` in this directory
2. The moduleId must match the ID in `moduleManifest.json`
3. If no practice spec exists, the module will default to workflow_build (if a scenario exists)
4. All practice types support the `title` and `description` fields

## Examples

See the existing YAML files in this directory for complete examples of each practice type.
