import { currentUser } from "@clerk/nextjs/server";
import { BookOpen } from "lucide-react";
import { redirect } from "next/navigation";
import { CourseCard } from "@/components/courses";
import { Header } from "@/components/Header";
import { sanityFetch } from "@/sanity/lib/live";
import {
  DASHBOARD_COURSES_QUERY,
  USER_ENROLLMENTS_QUERY,
} from "@/sanity/lib/queries";

export default async function MyCoursesPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const [{ data: courses }, { data: enrollments }] = await Promise.all([
    sanityFetch({
      query: DASHBOARD_COURSES_QUERY,
      params: { userId: user.id },
    }),
    sanityFetch({
      query: USER_ENROLLMENTS_QUERY,
      params: { studentId: user.id },
    }),
  ]);

  const now = new Date();
  const validEnrollments = enrollments.filter(
    (e: { expiresAt: string | null; course: { _id: string } | null }) =>
      e.expiresAt && new Date(e.expiresAt) > now,
  );
  const enrolledCourseIds = validEnrollments
    .map((e: { course: { _id: string } | null }) => e.course?._id)
    .filter(Boolean) as string[];

  // Calculate completion for each course and filter to started ones
  type Course = (typeof courses)[number];
  type CourseWithProgress = Course & {
    totalLessons: number;
    completedLessons: number;
  };

  const startedCourses = courses.reduce<CourseWithProgress[]>((acc, course) => {
    const { total, completed } = (course.modules ?? []).reduce(
      (stats, m) =>
        (m.lessons ?? []).reduce(
          (s, l) => ({
            total: s.total + 1,
            completed: s.completed + (l.completedBy?.includes(user.id) ? 1 : 0),
          }),
          stats,
        ),
      { total: 0, completed: 0 },
    );

    if (completed > 0) {
      acc.push({ ...course, totalLessons: total, completedLessons: completed });
    }
    return acc;
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAFAFA] text-[#1A1A1A]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-12%] right-[-8%] h-[320px] w-[320px] rounded-full bg-[#FFC107]/12 blur-[90px]" />
        <div className="absolute bottom-[-8%] left-[-8%] h-[300px] w-[300px] rounded-full bg-[#FF6B2C]/10 blur-[80px]" />
      </div>

      <Header />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-12 lg:px-12">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">My courses</h1>
          <p className="text-[rgba(26,26,26,0.58)]">
            Courses you&apos;ve started learning. Pick up where you left off.
          </p>
        </div>

        {startedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {startedCourses.map((course) => (
              <CourseCard
                key={course._id}
                slug={{ current: course.slug?.current ?? "" }}
                title={course.title}
                description={course.description}
                tier={course.tier}
                thumbnail={course.thumbnail}
                moduleCount={course.moduleCount}
                lessonCount={course.totalLessons}
                completedLessonCount={course.completedLessons}
                isCompleted={course.completedBy?.includes(user.id) ?? false}
                isLocked={!enrolledCourseIds.includes(course._id)}
                isEnrolled={enrolledCourseIds.includes(course._id)}
                showProgress
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-zinc-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              No courses started yet
            </h3>
            <p className="text-zinc-400 max-w-md mx-auto">
              Browse our course catalog and start learning. Your progress will
              appear here once you complete your first lesson.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
