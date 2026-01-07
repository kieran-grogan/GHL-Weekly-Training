import type { NodeKind, NodeType } from "@/lib/workflowTypes";

export type GhlTerm = {
  internalType: NodeType;
  kind: NodeKind;
  displayName: string;
  shortHelp: string;
  whatItMeans: string;
  whyItMatters: string;
  ghlWhere: string;
  hidden?: boolean;
};

export const GHL_TERMS: GhlTerm[] = [
  {
    internalType: "contact.created",
    kind: "trigger",
    displayName: "Contact Created",
    shortHelp: "Starts when a new contact is created.",
    whatItMeans: "This step starts the workflow when a new contact is added.",
    whyItMatters: "You can welcome new leads right away.",
    ghlWhere: "In HighLevel: Workflows -> + Add Trigger -> Contact Created"
  },
  {
    internalType: "contact.tagAdded",
    kind: "trigger",
    displayName: "Contact Tag",
    shortHelp: "Starts when a tag is added to a contact.",
    whatItMeans: "This step starts when a specific tag is added.",
    whyItMatters: "Tags show intent and let you react fast.",
    ghlWhere: "In HighLevel: Workflows -> + Add Trigger -> Contact Tag"
  },
  {
    internalType: "form.submitted",
    kind: "trigger",
    displayName: "Form Submitted",
    shortHelp: "Starts when someone submits a form.",
    whatItMeans: "This step starts after a form is sent.",
    whyItMatters: "You can follow up right away.",
    ghlWhere: "In HighLevel: Workflows -> + Add Trigger -> Form Submitted"
  },
  {
    internalType: "appointment.scheduled",
    kind: "trigger",
    displayName: "Appointment Status",
    shortHelp: "Starts when an appointment status matches.",
    whatItMeans: "This step starts when an appointment reaches a status like Scheduled.",
    whyItMatters: "You can confirm or remind at the right time.",
    ghlWhere: "In HighLevel: Workflows -> + Add Trigger -> Appointment Status"
  },
  {
    internalType: "opportunity.stageChanged",
    kind: "trigger",
    displayName: "Opportunity Status Changed",
    shortHelp: "Starts when an opportunity status changes.",
    whatItMeans: "This step starts when a deal moves in the pipeline.",
    whyItMatters: "You can alert the team when a deal changes.",
    ghlWhere: "In HighLevel: Workflows -> + Add Trigger -> Opportunity Status Changed"
  },
  {
    internalType: "conversation.reply",
    kind: "trigger",
    displayName: "Customer Replied",
    shortHelp: "Starts when a contact replies.",
    whatItMeans: "This step starts when the contact replies to a message.",
    whyItMatters: "You can stop follow-ups and respond fast.",
    ghlWhere: "In HighLevel: Workflows -> + Add Trigger -> Customer Replied"
  },
  {
    internalType: "scheduler.daily",
    kind: "trigger",
    displayName: "Schedule",
    shortHelp: "Starts on a schedule (like daily).",
    whatItMeans: "This step runs at the time you pick.",
    whyItMatters: "You can run daily tasks without a contact event.",
    ghlWhere: "In HighLevel: Workflows -> + Add Trigger -> Schedule"
  },
  {
    internalType: "sms.send",
    kind: "action",
    displayName: "Send SMS",
    shortHelp: "Sends a text message to the contact.",
    whatItMeans: "This step sends a text message.",
    whyItMatters: "Text messages are fast and often read quickly.",
    ghlWhere: "In HighLevel: Workflows -> + Add Action -> Send SMS"
  },
  {
    internalType: "email.send",
    kind: "action",
    displayName: "Send Email",
    shortHelp: "Sends an email to the contact.",
    whatItMeans: "This step sends an email.",
    whyItMatters: "Email is good for longer messages.",
    ghlWhere: "In HighLevel: Workflows -> + Add Action -> Send Email"
  },
  {
    internalType: "tag.add",
    kind: "action",
    displayName: "Add Contact Tag",
    shortHelp: "Adds a tag to the contact.",
    whatItMeans: "This step adds a tag like status:new.",
    whyItMatters: "Tags track what happened and drive later steps.",
    ghlWhere: "In HighLevel: Workflows -> + Add Action -> Add Contact Tag"
  },
  {
    internalType: "tag.remove",
    kind: "action",
    displayName: "Remove Contact Tag",
    shortHelp: "Removes a tag from the contact.",
    whatItMeans: "This step removes a tag that no longer applies.",
    whyItMatters: "Clean tags prevent wrong paths later.",
    ghlWhere: "In HighLevel: Workflows -> + Add Action -> Remove Contact Tag"
  },
  {
    internalType: "field.update",
    kind: "action",
    displayName: "Update Contact Field",
    shortHelp: "Updates a contact field value.",
    whatItMeans: "This step sets a field like lead_source.",
    whyItMatters: "Fields store facts you can use later.",
    ghlWhere: "In HighLevel: Workflows -> + Add Action -> Update Contact Field"
  },
  {
    internalType: "task.create",
    kind: "action",
    displayName: "Create Task",
    shortHelp: "Creates a task for your team.",
    whatItMeans: "This step creates a task for a person to do.",
    whyItMatters: "Tasks make sure people follow up.",
    ghlWhere: "In HighLevel: Workflows -> + Add Action -> Create Task"
  },
  {
    internalType: "user.notify",
    kind: "action",
    displayName: "Internal Notification",
    shortHelp: "Sends an internal notification.",
    whatItMeans: "This step alerts a team member.",
    whyItMatters: "The team knows what to do next.",
    ghlWhere: "In HighLevel: Workflows -> + Add Action -> Internal Notification"
  },
  {
    internalType: "webhook.send",
    kind: "action",
    displayName: "Webhook",
    shortHelp: "Sends data to another system.",
    whatItMeans: "This step sends data to a web address.",
    whyItMatters: "It connects HighLevel to other tools.",
    ghlWhere: "In HighLevel: Workflows -> + Add Action -> Webhook"
  },
  {
    internalType: "wait.duration",
    kind: "logic",
    displayName: "Wait",
    shortHelp: "Pauses before the next step.",
    whatItMeans: "This step waits for a set time.",
    whyItMatters: "Spacing messages feels more natural.",
    ghlWhere: "In HighLevel: Workflows -> + Add Action -> Wait"
  },
  {
    internalType: "ifElse",
    kind: "logic",
    displayName: "If/Else",
    shortHelp: "Sends contacts down different paths.",
    whatItMeans: "This step checks a rule and picks a path.",
    whyItMatters: "You can personalize the next step.",
    ghlWhere: "In HighLevel: Workflows -> + Add Action -> If/Else"
  },
  {
    internalType: "stop",
    kind: "logic",
    displayName: "Stop",
    shortHelp: "Ends the workflow.",
    whatItMeans: "This step ends the workflow.",
    whyItMatters: "You stop follow-ups when they are not needed.",
    ghlWhere: "In HighLevel: Workflows end when there are no more steps.",
    hidden: true
  }
];

const termMap = new Map(GHL_TERMS.map((term) => [term.internalType, term]));

export const getGhlTerm = (type: NodeType) => termMap.get(type);

export const getNodeDisplayName = (type: NodeType) =>
  termMap.get(type)?.displayName ?? type;

export const getNodeShortHelp = (type: NodeType) =>
  termMap.get(type)?.shortHelp ?? "";

export const getVisibleTermsByKind = (kind: NodeKind) =>
  GHL_TERMS.filter((term) => term.kind === kind && !term.hidden);

export const GHL_TERM_SUMMARY = GHL_TERMS.filter((term) => !term.hidden).map(
  ({ kind, displayName, shortHelp, ghlWhere }) => ({
    kind,
    displayName,
    shortHelp,
    ghlWhere
  })
);
