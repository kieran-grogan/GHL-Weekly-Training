"use client";

import { useState, useEffect } from "react";
import type { ChecklistItem } from "@/lib/practiceTypes";

type ChecklistPracticeProps = {
    moduleId: string;
    items: ChecklistItem[];
    onComplete?: (completed: boolean) => void;
};

export const ChecklistPractice = ({
    moduleId,
    items,
    onComplete
}: ChecklistPracticeProps) => {
    const [itemStates, setItemStates] = useState<Record<string, { completed: boolean; evidence: string }>>(
        () => {
            if (typeof window === "undefined") return {};
            const saved = localStorage.getItem(`practice:checklist:${moduleId}`);
            return saved ? JSON.parse(saved) : {};
        }
    );

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(`practice:checklist:${moduleId}`, JSON.stringify(itemStates));
        }
        const allCompleted = items.every((item) => itemStates[item.id]?.completed);
        onComplete?.(allCompleted);
    }, [itemStates, items, moduleId, onComplete]);

    const toggleItem = (id: string) => {
        setItemStates((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                completed: !prev[id]?.completed
            }
        }));
    };

    const updateEvidence = (id: string, evidence: string) => {
        setItemStates((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                evidence
            }
        }));
    };

    return (
        <div className="checklist-practice">
            {items.map((item, index) => {
                const state = itemStates[item.id] || { completed: false, evidence: "" };
                const hasEvidenceRequirement = item.requiredEvidence && item.requiredEvidence.length > 0;

                return (
                    <div
                        key={item.id}
                        className={`checklist-item ${state.completed ? "checklist-item--completed" : ""}`}
                    >
                        <div className="checklist-item-header">
                            <label className="checklist-checkbox">
                                <input
                                    type="checkbox"
                                    checked={state.completed}
                                    onChange={() => toggleItem(item.id)}
                                />
                                <span className="checklist-number">{index + 1}</span>
                            </label>
                            <div className="checklist-description">{item.description}</div>
                        </div>

                        {hasEvidenceRequirement && (
                            <div className="checklist-evidence">
                                <div className="evidence-label">
                                    Required evidence:{" "}
                                    {item.requiredEvidence!.map((type) => (
                                        <span key={type} className="evidence-badge">
                                            {type}
                                        </span>
                                    ))}
                                </div>
                                <textarea
                                    className="text-input"
                                    placeholder={`Paste ${item.requiredEvidence!.join(" or ")} link/text here...`}
                                    value={state.evidence || ""}
                                    onChange={(e) => updateEvidence(item.id, e.target.value)}
                                    rows={3}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
