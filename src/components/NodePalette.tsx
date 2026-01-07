"use client";

import { useMemo, useState } from "react";
import type { NodeType } from "@/lib/workflowTypes";
import { NODE_CATALOG } from "@/lib/nodeCatalog";
import { getGhlTerm } from "@/lib/ghlTerms";

type NodePaletteProps = {
  allowedTypes?: NodeType[];
  onAddNode: (nodeType: NodeType) => void;
  getDisabledReason?: (nodeType: NodeType) => string | null;
};

export const NodePalette = ({
  allowedTypes,
  onAddNode,
  getDisabledReason
}: NodePaletteProps) => {
  const [query, setQuery] = useState("");

  const filteredNodes = useMemo(() => {
    const base = (allowedTypes
      ? NODE_CATALOG.filter((node) => allowedTypes.includes(node.type))
      : NODE_CATALOG
    ).filter((node) => !node.hidden);
    if (!query.trim()) {
      return base;
    }
    const lower = query.toLowerCase();
    return base.filter(
      (node) =>
        node.label.toLowerCase().includes(lower) ||
        node.description.toLowerCase().includes(lower) ||
        getGhlTerm(node.type)?.ghlWhere.toLowerCase().includes(lower)
    );
  }, [allowedTypes, query]);

  const grouped = useMemo(() => {
    return {
      trigger: filteredNodes.filter((node) => node.kind === "trigger"),
      action: filteredNodes.filter((node) => node.kind === "action"),
      logic: filteredNodes.filter((node) => node.kind === "logic")
    };
  }, [filteredNodes]);

  const handleDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData("application/ghl-node-type", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const renderGroup = (title: string, nodes: typeof filteredNodes, help: string) => (
    <div className="palette-group">
      <div className="palette-title">
        <span>{title}</span>
        <span className="tooltip-badge" title={`What is this? ${help}`}>
          What is this?
        </span>
      </div>
      <div className="palette-list">
        {nodes.map((node) => {
          const disabledReason = getDisabledReason?.(node.type);
          const isDisabled = Boolean(disabledReason);
          return (
            <div
              key={node.type}
              className={`palette-item ${isDisabled ? "palette-item--disabled" : ""}`}
              draggable={!isDisabled}
              onDragStart={(event) => {
                if (isDisabled) {
                  return;
                }
                handleDragStart(event, node.type);
              }}
              onClick={() => onAddNode(node.type)}
            >
              <div className="palette-item-title">{node.label}</div>
              <div className="palette-item-help">{node.description}</div>
              {getGhlTerm(node.type) && (
                <div className="palette-item-where">{getGhlTerm(node.type)?.ghlWhere}</div>
              )}
              {(node.type === "ifElse" || node.type === "wait.duration") && (
                <div
                  className="tooltip-badge tooltip-badge--inline"
                  title={`What is this? ${node.description}`}
                >
                  What is this?
                </div>
              )}
              {isDisabled && (
                <div className="palette-item-lock">{disabledReason}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="palette">
      <input
        className="text-input"
        placeholder="Search steps..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {renderGroup("Triggers", grouped.trigger, "Triggers start a workflow.")}
      {renderGroup("Actions", grouped.action, "Actions do something for the contact.")}
      {renderGroup("Logic", grouped.logic, "Logic steps control timing or paths.")}
    </div>
  );
};
