import type { WorkflowGraph } from "@/lib/workflowTypes";
import { getNodeDisplayName } from "@/lib/ghlTerms";

export type GraphSummary = {
  nodeCount: number;
  edgeCount: number;
  triggerTypes: string[];
  actionTypes: string[];
  logicTypes: string[];
};

export const summarizeGraph = (graph: WorkflowGraph): GraphSummary => {
  const triggers = graph.nodes.filter((node) => node.kind === "trigger");
  const actions = graph.nodes.filter((node) => node.kind === "action");
  const logic = graph.nodes.filter((node) => node.kind === "logic");
  return {
    nodeCount: graph.nodes.length,
    edgeCount: graph.edges.length,
    triggerTypes: Array.from(
      new Set(triggers.map((node) => getNodeDisplayName(node.type)))
    ),
    actionTypes: Array.from(
      new Set(actions.map((node) => getNodeDisplayName(node.type)))
    ),
    logicTypes: Array.from(
      new Set(logic.map((node) => getNodeDisplayName(node.type)))
    )
  };
};
