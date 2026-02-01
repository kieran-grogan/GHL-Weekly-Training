"use client";

import Link from "next/link";
import type { ModuleManifestEntry } from "@/data/moduleManifest.types";
import { useProgress } from "@/contexts/ProgressContext";
import type { WeekManifest } from "@/lib/weekLoader";

type CourseHomeProps = {
  manifest: ModuleManifestEntry[];
  weeks: WeekManifest[];
  allModules: ModuleManifestEntry[];
};

export const CourseHome = ({ manifest, weeks, allModules }: CourseHomeProps) => {
  const { progress } = useProgress();
  const nextModule = allModules.find(
    (entry) => progress.modules[entry.moduleId]?.status === "available"
  );

  // Group modules by week
  const modulesByWeek = weeks.map((week) => ({
    week,
    modules: allModules.filter((m) => m.weekNumber === week.weekNumber),
  }));

  return (
    <div className="page">
      <header className="page-header">
        <div className="eyebrow">Course Overview</div>
        <h1 className="page-title">GHL Workflow Mastery</h1>
        <p className="page-subtitle">
          Learn workflows in simple steps. Practice in a safe builder that matches
          HighLevel.
        </p>
        {nextModule && (
          <Link href={`/modules/${nextModule.moduleId}`} className="btn">
            Continue {nextModule.moduleId}
          </Link>
        )}
      </header>

      {/* Week Navigation */}
      <section className="weeks-section">
        <div className="section-title">Course Weeks</div>
        
        {/* Week 2 Training Rules - Display before week cards */}
        {modulesByWeek.some(({ week }) => week.weekNumber === 2) && (
          <div className="training-rules-section">
            <div className="card training-rules-card">
              <h2 className="card-title">⚠️ Week 2 Training Rules (StrategixAI Standard)</h2>
              <div className="training-rules-content">
                <div className="training-rule">
                  <strong>Never edit production assets directly.</strong> Duplicate first, then work in the duplicate.
                </div>
                <div className="training-rule">
                  <strong>TRAINING__ Naming Convention:</strong> Prefix all training assets with <code>TRAINING__</code>
                  <ul>
                    <li><code>TRAINING__Test Contact — &lt;name&gt;</code></li>
                    <li><code>TRAINING__Support Pipeline</code></li>
                    <li><code>TRAINING__Pets Workflow — FIXED — YYYY-MM-DD</code></li>
                  </ul>
                </div>
                <div className="training-rule">
                  <strong>No outbound sending to real contacts</strong> during training (email/SMS/social). Use test contacts only.
                </div>
                <div className="training-rule">
                  <strong>Stop condition:</strong> If stuck for more than 15 minutes, stop and log the blocker (don't spiral).
                </div>
                <div className="training-rule">
                  <strong>Evidence naming:</strong>
                  <ul>
                    <li>Loom: <code>Week2_L2.X_&lt;Name&gt;_&lt;ShortTitle&gt;</code></li>
                    <li>Screenshot: <code>Week2_L2.X_&lt;Name&gt;_&lt;WhatItShows&gt;.png</code></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="weeks-grid">
          {modulesByWeek.map(({ week, modules }) => {
            const completedModules = modules.filter(
              (m) => progress.modules[m.moduleId]?.status === "completed"
            ).length;
            const progressPercent = modules.length > 0 
              ? Math.round((completedModules / modules.length) * 100) 
              : 0;

            return (
              <div key={week.weekNumber} className="week-card">
                <div className="week-card-header">
                  <div>
                    <h2 className="week-card-title">Week {week.weekNumber}</h2>
                    <p className="week-card-subtitle">{week.weekTitle}</p>
                    {week.description && (
                      <p className="week-card-description">{week.description}</p>
                    )}
                  </div>
                  <div className="week-progress">
                    <div className="week-progress-bar">
                      <div 
                        className="week-progress-fill" 
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <span className="week-progress-text">
                      {completedModules} / {modules.length} modules
                    </span>
                  </div>
                </div>
                <div className="week-modules">
                  {modules.map((entry) => {
                    const module = progress.modules[entry.moduleId];
                    const status = module?.status ?? "available";
                    const displayStatus = status === "locked" ? "available" : status;
                    const showModuleId = !entry.title.startsWith(entry.moduleId);
                    const linkClass = [
                      "module-card",
                      "module-card--compact",
                      displayStatus === "completed" ? "module-card--completed" : ""
                    ]
                      .filter(Boolean)
                      .join(" ");

                    return (
                      <div key={entry.moduleId} className={linkClass}>
                        <div className="module-card-header">
                          {showModuleId && <span className="module-id">{entry.moduleId}</span>}
                          <span className={`status-pill status-pill--${displayStatus}`}>
                            {displayStatus === "completed" ? "✓" : "○"}
                          </span>
                        </div>
                        <div className="module-card-title">{entry.title}</div>
                        <div className="module-card-phase">{entry.phase}</div>
                        <Link className="module-card-action" href={`/modules/${entry.moduleId}`}>
                          Open
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Legacy: All Modules Grid (for backward compatibility) */}
      <section className="grid-section">
        <div className="section-title">All Modules</div>
        <div className="module-grid">
          {allModules.map((entry) => {
            const module = progress.modules[entry.moduleId];
            const status = module?.status ?? "available";
            const displayStatus = status === "locked" ? "available" : status;
            const showModuleId = !entry.title.startsWith(entry.moduleId);
            const linkClass = [
              "module-card",
              displayStatus === "completed" ? "module-card--completed" : ""
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div key={entry.moduleId} className={linkClass}>
                <div className="module-card-header">
                  {showModuleId && <span className="module-id">{entry.moduleId}</span>}
                  {entry.weekNumber && (
                    <span className="module-week-badge">Week {entry.weekNumber}</span>
                  )}
                  <span className={`status-pill status-pill--${displayStatus}`}>
                    {displayStatus === "completed" ? "Completed" : "Available"}
                  </span>
                </div>
                <div className="module-card-title">{entry.title}</div>
                <div className="module-card-phase">{entry.phase}</div>
                <Link className="module-card-action" href={`/modules/${entry.moduleId}`}>
                  Open lesson
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
