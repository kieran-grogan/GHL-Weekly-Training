import { CourseHome } from "@/components/CourseHome";
import { getModuleManifest, getWeekManifests } from "@/data/moduleManifest";

export default function HomePage() {
  try {
    const manifest = getModuleManifest();
    const weeks = getWeekManifests();
    
    return <CourseHome manifest={manifest} weeks={weeks} allModules={manifest} />;
  } catch (error) {
    console.error("[HomePage] Error loading page:", error);
    // Fallback to empty state
    return (
      <div className="page">
        <header className="page-header">
          <div className="eyebrow">Course Overview</div>
          <h1 className="page-title">GHL Workflow Mastery</h1>
          <p className="page-subtitle">
            Learn workflows in simple steps. Practice in a safe builder that matches HighLevel.
          </p>
        </header>
        <div className="card">
          <p>Loading course content...</p>
        </div>
      </div>
    );
  }
}
