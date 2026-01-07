import type { Edge, Node } from "reactflow";
import type { IfElseConfig, NodeKind, NodeType } from "@/lib/workflowTypes";
import { getNodeDefinition } from "@/lib/nodeCatalog";

export type BuilderNodeData = {
  label: string;
  nodeType: NodeType;
  kind: NodeKind;
  config: Record<string, unknown>;
};

export type BuilderWarning = {
  id: string;
  level: "warning" | "error";
  message: string;
  next?: string;
  nodeId?: string;
};

const isMissingValue = (value: unknown) => {
  if (value === undefined || value === null) {
    return true;
  }
  if (typeof value === "string") {
    return value.trim().length === 0;
  }
  return false;
};

export const getBuilderWarnings = (
  nodes: Node<BuilderNodeData>[],
  edges: Edge[]
): BuilderWarning[] => {
  const warnings: BuilderWarning[] = [];

  nodes.forEach((node) => {
    const definition = getNodeDefinition(node.data.nodeType);
    const hasIncoming = edges.some((edge) => edge.target === node.id);
    const hasOutgoing = edges.some((edge) => edge.source === node.id);

    if (node.data.kind !== "trigger" && !hasIncoming) {
      warnings.push({
        id: `${node.id}-disconnected`,
        level: "warning",
        nodeId: node.id,
        message: "This step is not attached to the main path yet.",
        next: "Delete it and add it again after the step you want."
      });
    }

    if (node.data.kind === "trigger" && hasOutgoing === false) {
      warnings.push({
        id: `${node.id}-trigger-no-output`,
        level: "warning",
        nodeId: node.id,
        message: "Trigger has no next step yet.",
        next: "Click an action in the Steps list to add it after the trigger."
      });
    }

    if (definition?.configFields) {
      definition.configFields.forEach((field) => {
        if (field.required && isMissingValue(node.data.config[field.key])) {
          warnings.push({
            id: `${node.id}-missing-${field.key}`,
            level: "error",
            nodeId: node.id,
            message: `${definition.label}: ${field.label} is required.`,
            next: `Open Step settings and fill in ${field.label}.`
          });
        }
      });
    }

    if (node.data.nodeType === "ifElse") {
      const config = node.data.config as IfElseConfig;
      config.branches.forEach((branch) => {
        const handleId = `branch-${branch.id}`;
        const hasBranchEdge = edges.some(
          (edge) => edge.source === node.id && edge.sourceHandle === handleId
        );
        if (!hasBranchEdge) {
          warnings.push({
            id: `${node.id}-${branch.id}-branch`,
            level: "warning",
            nodeId: node.id,
            message: `If/Else branch "${branch.label}" has no next step yet.`,
            next: "Connect that branch to the next step."
          });
        }
      });

      if (config.elseEnabled) {
        const hasElseEdge = edges.some(
          (edge) => edge.source === node.id && edge.sourceHandle === "else"
        );
        if (!hasElseEdge) {
          warnings.push({
            id: `${node.id}-else-branch`,
            level: "warning",
            nodeId: node.id,
            message: "Else branch is on but has no next step yet.",
            next: "Connect the Else branch to the next step."
          });
        }
      }
    }
  });

  return warnings;
};
