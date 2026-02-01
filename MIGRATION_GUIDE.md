# Migration Guide: Week-Based Structure

This guide documents the complete overhaul of the folder structure to support multiple weeks of course content.

## What Changed

### Old Structure
```
modules/              # All modules in one folder
practice/             # All practice files in one folder
week-2/               # Duplicate of modules/
src/scenarios/        # All scenarios in one folder
```

### New Structure
```
content/
  week-2/
    manifest.json      # Week metadata
    modules/          # Week 2 modules only
    practice/         # Week 2 practice files
    scenarios/        # Week 2 scenarios
    resources/        # Week 2 resources
  week-3/             # Future weeks follow same pattern
    ...
```

## Benefits

1. **Scalability**: Easy to add new weeks without cluttering root directory
2. **Organization**: Each week is self-contained
3. **Auto-Discovery**: System automatically finds and loads all weeks
4. **Better UX**: Week-based navigation in the UI
5. **Clear Separation**: Resources, practice, and scenarios organized by week

## Migration Status

✅ Week 2 content migrated to `content/week-2/`
✅ Loaders updated to support week-based structure
✅ UI updated to show week navigation
✅ Backward compatibility maintained

## How It Works

### Week Discovery
- System scans `content/` for folders matching `week-N` pattern
- Loads `manifest.json` from each week folder
- Aggregates all modules across weeks

### Module Loading
1. System finds module by ID (e.g., `L2.1`)
2. Determines week number from module ID pattern
3. Loads module markdown from `content/week-N/modules/`
4. Falls back to old structure if week structure not found

### Practice Loading
1. Tries `content/week-N/practice/{moduleId}.yaml`
2. Falls back to `practice/{moduleId}.yaml`

### Scenario Loading
1. Tries `content/week-N/scenarios/{moduleId}.json`
2. Falls back to `src/scenarios/` (legacy)

## Adding New Weeks

See `content/README.md` for detailed instructions on adding new weeks.

## Cleanup (Optional)

After verifying everything works, you can optionally remove:
- `modules/` (if all modules migrated)
- `week-2/` (duplicate, now in `content/week-2/`)
- `practice/` (if all practice files migrated)

**Note**: Keep these folders until you're confident the new structure works in production.

## Testing

1. Verify all Week 2 modules load correctly
2. Check that practice files load for modules with practice specs
3. Confirm week navigation appears in UI
4. Test that modules are grouped by week in sidebar

## Rollback

If needed, the system maintains backward compatibility:
- Old `modules/` folder still works
- Old `practice/` folder still works
- Old `src/scenarios/` still works

Simply ensure `src/data/moduleManifest.json` exists with the old structure.
