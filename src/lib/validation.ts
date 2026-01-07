import type {
  WorkflowGraph,
  WorkflowNode,
  IfElseConfig,
  NodeType
} from "@/lib/workflowTypes";
import type { Scenario, ScenarioRequirement } from "@/lib/scenarioTypes";
import { getNodeDefinition } from "@/lib/nodeCatalog";
import { getNodeDisplayName } from "@/lib/ghlTerms";

export type ValidationStage = "A" | "B" | "C" | "D";

export type ValidationIssue = {
  id: string;
  stage: ValidationStage;
  level: "error" | "warning";
  what: string;
  why: string;
  where: string;
  next: string;
  nodeId?: string;
  fieldKey?: string;
  fieldLabel?: string;
};

export type ValidationIssueWithContext = ValidationIssue & {
  workflowId?: string;
  workflowTitle?: string;
};

export type StageResult = {
  stage: ValidationStage;
  passed: boolean;
  issues: ValidationIssue[];
};

export type ValidationResult = {
  passed: boolean;
  stages: StageResult[];
  issues: ValidationIssue[];
};

export type SimulationRunner = (
  graph: WorkflowGraph,
  testCase: any
) => { passed: boolean; errors?: string[] };

const createIssue = (
  stage: ValidationStage,
  what: string,
  why: string,
  where: string,
  next: string,
  nodeId?: string,
  level: "error" | "warning" = "error",
  fieldKey?: string,
  fieldLabel?: string
): ValidationIssue => ({
  id: `${stage}-${what}-${nodeId ?? "global"}-${fieldKey ?? "field"}`,
  stage,
  level,
  what,
  why,
  where,
  next,
  nodeId,
  fieldKey,
  fieldLabel
});

const buildAdjacency = (graph: WorkflowGraph) => {
  const outgoing = new Map<string, string[]>();
  const incoming = new Map<string, string[]>();
  graph.nodes.forEach((node) => {
    outgoing.set(node.id, []);
    incoming.set(node.id, []);
  });
  graph.edges.forEach((edge) => {
    const out = outgoing.get(edge.source) ?? [];
    out.push(edge.target);
    outgoing.set(edge.source, out);
    const inc = incoming.get(edge.target) ?? [];
    inc.push(edge.source);
    incoming.set(edge.target, inc);
  });
  return { outgoing, incoming };
};

const reachableFrom = (graph: WorkflowGraph, startId: string) => {
  const { outgoing } = buildAdjacency(graph);
  const visited = new Set<string>();
  const stack = [startId];
  while (stack.length) {
    const current = stack.pop();
    if (!current || visited.has(current)) {
      continue;
    }
    visited.add(current);
    const next = outgoing.get(current) ?? [];
    next.forEach((target) => {
      if (!visited.has(target)) {
        stack.push(target);
      }
    });
  }
  return visited;
};

const hasPathBetween = (
  graph: WorkflowGraph,
  fromNodes: WorkflowNode[],
  toType: NodeType
) => {
  const targets = new Set(
    graph.nodes.filter((node) => node.type === toType).map((node) => node.id)
  );
  for (const start of fromNodes) {
    const reachable = reachableFrom(graph, start.id);
    for (const targetId of targets) {
      if (reachable.has(targetId)) {
        return true;
      }
    }
  }
  return false;
};

const describeRequirement = (requirement: ScenarioRequirement) => {
  switch (requirement.type) {
    case "triggerIs":
      return `Trigger is ${getNodeDisplayName(requirement.value)}.`;
    case "triggerConfigEquals":
      return `Trigger field ${requirement.field} equals ${String(requirement.value)}.`;
    case "mustHaveNode":
      return `Include ${getNodeDisplayName(requirement.value)}.`;
    case "forbidNodeType":
      return `Do not include ${getNodeDisplayName(requirement.value)}.`;
    case "nodeConfigRequired":
      return `${getNodeDisplayName(requirement.nodeType)} has ${requirement.fields.join(", ")}.`;
    case "nodeOrder":
      return `Order should be: ${requirement.sequence.map(getNodeDisplayName).join(" -> ")}.`;
    case "mustContainIfElse":
      return `Include at least ${requirement.minCount ?? 1} If/Else step.`;
    case "branchCountAtLeast":
      return `If/Else has at least ${requirement.count} paths.`;
    case "pathMustInclude":
      return `Path includes ${requirement.nodeTypes.map(getNodeDisplayName).join(", ")}.`;
    case "requireStopPath":
      return "Each path ends when there are no more steps.";
    default:
      return "Checklist item is missing.";
  }
};

