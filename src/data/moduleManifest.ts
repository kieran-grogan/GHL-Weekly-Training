import manifest from "./moduleManifest.json";

export type ModuleManifestEntry = {
  moduleNumber: number;
  moduleId: string;
  title: string;
  phase: string;
  file: string;
};

export const moduleManifest = manifest as ModuleManifestEntry[];
