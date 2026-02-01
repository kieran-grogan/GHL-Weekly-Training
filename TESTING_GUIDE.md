# Testing Guide: Practice System

## Quick Test Instructions

### 1. Test Checklist Practice (L2.1)
1. Navigate to `http://localhost:3000/modules/L2.1`
2. Click the "Build" tab
3. You should see:
   - 5 checklist items with checkboxes
   - Evidence input fields for each item
   - Different evidence types (screenshot, loom, text)
4. Test functionality:
   - Check/uncheck items
   - Enter evidence text/links
   - Refresh page - state should persist
   - All items checked should enable "Next" button

### 2. Test Deliverable Practice (L2.4)
1. Navigate to `http://localhost:3000/modules/L2.4`
2. Click the "Build" tab
3. You should see:
   - 2 deliverable cards
   - Template preview for CSV
   - Accepted file types badges
   - Submission link inputs
4. Test functionality:
   - Enter submission links
   - Add notes
   - Refresh page - should persist
   - Submitted deliverables show "Submitted" badge

### 3. Test System Build Practice (L2.5)
1. Navigate to `http://localhost:3000/modules/L2.5`
2. Click the "Build" tab
3. You should see:
   - 3 system parts (Pipeline, Form, Workflow)
   - Icons for each part type
   - Progress counters
   - Test proof sections
4. Test functionality:
   - Check off steps in each part
   - Progress counter updates
   - Enter test proof links
   - All parts complete → "Next" enabled

### 4. Test Capstone Practice (L2.8)
1. Navigate to `http://localhost:3000/modules/L2.8`
2. Click the "Build" tab
3. You should see:
   - Artifact checklist section
   - Teach-back agenda section
   - Multiple artifacts with nested items
   - Text areas for teach-back prep
4. Test functionality:
   - Complete artifact checklists
   - Write teach-back notes (50 word minimum)
   - Word count updates live
   - "Ready" badges appear when complete

### 5. Test Workflow Build (Default)
1. Navigate to any M-series module (e.g., `http://localhost:3000/modules/M01`)
2. Click the "Build" tab
3. Should see the normal workflow builder
4. Verify nothing broke with existing functionality

## Common Issues & Solutions

### Issue: Module shows "No practice spec" error
**Solution**: Either:
- Module doesn't have a YAML file → will default to workflow builder
- YAML filename doesn't match moduleId
- YAML syntax error → check console for parsing errors

### Issue: Practice UI doesn't render
**Solution**: 
- Check browser console for errors
- Verify CSS is loaded (network tab)
- Check that practiceSpec is being passed to ModuleShell

### Issue: State doesn't persist
**Solution**:
- Check browser localStorage
- Key format: `practice:{type}:{moduleId}`
- Clear localStorage if corrupted: `localStorage.clear()`

### Issue: "Next" button stays disabled
**Solution**:
- Check completion logic in component
- Verify `onComplete` callback is firing
- Check browser console for errors

## Debug Tools

### Check Practice Spec Loading
Open browser console and run:
```javascript
// See what practice spec was loaded
console.log('Practice Spec:', document.querySelector('[data-practice-type]'))
```

### Check LocalStorage State
```javascript
// View all practice state
Object.keys(localStorage)
  .filter(k => k.startsWith('practice:'))
  .forEach(k => console.log(k, JSON.parse(localStorage[k])))
```

### Clear Practice State
```javascript
// Clear all practice state
Object.keys(localStorage)
  .filter(k => k.startsWith('practice:'))
  .forEach(k => localStorage.removeItem(k))
```

## Expected Behavior

### Checklist Practice
- ✅ Items checked → saved to localStorage
- ✅ Evidence submitted → saved to localStorage
- ✅ All items checked + evidence → "Next" enabled
- ✅ Evidence badges show required types
- ✅ Refresh preserves state

### Deliverable Practice
- ✅ Submission links entered → saved to localStorage
- ✅ All deliverables submitted → "Next" enabled
- ✅ Template preview shows if provided
- ✅ File types displayed as badges
- ✅ "Submitted" status shows when link provided

### System Build Practice
- ✅ Steps checked → progress updates
- ✅ Test proof links → saved
- ✅ All parts complete → "Next" enabled
- ✅ Part-specific icons display
- ✅ Completion status per part

### Capstone Practice
- ✅ Artifact items checked → saved
- ✅ Teach-back notes typed → word count updates
- ✅ All artifacts + 50 words per topic → "Next" enabled
- ✅ "Ready" badges appear when topics prepared
- ✅ Nested checklist items work

## Module ID Reference

Example modules with practice specs:
- `L2.1` - Complete GHL Orientation (checklist)
- `L2.4` - Social Media Planner (deliverable)
- `L2.5` - Customer Support Process (system_build)
- `L2.8` - Week 2 Capstone (capstone)
- `M##` - Any M-series module (workflow_build, default)

## Full Test Checklist

- [ ] L2.1 renders checklist UI
- [ ] L2.1 evidence fields work
- [ ] L2.1 state persists on refresh
- [ ] L2.4 renders deliverable UI
- [ ] L2.4 shows template preview
- [ ] L2.4 submission tracking works
- [ ] L2.5 renders system build UI
- [ ] L2.5 shows all 3 parts
- [ ] L2.5 test proof fields work
- [ ] L2.8 renders capstone UI
- [ ] L2.8 artifact checklist works
- [ ] L2.8 teach-back word count works
- [ ] M-series modules still show workflow builder
- [ ] No console errors on any module
- [ ] CSS styling looks good on all types
- [ ] Mobile responsive (if applicable)

## Next Steps After Testing

1. **If tests pass**: Copy your actual practice YAML files to `/practice` directory
2. **If tests fail**: Check console errors and file an issue
3. **Customize**: Modify YAML files to match your exact requirements
4. **Add more**: Create YAML files for other modules as needed