export const evaluateRequirement = (
  graph: WorkflowGraph,
  requirement: ScenarioRequirement
) => {
  switch (requirement.type) {
    case "triggerIs": {
      const triggers = graph.nodes.filter((node) => node.kind === "trigger");
      return triggers.some((node) => node.type === requirement.value);
    }
    case "triggerConfigEquals": {
      const triggers = graph.nodes.filter((node) => node.kind === "trigger");
      return triggers.some(
        (node) => node.config?.[requirement.field] === requirement.value
      );
    }
    case "mustHaveNode": {
      return graph.nodes.some((node) => node.type === requirement.value);
    }
    case "forbidNodeType": {
      return !graph.nodes.some((node) => node.type === requirement.value);
    }
    case "nodeConfigRequired": {
      const nodes = graph.nodes.filter((node) => node.type === requirement.nodeType);
      if (nodes.length === 0) {
        return false;
      }
      return nodes.every((node) =>
        requirement.fields.every((field) => {
          const value = node.config?.[field];
          if (value === undefined || value === null) {
            return false;
          }
          if (typeof value === "string") {
            return value.trim().length > 0;
          }
          return true;
        })
      );
    }
    case "nodeOrder": {
      let currentNodes = graph.nodes.filter((node) => node.type === requirement.sequence[0]);
      if (!currentNodes.length) {
        return false;
      }
      for (let i = 1; i < requirement.sequence.length; i += 1) {
        const targetType = requirement.sequence[i];
        const found = hasPathBetween(graph, currentNodes, targetType);
        if (!found) {
          return false;
        }
        currentNodes = graph.nodes.filter((node) => node.type === targetType);
      }
      return true;
    }
    case "mustContainIfElse": {
      const count = graph.nodes.filter((node) => node.type === "ifElse").length;
      return count >= (requirement.minCount ?? 1);
    }
    case "branchCountAtLeast": {
      const ifElseNodes = graph.nodes.filter((node) => node.type === "ifElse");
      return ifElseNodes.some((node) => {
        const config = node.config as IfElseConfig;
        return (config?.branches?.length ?? 0) >= requirement.count;
      });
    }
    case "pathMustInclude": {
      return requirement.nodeTypes.every((nodeType) =>
        graph.nodes.some((node) => node.type === nodeType)
      );
    }
    case "requireStopPath": {
      const triggers = graph.nodes.filter((node) => node.kind === "trigger");
      return triggers.some((trigger) => {
        const reachable = reachableFrom(graph, trigger.id);
        return graph.nodes.some(
          (node) => reachable.has(node.id) && (graph.edges.filter((edge) => edge.source === node.id).length === 0)
        );
      });
    }
  }
};

const validateStageA = (graph: WorkflowGraph): StageResult => {
  const issues: ValidationIssue[] = [];
  const triggers = graph.nodes.filter((node) => node.kind === "trigger");
  if (triggers.length === 0) {
    issues.push(
      createIssue(
        "A",
        "Missing trigger",
        "Every workflow must start with a trigger.",
        "Add a trigger node at the top of the flow.",
        "Drag a trigger node from the palette and connect it."
      )
    );
  }
  if (triggers.length > 1) {
    issues.push(
      createIssue(
        "A",
        "Multiple triggers",
        "MVP workflows should start from a single trigger.",
        "Remove extra triggers or split into separate workflows.",
        "Keep one trigger per workflow for clarity."
      )
    );
  }

  const { incoming } = buildAdjacency(graph);
  graph.nodes.forEach((node) => {
    if (node.kind !== "trigger" && (incoming.get(node.id) ?? []).length === 0) {
      issues.push(
        createIssue(
          "A",
          "Disconnected step",
          "Disconnected steps never run.",
          `Step "${getNodeDisplayName(node.type)}" is not connected to the main path.`,
          "Connect the step to the main path or remove it.",
          node.id,
          "warning"
        )
      );
    }
  });

  graph.nodes
    .filter((node) => node.type === "ifElse")
    .forEach((node) => {
      const config = node.config as IfElseConfig;
      const branchIds = config?.branches ?? [];
      branchIds.forEach((branch) => {
        const hasEdge = graph.edges.some(
          (edge) => edge.source === node.id && edge.sourceHandle === `branch-${branch.id}`
        );
        if (!hasEdge) {
          issues.push(
            createIssue(
              "A",
              "Unconnected branch",
              "Every If/Else branch must be connected to a next step.",
              `Branch "${branch.label}" has no next step.`,
              "Connect the branch output to the next node.",
              node.id,
              "warning"
            )
          );
        }
      });
      if (config?.elseEnabled) {
        const hasElse = graph.edges.some(
          (edge) => edge.source === node.id && edge.sourceHandle === "else"
        );
        if (!hasElse) {
          issues.push(
            createIssue(
              "A",
              "Else branch missing",
              "Else must be connected when it is on.",
              "Else is on but has no next step.",
              "Connect the Else output to the next node.",
              node.id,
              "warning"
            )
          );
        }
      }
    });

  return { stage: "A", passed: issues.length === 0, issues };
};

