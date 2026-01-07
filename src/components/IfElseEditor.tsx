"use client";

import { nanoid } from "nanoid";
import type { ConditionRule, IfElseBranch, IfElseConfig } from "@/lib/workflowTypes";

type IfElseEditorProps = {
  config: IfElseConfig;
  onChange: (config: IfElseConfig) => void;
};

const createRule = (type: ConditionRule["type"]): ConditionRule => {
  switch (type) {
    case "tagExists":
      return { type, tag: "" };
    case "fieldExists":
      return { type, fieldKey: "" };
    case "fieldEquals":
      return { type, fieldKey: "", value: "" };
  }
};

const createBranch = (label: string): IfElseBranch => ({
  id: nanoid(),
  label,
  condition: { anyAll: "all", rules: [] }
});

export const IfElseEditor = ({ config, onChange }: IfElseEditorProps) => {
  const normalizedConfig: IfElseConfig = {
    branches: config.branches?.length ? config.branches : [createBranch("Branch 1")],
    elseEnabled: config.elseEnabled ?? true
  };

  const updateBranch = (branchIndex: number, updater: (branch: IfElseBranch) => IfElseBranch) => {
    const updated = normalizedConfig.branches.map((branch, index) =>
      index === branchIndex ? updater(branch) : branch
    );
    onChange({ ...normalizedConfig, branches: updated });
  };

  const updateRule = (
    branchIndex: number,
    ruleIndex: number,
    updater: (rule: ConditionRule) => ConditionRule
  ) => {
    updateBranch(branchIndex, (branch) => {
      const updatedRules = branch.condition.rules.map((rule, index) =>
        index === ruleIndex ? updater(rule) : rule
      );
      return { ...branch, condition: { ...branch.condition, rules: updatedRules } };
    });
  };

  return (
    <div className="ifelse-editor">
      <div className="ifelse-row">
        <label className="field-label">
          <input
            type="checkbox"
            checked={normalizedConfig.elseEnabled}
            onChange={(event) =>
              onChange({ ...normalizedConfig, elseEnabled: event.target.checked })
            }
          />
          Else branch enabled
        </label>
      </div>

      {normalizedConfig.branches.map((branch, branchIndex) => (
        <div key={branch.id} className="ifelse-branch">
          <div className="ifelse-branch-header">
            <input
              className="text-input"
              value={branch.label}
              onChange={(event) =>
                updateBranch(branchIndex, (current) => ({
                  ...current,
                  label: event.target.value
                }))
              }
            />
            <button
              className="btn btn-secondary"
              onClick={() =>
                onChange({
                  ...normalizedConfig,
                  branches: normalizedConfig.branches.filter((_, index) => index !== branchIndex)
                })
              }
              disabled={normalizedConfig.branches.length <= 1}
            >
              Remove branch
            </button>
          </div>

          <div className="ifelse-row">
            <label className="field-label">Rules match</label>
            <select
              className="select-input"
              value={branch.condition.anyAll}
              onChange={(event) =>
                updateBranch(branchIndex, (current) => ({
                  ...current,
                  condition: {
                    ...current.condition,
                    anyAll: event.target.value as "all" | "any"
                  }
                }))
              }
            >
              <option value="all">All rules</option>
              <option value="any">Any rule</option>
            </select>
          </div>

          <div className="rules">
            {branch.condition.rules.map((rule, ruleIndex) => (
              <div key={`${branch.id}-${ruleIndex}`} className="rule-row">
                <select
                  className="select-input"
                  value={rule.type}
                  onChange={(event) =>
                    updateRule(branchIndex, ruleIndex, () =>
                      createRule(event.target.value as ConditionRule["type"])
                    )
                  }
                >
                  <option value="tagExists">Tag exists</option>
                  <option value="fieldExists">Field exists</option>
                  <option value="fieldEquals">Field equals</option>
                </select>

                {rule.type === "tagExists" && (
                  <input
                    className="text-input"
                    value={rule.tag}
                    onChange={(event) =>
                      updateRule(branchIndex, ruleIndex, (current) => ({
                        ...current,
                        tag: event.target.value
                      }))
                    }
                    placeholder="status:responded"
                  />
                )}

                {rule.type === "fieldExists" && (
                  <input
                    className="text-input"
                    value={rule.fieldKey}
                    onChange={(event) =>
                      updateRule(branchIndex, ruleIndex, (current) => ({
                        ...current,
                        fieldKey: event.target.value
                      }))
                    }
                    placeholder="phone"
                  />
                )}

                {rule.type === "fieldEquals" && (
                  <>
                    <input
                      className="text-input"
                      value={rule.fieldKey}
                      onChange={(event) =>
                        updateRule(branchIndex, ruleIndex, (current) => ({
                          ...current,
                          fieldKey: event.target.value
                        }))
                      }
                      placeholder="lead_source"
                    />
                    <input
                      className="text-input"
                      value={String(rule.value ?? "")}
                      onChange={(event) =>
                        updateRule(branchIndex, ruleIndex, (current) => ({
                          ...current,
                          value: event.target.value
                        }))
                      }
                      placeholder="Facebook"
                    />
                  </>
                )}

                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    updateBranch(branchIndex, (current) => ({
                      ...current,
                      condition: {
                        ...current.condition,
                        rules: current.condition.rules.filter((_, index) => index !== ruleIndex)
                      }
                    }))
                  }
                >
                  Remove rule
                </button>
              </div>
            ))}
          </div>

          <button
            className="btn btn-secondary"
            onClick={() =>
              updateBranch(branchIndex, (current) => ({
                ...current,
                condition: {
                  ...current.condition,
                  rules: [...current.condition.rules, createRule("tagExists")]
                }
              }))
            }
          >
            Add rule
          </button>
        </div>
      ))}

      <button
        className="btn"
        onClick={() =>
          onChange({
            ...normalizedConfig,
            branches: [
              ...normalizedConfig.branches,
              createBranch(`Branch ${normalizedConfig.branches.length + 1}`)
            ]
          })
        }
      >
        Add branch
      </button>
    </div>
  );
};
