"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type CopilotMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type CopilotMode = "ask" | "explain_error" | "debug" | "teach_back";

export type CopilotRequest = {
  mode: CopilotMode;
  question: string;
  hintLevel?: number;
  context?: Record<string, unknown>;
};

type CopilotContextValue = {
  open: boolean;
  messages: CopilotMessage[];
  loading: boolean;
  context: Record<string, unknown>;
  openPanel: () => void;
  closePanel: () => void;
  send: (request: CopilotRequest) => Promise<void>;
  clear: () => void;
  setContext: (context: Record<string, unknown>) => void;
};

const CopilotContext = createContext<CopilotContextValue | null>(null);

const createId = () => Math.random().toString(36).slice(2, 10);

export const CopilotProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<CopilotMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState<Record<string, unknown>>({});

  const send = async (request: CopilotRequest) => {
    const userMessage: CopilotMessage = {
      id: createId(),
      role: "user",
      content: request.question
    };
    setMessages((current) => [...current, userMessage]);
    setOpen(true);
    setLoading(true);
    try {
      const response = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...request,
          context: { ...context, ...(request.context ?? {}) }
        })
      });
      const data = await response.json();
      const assistantMessage: CopilotMessage = {
        id: createId(),
        role: "assistant",
        content: data.reply ?? "No response available."
      };
      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      const assistantMessage: CopilotMessage = {
        id: createId(),
        role: "assistant",
        content: "Copilot failed to respond. Please try again."
      };
      setMessages((current) => [...current, assistantMessage]);
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo<CopilotContextValue>(
    () => ({
      open,
      messages,
      loading,
      context,
      openPanel: () => setOpen(true),
      closePanel: () => setOpen(false),
      send,
      clear: () => setMessages([]),
      setContext
    }),
    [open, messages, loading, context]
  );

  return <CopilotContext.Provider value={value}>{children}</CopilotContext.Provider>;
};

export const useCopilot = () => {
  const ctx = useContext(CopilotContext);
  if (!ctx) {
    throw new Error("useCopilot must be used within CopilotProvider");
  }
  return ctx;
};
