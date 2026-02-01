import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { getModuleManifest } from "@/data/moduleManifest";
import { ModuleShell } from "@/components/ModuleShell";
import { extractTeachBackPrompt } from "@/lib/moduleParsing";
import { getScenarioForModule } from "@/lib/scenarioLoader";
import { lintScenarioDefinition } from "@/lib/scenarioLinter";
import { loadPracticeSpec } from "@/lib/practiceLoader";

export const runtime = "nodejs";

type ModulePageProps = {
  params: Promise<{ moduleId: string }> | { moduleId: string };
};

const loadModuleMarkdown = (filePath: string): string => {
  try {
    // In Next.js/Vercel, process.cwd() should point to the project root
    // The modules directory is at the root level
    const cwd = process.cwd();
    const absolutePath = path.resolve(cwd, filePath);

    // Log for debugging (will appear in Vercel logs)
    console.log(`[ModuleLoader] Attempting to load: ${filePath}`);
    console.log(`[ModuleLoader] CWD: ${cwd}`);
    console.log(`[ModuleLoader] Absolute path: ${absolutePath}`);
    console.log(`[ModuleLoader] File exists: ${fs.existsSync(absolutePath)}`);

    if (!fs.existsSync(absolutePath)) {
      // Try alternative paths
      const altPaths = [
        path.join(cwd, filePath),
        path.resolve(".", filePath),
        path.resolve("/", filePath), // Root absolute path
      ];

      console.log(`[ModuleLoader] Trying alternative paths:`, altPaths);

      for (const altPath of altPaths) {
        if (fs.existsSync(altPath)) {
          console.log(`[ModuleLoader] Found file at: ${altPath}`);
          return fs.readFileSync(altPath, "utf8");
        }
      }

      // List directory contents for debugging
      try {
        const dirContents = fs.readdirSync(cwd);
        console.log(`[ModuleLoader] CWD contents:`, dirContents.slice(0, 20));
        const modulesDir = path.join(cwd, "modules");
        if (fs.existsSync(modulesDir)) {
          const modulesContents = fs.readdirSync(modulesDir);
          console.log(`[ModuleLoader] Modules directory exists with ${modulesContents.length} files`);
        } else {
          console.log(`[ModuleLoader] Modules directory does not exist at: ${modulesDir}`);
        }
      } catch (dirError) {
        console.error(`[ModuleLoader] Error listing directory:`, dirError);
      }

      throw new Error(`Module file not found: ${filePath} (tried: ${absolutePath})`);
    }

    return fs.readFileSync(absolutePath, "utf8");
  } catch (error) {
    console.error(`[ModuleLoader] Error loading module file ${filePath}:`, error);
    throw error;
  }
};

export default async function ModulePage({ params }: ModulePageProps) {
  const resolvedParams = await Promise.resolve(params);
  const moduleManifest = getModuleManifest();
  const entryIndex = moduleManifest.findIndex(
    (item) => item.moduleId === resolvedParams.moduleId
  );

  if (entryIndex === -1) {
    notFound();
  }

  const entry = moduleManifest[entryIndex];

  let learnMarkdown: string;
  try {
    learnMarkdown = loadModuleMarkdown(entry.file);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Failed to load module ${entry.moduleId} from ${entry.file}:`, errorMessage);
    // Return a fallback markdown content
    learnMarkdown = `# ${entry.title}\n\n⚠️ Error loading module content.\n\nFile path: ${entry.file}\nError: ${errorMessage}\n\nPlease ensure the module file exists and is accessible.`;
  }

  const teachBackPrompt = extractTeachBackPrompt(learnMarkdown);
  const scenario = getScenarioForModule(entry.moduleId);
  const practiceSpec = loadPracticeSpec(entry.moduleId);
  if (scenario) {
    const lintIssues = lintScenarioDefinition(scenario);
    if (lintIssues.length) {
      console.warn(`Scenario lint issues for ${entry.moduleId}:`, lintIssues);
    }
  }
  const nextModuleId =
    entryIndex < moduleManifest.length - 1
      ? moduleManifest[entryIndex + 1].moduleId
      : undefined;

  return (
    <ModuleShell
      moduleId={entry.moduleId}
      title={entry.title}
      phase={entry.phase}
      learnMarkdown={learnMarkdown}
      teachBackPrompt={teachBackPrompt}
      nextModuleId={nextModuleId}
      scenario={scenario}
      practiceSpec={practiceSpec}
    />
  );
}
