"use client";

import { useState, useEffect } from "react";
import type { CapstoneArtifact, CapstoneTeachBackAgenda } from "@/lib/practiceTypes";

type CapstonePracticeProps = {
    moduleId: string;
    artifacts: CapstoneArtifact[];
    teachBackAgenda: CapstoneTeachBackAgenda[];
    onComplete?: (completed: boolean) => void;
};

export const CapstonePractice = ({
    moduleId,
    artifacts,
    teachBackAgenda,
    onComplete
}: CapstonePracticeProps) => {
    const [artifactStates, setArtifactStates] = useState<
        Record<string, Record<string, boolean>>
    >(() => {
        if (typeof window === "undefined") return {};
        const saved = localStorage.getItem(`practice:capstone:${moduleId}`);
        return saved ? JSON.parse(saved) : {};
    });

    const [teachBackNotes, setTeachBackNotes] = useState<Record<string, string>>(() => {
        if (typeof window === "undefined") return {};
        const saved = localStorage.getItem(`practice:capstone:teachback:${moduleId}`);
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(`practice:capstone:${moduleId}`, JSON.stringify(artifactStates));
            localStorage.setItem(
                `practice:capstone:teachback:${moduleId}`,
                JSON.stringify(teachBackNotes)
            );
        }

        const allArtifactsComplete = artifacts.every((artifact) => {
            const state = artifactStates[artifact.id];
            return artifact.checklistItems.every((item) => state?.[item.id]);
        });

        const allTeachBackPrepared = teachBackAgenda.every(
            (topic) => teachBackNotes[topic.topic]?.trim().length > 50
        );

        onComplete?.(allArtifactsComplete && allTeachBackPrepared);
    }, [artifactStates, teachBackNotes, artifacts, teachBackAgenda, moduleId, onComplete]);

    const toggleArtifactItem = (artifactId: string, itemId: string) => {
        setArtifactStates((prev) => ({
            ...prev,
            [artifactId]: {
                ...prev[artifactId],
                [itemId]: !prev[artifactId]?.[itemId]
            }
        }));
    };

    const updateTeachBackNotes = (topic: string, notes: string) => {
        setTeachBackNotes((prev) => ({
            ...prev,
            [topic]: notes
        }));
    };

    return (
        <div className="capstone-practice">
            <div className="capstone-section">
                <h2 className="section-title">📋 Artifact Checklist</h2>
                <p className="muted">Complete all artifacts to demonstrate mastery</p>

                {artifacts.map((artifact) => {
                    const state = artifactStates[artifact.id] || {};
                    const completedItems = artifact.checklistItems.filter((item) => state[item.id]).length;
                    const totalItems = artifact.checklistItems.length;
                    const isComplete = completedItems === totalItems;

                    return (
                        <div key={artifact.id} className="capstone-artifact card">
                            <div className="artifact-header">
                                <div>
                                    <h3 className="artifact-title">{artifact.name}</h3>
                                    <p className="artifact-description">{artifact.description}</p>
                                    <div className="artifact-progress">
                                        {completedItems} / {totalItems} completed
                                    </div>
                                </div>
                                {isComplete && <div className="status-pill status-pill--completed">Complete</div>}
                            </div>

                            <div className="artifact-checklist">
                                {artifact.checklistItems.map((item, index) => {
                                    const itemComplete = state[item.id] || false;

                                    return (
                                        <div
                                            key={item.id}
                                            className={`checklist-item ${itemComplete ? "checklist-item--completed" : ""}`}
                                        >
                                            <label className="checklist-checkbox">
                                                <input
                                                    type="checkbox"
                                                    checked={itemComplete}
                                                    onChange={() => toggleArtifactItem(artifact.id, item.id)}
                                                />
                                                <span className="checklist-number">{index + 1}</span>
                                            </label>
                                            <div className="checklist-description">{item.description}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="capstone-section">
                <h2 className="section-title">🎤 Teach-Back Agenda</h2>
                <p className="muted">Prepare your presentation on these topics</p>

                {teachBackAgenda.map((topic, index) => {
                    const notes = teachBackNotes[topic.topic] || "";
                    const wordCount = notes.trim().split(/\s+/).filter(Boolean).length;
                    const isReady = wordCount >= 50;

                    return (
                        <div key={topic.topic} className="teachback-topic card">
                            <div className="teachback-header">
                                <div>
                                    <h3 className="teachback-title">
                                        Topic {index + 1}: {topic.topic}
                                    </h3>
                                    <div className="teachback-duration">Duration: {topic.duration}</div>
                                </div>
                                {isReady && <div className="status-pill status-pill--completed">Ready</div>}
                            </div>

                            <div className="teachback-keypoints">
                                <div className="keypoints-label">Key points to cover:</div>
                                <ul>
                                    {topic.keyPoints.map((point) => (
                                        <li key={point}>{point}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="teachback-prep">
                                <label className="field">
                                    <span className="field-label">
                                        Preparation notes (minimum 50 words)
                                    </span>
                                    <textarea
                                        className="text-input"
                                        placeholder="Write your talking points, examples, and key messages..."
                                        value={notes}
                                        onChange={(e) => updateTeachBackNotes(topic.topic, e.target.value)}
                                        rows={8}
                                    />
                                    <span className="field-helper">Word count: {wordCount} / 50 minimum</span>
                                </label>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
