"use client";

import { useState, useEffect } from "react";
import type { SystemBuildPart } from "@/lib/practiceTypes";

type SystemBuildPracticeProps = {
    moduleId: string;
    parts: SystemBuildPart[];
    onComplete?: (completed: boolean) => void;
};

export const SystemBuildPractice = ({
    moduleId,
    parts,
    onComplete
}: SystemBuildPracticeProps) => {
    const [partStates, setPartStates] = useState<
        Record<string, { checklistStates: Record<string, boolean>; testProofLink: string }>
    >(() => {
        if (typeof window === "undefined") return {};
        const saved = localStorage.getItem(`practice:system:${moduleId}`);
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(`practice:system:${moduleId}`, JSON.stringify(partStates));
        }
        const allCompleted = parts.every((part) => {
            const state = partStates[part.id];
            if (!state) return false;
            const allStepsComplete = part.steps.every((step) => state.checklistStates?.[step.id]);
            const testProofComplete = part.testProof?.required
                ? state.testProofLink?.trim()
                : true;
            return allStepsComplete && testProofComplete;
        });
        onComplete?.(allCompleted);
    }, [partStates, parts, moduleId, onComplete]);

    const toggleStep = (partId: string, stepId: string) => {
        setPartStates((prev) => ({
            ...prev,
            [partId]: {
                ...prev[partId],
                checklistStates: {
                    ...prev[partId]?.checklistStates,
                    [stepId]: !prev[partId]?.checklistStates?.[stepId]
                }
            }
        }));
    };

    const updateTestProof = (partId: string, link: string) => {
        setPartStates((prev) => ({
            ...prev,
            [partId]: {
                ...prev[partId],
                testProofLink: link,
                checklistStates: prev[partId]?.checklistStates || {}
            }
        }));
    };

    const getPartIcon = (type: SystemBuildPart["type"]) => {
        const icons: Record<SystemBuildPart["type"], string> = {
            pipeline: "📊",
            form: "📝",
            workflow: "⚙️",
            other: "🔧"
        };
        return icons[type] || icons.other;
    };

    return (
        <div className="system-build-practice">
            {parts.map((part, partIndex) => {
                const state = partStates[part.id] || { checklistStates: {}, testProofLink: "" };
                const completedSteps = part.steps.filter((step) => state.checklistStates?.[step.id]).length;
                const totalSteps = part.steps.length;
                const hasTestProof = part.testProof?.required;
                const testProofComplete = hasTestProof ? !!state.testProofLink?.trim() : true;
                const partComplete = completedSteps === totalSteps && testProofComplete;

                return (
                    <div key={part.id} className="system-part card">
                        <div className="system-part-header">
                            <div className="system-part-icon">{getPartIcon(part.type)}</div>
                            <div>
                                <h3 className="system-part-title">
                                    Part {partIndex + 1}: {part.title}
                                </h3>
                                <div className="system-part-progress">
                                    {completedSteps} / {totalSteps} steps completed
                                    {hasTestProof && ` · Test proof ${testProofComplete ? "✓" : "required"}`}
                                </div>
                            </div>
                            {partComplete && <div className="status-pill status-pill--completed">Complete</div>}
                        </div>

                        <div className="system-checklist">
                            {part.steps.map((step, stepIndex) => {
                                const isComplete = state.checklistStates?.[step.id] || false;
                                return (
                                    <div
                                        key={step.id}
                                        className={`checklist-item ${isComplete ? "checklist-item--completed" : ""}`}
                                    >
                                        <label className="checklist-checkbox">
                                            <input
                                                type="checkbox"
                                                checked={isComplete}
                                                onChange={() => toggleStep(part.id, step.id)}
                                            />
                                            <span className="checklist-number">{stepIndex + 1}</span>
                                        </label>
                                        <div className="checklist-description">{step.description}</div>
                                    </div>
                                );
                            })}
                        </div>

                        {hasTestProof && (
                            <div className="test-proof-section">
                                <div className="section-title">Test Proof</div>
                                <p className="muted">{part.testProof!.description}</p>
                                <input
                                    className="text-input"
                                    type="url"
                                    placeholder="Paste screenshot or Loom link..."
                                    value={state.testProofLink || ""}
                                    onChange={(e) => updateTestProof(part.id, e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
