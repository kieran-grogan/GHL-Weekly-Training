import { nanoid } from "nanoid";
import type { NodeKind, NodeType, IfElseConfig } from "@/lib/workflowTypes";
import { getGhlTerm, getNodeDisplayName, getNodeShortHelp } from "@/lib/ghlTerms";

export type ConfigFieldType = "string" | "number" | "boolean" | "select";

export type ConfigFieldOption = { value: string; label: string };

export type ConfigField = {
  key: string;
  label: string;
  type: ConfigFieldType;
  required?: boolean;
  options?: string[] | ConfigFieldOption[];
  placeholder?: string;
  helper?: string;
};

export type NodeDefinition = {
  type: NodeType;
  kind: NodeKind;
  label: string;
  description: string;
  configFields?: ConfigField[];
  customEditor?: "ifElse";
  hidden?: boolean;
};

export const NODE_CATALOG: NodeDefinition[] = [
  {
    type: "contact.created",
    kind: "trigger",
    label: getNodeDisplayName("contact.created"),
    description: getNodeShortHelp("contact.created"),
    hidden: getGhlTerm("contact.created")?.hidden
  },
  {
    type: "contact.tagAdded",
    kind: "trigger",
    label: getNodeDisplayName("contact.tagAdded"),
    description: getNodeShortHelp("contact.tagAdded"),
    hidden: getGhlTerm("contact.tagAdded")?.hidden,
    configFields: [
      {
        key: "tag",
        label: "Tag",
        type: "string",
        required: true,
        placeholder: "status:new",
        helper: "Use the exact tag name."
      }
    ]
  },
  {
    type: "form.submitted",
    kind: "trigger",
    label: getNodeDisplayName("form.submitted"),
    description: getNodeShortHelp("form.submitted"),
    hidden: getGhlTerm("form.submitted")?.hidden,
    configFields: [
      {
        key: "formName",
        label: "Form name",
        type: "string",
        placeholder: "Contact Us",
        helper: "Optional. Use if you want one form only."
      },
      {
        key: "formId",
        label: "Form ID",
        type: "string",
        placeholder: "form_123",
        helper: "Optional. Use if you have the form ID."
      }
    ]
  },
  {
    type: "appointment.scheduled",
    kind: "trigger",
    label: getNodeDisplayName("appointment.scheduled"),
    description: getNodeShortHelp("appointment.scheduled"),
    hidden: getGhlTerm("appointment.scheduled")?.hidden,
    configFields: [
      {
        key: "calendarName",
        label: "Calendar name",
        type: "string",
        placeholder: "Sales Calendar",
        helper: "Optional. Use to match one calendar."
      },
      {
        key: "calendarId",
        label: "Calendar ID",
        type: "string",
        placeholder: "cal_123",
        helper: "Optional. Use to match one calendar."
      }
    ]
  },
  {
    type: "opportunity.stageChanged",
    kind: "trigger",
    label: getNodeDisplayName("opportunity.stageChanged"),
    description: getNodeShortHelp("opportunity.stageChanged"),
    hidden: getGhlTerm("opportunity.stageChanged")?.hidden,
    configFields: [
      {
        key: "pipelineName",
        label: "Pipeline name",
        type: "string",
        placeholder: "Sales",
        helper: "Optional. Use if you have more than one pipeline."
      },
      {
        key: "stageName",
        label: "Stage name",
        type: "string",
        required: true,
        placeholder: "Proposal Sent"
      }
    ]
  },
  {
    type: "conversation.reply",
    kind: "trigger",
    label: getNodeDisplayName("conversation.reply"),
    description: getNodeShortHelp("conversation.reply"),
    hidden: getGhlTerm("conversation.reply")?.hidden
  },
  {
    type: "scheduler.daily",
    kind: "trigger",
    label: getNodeDisplayName("scheduler.daily"),
    description: getNodeShortHelp("scheduler.daily"),
    hidden: getGhlTerm("scheduler.daily")?.hidden
  },
  {
    type: "sms.send",
    kind: "action",
    label: getNodeDisplayName("sms.send"),
    description: getNodeShortHelp("sms.send"),
    hidden: getGhlTerm("sms.send")?.hidden,
    configFields: [
      {
        key: "body",
        label: "Message",
        type: "string",
        required: true,
        placeholder: "Welcome! Thanks for reaching out."
      }
    ]
  },
  {
    type: "email.send",
    kind: "action",
    label: getNodeDisplayName("email.send"),
    description: getNodeShortHelp("email.send"),
    hidden: getGhlTerm("email.send")?.hidden,
    configFields: [
      {
        key: "subject",
        label: "Subject",
        type: "string",
        required: true,
        placeholder: "Thanks for your request"
      },
      {
        key: "body",
        label: "Email body",
        type: "string",
        required: true,
        placeholder: "Hi {{contact.first_name}}, thanks for reaching out."
      }
    ]
  },
  {
    type: "tag.add",
    kind: "action",
    label: getNodeDisplayName("tag.add"),
    description: getNodeShortHelp("tag.add"),
    hidden: getGhlTerm("tag.add")?.hidden,
    configFields: [
      { key: "tag", label: "Tag", type: "string", required: true, placeholder: "status:new" }
    ]
  },
  {
    type: "tag.remove",
    kind: "action",
    label: getNodeDisplayName("tag.remove"),
    description: getNodeShortHelp("tag.remove"),
    hidden: getGhlTerm("tag.remove")?.hidden,
    configFields: [
      {
        key: "tag",
        label: "Tag",
        type: "string",
        required: true,
        placeholder: "route:nurture_fb"
      }
    ]
  },
  {
    type: "field.update",
    kind: "action",
    label: getNodeDisplayName("field.update"),
    description: getNodeShortHelp("field.update"),
    hidden: getGhlTerm("field.update")?.hidden,
    configFields: [
      {
        key: "fieldKey",
        label: "Field",
        type: "string",
        required: true,
        placeholder: "lead_source"
      },
      {
        key: "value",
        label: "Value",
        type: "string",
        required: true,
        placeholder: "Facebook"
      }
    ]
  },
  {
    type: "task.create",
    kind: "action",
    label: getNodeDisplayName("task.create"),
    description: getNodeShortHelp("task.create"),
    hidden: getGhlTerm("task.create")?.hidden,
    configFields: [
      {
        key: "title",
        label: "Task title",
        type: "string",
        required: true,
        placeholder: "Call this lead today"
      },
      {
        key: "assignedTo",
        label: "Assigned to",
        type: "string",
        placeholder: "Team member name"
      },
      {
        key: "dueInMinutes",
        label: "Due in minutes",
        type: "number",
        placeholder: "60"
      }
    ]
  },
  {
    type: "user.notify",
    kind: "action",
    label: getNodeDisplayName("user.notify"),
    description: getNodeShortHelp("user.notify"),
    hidden: getGhlTerm("user.notify")?.hidden,
    configFields: [
      {
        key: "channel",
        label: "Channel",
        type: "select",
        required: true,
        options: [
          { value: "inApp", label: "In-app" },
          { value: "email", label: "Email" },
          { value: "sms", label: "SMS" }
        ]
      },
      {
        key: "recipient",
        label: "Recipient",
        type: "string",
        required: true,
        placeholder: "Team member name"
      },
      {
        key: "message",
        label: "Message",
        type: "string",
        required: true,
        placeholder: "New lead from Facebook"
      }
    ]
  },
  {
    type: "webhook.send",
    kind: "action",
    label: getNodeDisplayName("webhook.send"),
    description: getNodeShortHelp("webhook.send"),
    hidden: getGhlTerm("webhook.send")?.hidden,
    configFields: [
      {
        key: "url",
        label: "Webhook URL",
        type: "string",
        required: true,
        placeholder: "https://example.com/webhook"
      },
      {
        key: "method",
        label: "Method",
        type: "select",
        required: true,
        options: ["POST", "GET"]
      },
      {
        key: "payloadTemplate",
        label: "Payload (optional)",
        type: "string",
        placeholder: "{ \"lead_source\": \"Facebook\" }"
      }
    ]
  },
  {
    type: "wait.duration",
    kind: "logic",
    label: getNodeDisplayName("wait.duration"),
    description: getNodeShortHelp("wait.duration"),
    hidden: getGhlTerm("wait.duration")?.hidden,
    configFields: [
      {
        key: "durationSeconds",
        label: "Wait time (seconds)",
        type: "number",
        required: true,
        placeholder: "3600"
      }
    ]
  },
  {
    type: "ifElse",
    kind: "logic",
    label: getNodeDisplayName("ifElse"),
    description: getNodeShortHelp("ifElse"),
    hidden: getGhlTerm("ifElse")?.hidden,
    customEditor: "ifElse"
  },
  {
    type: "stop",
    kind: "logic",
    label: getNodeDisplayName("stop"),
    description: getNodeShortHelp("stop"),
    hidden: true
  }
];

