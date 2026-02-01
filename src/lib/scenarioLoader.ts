import fs from "fs";
import path from "path";
import type { ScenarioDefinition } from "@/lib/scenarioTypes";
import { getWeekForModule } from "./weekLoader";

// Legacy scenarios import for backward compatibility
import { scenarioByModuleId as legacyScenarioByModuleId } from "@/scenarios";

/**
 * Load scenario from week-based structure
 */
const loadWeekScenario = (moduleId: string): ScenarioDefinition | null => {
  try {
    const weekNumber = getWeekForModule(moduleId);
    if (weekNumber === null) {
      return null;
    }

    const cwd = process.cwd();
    const scenarioDir = path.join(cwd, "content", `week-${weekNumber}`, "scenarios");
    
    // Try different naming patterns
    const possibleNames = [
      `${moduleId}.json`,
      `scenario_${moduleId}.json`,
      `m${moduleId.replace(/[^0-9]/g, "")}.json`,
    ];

    for (const fileName of possibleNames) {
      const scenarioPath = path.join(scenarioDir, fileName);
      if (fs.existsSync(scenarioPath)) {
        const fileContents = fs.readFileSync(scenarioPath, "utf8");
        const scenario = JSON.parse(fileContents) as ScenarioDefinition;
        return scenario;
      }
    }

    return null;
  } catch (error) {
    console.error(`[ScenarioLoader] Error loading scenario for ${moduleId}:`, error);
    return null;
  }
};

/**
 * Get scenario for a module, checking week structure first, then legacy
 */
export const getScenarioForModule = (moduleId: string): ScenarioDefinition | null => {
  // Try week-based structure first
  const weekScenario = loadWeekScenario(moduleId);
  if (weekScenario) {
    return weekScenario;
  }

  // Fallback to legacy scenarios
  return legacyScenarioByModuleId[moduleId] ?? null;
};