const validateStageB = (graph: WorkflowGraph): StageResult => {
  const issues: ValidationIssue[] = [];
  graph.nodes.forEach((node) => {
    const definition = getNodeDefinition(node.type);
    if (!definition?.configFields?.length) {
      return;
    }
    definition.configFields.forEach((field) => {
      const value = node.config?.[field.key];
      if (field.required) {
        if (value === undefined || value === null || (typeof value === "string" && value.trim().length === 0)) {
          issues.push(
            createIssue(
              "B",
              `${definition.label}: ${field.label} is missing`,
              "Required fields must be filled in.",
              `${definition.label} is missing ${field.label}.`,
              `Open Step settings and fill in ${field.label}.`,
              node.id,
              "error",
              field.key,
              field.label
            )
          );
          return;
        }
      }

      if (value !== undefined && value !== null) {
        if (field.type === "number" && typeof value !== "number") {
          issues.push(
            createIssue(
              "B",
              `${definition.label}: ${field.label} is not a number`,
              "This field needs a number.",
              `${definition.label} has a non-number value.`,
              "Enter a number.",
              node.id,
              "error",
              field.key,
              field.label
            )
          );
        }
        if (field.type === "boolean" && typeof value !== "boolean") {
          issues.push(
            createIssue(
              "B",
              `${definition.label}: ${field.label} is not true or false`,
              "This field needs true or false.",
              `${definition.label} has an invalid value.`,
              "Select true or false.",
              node.id,
              "error",
              field.key,
              field.label
            )
          );
        }
        if (field.type === "select" && field.options?.length) {
          const options = field.options.map((option) =>
            typeof option === "string" ? option : option.value
          );
          if (!options.includes(String(value))) {
            issues.push(
              createIssue(
                "B",
                `${definition.label}: ${field.label} needs a valid choice`,
                "Choose one of the available options.",
                `${definition.label} has an unsupported option.`,
                "Pick a valid option from the list.",
                node.id,
                "error",
                field.key,
                field.label
              )
            );
          }
        }
      }
    });
  });
  return { stage: "B", passed: issues.length === 0, issues };
};

const validateStageC = (graph: WorkflowGraph, scenario: Scenario): StageResult => {
  const issues: ValidationIssue[] = [];
  scenario.requirements.forEach((requirement) => {
    const ok = evaluateRequirement(graph, requirement);
    if (ok) {
      return;
    }
    const requirementText = describeRequirement(requirement);
    issues.push(
      createIssue(
        "C",
        `Checklist item missing: ${requirementText}`,
        "Think of the checklist like a recipe. One ingredient is missing.",
        "Checklist",
        "Add the missing step or setting, then run the check again."
      )
    );
  });
  return { stage: "C", passed: issues.length === 0, issues };
};

const validateStageD = (
  graph: WorkflowGraph,
  scenario: Scenario,
  runSimulation?: SimulationRunner
): StageResult => {
  const issues: ValidationIssue[] = [];
  if (!runSimulation) {
    issues.push(
      createIssue(
        "D",
        "Test run not available",
        "Test cases use the simulator to verify outcomes.",
        "The test run tool is not connected yet.",
        "Enable the test run and run the check again."
      )
    );
    return { stage: "D", passed: false, issues };
  }

  scenario.testCases.forEach((testCase) => {
    const result = runSimulation(graph, testCase);
    if (!result.passed) {
      const details = result.errors?.length
        ? `Missing items: ${result.errors.join(" ")}`
        : "Expected outcomes did not match.";
      issues.push(
        createIssue(
          "D",
          `Test did not match expected result: ${testCase.name}`,
          "The test run must match the expected result.",
          details,
          "Open Test run and compare the timeline to the expected items."
        )
      );
    }
  });
  return { stage: "D", passed: issues.length === 0, issues };
};

export const validateWorkflow = (
  graph: WorkflowGraph,
  scenario: Scenario,
  runSimulation?: SimulationRunner
): ValidationResult => {
  const stageA = validateStageA(graph);
  const stageB = validateStageB(graph);
  const stageC = validateStageC(graph, scenario);
  const stageD = validateStageD(graph, scenario, runSimulation);
  const stages = [stageA, stageB, stageC, stageD];
  const issues = stages.flatMap((stage) => stage.issues);
  return {
    passed: stages.every((stage) => stage.passed),
    stages,
    issues
  };
};

export const checkScenarioRequirements = (graph: WorkflowGraph, scenario: Scenario) =>
  scenario.requirements.map((requirement) => ({
    requirement,
    passed: evaluateRequirement(graph, requirement)
  }));
