import type {
  WorkflowGraph,
  WorkflowNode,
  IfElseConfig,
  ConditionRule,
  NodeType
} from "@/lib/workflowTypes";
import type {
  ScenarioExpected,
  ScenarioInitialState,
  ScenarioTestCase,
  ScenarioTestCaseEvent
} from "@/lib/scenarioTypes";
import { getNodeDisplayName } from "@/lib/ghlTerms";

export type SimulationMessage = {
  channel: "sms" | "email";
  subject?: string;
  body: string;
  nodeId: string;
  timestamp: number;
};

export type SimulationTask = {
  title: string;
  assignedTo?: string;
  dueInMinutes?: number | null;
  nodeId: string;
  timestamp: number;
};

export type SimulationNotification = {
  channel: "inApp" | "email" | "sms";
  recipient: string;
  message: string;
  nodeId: string;
  timestamp: number;
};

export type SimulationWebhook = {
  url: string;
  method: "POST" | "GET";
  payloadPreview?: string;
  nodeId: string;
  timestamp: number;
};

export type SimulationLogEntry = {
  timestamp: number;
  nodeId: string;
  nodeType: NodeType;
  summary: string;
  details?: string;
};

export type SimulationState = {
  tags: string[];
  fields: Record<string, string | number | boolean | null>;
  messages: SimulationMessage[];
  tasks: SimulationTask[];
  notifications: SimulationNotification[];
  webhooks: SimulationWebhook[];
  systemTasks: SimulationTask[];
  systemNotifications: SimulationNotification[];
  tagsAdded: string[];
  tagsRemoved: string[];
};

export type SimulationResult = {
  timeline: SimulationLogEntry[];
  executedNodeIds: string[];
  finalState: SimulationState;
};

export type SimulationWorkflow = {
  workflowId: string;
  graph: WorkflowGraph;
};

export type SimulationOptions = {
  maxSteps?: number;
  injectedEvents?: { atSeconds: number; event: ScenarioTestCaseEvent }[];
};

type ScheduledEvent = {
  time: number;
  event: ScenarioTestCaseEvent;
  seq: number;
};

type ScheduledNode = {
  time: number;
  workflowId: string;
  nodeId: string;
  seq: number;
};

const createInitialState = (initialState: ScenarioInitialState): SimulationState => ({
  tags: initialState.tags ? [...initialState.tags] : [],
  fields: initialState.fields ? { ...initialState.fields } : {},
  messages: [],
  tasks: [],
  notifications: [],
  webhooks: [],
  systemTasks: [],
  systemNotifications: [],
  tagsAdded: [],
  tagsRemoved: []
});

const isSystemTrigger = (nodeType: NodeType) => nodeType === "scheduler.daily";

const normalizeRuleValue = (value: any) => {
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
};

const evaluateRule = (rule: ConditionRule, state: SimulationState) => {
  switch (rule.type) {
    case "tagExists":
      return state.tags.includes(rule.tag);
    case "fieldExists": {
      const value = state.fields[rule.fieldKey];
      return value !== undefined && value !== null && String(value).length > 0;
    }
    case "fieldEquals": {
      const current = state.fields[rule.fieldKey];
      return current === normalizeRuleValue(rule.value);
    }
  }
};

const matchesTrigger = (node: WorkflowNode, event: ScenarioTestCaseEvent) => {
  if (node.type !== event.type) {
    return false;
  }
  if (node.type === "contact.tagAdded") {
    if (!node.config?.tag) {
      return true;
    }
    return node.config.tag === event.tag;
  }
  if (node.type === "form.submitted") {
    if (node.config?.formName) {
      return node.config.formName === event.formName;
    }
    if (node.config?.formId) {
      return node.config.formId === event.formId;
    }
  }
  if (node.type === "appointment.scheduled") {
    if (node.config?.calendarName) {
      return node.config.calendarName === event.calendarName;
    }
    if (node.config?.calendarId) {
      return node.config.calendarId === event.calendarId;
    }
  }
  if (node.type === "opportunity.stageChanged") {
    if (node.config?.stageName) {
      return node.config.stageName === event.stageName;
    }
    if (node.config?.pipelineName) {
      return node.config.pipelineName === event.pipelineName;
    }
  }
  return true;
};

const getOutgoingTargets = (
  graph: WorkflowGraph,
  nodeId: string,
  sourceHandle?: string
) => {
  const edges = graph.edges.filter((edge) => edge.source === nodeId);
  const filtered = sourceHandle
    ? edges.filter((edge) => edge.sourceHandle === sourceHandle)
    : edges;
  return filtered.map((edge) => edge.target).sort();
};

