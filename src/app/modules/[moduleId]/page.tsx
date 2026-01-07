import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { moduleManifest } from "@/data/moduleManifest";
import { ModuleShell } from "@/components/ModuleShell";
import { extractTeachBackPrompt } from "@/lib/moduleParsing";
import { getScenarioForModule } from "@/lib/scenarioLoader";
import { lintScenarioDefinition } from "@/lib/scenarioLinter";

export const runtime = "nodejs";

type ModulePageProps = {
  params: Promise<{ moduleId: string }> | { moduleId: string };
};

const loadModuleMarkdown = (filePath: string): string => {
  try {
    const absolutePath = path.join(process.cwd(), filePath);
    if (!fs.existsSync(absolutePath)) {
      console.error(`Module file not found: ${absolutePath}`);
      throw new Error(`Module file not found: ${filePath}`);
    }
    return fs.readFileSync(absolutePath, "utf8");
  } catch (error) {
    console.error(`Error loading module file ${filePath}:`, error);
    throw error;
  }
};

export default async function ModulePage({ params }: ModulePageProps) {
  const resolvedParams = await Promise.resolve(params);
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
    />
  );
}
