import type { NodeType } from "@/lib/workflowTypes";

export type AllowedNodes = {
  triggers: NodeType[];
  actions: NodeType[];
  logic: NodeType[];
};

export type ScenarioRequirement =
  | { type: "triggerIs"; value: NodeType }
  | { type: "triggerConfigEquals"; field: string; value: string | number | boolean }
  | { type: "mustHaveNode"; value: NodeType }
  | { type: "forbidNodeType"; value: NodeType }
  | { type: "nodeConfigRequired"; nodeType: NodeType; fields: string[] }
  | { type: "nodeOrder"; sequence: NodeType[] }
  | { type: "mustContainIfElse"; minCount?: number }
  | { type: "branchCountAtLeast"; nodeType: "ifElse"; count: number }
  | { type: "pathMustInclude"; nodeTypes: NodeType[] }
  | { type: "requireStopPath" };

export type ScenarioHint = {
  level: number;
  text: string;
};

export type ScenarioTestCaseEvent = {
  type: NodeType;
  [key: string]: unknown;
};

export type ScenarioInitialState = {
  tags?: string[];
  fields?: Record<string, string | number | boolean | null>;
};

export type ScenarioExpected = {
  messages?: { channel: "sms" | "email"; contains: string[] }[];
  tagsAdded?: string[];
  tagsRemoved?: string[];
  fieldsEqual?: { fieldKey: string; value: string | number | boolean | null }[];
  tasksCreated?: { contains: string[] }[];
  notifications?: { contains: string[] }[];
  webhooksFired?: { urlContains: string[] }[];
  systemTasksCreated?: { contains: string[] }[];
  systemNotifications?: { contains: string[] }[];
};

export type ScenarioTestCase = {
  name: string;
  event: ScenarioTestCaseEvent;
  initialState: ScenarioInitialState;
  expect: ScenarioExpected;
  injectedEvents?: { atSeconds: number; event: ScenarioTestCaseEvent }[];
  notes?: string;
};

export type Scenario = {
  id: string;
  moduleId: string;
  title: string;
  phase: number;
  estimatedMinutes: number;
  objectives: string[];
  allowedNodes: AllowedNodes;
  requirements: ScenarioRequirement[];
  testCases: ScenarioTestCase[];
  teachBackPrompt: string;
  hints: ScenarioHint[];
  adminNotes?: {
    acceptableVariants?: string[];
    commonMistakes?: string[];
  };
};

export type ScenarioWorkflowBundle = {
  workflowId: string;
  scenario: Scenario;
};

export type ScenarioBundle = {
  moduleId: string;
  title: string;
  workflows: ScenarioWorkflowBundle[];
  systemRules?: {
    autoTriggerOnTagAdded?: boolean;
  };
};

export type ScenarioDefinition = Scenario | ScenarioBundle;