const logEntry = (
  timeline: SimulationLogEntry[],
  timestamp: number,
  node: WorkflowNode,
  summary: string,
  details?: string
) => {
  timeline.push({
    timestamp,
    nodeId: node.id,
    nodeType: node.type,
    summary,
    details
  });
};

const pushNextSteps = (
  timeline: SimulationLogEntry[],
  graph: WorkflowGraph,
  node: WorkflowNode,
  workflowId: string,
  time: number,
  nodeQueue: ScheduledNode[],
  seqRef: { value: number },
  sourceHandle?: string
) => {
  const targets = getOutgoingTargets(graph, node.id, sourceHandle);
  if (targets.length === 0) {
    logEntry(timeline, time, node, "Workflow ended (no more steps).");
    return;
  }
  targets.forEach((target) =>
    nodeQueue.push({
      time,
      workflowId,
      nodeId: target,
      seq: seqRef.value++
    })
  );
};

export const simulateWorkflows = (
  workflows: SimulationWorkflow[],
  event: ScenarioTestCaseEvent,
  initialState: ScenarioInitialState,
  options: SimulationOptions = {}
): SimulationResult => {
  const state = createInitialState(initialState);
  const timeline: SimulationLogEntry[] = [];
  const executedNodeIds: string[] = [];
  const maxSteps = options.maxSteps ?? 500;

  const workflowMap = new Map(workflows.map((workflow) => [workflow.workflowId, workflow.graph]));
  let eventSeq = 0;
  const nodeSeqRef = { value: 0 };
  const eventQueue: ScheduledEvent[] = [{ time: 0, event, seq: eventSeq++ }];
  if (options.injectedEvents?.length) {
    options.injectedEvents.forEach((injected) =>
      eventQueue.push({ time: injected.atSeconds, event: injected.event, seq: eventSeq++ })
    );
  }

  const nodeQueue: ScheduledNode[] = [];
  const triggerHistory = new Map<string, number>();

  const scheduleWorkflowTriggers = (time: number, eventToProcess: ScenarioTestCaseEvent) => {
    workflows.forEach((workflow) => {
      workflow.graph.nodes
        .filter((node) => node.kind === "trigger")
        .forEach((node) => {
          if (!matchesTrigger(node, eventToProcess)) {
            return;
          }
          const key = `${workflow.workflowId}:${eventToProcess.type}:${eventToProcess.tag ?? ""}`;
          const count = triggerHistory.get(key) ?? 0;
          if (count >= 3) {
            return;
          }
          triggerHistory.set(key, count + 1);
          nodeQueue.push({
            time,
            workflowId: workflow.workflowId,
            nodeId: node.id,
            seq: nodeSeqRef.value++
          });
        });
    });
  };

  scheduleWorkflowTriggers(0, event);

  let steps = 0;
  while ((eventQueue.length || nodeQueue.length) && steps < maxSteps) {
    steps += 1;
    const nextEvent = eventQueue.sort((a, b) => a.time - b.time || a.seq - b.seq)[0];
    const nextNode = nodeQueue.sort((a, b) => a.time - b.time || a.seq - b.seq)[0];

    if (nextEvent && (!nextNode || nextEvent.time <= nextNode.time)) {
      eventQueue.shift();
      scheduleWorkflowTriggers(nextEvent.time, nextEvent.event);
      continue;
    }

    if (!nextNode) {
      break;
    }

    nodeQueue.shift();
    const graph = workflowMap.get(nextNode.workflowId);
    if (!graph) {
      continue;
    }
    const node = graph.nodes.find((n) => n.id === nextNode.nodeId);
    if (!node) {
      continue;
    }

    executedNodeIds.push(node.id);

    if (node.kind === "trigger") {
      logEntry(
        timeline,
        nextNode.time,
        node,
        `Trigger fired: ${getNodeDisplayName(node.type)}`
      );
      pushNextSteps(
        timeline,
        graph,
        node,
        nextNode.workflowId,
        nextNode.time,
        nodeQueue,
        nodeSeqRef
      );
      continue;
    }

    if (node.type === "stop") {
      logEntry(timeline, nextNode.time, node, "Workflow ended (no more steps).");
      continue;
    }

    if (node.type === "wait.duration") {
      const duration = Number(node.config?.durationSeconds ?? 0);
      const resumeTime = nextNode.time + Math.max(0, duration);
      logEntry(
        timeline,
        nextNode.time,
        node,
        `Wait for ${duration} seconds`,
        `Resumes at +${duration}s`
      );
      pushNextSteps(
        timeline,
        graph,
        node,
        nextNode.workflowId,
        resumeTime,
        nodeQueue,
        nodeSeqRef
      );
      continue;
    }

    if (node.type === "ifElse") {
      const config = node.config as IfElseConfig;
      const branch = config.branches.find((branchItem) => {
        const rules = branchItem.condition.rules;
        if (!rules.length) return false;
        const checks = rules.map((rule) => evaluateRule(rule, state));
        return branchItem.condition.anyAll === "all"
          ? checks.every(Boolean)
          : checks.some(Boolean);
      });
      if (branch) {
        logEntry(
          timeline,
          nextNode.time,
          node,
          `If/Else matched: ${branch.label}`
        );
        pushNextSteps(
          timeline,
          graph,
          node,
          nextNode.workflowId,
          nextNode.time,
          nodeQueue,
          nodeSeqRef,
          `branch-${branch.id}`
        );
      } else if (config.elseEnabled) {
        logEntry(timeline, nextNode.time, node, "If/Else took Else branch");
        pushNextSteps(
          timeline,
          graph,
          node,
          nextNode.workflowId,
          nextNode.time,
          nodeQueue,
          nodeSeqRef,
          "else"
        );
      } else {
        logEntry(timeline, nextNode.time, node, "If/Else had no matching branch");
        pushNextSteps(
          timeline,
          graph,
          node,
          nextNode.workflowId,
          nextNode.time,
          nodeQueue,
          nodeSeqRef
        );
      }
      continue;
    }

    switch (node.type) {
      case "sms.send": {
        const body = String(node.config?.body ?? "");
        state.messages.push({
          channel: "sms",
          body,
          nodeId: node.id,
          timestamp: nextNode.time
        });
        logEntry(timeline, nextNode.time, node, "Sent SMS", body);
        break;
      }
      case "email.send": {
        const subject = String(node.config?.subject ?? "");
        const body = String(node.config?.body ?? "");
        state.messages.push({
          channel: "email",
          subject,
          body,
          nodeId: node.id,
          timestamp: nextNode.time
        });
        logEntry(timeline, nextNode.time, node, "Sent Email", subject);
        break;
      }
      case "tag.add": {
        const tag = String(node.config?.tag ?? "");
        if (tag && !state.tags.includes(tag)) {
          state.tags.push(tag);
          state.tagsAdded.push(tag);
        }
        logEntry(timeline, nextNode.time, node, `Tag added: ${tag}`);
        if (tag) {
          eventQueue.push({
            time: nextNode.time,
            event: { type: "contact.tagAdded", tag },
            seq: eventSeq++
          });
        }
        break;
      }
      case "tag.remove": {
        const tag = String(node.config?.tag ?? "");
        state.tags = state.tags.filter((existing) => existing !== tag);
        if (tag) {
          state.tagsRemoved.push(tag);
        }
        logEntry(timeline, nextNode.time, node, `Tag removed: ${tag}`);
        break;
      }
      case "field.update": {
        const fieldKey = String(node.config?.fieldKey ?? "");
        const rawValue = node.config?.value as any;
        let value = rawValue;
        if (typeof rawValue === "string") {
          if (rawValue.toLowerCase() === "true") {
            value = true;
          } else if (rawValue.toLowerCase() === "false") {
            value = false;
          } else if (rawValue !== "" && !Number.isNaN(Number(rawValue))) {
            value = Number(rawValue);
          }
        }
        if (fieldKey) {
          state.fields[fieldKey] = value ?? null;
        }
        logEntry(timeline, nextNode.time, node, `Field updated: ${fieldKey}`);
        break;
      }
      case "task.create": {
        const task: SimulationTask = {
          title: String(node.config?.title ?? ""),
          assignedTo: node.config?.assignedTo as string | undefined,
          dueInMinutes: node.config?.dueInMinutes as number | null,
          nodeId: node.id,
          timestamp: nextNode.time
        };
        if (isSystemTrigger(event.type)) {
          state.systemTasks.push(task);
        } else {
          state.tasks.push(task);
        }
        logEntry(timeline, nextNode.time, node, `Task created: ${task.title}`);
        break;
      }
      case "user.notify": {
        const notification: SimulationNotification = {
          channel: node.config?.channel as "inApp" | "email" | "sms",
          recipient: String(node.config?.recipient ?? ""),
          message: String(node.config?.message ?? ""),
          nodeId: node.id,
          timestamp: nextNode.time
        };
        if (isSystemTrigger(event.type)) {
          state.systemNotifications.push(notification);
        } else {
          state.notifications.push(notification);
        }
        logEntry(timeline, nextNode.time, node, `Internal notification: ${notification.message}`);
        break;
      }
      case "webhook.send": {
        const webhook: SimulationWebhook = {
          url: String(node.config?.url ?? ""),
          method: (node.config?.method as "POST" | "GET") ?? "POST",
          payloadPreview: node.config?.payloadTemplate as string | undefined,
          nodeId: node.id,
          timestamp: nextNode.time
        };
        state.webhooks.push(webhook);
        logEntry(timeline, nextNode.time, node, `Webhook sent: ${webhook.url}`);
        break;
      }
      default:
        logEntry(timeline, nextNode.time, node, `Ran ${getNodeDisplayName(node.type)}`);
        break;
    }

    pushNextSteps(
      timeline,
      graph,
      node,
      nextNode.workflowId,
      nextNode.time,
      nodeQueue,
      nodeSeqRef
    );
  }

  return {
    timeline,
    executedNodeIds,
    finalState: state
  };
};

