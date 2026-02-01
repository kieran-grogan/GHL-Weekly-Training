import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import type { PracticeSpec } from "@/lib/practiceTypes";
import { getWeekForModule } from "./weekLoader";

export const loadPracticeSpec = (moduleId: string): PracticeSpec | null => {
    try {
        const cwd = process.cwd();
        
        // Try week-based structure first
        const weekNumber = getWeekForModule(moduleId);
        if (weekNumber !== null) {
            const practiceDir = path.join(cwd, "content", `week-${weekNumber}`, "practice");
            const yamlPath = path.join(practiceDir, `${moduleId}.yaml`);

            console.log(`[PracticeLoader] Attempting to load from week ${weekNumber}: ${yamlPath}`);

            if (fs.existsSync(yamlPath)) {
                const fileContents = fs.readFileSync(yamlPath, "utf8");
                const spec = yaml.load(fileContents) as PracticeSpec;
                return spec;
            }
        }

        // Fallback to old structure for backward compatibility
        const practiceDir = path.join(cwd, "practice");
        const yamlPath = path.join(practiceDir, `${moduleId}.yaml`);

        console.log(`[PracticeLoader] Attempting to load from legacy location: ${yamlPath}`);

        if (fs.existsSync(yamlPath)) {
            const fileContents = fs.readFileSync(yamlPath, "utf8");
            const spec = yaml.load(fileContents) as PracticeSpec;
            return spec;
        }

        console.log(`[PracticeLoader] No practice spec found for ${moduleId}`);
        return null;
    } catch (error) {
        console.error(`[PracticeLoader] Error loading practice spec for ${moduleId}:`, error);
        return null;
    }
};

export const getPracticeType = (moduleId: string): PracticeSpec["practiceType"] | null => {
    const spec = loadPracticeSpec(moduleId);
    return spec?.practiceType ?? null;
};
