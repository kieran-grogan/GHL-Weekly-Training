"use client";

import { useState } from "react";
import { useCopilot, type CopilotMode } from "@/contexts/CopilotContext";

export const CopilotPanel = () => {
  const { open, closePanel, messages, loading, send, clear } = useCopilot();
  const [question, setQuestion] = useState("");
  const [mode, setMode] = useState<CopilotMode>("ask");
  const [hintLevel, setHintLevel] = useState(1);
  const [translateLanguage, setTranslateLanguage] = useState("");

  if (!open) {
    return null;
  }

  const handleSubmit = async () => {
    if (!question.trim()) {
      return;
    }
    await send({ mode, question, hintLevel });
    setQuestion("");
  };

  const lastAssistant = [...messages].reverse().find((message) => message.role === "assistant");

  const handleExplainSimpler = async () => {
    const base = lastAssistant?.content
      ? `Explain this in even simpler English:\n${lastAssistant.content}`
      : "Explain this in even simpler English.";
    await send({ mode: "ask", question: base, hintLevel });
  };

  const handleTranslate = async () => {
    const language = translateLanguage.trim();
    if (!language) {
      return;
    }
    const base = lastAssistant?.content
      ? `Translate this to ${language}:\n${lastAssistant.content}`
      : `Translate this to ${language}.`;
    await send({ mode: "ask", question: base, hintLevel });
    setTranslateLanguage("");
  };

  return (
    <div className="copilot-overlay">
        <div className="copilot-panel">
          <div className="copilot-header">
            <div>
            <div className="copilot-title">AI co-pilot</div>
            <div className="copilot-subtitle">Simple, step-by-step help</div>
            </div>
            <div className="copilot-actions">
              <button className="btn btn-secondary" onClick={clear}>
                Clear
              </button>
            <button className="btn btn-secondary" onClick={closePanel}>
              Close
            </button>
          </div>
        </div>

        <div className="copilot-controls">
          <label className="field">
            <span className="field-label">Mode</span>
            <select
              className="select-input"
              value={mode}
              onChange={(event) => setMode(event.target.value as CopilotMode)}
            >
              <option value="ask">Ask a question</option>
              <option value="explain_error">Explain this error</option>
              <option value="debug">Help me debug</option>
              <option value="teach_back">Coach my explain in my words</option>
            </select>
          </label>
          <label className="field">
            <span className="field-label">Help level</span>
            <select
              className="select-input"
              value={hintLevel}
              onChange={(event) => setHintLevel(Number(event.target.value))}
            >
              <option value={1}>Level 1 - Restate the need</option>
              <option value={2}>Level 2 - Point to check</option>
              <option value={3}>Level 3 - Suggest a pattern</option>
              <option value={4}>Level 4 - Simple outline</option>
            </select>
          </label>
        </div>

        <div className="copilot-quick-actions">
          <button className="btn btn-secondary" onClick={handleExplainSimpler} disabled={loading}>
            Explain even simpler
          </button>
          <div className="copilot-translate">
            <input
              className="text-input"
              placeholder="Translate to (language)"
              value={translateLanguage}
              onChange={(event) => setTranslateLanguage(event.target.value)}
            />
            <button
              className="btn btn-secondary"
              onClick={handleTranslate}
              disabled={loading || !translateLanguage.trim()}
            >
              Translate
            </button>
          </div>
        </div>

        <div className="copilot-messages">
          {messages.length === 0 && (
            <div className="muted">Ask a question to get started.</div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`copilot-message copilot-message--${message.role}`}
            >
              <div className="copilot-role">{message.role}</div>
              <div>{message.content}</div>
            </div>
          ))}
          {loading && <div className="muted">Thinking...</div>}
        </div>

        <div className="copilot-input">
          <textarea
            className="teachback-input"
            rows={3}
            placeholder="Ask for help in simple words..."
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />
          <button className="btn" onClick={handleSubmit} disabled={loading}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