export const compareExpected = (
  result: SimulationResult,
  expected: ScenarioExpected
): { passed: boolean; errors: string[] } => {
  const errors: string[] = [];
  const state = result.finalState;

  expected.messages?.forEach((expectation) => {
    const matches = state.messages.filter((message) => message.channel === expectation.channel);
    expectation.contains.forEach((snippet) => {
      const found = matches.some(
        (message) =>
          message.subject?.includes(snippet) ||
          message.body?.includes(snippet)
      );
      if (!found) {
        errors.push(`${expectation.channel.toUpperCase()} should include "${snippet}".`);
      }
    });
  });

  expected.tagsAdded?.forEach((tag) => {
    if (!state.tagsAdded.includes(tag)) {
      errors.push(`Tag added: ${tag}.`);
    }
  });

  expected.tagsRemoved?.forEach((tag) => {
    if (!state.tagsRemoved.includes(tag)) {
      errors.push(`Tag removed: ${tag}.`);
    }
  });

  expected.fieldsEqual?.forEach((fieldExpectation) => {
    const value = state.fields[fieldExpectation.fieldKey];
    if (value !== fieldExpectation.value) {
      errors.push(
        `Field ${fieldExpectation.fieldKey} should be ${String(fieldExpectation.value)}.`
      );
    }
  });

  expected.tasksCreated?.forEach((taskExpectation) => {
    const found = state.tasks.some((task) =>
      taskExpectation.contains.every((snippet) => task.title.includes(snippet))
    );
    if (!found) {
      errors.push(`Task with words: ${taskExpectation.contains.join(", ")}.`);
    }
  });

  expected.notifications?.forEach((notificationExpectation) => {
    const found = state.notifications.some((notification) =>
      notificationExpectation.contains.every((snippet) =>
        notification.message.includes(snippet)
      )
    );
    if (!found) {
      errors.push(
        `Notification with words: ${notificationExpectation.contains.join(", ")}.`
      );
    }
  });

  expected.webhooksFired?.forEach((webhookExpectation) => {
    const found = state.webhooks.some((webhook) =>
      webhookExpectation.urlContains.every((snippet) => webhook.url.includes(snippet))
    );
    if (!found) {
      errors.push(
        `Webhook URL contains: ${webhookExpectation.urlContains.join(", ")}.`
      );
    }
  });

  expected.systemTasksCreated?.forEach((taskExpectation) => {
    const found = state.systemTasks.some((task) =>
      taskExpectation.contains.every((snippet) => task.title.includes(snippet))
    );
    if (!found) {
      errors.push(
        `System task with words: ${taskExpectation.contains.join(", ")}.`
      );
    }
  });

  expected.systemNotifications?.forEach((notificationExpectation) => {
    const found = state.systemNotifications.some((notification) =>
      notificationExpectation.contains.every((snippet) =>
        notification.message.includes(snippet)
      )
    );
    if (!found) {
      errors.push(
        `System notification with words: ${notificationExpectation.contains.join(", ")}.`
      );
    }
  });

  return { passed: errors.length === 0, errors };
};

export const runSimulationTestCase = (
  workflows: SimulationWorkflow[],
  testCase: ScenarioTestCase
) => {
  const result = simulateWorkflows(
    workflows,
    testCase.event,
    testCase.initialState,
    { injectedEvents: testCase.injectedEvents }
  );
  const comparison = compareExpected(result, testCase.expect);
  return { result, comparison };
};
