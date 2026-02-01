export type ModuleManifestEntry = {
  moduleNumber: number;
  moduleId: string;
  title: string;
  phase: string;
  file: string;
  // Week-based fields (optional for backward compatibility)
  weekNumber?: number;
  weekTitle?: string;
};
