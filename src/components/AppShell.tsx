"use client";

import { useState, type ReactNode } from "react";
import type { ModuleManifestEntry } from "@/data/moduleManifest";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { CopilotProvider } from "@/contexts/CopilotContext";
import { Sidebar } from "@/components/Sidebar";
import { CopilotPanel } from "@/components/CopilotPanel";
import { CopilotLauncher } from "@/components/CopilotLauncher";

type AppShellProps = {
  manifest: ModuleManifestEntry[];
  children: ReactNode;
};

export const AppShell = ({ manifest, children }: AppShellProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <ProgressProvider manifest={manifest}>
      <CopilotProvider>
        <div className={`app-shell ${sidebarOpen ? "app-shell--sidebar-open" : ""}`}>
          <Sidebar
            manifest={manifest}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          {sidebarOpen && (
            <button
              className="sidebar-overlay"
              type="button"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
            />
          )}
          <main className="main-content">
            <div className="mobile-header">
              <button
                type="button"
                className="btn btn-secondary btn-compact"
                onClick={() => setSidebarOpen(true)}
              >
                Menu
              </button>
            </div>
            {children}
          </main>
          <CopilotLauncher />
          <CopilotPanel />
        </div>
      </CopilotProvider>
    </ProgressProvider>
  );
};
