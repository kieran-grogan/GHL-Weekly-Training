"use client";

import { useCopilot } from "@/contexts/CopilotContext";

export const CopilotLauncher = () => {
  const { openPanel } = useCopilot();
  return (
    <button className="copilot-launcher" onClick={openPanel}>
      Ask for help
    </button>
  );
};
