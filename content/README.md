# Course Content Structure

This directory contains all course content organized by week. Each week is a self-contained folder with its own modules, practice files, scenarios, and resources.

## Structure

```
content/
  week-2/
    manifest.json          # Week metadata and module list
    modules/               # Lesson markdown files
      lesson-2.1-*.md
      lesson-2.2-*.md
      ...
    practice/              # Practice YAML specifications
      L2.1.yaml
      L2.4.yaml
      ...
    scenarios/            # Workflow scenario JSON files (optional)
      L2.6.json
      ...
    resources/            # Additional resources (CSVs, images, etc.)
      social-media-posting_basic-sample.csv
      ...
  week-3/
    manifest.json
    modules/
    practice/
    scenarios/
    resources/
  ...
```

## Adding a New Week

1. **Create the week folder:**
   ```bash
   mkdir -p content/week-N/modules content/week-N/practice content/week-N/scenarios content/week-N/resources
   ```

2. **Create `manifest.json`:**
   ```json
   {
     "weekNumber": N,
     "weekTitle": "Week N - Title",
     "description": "Brief description of the week",
     "modules": [
       {
         "moduleNumber": 1,
         "moduleId": "LN.1",
         "title": "LN.1: Module Title",
         "phase": "Week N - Category",
         "file": "modules/lesson-N.1-module-title.md"
       }
     ]
   }
   ```

3. **Add module files:**
   - Place markdown lesson files in `modules/`
   - File paths in manifest should be relative to the week folder (e.g., `modules/lesson-N.1.md`)

4. **Add practice files (optional):**
   - Create YAML files in `practice/` named `{moduleId}.yaml`
   - See `practice/README.md` for practice spec format

5. **Add scenarios (optional):**
   - Place JSON scenario files in `scenarios/`
   - Name them `{moduleId}.json` or `scenario_{moduleId}.json`

6. **Add resources (optional):**
   - Place any additional files in `resources/`

## Module ID Convention

- Week 2 modules: `L2.1`, `L2.2`, etc.
- Week 3 modules: `L3.1`, `L3.2`, etc.
- This allows the system to automatically determine which week a module belongs to

## File Paths in Manifest

All file paths in `manifest.json` should be relative to the week folder:
- ✅ `"file": "modules/lesson-2.1-complete-ghl-orientation.md"`
- ❌ `"file": "content/week-2/modules/lesson-2.1-complete-ghl-orientation.md"`

The system automatically resolves paths relative to the week folder.

## Auto-Discovery

The application automatically:
- Discovers all week folders in `content/`
- Loads manifests from each week
- Aggregates all modules across weeks
- Groups modules by week in the UI

## Backward Compatibility

The system maintains backward compatibility with the old structure:
- Old `modules/` folder (if no weeks found)
- Old `practice/` folder (if week practice not found)
- Old `src/scenarios/` folder (if week scenario not found)

However, the new week-based structure is recommended for all new content.
