export type PracticeType =
    | "workflow_build"
    | "checklist"
    | "deliverable"
    | "system_build"
    | "capstone";

export type EvidenceType = "screenshot" | "loom" | "text";

export type ChecklistItem = {
    id: string;
    description: string;
    requiredEvidence?: EvidenceType[];
    completed?: boolean;
};

export type DeliverableRequirement = {
    id: string;
    name: string;
    description: string;
    template?: string;
    fileTypes?: string[];
};

export type SystemBuildPart = {
    id: string;
    type: "pipeline" | "form" | "workflow" | "other";
    title: string;
    steps: ChecklistItem[];
    testProof?: {
        required: boolean;
        description: string;
    };
};

export type CapstoneArtifact = {
    id: string;
    name: string;
    description: string;
    checklistItems: ChecklistItem[];
};

export type CapstoneTeachBackAgenda = {
    topic: string;
    duration: string;
    keyPoints: string[];
};

export type PracticeSpec = {
    moduleId: string;
    practiceType: PracticeType;
    title: string;
    description?: string;
    // For checklist type
    checklistItems?: ChecklistItem[];
    // For deliverable type
    deliverables?: DeliverableRequirement[];
    // For system_build type
    systemParts?: SystemBuildPart[];
    // For capstone type
    capstoneArtifacts?: CapstoneArtifact[];
    teachBackAgenda?: CapstoneTeachBackAgenda[];
};
