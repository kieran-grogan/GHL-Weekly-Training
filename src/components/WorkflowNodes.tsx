"use client";

import { Handle, Position, type NodeProps, useStore } from "reactflow";
import type { BuilderNodeData } from "@/lib/builderWarnings";
import type { IfElseConfig } from "@/lib/workflowTypes";

export const WorkflowNode = ({ id, data, selected }: NodeProps<BuilderNodeData>) => {
  const isTrigger = data.kind === "trigger";
  const edges = useStore((state) => state.edges);
  const hasOutgoing = edges.some((edge) => edge.source === id);
  const isEnd = !hasOutgoing;
  return (
    <div className={`wf-node ${selected ? "wf-node--selected" : ""}`}>
      {!isTrigger && <Handle type="target" position={Position.Top} />}
      <div className="wf-node-title">{data.label}</div>
      {isEnd && <div className="wf-node-end">End</div>}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export const IfElseNode = ({ id, data, selected }: NodeProps<BuilderNodeData>) => {
  const config = data.config as IfElseConfig;
  const edges = useStore((state) => state.edges);
  const hasOutgoing = edges.some((edge) => edge.source === id);
  return (
    <div className={`wf-node wf-node--if ${selected ? "wf-node--selected" : ""}`}>
      <Handle type="target" position={Position.Top} />
      <div className="wf-node-title">{data.label}</div>
      {!hasOutgoing && <div className="wf-node-end">End</div>}
      <div className="wf-branch-list">
        {config.branches.map((branch) => (
          <div key={branch.id} className="wf-branch">
            <span className="wf-branch-label">{branch.label}</span>
            <Handle
              type="source"
              position={Position.Right}
              id={`branch-${branch.id}`}
              className="wf-branch-handle"
            />
          </div>
        ))}
        {config.elseEnabled && (
          <div className="wf-branch wf-branch--else">
            <span className="wf-branch-label">Else</span>
            <Handle type="source" position={Position.Right} id="else" />
          </div>
        )}
      </div>
    </div>
  );
};
