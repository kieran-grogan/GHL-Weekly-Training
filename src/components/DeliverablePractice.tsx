"use client";

import { useState, useEffect } from "react";
import type { DeliverableRequirement } from "@/lib/practiceTypes";

type DeliverablePracticeProps = {
    moduleId: string;
    deliverables: DeliverableRequirement[];
    onComplete?: (completed: boolean) => void;
};

export const DeliverablePractice = ({
    moduleId,
    deliverables,
    onComplete
}: DeliverablePracticeProps) => {
    const [submissions, setSubmissions] = useState<Record<string, { link: string; notes: string }>>(
        () => {
            if (typeof window === "undefined") return {};
            const saved = localStorage.getItem(`practice:deliverable:${moduleId}`);
            return saved ? JSON.parse(saved) : {};
        }
    );

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(`practice:deliverable:${moduleId}`, JSON.stringify(submissions));
        }
        const allSubmitted = deliverables.every((d) => submissions[d.id]?.link?.trim());
        onComplete?.(allSubmitted);
    }, [submissions, deliverables, moduleId, onComplete]);

    const updateSubmission = (id: string, field: "link" | "notes", value: string) => {
        setSubmissions((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value
            }
        }));
    };

    return (
        <div className="deliverable-practice">
            {deliverables.map((deliverable) => {
                const submission = submissions[deliverable.id] || { link: "", notes: "" };

                return (
                    <div key={deliverable.id} className=" deliverable-item card">
                        <h3 className="deliverable-title">{deliverable.name}</h3>
                        <p className="muted">{deliverable.description}</p>

                        {deliverable.template && (
                            <div className="deliverable-template">
                                <div className="section-title">Template</div>
                                <pre className="template-preview">{deliverable.template}</pre>
                            </div>
                        )}

                        {deliverable.fileTypes && (
                            <div className="deliverable-types">
                                <div className="section-title">Accepted file types</div>
                                <div className="file-type-list">
                                    {deliverable.fileTypes.map((type) => (
                                        <span key={type} className="file-type-badge">
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="deliverable-submission">
                            <label className="field">
                                <span className="field-label">Submission link *</span>
                                <input
                                    className="text-input"
                                    type="url"
                                    placeholder="Paste Google Drive, Loom, or file link..."
                                    value={submission.link}
                                    onChange={(e) => updateSubmission(deliverable.id, "link", e.target.value)}
                                />
                                <span className="field-helper">
                                    Upload your deliverable and paste the shareable link here
                                </span>
                            </label>

                            <label className="field">
                                <span className="field-label">Notes (optional)</span>
                                <textarea
                                    className="text-input"
                                    placeholder="Add any notes or context about your submission..."
                                    value={submission.notes}
                                    onChange={(e) => updateSubmission(deliverable.id, "notes", e.target.value)}
                                    rows={3}
                                />
                            </label>
                        </div>

                        {submission.link && (
                            <div className="status-pill status-pill--completed">Submitted</div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
