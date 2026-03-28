import {
  VisionLanding,
  type LandingCourse,
} from "@/components/landing/VisionLanding";
import { sanityFetch } from "@/sanity/lib/live";
import {
  ALL_COURSES_QUERY,
  FEATURED_COURSES_QUERY,
  STUDENT_STORIES_QUERY,
} from "@/sanity/lib/queries";
import type {
  ALL_COURSES_QUERYResult,
  FEATURED_COURSES_QUERYResult,
  STUDENT_STORIES_QUERYResult,
} from "@/sanity.types";
import type { LandingStory } from "@/components/landing/LandingStoryCard";

export const dynamic = "force-dynamic";

function toLandingCourses(
  rows: ALL_COURSES_QUERYResult | FEATURED_COURSES_QUERYResult,
): LandingCourse[] {
  return rows.map((c) => ({
    _id: c._id,
    title: c.title ?? "Course",
    slug: c.slug?.current ?? null,
    description: c.description ?? null,
    thumbnailUrl: c.thumbnail?.asset?.url ?? null,
    moduleCount: c.moduleCount ?? null,
    lessonCount: c.lessonCount ?? null,
  }));
}

function toLandingStories(rows: STUDENT_STORIES_QUERYResult): LandingStory[] {
  return rows.map((s) => ({
    _id: s._id,
    studentName: s.studentName ?? null,
    courseTitle: s.courseTitle ?? null,
    quote: s.quote ?? null,
    avatarUrl: s.avatar?.asset?.url ?? null,
    playbackId: s.video?.asset?.playbackId ?? null,
  }));
}

export default async function Home() {
  const [{ data: featured }, { data: allCourses }, { data: storyRows }] =
    await Promise.all([
      sanityFetch({ query: FEATURED_COURSES_QUERY }),
      sanityFetch({ query: ALL_COURSES_QUERY }),
      sanityFetch({ query: STUDENT_STORIES_QUERY }),
    ]);

  const source = featured.length > 0 ? featured : allCourses;
  const courses = toLandingCourses(source).slice(0, 9);
  const stories = toLandingStories(storyRows);

  return <VisionLanding courses={courses} stories={stories} />;
}
