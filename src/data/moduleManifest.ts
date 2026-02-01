import { getAllModules, loadAllWeeks, type WeekManifest } from "@/lib/weekLoader";
import type { ModuleManifestEntry } from "./moduleManifest.types";

// Legacy manifest for backward compatibility
import legacyManifest from "./moduleManifest.json";

export type { ModuleManifestEntry };

/**
 * Get all modules from week-based structure, falling back to legacy if needed
 */
export const getModuleManifest = (): ModuleManifestEntry[] => {
  try {
    const allModules = getAllModules();
    if (allModules.length > 0) {
      return allModules;
    }
  } catch (error) {
    console.warn("[ModuleManifest] Error loading week-based modules, falling back to legacy:", error);
  }

  // Fallback to legacy manifest
  return legacyManifest as ModuleManifestEntry[];
};

/**
 * Get all week manifests
 */
export const getWeekManifests = (): WeekManifest[] => {
  try {
    return loadAllWeeks();
  } catch (error) {
    console.warn("[ModuleManifest] Error loading weeks:", error);
    return [];
  }
};

// Export for backward compatibility
export const moduleManifest = getModuleManifest();
