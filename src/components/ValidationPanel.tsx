"use client";

import { useEffect, useState } from "react";
import type { ScenarioDefinition } from "@/lib/scenarioTypes";
import {
  validateWorkflow,
  type ValidationResult,
  checkScenarioRequirements,
  type ValidationIssueWithContext,
  type ValidationStage
} from "@/lib/validation";
import { loadWorkflowGraph } from "@/lib/workflowStorage";
import { runSimulationTestCase } from "@/lib/simulation";
import { useProgress } from "@/contexts/ProgressContext";
import { useCopilot } from "@/contexts/CopilotContext";
import { summarizeGraph } from "@/lib/graphSummary";
import { GLOSSARY } from "@/data/glossary";
import { getNodeDisplayName } from "@/lib/ghlTerms";

type ValidationPanelProps = {
  moduleId: string;
  scenario?: ScenarioDefinition | null;
  onFixNode?: (nodeId?: string, fieldKey?: string) => void;
  onStatusChange?: (passed: boolean) => void;
  onIssuesChange?: (issues: ValidationIssueWithContext[]) => void;
};

type BundleResult = {
  workflowId: string;
  title: string;
  result: ValidationResult | null;
  graphSummary?: ReturnType<typeof summarizeGraph>;
  scenarioTitle?: string;
  requirements?: ReturnType<typeof checkScenarioRequirements>;
};

