import { CourseHome } from "@/components/CourseHome";
import { getModuleManifest, getWeekManifests } from "@/data/moduleManifest";

export default function HomePage() {
  const manifest = getModuleManifest();
  const weeks = getWeekManifests();
  
  return <CourseHome manifest={manifest} weeks={weeks} allModules={manifest} />;
}
