export type NodeKind = "trigger" | "action" | "logic";

export type NodeType =
  | "contact.created"
  | "contact.tagAdded"
  | "form.submitted"
  | "appointment.scheduled"
  | "opportunity.stageChanged"
  | "conversation.reply"
  | "scheduler.daily"
  | "sms.send"
  | "email.send"
  | "tag.add"
  | "tag.remove"
  | "field.update"
  | "task.create"
  | "user.notify"
  | "webhook.send"
  | "wait.duration"
  | "ifElse"
  | "stop";

export type ConditionRule =
  | { type: "tagExists"; tag: string }
  | { type: "fieldExists"; fieldKey: string }
  | { type: "fieldEquals"; fieldKey: string; value: string | number | boolean };

export type ConditionGroup = {
  anyAll: "all" | "any";
  rules: ConditionRule[];
};

export type IfElseBranch = {
  id: string;
  label: string;
  condition: ConditionGroup;
};

export type IfElseConfig = {
  branches: IfElseBranch[];
  elseEnabled: boolean;
};

export type NodeConfig = {
  [key: string]: unknown;
};

export type WorkflowNode = {
  id: string;
  type: NodeType;
  kind: NodeKind;
  config: NodeConfig;
  position: { x: number; y: number };
};

export type WorkflowEdge = {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
};

export type WorkflowGraph = {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  settings?: {
    allowReentry?: boolean;
    quietHours?: { start: string; end: string };
    stopOnResponse?: boolean;
  };
};