export const NODE_GROUPS: Record<NodeKind, NodeDefinition[]> = {
  trigger: NODE_CATALOG.filter((node) => node.kind === "trigger"),
  action: NODE_CATALOG.filter((node) => node.kind === "action"),
  logic: NODE_CATALOG.filter((node) => node.kind === "logic")
};

export const getNodeDefinition = (type: NodeType) =>
  NODE_CATALOG.find((node) => node.type === type);

export const createDefaultIfElseConfig = (): IfElseConfig => ({
  branches: [
    {
      id: nanoid(),
      label: "Branch 1",
      condition: { anyAll: "all", rules: [] }
    }
  ],
  elseEnabled: true
});

export const getDefaultConfig = (type: NodeType) => {
  switch (type) {
    case "contact.tagAdded":
    case "tag.add":
    case "tag.remove":
      return { tag: "" };
    case "form.submitted":
      return { formName: "", formId: "" };
    case "appointment.scheduled":
      return { calendarName: "", calendarId: "" };
    case "opportunity.stageChanged":
      return { pipelineName: "", stageName: "" };
    case "sms.send":
      return { body: "" };
    case "email.send":
      return { subject: "", body: "" };
    case "field.update":
      return { fieldKey: "", value: "" };
    case "task.create":
      return { title: "", assignedTo: "", dueInMinutes: null };
    case "user.notify":
      return { channel: "inApp", recipient: "", message: "" };
    case "webhook.send":
      return { url: "", method: "POST", payloadTemplate: "" };
    case "wait.duration":
      return { durationSeconds: 0 };
    case "ifElse":
      return createDefaultIfElseConfig();
    default:
      return {};
  }
};