export const ValidationPanel = ({
  moduleId,
  scenario,
  onFixNode,
  onStatusChange,
  onIssuesChange
}: ValidationPanelProps) => {
  const stageLabels: Record<ValidationStage, string> = {
    A: "Start",
    B: "Required fields",
    C: "Checklist",
    D: "Test run"
  };
  const { markValidateAttempt } = useProgress();
  const { send } = useCopilot();
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [bundleResults, setBundleResults] = useState<BundleResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [graphSummary, setGraphSummary] = useState<ReturnType<typeof summarizeGraph> | null>(
    null
  );

  const buildMissingWorkflowIssue = (
    workflowId?: string,
    workflowTitle?: string
  ): ValidationIssueWithContext => ({
    id: `missing-workflow-${workflowId ?? "main"}`,
    stage: "A",
    level: "error",
    what: "No workflow saved yet",
    why: "We need steps before we can run the check.",
    where: "Build tab",
    next: "Add a trigger and at least one action, then run the check again.",
    workflowId,
    workflowTitle
  });

  useEffect(() => {
    onStatusChange?.(false);
  }, [moduleId, onStatusChange, scenario]);

  const runValidation = () => {
    markValidateAttempt(moduleId);
    setError(null);
    if (!scenario) {
      setError("This lesson data is missing.");
      onStatusChange?.(false);
      onIssuesChange?.([]);
      return;
    }

    if ("workflows" in scenario) {
      setRequirementResults(null);
      const workflowGraphs = scenario.workflows.map((workflow) => ({
        workflowId: workflow.workflowId,
        graph: loadWorkflowGraph(moduleId, workflow.workflowId)
      }));

      const results = scenario.workflows.map((workflow) => {
        const graph = workflowGraphs.find(
          (item) => item.workflowId === workflow.workflowId
        )?.graph;
        if (!graph) {
          return {
            workflowId: workflow.workflowId,
            title: workflow.scenario.title,
            result: null
          };
        }
        const graphSummary = summarizeGraph(graph);
        const runner = (_: any, testCase: any) => {
          const workflows = workflowGraphs
            .filter((item) => item.graph)
            .map((item) => ({
              workflowId: item.workflowId,
              graph: item.graph!
            }));
          const comparison = runSimulationTestCase(workflows, testCase).comparison;
          return { passed: comparison.passed, errors: comparison.errors };
        };
        return {
          workflowId: workflow.workflowId,
          title: workflow.scenario.title,
          result: validateWorkflow(graph, workflow.scenario, runner),
          graphSummary,
          scenarioTitle: workflow.scenario.title,
          requirements: checkScenarioRequirements(graph, workflow.scenario)
        };
      });
      const missingIssues = results
        .filter((item) => !item.result)
        .map((item) => buildMissingWorkflowIssue(item.workflowId, item.title));
      const issueList: ValidationIssueWithContext[] = results.flatMap((item) =>
        item.result?.issues
          ? item.result.issues.map((issue) => ({
              ...issue,
              workflowId: item.workflowId,
              workflowTitle: item.title
            }))
          : []
      );
      const allIssues = missingIssues.concat(issueList);
      const passed = results.every((item) => item.result?.passed);
      onStatusChange?.(passed);
      onIssuesChange?.(allIssues);
      setBundleResults(results);
      setResult(null);
      return;
    }

    const graph = loadWorkflowGraph(moduleId);
    if (!graph) {
      setError("No workflow saved yet. Build your steps first.");
      onStatusChange?.(false);
      onIssuesChange?.([buildMissingWorkflowIssue()]);
      return;
    }
    setGraphSummary(summarizeGraph(graph));
    const runner = (_: any, testCase: any) => {
      const comparison = runSimulationTestCase(
        [{ workflowId: "main", graph }],
        testCase
      ).comparison;
      return { passed: comparison.passed, errors: comparison.errors };
    };
    setBundleResults(null);
    const result = validateWorkflow(graph, scenario, runner);
    setResult(result);
    onStatusChange?.(result.passed);
    onIssuesChange?.(result.issues ?? []);
    setBundleResults(null);
    setRequirementResults(checkScenarioRequirements(graph, scenario));
  };

  const renderIssues = (
    validation: ValidationResult,
    graphSummary?: ReturnType<typeof summarizeGraph>,
    scenarioTitle?: string
  ) => {
    if (validation.issues.length === 0) {
      return <div className="muted">No issues found. Nice work.</div>;
    }
    return (
      <div className="issue-list">
        {validation.issues.map((issue) => (
          <div key={issue.id} className="issue-card">
            <div className="issue-header">
              <span className="issue-stage">{stageLabels[issue.stage]}</span>
              <span className={`issue-level issue-level--${issue.level}`}>
                {issue.level}
              </span>
            </div>
            <div className="issue-line"><strong>Problem:</strong> {issue.what}</div>
            <div className="issue-line"><strong>Why it matters:</strong> {issue.why}</div>
            <div className="issue-line"><strong>Where to fix:</strong> {issue.where}</div>
            <div className="issue-line"><strong>How to fix:</strong> {issue.next}</div>
            <button
              className="btn btn-secondary"
              onClick={() =>
                send({
                  mode: "explain_error",
                  question: `Explain this error: ${issue.what}`,
                  hintLevel: 1,
                  context: {
                    scenarioTitle,
                    graphSummary,
                    issue,
                    glossary: GLOSSARY
                  }
                })
              }
            >
              Explain this error
            </button>
            {issue.nodeId && (
              <button
                className="btn btn-secondary"
                onClick={() => onFixNode?.(issue.nodeId, issue.fieldKey)}
              >
                {issue.fieldKey ? "Fix this field" : "Fix this step"}
              </button>
            )}
          </div>
        ))}
      </div>
    );
  };

  const [requirementResults, setRequirementResults] = useState<
    ReturnType<typeof checkScenarioRequirements> | null
  >(null);

  const renderRequirements = (
    requirements: ReturnType<typeof checkScenarioRequirements> | null
  ) => {
    if (!requirements?.length) {
      return null;
    }
    return (
      <div className="requirement-list">
        <div className="section-title">Checklist</div>
        {requirements.map((item, index) => (
          <div key={`${item.requirement.type}-${index}`} className="requirement-item">
            <span
              className={`status-pill status-pill--${item.passed ? "completed" : "available"}`}
            >
              {item.passed ? "Pass" : "Check"}
            </span>
            <span className="requirement-text">
              {formatRequirement(item.requirement)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const formatRequirement = (
    requirement: ReturnType<typeof checkScenarioRequirements>[number]["requirement"]
  ) => {
    switch (requirement.type) {
      case "triggerIs":
        return `Trigger is ${getNodeDisplayName(requirement.value)}`;
      case "triggerConfigEquals":
        return `Trigger field ${requirement.field} is ${String(requirement.value)}`;
      case "mustHaveNode":
        return `Includes ${getNodeDisplayName(requirement.value)}`;
      case "forbidNodeType":
        return `Does not include ${getNodeDisplayName(requirement.value)}`;
      case "nodeConfigRequired":
        return `${getNodeDisplayName(requirement.nodeType)} has ${requirement.fields.join(", ")}`;
      case "nodeOrder":
        return `Order should be: ${requirement.sequence.map(getNodeDisplayName).join(" -> ")}`;
      case "mustContainIfElse":
        return `Include at least ${requirement.minCount ?? 1} If/Else step`;
      case "branchCountAtLeast":
        return `If/Else has at least ${requirement.count} paths`;
      case "pathMustInclude":
        return `Includes ${requirement.nodeTypes.map(getNodeDisplayName).join(", ")}`;
      case "requireStopPath":
        return "Each path ends when there are no more steps";
      default:
        return "Requirement";
    }
  };

  return (
    <div className="validation-panel">
      <button className="btn" onClick={runValidation}>
        Check my work
      </button>
      {error && <div className="callout callout-warning">{error}</div>}
      {result && (
        <div className="validation-results">
          <div className={`status-pill status-pill--${result.passed ? "completed" : "available"}`}>
            {result.passed ? "All checks passed" : "Needs fixes"}
          </div>
          {renderRequirements(requirementResults)}
          {renderIssues(result, graphSummary ?? undefined, scenario && !("workflows" in scenario) ? scenario.title : undefined)}
        </div>
      )}
      {bundleResults && (
        <div className="validation-results">
          {bundleResults.map((workflow) => (
            <div key={workflow.workflowId} className="bundle-result">
              <div className="bundle-title">{workflow.title}</div>
              {!workflow.result && (
                <div className="muted">No workflow saved yet. Build your steps first.</div>
              )}
              {workflow.result && (
                <>
                  <div
                    className={`status-pill status-pill--${
                      workflow.result.passed ? "completed" : "available"
                    }`}
                  >
                    {workflow.result.passed ? "Passed" : "Needs fixes"}
                  </div>
                  {renderRequirements(workflow.requirements ?? null)}
                  {renderIssues(workflow.result, workflow.graphSummary, workflow.scenarioTitle)}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
