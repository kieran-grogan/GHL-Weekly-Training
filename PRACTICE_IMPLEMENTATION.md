# Practice System Implementation Summary

## Overview
Implemented a module-specific practice system that allows different practice types beyond just workflow building. The system dynamically loads practice specifications from YAML files and renders the appropriate UI.

## What Was Implemented

### 1. **Type Definitions** (`src/lib/practiceTypes.ts`)
- Defined 5 practice types: `workflow_build`, `checklist`, `deliverable`, `system_build`, `capstone`
- Created TypeScript interfaces for all practice spec structures
- Includes evidence types, checklist items, deliverable requirements, system parts, and capstone artifacts

### 2. **Practice Loader** (`src/lib/practiceLoader.ts`)
- Loads YAML files from `practice/{moduleId}.yaml`
- Uses `js-yaml` library for parsing
- Returns null if no practice spec exists (defaults to workflow_build)

### 3. **Practice Components**
Created 4 new React components for non-workflow practice types:

#### ChecklistPractice (`src/components/ChecklistPractice.tsx`)
- Renders a checklist with completion tracking
- Supports evidence submission (screenshot, loom, text)
- Saves state to localStorage
- Calls `onComplete` when all items are checked

#### DeliverablePractice (`src/components/DeliverablePractice.tsx`)
- Displays deliverable templates
- Shows accepted file types
- Collects submission links and notes
- Tracks submission status

#### SystemBuildPractice (`src/components/SystemBuildPractice.tsx`)
- Multi-part checklist (pipeline, form, workflow, other)
- Progress tracking per part
- Optional test proof submission
- Icons for each system type

#### CapstonePractice (`src/components/CapstonePractice.tsx`)
- Artifact checklist with nested items
- Teach-back agenda preparation
- Word count tracking for teach-back notes
- Completion status for each artifact

### 4. **ModuleShell Integration** (`src/components/ModuleShell.tsx`)
- Updated to accept `practiceSpec` prop
- Conditionally renders practice UI based on `practiceType`
- Falls back to workflow builder if no spec or `workflow_build` type
- Maintains all existing workflow functionality

### 5. **Page Integration** (`src/app/modules/[moduleId]/page.tsx`)
- Loads practice spec using `loadPracticeSpec(moduleId)`
- Passes spec to ModuleShell
- No changes to module content loading

### 6. **Styling** (`src/app/practice.css`)
- Comprehensive CSS for all practice components
- Consistent with existing design system
- Responsive and accessible

### 7. **Example Practice Specs**
Created example YAML files demonstrating each practice type:
- `practice/L2.1.yaml` - checklist example
- `practice/L2.4.yaml` - deliverable example
- `practice/L2.5.yaml` - system_build example
- `practice/L2.8.yaml` - capstone example
- `practice/README.md` - documentation

### 8. **Dependencies**
Added npm packages:
- `js-yaml` - YAML parsing
- `@types/js-yaml` - TypeScript typings

## How It Works

1. **Module loads** → page.tsx calls `loadPracticeSpec(moduleId)`
2. **If YAML exists** → parses and returns PracticeSpec
3. **ModuleShell receives** → `practiceSpec` prop
4. **Build tab renders** → appropriate component based on `practiceType`
5. **User interacts** → state saved to localStorage
6. **Completion tracked** → `setBuildReady` called when complete

## Backward Compatibility

- **Existing workflow modules**: Continue to work as before
- **No practice spec**: Defaults to workflow builder
- **Existing scenarios**: Unchanged and still functional
- **Module content**: Not altered, only practice behavior changed

## Next Steps

To use this system for your modules:

1. **Locate your practice spec files** from the zip (`StrategixAI_Week2_PracticeSpecs_Pack.zip`)
2. **Copy YAML files** to the `practice/` directory
3. **Ensure filenames match** module IDs in `moduleManifest.json`
4. **Test each module** to verify correct practice type renders
5. **Customize YAML** as needed for your specific requirements

## File Structure
```
practice/
  ├── README.md              # Documentation
  ├── L2.1.yaml             # Example: checklist
  ├── L2.4.yaml             # Example: deliverable
  ├── L2.5.yaml             # Example: system_build
  └── L2.8.yaml             # Example: capstone

src/
  ├── lib/
  │   ├── practiceTypes.ts   # Type definitions
  │   └── practiceLoader.ts  # YAML loader
  ├── components/
  │   ├── ChecklistPractice.tsx
  │   ├── DeliverablePractice.tsx
  │   ├── SystemBuildPractice.tsx
  │   ├── CapstonePractice.tsx
  │   └── ModuleShell.tsx    # Updated
  └── app/
      ├── practice.css       # Practice styles
      ├── layout.tsx         # Updated with CSS import
      └── modules/[moduleId]/
          └── page.tsx       # Updated with loader

## Testing

To test the implementation:
1. Navigate to a module with a practice spec (e.g., `/modules/L2.1`)
2. Click the "Build" tab
3. Verify the appropriate practice UI is rendered
4. Complete items and check localStorage for saved state
5. Verify completion triggers "Next" button enable

## Notes

- All practice types use localStorage for persistence
- Practice state is keyed by `practice:{type}:{moduleId}`
- The `workflow_build` type preserves all existing workflow functionality
- Evidence fields support links/text but don't enforce validation
- Completion logic varies by practice type but always calls `onComplete(boolean)`
