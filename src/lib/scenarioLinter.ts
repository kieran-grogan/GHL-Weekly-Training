import { NODE_CATALOG } from "@/lib/nodeCatalog";
import type { NodeType } from "@/lib/workflowTypes";
import type {
  Scenario,
  ScenarioBundle,
  ScenarioDefinition,
  ScenarioRequirement
} from "@/lib/scenarioTypes";

export type ScenarioLintIssue = {
  level: "error" | "warning";
  message: string;
  path?: string;
};

const validNodeTypes = new Set(NODE_CATALOG.map((node) => node.type));

const allowedExpectationKeys = new Set([
  "messages",
  "tagsAdded",
  "tagsRemoved",
  "fieldsEqual",
  "tasksCreated",
  "notifications",
  "webhooksFired",
  "systemTasksCreated",
  "systemNotifications"
]);

const requirementNodeTypes = (requirement: ScenarioRequirement): string[] => {
  switch (requirement.type) {
    case "triggerIs":
    case "mustHaveNode":
    case "forbidNodeType":
      return [requirement.value];
    case "nodeConfigRequired":
      return [requirement.nodeType];
    case "nodeOrder":
      return requirement.sequence;
    case "branchCountAtLeast":
      return [requirement.nodeType];
    case "pathMustInclude":
      return requirement.nodeTypes;
    default:
      return [];
  }
};

const lintScenario = (scenario: Scenario, prefix: string): ScenarioLintIssue[] => {
  const issues: ScenarioLintIssue[] = [];

  scenario.allowedNodes.triggers.forEach((type) => {
    if (!validNodeTypes.has(type)) {
      issues.push({
        level: "error",
        path: `${prefix}.allowedNodes.triggers`,
        message: `Unknown trigger node type: ${type}`
      });
    }
  });
  scenario.allowedNodes.actions.forEach((type) => {
    if (!validNodeTypes.has(type)) {
      issues.push({
        level: "error",
        path: `${prefix}.allowedNodes.actions`,
        message: `Unknown action node type: ${type}`
      });
    }
  });
  scenario.allowedNodes.logic.forEach((type) => {
    if (!validNodeTypes.has(type)) {
      issues.push({
        level: "error",
        path: `${prefix}.allowedNodes.logic`,
        message: `Unknown logic node type: ${type}`
      });
    }
  });

  scenario.requirements.forEach((requirement, index) => {
    requirementNodeTypes(requirement).forEach((type) => {
      if (!validNodeTypes.has(type as NodeType)) {
        issues.push({
          level: "error",
          path: `${prefix}.requirements[${index}]`,
          message: `Unknown node type in requirement: ${type}`
        });
      }
    });
  });

  scenario.testCases.forEach((testCase, index) => {
    if (!validNodeTypes.has(testCase.event.type)) {
      issues.push({
        level: "error",
        path: `${prefix}.testCases[${index}]`,
        message: `Unknown event type: ${testCase.event.type}`
      });
    }
    Object.keys(testCase.expect).forEach((key) => {
      if (!allowedExpectationKeys.has(key)) {
        issues.push({
          level: "warning",
          path: `${prefix}.testCases[${index}]`,
          message: `Unsupported expectation key: ${key}`
        });
      }
    });
  });

  const mustHave = new Set(
    scenario.requirements
      .filter((req) => req.type === "mustHaveNode")
      .map((req) => req.value)
  );
  const forbid = new Set(
    scenario.requirements
      .filter((req) => req.type === "forbidNodeType")
      .map((req) => req.value)
  );
  mustHave.forEach((nodeType) => {
    if (forbid.has(nodeType)) {
      issues.push({
        level: "error",
        path: `${prefix}.requirements`,
        message: `Contradictory requirements: mustHaveNode and forbidNodeType for ${nodeType}`
      });
    }
  });

  const triggerRequirements = scenario.requirements.filter(
    (req) => req.type === "triggerIs"
  );
  const triggerValues = new Set(triggerRequirements.map((req) => req.value));
  if (triggerValues.size > 1) {
    issues.push({
      level: "error",
      path: `${prefix}.requirements`,
      message: "Multiple triggerIs requirements with different values."
    });
  }

  return issues;
};

export const lintScenarioDefinition = (
  definition: ScenarioDefinition
): ScenarioLintIssue[] => {
  if ("workflows" in definition) {
    const bundle = definition as ScenarioBundle;
    return bundle.workflows.flatMap((workflow, index) =>
      lintScenario(workflow.scenario, `workflows[${index}]`)
    );
  }
  return lintScenario(definition as Scenario, "scenario");
};
