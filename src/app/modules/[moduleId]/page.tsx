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
  params: { moduleId: string };
};

const loadModuleMarkdown = (filePath: string) => {
  const absolutePath = path.join(process.cwd(), filePath);
  return fs.readFileSync(absolutePath, "utf8");
};

export default function ModulePage({ params }: ModulePageProps) {
  const entryIndex = moduleManifest.findIndex(
    (item) => item.moduleId === params.moduleId
  );

  if (entryIndex === -1) {
    notFound();
  }

  const entry = moduleManifest[entryIndex];
  const learnMarkdown = loadModuleMarkdown(entry.file);
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
