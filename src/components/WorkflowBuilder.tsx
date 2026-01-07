"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  type Connection,
  type Edge,
  type Node,
  useEdgesState,
  useNodesState
} from "reactflow";
import "reactflow/dist/style.css";

import { nanoid } from "nanoid";
import { NodePalette } from "@/components/NodePalette";
import { NodeInspector } from "@/components/NodeInspector";
import { IfElseNode, WorkflowNode } from "@/components/WorkflowNodes";
import { getDefaultConfig, getNodeDefinition } from "@/lib/nodeCatalog";
import type { NodeKind, NodeType, WorkflowNode as WorkflowNodeType } from "@/lib/workflowTypes";
import { getBuilderWarnings, type BuilderNodeData } from "@/lib/builderWarnings";
import type { ValidationIssueWithContext } from "@/lib/validation";

type WorkflowBuilderProps = {
  moduleId: string;
  workflowId?: string;
  allowedNodeTypes?: NodeType[];
  focusNodeId?: string | null;
  focusFieldKey?: string | null;
  singleTriggerMode?: boolean;
  onReadyForCheckChange?: (ready: boolean) => void;
  validationIssues?: ValidationIssueWithContext[];
  onFixNode?: (nodeId?: string, fieldKey?: string) => void;
  expectedFieldHints?: Partial<
    Record<
      NodeType,
      Record<string, { label: string; values: string[]; note?: string }>
    >
  >;
};

type StoredWorkflow = {
  nodes: Node<BuilderNodeData>[];
  edges: Edge[];
};

type BuilderPanel = "palette" | "canvas" | "helper" | "settings" | "fixes";

type MoveDirection = "up" | "down";

type MovePlan = {
  current: Node<BuilderNodeData>;
  prev: Node<BuilderNodeData> | null;
  next: Node<BuilderNodeData> | null;
  prevEdge: Edge | null;
  nextEdge: Edge | null;
  prevPrevEdge: Edge | null;
  nextNextEdge: Edge | null;
  canMoveUp: boolean;
  canMoveDown: boolean;
  reason: string | null;
};

const nodeTypes = {
  workflowNode: WorkflowNode,
  ifElseNode: IfElseNode
};

const STORAGE_PREFIX = "ghlwm:workflow:v1:";
const STALE_MS = 45000;

const isMissingValue = (value: unknown) => {
  if (value === undefined || value === null) {
    return true;
  }
  if (typeof value === "string") {
    return value.trim().length === 0;
  }
  return false;
};

const hasEdgeHandles = (edge?: Edge | null) => {
  if (!edge) {
    return false;
  }
  return Boolean(edge.sourceHandle || edge.targetHandle);
};

