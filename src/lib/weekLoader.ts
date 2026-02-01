import fs from "fs";
import path from "path";
import type { ModuleManifestEntry } from "@/data/moduleManifest.types";

export type WeekManifest = {
  weekNumber: number;
  weekTitle: string;
  description?: string;
  modules: ModuleManifestEntry[];
};

/**
 * Discover all week folders in the content directory
 */
export const discoverWeeks = (): number[] => {
  try {
    const cwd = process.cwd();
    const contentDir = path.join(cwd, "content");
    
    if (!fs.existsSync(contentDir)) {
      return [];
    }

    const entries = fs.readdirSync(contentDir, { withFileTypes: true });
    const weeks: number[] = [];

    for (const entry of entries) {
      if (entry.isDirectory() && entry.name.startsWith("week-")) {
        const weekNum = parseInt(entry.name.replace("week-", ""), 10);
        if (!isNaN(weekNum)) {
          weeks.push(weekNum);
        }
      }
    }

    return weeks.sort((a, b) => a - b);
  } catch (error) {
    console.error("[WeekLoader] Error discovering weeks:", error);
    return [];
  }
};

/**
 * Load manifest for a specific week
 */
export const loadWeekManifest = (weekNumber: number): WeekManifest | null => {
  try {
    const cwd = process.cwd();
    const manifestPath = path.join(cwd, "content", `week-${weekNumber}`, "manifest.json");

    if (!fs.existsSync(manifestPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(manifestPath, "utf8");
    const manifest = JSON.parse(fileContents) as WeekManifest;

    // Normalize file paths to be relative to the week folder
    manifest.modules = manifest.modules.map((module) => ({
      ...module,
      file: path.join("content", `week-${weekNumber}`, module.file),
    }));

    return manifest;
  } catch (error) {
    console.error(`[WeekLoader] Error loading week ${weekNumber} manifest:`, error);
    return null;
  }
};

/**
 * Load all week manifests and aggregate modules
 */
export const loadAllWeeks = (): WeekManifest[] => {
  const weeks = discoverWeeks();
  const manifests: WeekManifest[] = [];

  for (const weekNum of weeks) {
    const manifest = loadWeekManifest(weekNum);
    if (manifest) {
      manifests.push(manifest);
    }
  }

  return manifests;
};

/**
 * Get all modules from all weeks, with week context
 */
export const getAllModules = (): Array<ModuleManifestEntry & { weekNumber: number; weekTitle: string }> => {
  const weeks = loadAllWeeks();
  const allModules: Array<ModuleManifestEntry & { weekNumber: number; weekTitle: string }> = [];

  for (const week of weeks) {
    for (const module of week.modules) {
      allModules.push({
        ...module,
        weekNumber: week.weekNumber,
        weekTitle: week.weekTitle,
      });
    }
  }

  return allModules;
};

/**
 * Find module by ID across all weeks
 */
export const findModuleById = (
  moduleId: string
): (ModuleManifestEntry & { weekNumber: number; weekTitle: string }) | null => {
  const allModules = getAllModules();
  return allModules.find((m) => m.moduleId === moduleId) || null;
};

/**
 * Get week number for a module ID
 */
export const getWeekForModule = (moduleId: string): number | null => {
  const module = findModuleById(moduleId);
  return module?.weekNumber ?? null;
};
