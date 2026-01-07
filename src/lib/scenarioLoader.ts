import type { ScenarioDefinition } from "@/lib/scenarioTypes";
import { scenarioByModuleId } from "@/scenarios";

export const getScenarioForModule = (moduleId: string): ScenarioDefinition | null => {
  return scenarioByModuleId[moduleId] ?? null;
};
