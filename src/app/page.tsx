import { CourseHome } from "@/components/CourseHome";
import { moduleManifest } from "@/data/moduleManifest";

export default function HomePage() {
  return <CourseHome manifest={moduleManifest} />;
}