export const WorkflowBuilder = ({
  moduleId,
  workflowId,
  allowedNodeTypes,
  focusNodeId,
  focusFieldKey,
  singleTriggerMode,
  onReadyForCheckChange,
  validationIssues,
  onFixNode,
  expectedFieldHints
}: WorkflowBuilderProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<BuilderNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [ready, setReady] = useState(false);
  const [activePanel, setActivePanel] = useState<BuilderPanel>("canvas");
  const [guideMode, setGuideMode] = useState(true);
  const [isStale, setIsStale] = useState(false);
  const [coachMessage, setCoachMessage] = useState<string | null>(null);
  const lastActiveRef = useRef<number>(Date.now());

  const markActive = useCallback(() => {
    lastActiveRef.current = Date.now();
    setIsStale(false);
  }, []);

  const storageKey = `${STORAGE_PREFIX}${moduleId}${workflowId ? `:${workflowId}` : ""}`;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      const parsed = JSON.parse(raw) as StoredWorkflow;
      setNodes(parsed.nodes ?? []);
      setEdges(parsed.edges ?? []);
    }
    setReady(true);
  }, [setEdges, setNodes, storageKey]);

  useEffect(() => {
    if (!ready || typeof window === "undefined") {
      return;
    }
    const payload: StoredWorkflow = { nodes, edges };
    window.localStorage.setItem(storageKey, JSON.stringify(payload));
  }, [edges, nodes, ready, storageKey]);

  useEffect(() => {
    if (focusNodeId) {
      setSelectedNodeId(focusNodeId);
      setActivePanel("settings");
    }
    if (focusFieldKey) {
      setActivePanel("settings");
    }
  }, [focusFieldKey, focusNodeId]);

  useEffect(() => {
    if (!ready) {
      return;
    }
    markActive();
  }, [edges, markActive, nodes, ready, selectedNodeId]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const interval = window.setInterval(() => {
      const stale = Date.now() - lastActiveRef.current > STALE_MS;
      setIsStale(stale);
    }, 5000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!coachMessage) {
      return;
    }
    const timeout = window.setTimeout(() => {
      setCoachMessage(null);
    }, 6000);
    return () => window.clearTimeout(timeout);
  }, [coachMessage]);

  const getDisabledReason = useCallback(
    (nodeType: NodeType) => {
      if (!guideMode) {
        return null;
      }
      const definition = getNodeDefinition(nodeType);
      if (!definition) {
        return "This step is not available yet.";
      }
      const triggerCount = nodes.filter((node) => node.data.kind === "trigger").length;
      const actionCount = nodes.filter((node) => node.data.kind === "action").length;

      if (definition.kind === "trigger" && singleTriggerMode && triggerCount >= 1) {
        return "Only one trigger in this lesson.";
      }
      if (definition.kind !== "trigger" && triggerCount === 0) {
        return "Start with a trigger first.";
      }
      if (definition.kind === "logic" && actionCount === 0) {
        return "Add one action first.";
      }
      return null;
    },
    [guideMode, nodes, singleTriggerMode]
  );

  const findAutoConnectSource = useCallback(() => {
    const outgoing = new Map<string, number>();
    edges.forEach((edge) => {
      outgoing.set(edge.source, (outgoing.get(edge.source) ?? 0) + 1);
    });
    const hasOutgoing = (id: string) => (outgoing.get(id) ?? 0) > 0;

    const selected = selectedNodeId
      ? nodes.find((node) => node.id === selectedNodeId)
      : null;
    if (selected && selected.data.nodeType !== "ifElse" && !hasOutgoing(selected.id)) {
      return selected;
    }
    const candidates = nodes.filter(
      (node) => node.data.nodeType !== "ifElse" && !hasOutgoing(node.id)
    );
    if (!candidates.length) {
      return null;
    }
    return candidates[candidates.length - 1];
  }, [edges, nodes, selectedNodeId]);

  const addNode = (nodeType: NodeType, position?: { x: number; y: number }) => {
    const definition = getNodeDefinition(nodeType);
    if (!definition) {
      return;
    }
    const disabledReason = getDisabledReason(nodeType);
    if (disabledReason) {
      setCoachMessage(disabledReason);
      setActivePanel("helper");
      return;
    }
    const sourceNode =
      definition.kind === "trigger" ? null : findAutoConnectSource();
    const id = nanoid();
    const kind = definition.kind as NodeKind;
    const resolvedPosition =
      position ??
      (sourceNode
        ? { x: sourceNode.position.x, y: sourceNode.position.y + 140 }
        : { x: 200 + nodes.length * 40, y: 120 + nodes.length * 40 });
    const newNode: Node<BuilderNodeData> = {
      id,
      type: nodeType === "ifElse" ? "ifElseNode" : "workflowNode",
      position: resolvedPosition,
      data: {
        label: definition.label,
        nodeType,
        kind,
        config: getDefaultConfig(nodeType)
      }
    };
    setNodes((current) => current.concat(newNode));
    if (sourceNode) {
      const newEdge: Edge = { id: nanoid(), source: sourceNode.id, target: id };
      setEdges((current) => current.concat(newEdge));
      setCoachMessage(`Added after ${sourceNode.data.label}. No need to draw a line.`);
    }
    setSelectedNodeId(id);
    setActivePanel("settings");
    markActive();
  };

  const onConnect = (connection: Connection) => {
    setEdges((current) => addEdge({ ...connection, id: nanoid() }, current));
    markActive();
  };

  const handleNodesChange = useCallback(
    (changes: any) => {
      markActive();
      onNodesChange(changes);
    },
    [markActive, onNodesChange]
  );

  const handleEdgesChange = useCallback(
    (changes: any) => {
      markActive();
      onEdgesChange(changes);
    },
    [markActive, onEdgesChange]
  );

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("application/ghl-node-type") as NodeType;
    if (!type || !reactFlowInstance) {
      return;
    }
    const bounds = (event.target as HTMLDivElement).getBoundingClientRect();
    const position = reactFlowInstance.project({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top
    });
    addNode(type, position);
    markActive();
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleNodeClick = useCallback(
    (_: unknown, node: Node) => {
      markActive();
      setSelectedNodeId(node.id);
      setActivePanel("settings");
    },
    [markActive]
  );

  const handlePaneClick = useCallback(() => {
    markActive();
    setSelectedNodeId(null);
  }, [markActive]);

  const selectedNode = useMemo(() => {
    if (!selectedNodeId) {
      return null;
    }
    const node = nodes.find((item) => item.id === selectedNodeId);
    if (!node) {
      return null;
    }
    return {
      id: node.id,
      type: node.data.nodeType,
      kind: node.data.kind,
      config: node.data.config,
      position: node.position
    } as WorkflowNodeType;
  }, [nodes, selectedNodeId]);

  const nodeById = useMemo(() => {
    return new Map(nodes.map((node) => [node.id, node]));
  }, [nodes]);

  const edgesBySource = useMemo(() => {
    const map = new Map<string, Edge[]>();
    edges.forEach((edge) => {
      const list = map.get(edge.source) ?? [];
      list.push(edge);
      map.set(edge.source, list);
    });
    return map;
  }, [edges]);

  const edgesByTarget = useMemo(() => {
    const map = new Map<string, Edge[]>();
    edges.forEach((edge) => {
      const list = map.get(edge.target) ?? [];
      list.push(edge);
      map.set(edge.target, list);
    });
    return map;
  }, [edges]);

  const handleConfigChange = (nodeId: string, config: WorkflowNodeType["config"]) => {
    setNodes((current) =>
      current.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, config } } : node
      )
    );
    markActive();
  };

  const handleDeleteNode = (nodeId: string) => {
    setNodes((current) => current.filter((node) => node.id !== nodeId));
    setEdges((current) =>
      current.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
    if (selectedNodeId === nodeId) {
      setSelectedNodeId(null);
    }
    setCoachMessage("Step removed. Add it back in the correct spot if needed.");
    markActive();
  };

  const warnings = useMemo(() => getBuilderWarnings(nodes, edges), [edges, nodes]);
  const testIssues = useMemo(
    () =>
      (validationIssues ?? []).slice().sort((left, right) => {
        if (left.level === right.level) {
          return left.stage.localeCompare(right.stage);
        }
        return left.level === "error" ? -1 : 1;
      }),
    [validationIssues]
  );
  const triggerNodes = nodes.filter((node) => node.data.kind === "trigger");
  const actionNodes = nodes.filter((node) => node.data.kind === "action");
  const hasTrigger = triggerNodes.length > 0;
  const hasAction = actionNodes.length > 0;
  const hasConnections = edges.length > 0;
  const missingRequiredSteps = nodes
    .map((node) => {
      const definition = getNodeDefinition(node.data.nodeType);
      if (!definition?.configFields?.length) {
        return null;
      }
      const missing = definition.configFields
        .filter((field) => field.required)
        .filter((field) => isMissingValue(node.data.config[field.key]));
      if (!missing.length) {
        return null;
      }
      return { nodeId: node.id, label: definition.label, missing };
    })
    .filter(Boolean);

  const selectedDefinition = selectedNode ? getNodeDefinition(selectedNode.type) : null;
  const selectedRequiredFields =
    selectedDefinition?.configFields?.filter((field) => field.required) ?? [];
  const selectedMissingFields =
    selectedNode && selectedDefinition
      ? selectedRequiredFields.filter((field) =>
          isMissingValue(selectedNode.config[field.key])
        )
      : [];

  const movePlan = useMemo<MovePlan | null>(() => {
    if (!selectedNodeId) {
      return null;
    }
    const current = nodeById.get(selectedNodeId);
    if (!current || current.data.kind !== "action") {
      return null;
    }
    const incoming = edgesByTarget.get(current.id) ?? [];
    const outgoing = edgesBySource.get(current.id) ?? [];
    const prevEdge = incoming.length === 1 ? incoming[0] : null;
    const nextEdge = outgoing.length === 1 ? outgoing[0] : null;
    const prev = prevEdge ? nodeById.get(prevEdge.source) ?? null : null;
    const next = nextEdge ? nodeById.get(nextEdge.target) ?? null : null;
    const prevIncoming = prev ? edgesByTarget.get(prev.id) ?? [] : [];
    const prevOutgoing = prev ? edgesBySource.get(prev.id) ?? [] : [];
    const nextIncoming = next ? edgesByTarget.get(next.id) ?? [] : [];
    const nextOutgoing = next ? edgesBySource.get(next.id) ?? [] : [];
    const prevPrevEdge = prevIncoming.length === 1 ? prevIncoming[0] : null;
    const nextNextEdge = nextOutgoing.length === 1 ? nextOutgoing[0] : null;

    let reason: string | null = null;
    if (incoming.length > 1 || outgoing.length > 1) {
      reason = "Steps on split paths cannot move up or down.";
    } else if ((prevEdge && hasEdgeHandles(prevEdge)) || (nextEdge && hasEdgeHandles(nextEdge))) {
      reason = "Steps connected to If/Else branches cannot move.";
    } else if (!prevEdge && !nextEdge) {
      reason = "Connect this step in a straight line before moving.";
    } else if (!prevEdge) {
      reason = "This step is already first in the line.";
    } else if (!nextEdge) {
      reason = "This step is already last in the line.";
    }

    const canMoveUp = Boolean(
      prev &&
        prev.data.kind === "action" &&
        prevOutgoing.length === 1 &&
        prevIncoming.length <= 1 &&
        prevPrevEdge &&
        !hasEdgeHandles(prevPrevEdge) &&
        (!nextEdge || !hasEdgeHandles(nextEdge))
    );

    const canMoveDown = Boolean(
      next &&
        next.data.kind === "action" &&
        prevEdge &&
        !hasEdgeHandles(prevEdge) &&
        nextIncoming.length === 1 &&
        nextOutgoing.length <= 1 &&
        nextEdge &&
        !hasEdgeHandles(nextEdge) &&
        (!nextNextEdge || !hasEdgeHandles(nextNextEdge))
    );

    if (!canMoveUp && !canMoveDown && !reason) {
      reason = "This step is locked because of branching.";
    }

    return {
      current,
      prev,
      next,
      prevEdge,
      nextEdge,
      prevPrevEdge,
      nextNextEdge,
      canMoveUp,
      canMoveDown,
      reason
    };
  }, [edgesBySource, edgesByTarget, nodeById, selectedNodeId]);

  const moveStep = useCallback(
    (direction: MoveDirection) => {
      if (!movePlan) {
        return;
      }
      if (direction === "up" && !movePlan.canMoveUp) {
        return;
      }
      if (direction === "down" && !movePlan.canMoveDown) {
        return;
      }

      if (direction === "up") {
        const { current, prev, prevEdge, prevPrevEdge, nextEdge } = movePlan;
        if (!prev || !prevEdge || !prevPrevEdge) {
          return;
        }
        setEdges((currentEdges) =>
          currentEdges.map((edge) => {
            if (edge.id === prevEdge.id) {
              return { ...edge, source: current.id, target: prev.id };
            }
            if (edge.id === prevPrevEdge.id) {
              return { ...edge, target: current.id };
            }
            if (nextEdge && edge.id === nextEdge.id) {
              return { ...edge, source: prev.id };
            }
            return edge;
          })
        );
        setNodes((currentNodes) =>
          currentNodes.map((node) => {
            if (node.id === current.id) {
              return { ...node, position: prev.position };
            }
            if (node.id === prev.id) {
              return { ...node, position: current.position };
            }
            return node;
          })
        );
        setCoachMessage("Moved the step up. The order is updated.");
      } else {
        const { current, next, prevEdge, nextEdge, nextNextEdge } = movePlan;
        if (!next || !prevEdge || !nextEdge) {
          return;
        }
        setEdges((currentEdges) =>
          currentEdges.map((edge) => {
            if (edge.id === prevEdge.id) {
              return { ...edge, target: next.id };
            }
            if (edge.id === nextEdge.id) {
              return { ...edge, source: next.id, target: current.id };
            }
            if (nextNextEdge && edge.id === nextNextEdge.id) {
              return { ...edge, source: current.id };
            }
            return edge;
          })
        );
        setNodes((currentNodes) =>
          currentNodes.map((node) => {
            if (node.id === current.id) {
              return { ...node, position: next.position };
            }
            if (node.id === next.id) {
              return { ...node, position: current.position };
            }
            return node;
          })
        );
        setCoachMessage("Moved the step down. The order is updated.");
      }
      markActive();
    },
    [markActive, movePlan, setEdges, setNodes]
  );

  const readyForCheck =
    hasTrigger && hasAction && hasConnections && missingRequiredSteps.length === 0;

  useEffect(() => {
    onReadyForCheckChange?.(readyForCheck);
  }, [onReadyForCheckChange, readyForCheck]);

  const guideSteps = [
    {
      id: "trigger",
      label: "Pick a trigger",
      helper: "This starts the workflow"
    },
    {
      id: "action",
      label: "Add an action",
      helper: "Send a message or update a field"
    },
    {
      id: "setup",
      label: "Fill required fields",
      helper: "We connect steps for you"
    },
    {
      id: "test",
      label: "Run a check + test run",
      helper: "Confirm it works"
    }
  ];

  const helperSteps = [
    { id: "trigger", label: "Step 1: Pick a trigger" },
    { id: "action", label: "Step 2: Add an action" },
    { id: "setup", label: "Step 3: Fill required fields" },
    { id: "test", label: "Step 4: Check + test run" }
  ];

  const panelOptions: { key: BuilderPanel; label: string }[] = [
    { key: "palette", label: "Steps" },
    { key: "canvas", label: "Map" },
    { key: "helper", label: "Helper" },
    { key: "settings", label: "Settings" },
    { key: "fixes", label: "Fixes" }
  ];

  let guideStepIndex = 3;
  if (!hasTrigger) {
    guideStepIndex = 0;
  } else if (!hasAction) {
    guideStepIndex = 1;
  } else if (!hasConnections || missingRequiredSteps.length > 0) {
    guideStepIndex = 2;
  }

  const activeGuideStepId = guideSteps[guideStepIndex]?.id ?? "test";

  let nextStepHint = "Step 4: Run a check and a test run.";
  if (!hasTrigger) {
    nextStepHint = "Step 1: Add a trigger to start the workflow.";
  } else if (!hasAction) {
    nextStepHint = "Step 2: Add your first action after the trigger.";
  } else if (!hasConnections) {
    nextStepHint = "Step 3: Add a next step so the path keeps going.";
  } else if (missingRequiredSteps.length > 0) {
    const firstMissing = missingRequiredSteps[0] as {
      label: string;
      missing: { label: string }[];
    };
    nextStepHint = `Step 3: Fill required fields in ${firstMissing.label}: ${firstMissing.missing
      .map((field) => field.label)
      .join(", ")}.`;
  }

  const focusFieldForInspector =
    focusFieldKey && (!focusNodeId || selectedNodeId === focusNodeId)
      ? focusFieldKey
      : null;
  const expectedHintsForNode = selectedNode
    ? expectedFieldHints?.[selectedNode.type]
    : undefined;

  const renderTestIssues = (position: "top" | "bottom") => {
    if (!testIssues.length) {
      return null;
    }
    return (
      <div
        className={`test-issues test-issues--${position} test-issues--blink`}
      >
        <div className="test-issues-title">From your last check</div>
            {testIssues.map((issue) => (
              <div
                key={`${issue.id}-${position}`}
                className={`test-issue-card test-issue-card--${issue.level}`}
              >
                {issue.workflowTitle && (
                  <div className="test-issue-workflow">Workflow: {issue.workflowTitle}</div>
                )}
                <div className="test-issue-what">{issue.what}</div>
                <div className="test-issue-why">Why: {issue.why}</div>
                <div className="test-issue-next">Fix: {issue.next}</div>
                {issue.nodeId && (
                  <button
                    className="btn btn-secondary btn-inline"
                    onClick={() => {
                      if (onFixNode) {
                        onFixNode(issue.nodeId, issue.fieldKey);
                      } else {
                        setSelectedNodeId(issue.nodeId ?? null);
                        setActivePanel("settings");
                      }
                    }}
                  >
                    {issue.fieldKey ? "Fix this field" : "Fix this step"}
                  </button>
                )}
              </div>
            ))}
      </div>
    );
  };

  return (
    <div className="builder-shell">
      <div className="builder-guide">
        <div className="guide-header">
          <div>
            <div className="guide-title">Guide mode</div>
            <div className="guide-subtitle">
              Follow the steps. The next step lights up when you are ready.
            </div>
          </div>
          <label className="guide-toggle">
            <input
              type="checkbox"
              checked={guideMode}
              onChange={(event) => {
                setGuideMode(event.target.checked);
                markActive();
              }}
            />
            <span>{guideMode ? "On" : "Off"}</span>
          </label>
        </div>
        {guideMode && (
          <div className="guide-steps">
            {guideSteps.map((step, index) => {
              const status =
                index < guideStepIndex
                  ? "done"
                  : index === guideStepIndex
                    ? "active"
                    : "todo";
              const shouldBlink = isStale && index === guideStepIndex;
              return (
                <div
                  key={step.id}
                  className={`guide-step guide-step--${status} ${
                    shouldBlink ? "guide-step--blink" : ""
                  }`}
                >
                  <div className="guide-step-label">{step.label}</div>
                  <div className="guide-step-helper">{step.helper}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="builder-mobile-tabs">
        {panelOptions.map((panel) => (
          <button
            key={panel.key}
            type="button"
            className={`builder-tab ${activePanel === panel.key ? "builder-tab--active" : ""}`}
            onClick={() => {
              setActivePanel(panel.key);
              markActive();
            }}
          >
            {panel.label}
          </button>
        ))}
      </div>

      <div className="builder" data-panel={activePanel}>
      <div className="builder-panel builder-panel--left">
        <NodePalette
          allowedTypes={allowedNodeTypes}
          onAddNode={addNode}
          getDisabledReason={getDisabledReason}
        />
      </div>
        <div className="builder-canvas" onDrop={handleDrop} onDragOver={handleDragOver}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={handleNodesChange}
            onEdgesChange={handleEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onNodeClick={handleNodeClick}
            onPaneClick={handlePaneClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background gap={18} size={1} />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>
        <div className="builder-panel builder-panel--right">
          <div className="builder-section helper-panel" data-section="helper">
            <div className="section-title">Beginner helper</div>
            {coachMessage && (
              <div className="helper-callout">
                {coachMessage}
              </div>
            )}
            <div className="helper-steps">
              {helperSteps.map((step) => {
                const isActive = step.id === activeGuideStepId;
                const shouldBlink = isStale && isActive;
                return (
                  <div
                    key={step.id}
                    className={`helper-step ${isActive ? "helper-step--active" : ""} ${
                      shouldBlink ? "helper-step--blink" : ""
                    }`}
                  >
                    {step.label}
                  </div>
                );
              })}
            </div>
            <div
              className={`helper-next ${isStale ? "helper-next--blink" : ""}`}
            >
              <div className="helper-label">What to do next</div>
              <div className="helper-text">{nextStepHint}</div>
            </div>
            <div className="helper-next">
              <div className="helper-label">Required fields for this step</div>
              {selectedNode ? (
                selectedRequiredFields.length > 0 ? (
                  <div className="helper-text">
                    {selectedRequiredFields.map((field) => field.label).join(", ")}
                  </div>
                ) : (
                  <div className="helper-text">No required fields.</div>
                )
              ) : (
                <div className="helper-text">Select a step to see required fields.</div>
              )}
            </div>
            {selectedMissingFields.length > 0 && (
              <div className="helper-next">
                <div className="helper-label">Missing required fields</div>
                <div className="helper-text">
                  {selectedMissingFields.map((field) => field.label).join(", ")}
                </div>
              </div>
            )}
          <div className="helper-next">
            <div className="helper-label">Quick tips</div>
            <div className="helper-text">
              We connect steps for you. If you add If/Else, connect each branch.
            </div>
          </div>
          </div>
          <div className="builder-section" data-section="settings">
            <div className="section-title">Step settings</div>
            <NodeInspector
              node={selectedNode}
              onChange={handleConfigChange}
              focusFieldKey={focusFieldForInspector}
              expectedFieldHints={expectedHintsForNode}
              onDelete={handleDeleteNode}
              onMove={movePlan ? moveStep : undefined}
              canMoveUp={movePlan?.canMoveUp ?? false}
              canMoveDown={movePlan?.canMoveDown ?? false}
              moveDisabledReason={movePlan?.reason ?? null}
            />
          </div>
          <div className="builder-section" data-section="fixes">
            <div className="section-title">Things to fix</div>
            {renderTestIssues("top")}
            {warnings.length === 0 && testIssues.length === 0 ? (
              <div className="muted">No issues yet.</div>
            ) : (
              <>
                {warnings.length > 0 && (
                  <ul className="warning-list">
                    {warnings.map((warning) => (
                      <li key={warning.id} className={`warning warning--${warning.level}`}>
                        <div className="warning-title">{warning.message}</div>
                        {warning.next && (
                          <div className="warning-next">Fix: {warning.next}</div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
            {renderTestIssues("bottom")}
          </div>
        </div>
      </div>
    </div>
  );
};
