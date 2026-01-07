"use client";

import { useState } from "react";
import { GLOSSARY } from "@/data/glossary";

export const GlossaryPanel = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="glossary">
      <button className="btn btn-secondary" onClick={() => setOpen((value) => !value)}>
        {open ? "Hide word help" : "Show word help"}
      </button>
      {open && (
        <div className="glossary-panel">
          {GLOSSARY.map((entry) => (
            <div key={entry.term} className="glossary-entry">
              <abbr className="glossary-term" title={entry.definition}>
                {entry.term}
              </abbr>
              <div className="glossary-definition">{entry.definition}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
