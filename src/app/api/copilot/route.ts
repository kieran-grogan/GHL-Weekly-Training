import { NextResponse } from "next/server";

type CopilotRequestBody = {
  mode: "ask" | "explain_error" | "debug" | "teach_back";
  question: string;
  hintLevel?: number;
  context?: Record<string, unknown>;
};

export const runtime = "nodejs";

const buildFallbackReply = (body: CopilotRequestBody) => {
  const { mode, hintLevel = 1, context } = body;
  const scenario = context?.scenario as any;
  const hints = Array.isArray(scenario?.hints) ? scenario.hints : [];
  const hint = hints.find((item: any) => item.level === hintLevel)?.text;
  const issue = context?.issue as any;

  if (mode === "explain_error" && issue) {
    return [
      `What this means: ${issue.what}`,
      `Why it matters: ${issue.why}`,
      `Where to fix: ${issue.where}`,
      `Next step: ${issue.next}`,
      "Tip: Treat the checklist like a recipe. Missing one item can break the result."
    ].join("\n");
  }

  if (mode === "teach_back") {
    const rubric = context?.rubric as string[] | undefined;
    return `Use the checklist to strengthen your answer${
      rubric?.length ? ": " + rubric.join(" | ") : "."
    }`;
  }

  if (mode === "debug") {
    return [
      "Open Test run and read the timeline like a story.",
      "Find the step that did not happen.",
      "Fix that step, then run the test again."
    ].join("\n");
  }

  if (hint) {
    return hint;
  }

  return "Focus on the checklist. Build the simplest workflow that passes the test run.";
};

export async function POST(request: Request) {
  const body = (await request.json()) as CopilotRequestBody;
  const apiKey = process.env.OPENAI_API_KEY;
  const adminMode = process.env.COPILOT_ADMIN_MODE === "true";

  if (!apiKey) {
    return NextResponse.json({ reply: buildFallbackReply(body), source: "fallback" });
  }

  const systemPrompt = [
    "You are the GHL Workflow Mastery co-pilot.",
    "Use ultra-simple English. Short sentences. No jargon.",
    "Use HighLevel terms and on-screen labels. Never show internal IDs.",
    "You are a mentor, not an autopilot.",
    `Admin mode is ${adminMode ? "on" : "off"}.`,
    adminMode
      ? "You may share more detail when asked."
      : "Never output a complete solved workflow or exact step-by-step build. Offer guidance only.",
    "Follow the hint ladder: L1 restate the need, L2 point to check, L3 suggest a pattern, L4 give a simple outline.",
    "Explain errors in plain language and say what to do next.",
    "Use a small metaphor when helpful (recipe, checklist, map, or dominoes).",
    "Give 1-2 short next steps. Ask one short question if stuck.",
    "If the learner asks, offer: 'Explain even simpler' and 'Translate to <language>'.",
    "If context is missing, ask one short question."
  ].join(" ");

  const userPrompt = {
    mode: body.mode,
    hintLevel: body.hintLevel ?? 1,
    question: body.question,
    context: body.context ?? {}
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: JSON.stringify(userPrompt) }
      ],
      temperature: 0.4,
      max_tokens: 500
    })
  });

  if (!response.ok) {
    return NextResponse.json({ reply: buildFallbackReply(body), source: "fallback" });
  }

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content?.trim() ?? buildFallbackReply(body);
  return NextResponse.json({ reply, source: "openai" });
}
