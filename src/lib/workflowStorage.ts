import type { WorkflowGraph, WorkflowNode, WorkflowEdge } from "@/lib/workflowTypes";
import type { BuilderNodeData } from "@/lib/builderWarnings";
import type { Edge, Node } from "reactflow";

const STORAGE_PREFIX = "ghlwm:workflow:v1:";

type StoredWorkflow = {
  nodes: Node<BuilderNodeData>[];
  edges: Edge[];
};

const toWorkflowGraph = (stored: StoredWorkflow): WorkflowGraph => ({
  nodes: stored.nodes.map((node) => ({
    id: node.id,
    type: node.data.nodeType,
    kind: node.data.kind,
    config: node.data.config,
    position: node.position
  })) as WorkflowNode[],
  edges: stored.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    sourceHandle: edge.sourceHandle ?? undefined,
    targetHandle: edge.targetHandle ?? undefined
  })) as WorkflowEdge[]
});

export const loadWorkflowGraph = (
  moduleId: string,
  workflowId?: string
): WorkflowGraph | null => {
  if (typeof window === "undefined") {
    return null;
  }
  const storageKey = `${STORAGE_PREFIX}${moduleId}${workflowId ? `:${workflowId}` : ""}`;
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) {
    return null;
  }
  const parsed = JSON.parse(raw) as StoredWorkflow;
  return toWorkflowGraph(parsed);
};
