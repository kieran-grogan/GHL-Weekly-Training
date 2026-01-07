"use client";

import { useEffect, useMemo, useState } from "react";
import type { ScenarioDefinition, ScenarioTestCase } from "@/lib/scenarioTypes";
import { runSimulationTestCase } from "@/lib/simulation";
import { loadWorkflowGraph } from "@/lib/workflowStorage";
import { useProgress } from "@/contexts/ProgressContext";
import { useCopilot } from "@/contexts/CopilotContext";
import { GLOSSARY } from "@/data/glossary";

type SimulationPanelProps = {
  moduleId: string;
  scenario?: ScenarioDefinition | null;
  onStatusChange?: (passed: boolean) => void;
};

export const SimulationPanel = ({
  moduleId,
  scenario,
  onStatusChange
}: SimulationPanelProps) => {
  const { markSimulateAttempt } = useProgress();
  const { send } = useCopilot();
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>("");
  const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof runSimulationTestCase> | null>(null);
  const [timeCursor, setTimeCursor] = useState<number | null>(null);

  const activeScenario = useMemo(() => {
    if (!scenario) return null;
    if ("workflows" in scenario) {
      const defaultId = selectedWorkflowId || scenario.workflows[0]?.workflowId;
      const workflow = scenario.workflows.find((item) => item.workflowId === defaultId);
      return workflow?.scenario ?? null;
    }
    return scenario;
  }, [scenario, selectedWorkflowId]);

  const testCases = activeScenario?.testCases ?? [];

  useEffect(() => {
    onStatusChange?.(false);
  }, [moduleId, onStatusChange, scenario, selectedTestCaseIndex, selectedWorkflowId]);

  const runSimulation = () => {
    markSimulateAttempt(moduleId);
    setError(null);
    if (!scenario) {
      setError("Lesson data not found.");
      onStatusChange?.(false);
      return;
    }

    if ("workflows" in scenario) {
      const workflowId = selectedWorkflowId || scenario.workflows[0]?.workflowId;
      const active = scenario.workflows.find((item) => item.workflowId === workflowId);
      if (!active) {
        setError("Select a workflow to test.");
        onStatusChange?.(false);
        return;
      }
      const testCase = active.scenario.testCases[selectedTestCaseIndex];
      if (!testCase) {
        setError("No test case available.");
        onStatusChange?.(false);
        return;
      }
      const workflowGraphs = scenario.workflows
        .map((workflow) => ({
          workflowId: workflow.workflowId,
          graph: loadWorkflowGraph(moduleId, workflow.workflowId)
        }))
        .filter((item) => item.graph)
        .map((item) => ({ workflowId: item.workflowId, graph: item.graph! }));

      if (!workflowGraphs.length) {
        setError("No workflows saved yet. Build your steps first.");
        onStatusChange?.(false);
        return;
      }

      const result = runSimulationTestCase(workflowGraphs, testCase);
      setResult(result);
      onStatusChange?.(result.comparison.passed);
      setTimeCursor(null);
      return;
    }

    const testCase = scenario.testCases[selectedTestCaseIndex];
    if (!testCase) {
      setError("No test case available.");
      onStatusChange?.(false);
      return;
    }
    const graph = loadWorkflowGraph(moduleId);
    if (!graph) {
      setError("No workflow saved yet. Build your steps first.");
      onStatusChange?.(false);
      return;
    }
    const result = runSimulationTestCase([{ workflowId: "main", graph }], testCase);
    setResult(result);
    onStatusChange?.(result.comparison.passed);
    setTimeCursor(null);
  };

  return (
    <div className="simulation-panel">
      {scenario && "workflows" in scenario && (
        <label className="field">
          <span className="field-label">Workflow</span>
          <select
            className="select-input"
            value={selectedWorkflowId || scenario.workflows[0]?.workflowId || ""}
            onChange={(event) => setSelectedWorkflowId(event.target.value)}
          >
            {scenario.workflows.map((workflow) => (
              <option key={workflow.workflowId} value={workflow.workflowId}>
                {workflow.scenario.title}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="field">
        <span className="field-label">Test case</span>
        <select
          className="select-input"
          value={selectedTestCaseIndex}
          onChange={(event) => setSelectedTestCaseIndex(Number(event.target.value))}
        >
          {testCases.map((testCase: ScenarioTestCase, index: number) => (
            <option key={testCase.name} value={index}>
              {testCase.name}
            </option>
          ))}
        </select>
      </label>

      <div className="simulation-actions">
        <button className="btn" onClick={runSimulation}>
          Run test
        </button>
        <button
          className="btn btn-secondary"
          onClick={() =>
            send({
              mode: "ask",
              question: "Help me test this step by step.",
              hintLevel: 2,
              context: {
                moduleId,
                scenarioTitle: activeScenario?.title,
                testCase: testCases[selectedTestCaseIndex],
                glossary: GLOSSARY
              }
            })
          }
        >
          Help me test this
        </button>
      </div>

      {error && <div className="callout callout-warning">{error}</div>}

      {result && (
        <div className="simulation-results">
          <div
            className={`status-pill status-pill--${
              result.comparison.passed ? "completed" : "available"
            }`}
          >
            {result.comparison.passed ? "Test passed" : "Test failed"}
          </div>
          <button
            className="btn btn-secondary"
            onClick={() =>
              send({
                mode: "debug",
                question: "Help me debug this test run.",
                hintLevel: 2,
                context: {
                  moduleId,
                  scenarioTitle: activeScenario?.title,
                  testCase: testCases[selectedTestCaseIndex],
                  timeline: result.result.timeline,
                  finalState: result.result.finalState,
                  glossary: GLOSSARY
                }
              })
            }
          >
            Help me debug
          </button>

          <details className="simulation-advanced">
            <summary>Advanced timeline controls</summary>
            <div className="time-controls">
              <div className="field">
                <span className="field-label">Show steps up to (seconds)</span>
                <input
                  className="text-input"
                  type="number"
                  value={timeCursor ?? result.result.timeline.at(-1)?.timestamp ?? 0}
                  onChange={(event) => setTimeCursor(Number(event.target.value))}
                />
              </div>
              <div className="time-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setTimeCursor((current) =>
                      (current ?? 0) + 3600
                    )
                  }
                >
                  Advance +1h
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setTimeCursor((current) =>
                      (current ?? 0) + 86400
                    )
                  }
                >
                  Advance +1d
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    const timestamps = result.result.timeline.map((entry) => entry.timestamp);
                    const sorted = Array.from(new Set(timestamps)).sort((a, b) => a - b);
                    const current = timeCursor ?? -1;
                    const next = sorted.find((time) => time > current);
                    setTimeCursor(next ?? current);
                  }}
                >
                  Jump to next step
                </button>
              </div>
            </div>
          </details>

          {!result.comparison.passed && (
            <div className="issue-list">
              {result.comparison.errors.map((errorMessage) => (
                <div key={errorMessage} className="issue-card">
                  {errorMessage}
                </div>
              ))}
            </div>
          )}

          <div className="simulation-section">
            <div className="section-title">Timeline</div>
            <div className="timeline">
              {result.result.timeline
                .filter(
                  (entry) =>
                    entry.timestamp <=
                    (timeCursor ?? result.result.timeline.at(-1)?.timestamp ?? 0)
                )
                .map((entry, index) => (
                  <div key={`${entry.nodeId}-${index}`} className="timeline-entry">
                    <div className="timeline-time">+{entry.timestamp}s</div>
                    <div className="timeline-summary">{entry.summary}</div>
                    {entry.details && <div className="timeline-detail">{entry.details}</div>}
                  </div>
                ))}
            </div>
          </div>

          <div className="simulation-section">
            <div className="section-title">Final state</div>
            <div className="state-grid">
              <div>
                <div className="state-label">Tags</div>
                <div className="state-value">
                  {result.result.finalState.tags.join(", ") || "None"}
                </div>
              </div>
              <div>
                <div className="state-label">Fields</div>
                <pre className="state-value">
{JSON.stringify(result.result.finalState.fields, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
