const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const extractSection = (markdown: string, heading: string) => {
  const escaped = escapeRegExp(heading);
  const pattern = new RegExp(`##\\s+${escaped}\\s*\\n([\\s\\S]*?)(\\n##\\s+|$)`, "i");
  const match = markdown.match(pattern);
  if (!match) {
    return "";
  }
  return match[1].trim();
};

export const extractTeachBackPrompt = (markdown: string) =>
  extractSection(markdown, "Teach-back prompt");
