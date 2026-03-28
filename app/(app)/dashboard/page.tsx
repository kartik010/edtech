import { currentUser } from "@clerk/nextjs/server";
import { BookOpen, Sparkles } from "lucide-react";
import { redirect } from "next/navigation";
import { CourseList } from "@/components/courses";
import { Header } from "@/components/Header";
import { sanityFetch } from "@/sanity/lib/live";
import {
  DASHBOARD_COURSES_QUERY,
  USER_ENROLLMENTS_QUERY,
} from "@/sanity/lib/queries";

export default async function DashboardPage() {
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

  const firstName = user.firstName ?? user.username ?? "there";

  // Calculate metrics
  let totalLessonsEnrolled = 0;
  let totalLessonsCompleted = 0;
  let totalQuizzesTaken = 0;
  let totalQuizScore = 0;

  courses.forEach((course) => {
    let hasStartedCourse = false;
    course.modules?.forEach((module) => {
      module.lessons?.forEach((lesson) => {
        const isCompleted = lesson.completedBy?.includes(user.id);
        if (isCompleted) {
          hasStartedCourse = true;
        }

        // Calculate Quiz Scores
        const userQuizScore = lesson.quizScores?.find(
          (score) => score.userId === user.id,
        );
        if (userQuizScore) {
          totalQuizzesTaken++;
          totalQuizScore += userQuizScore.score ?? 0;
        }
      });
    });

    if (hasStartedCourse || course.completedBy?.includes(user.id)) {
      // User has started this course, so count its lessons
      totalLessonsEnrolled += course.lessonCount ?? 0;

      course.modules?.forEach((module) => {
        module.lessons?.forEach((lesson) => {
          if (lesson.completedBy?.includes(user.id)) {
            totalLessonsCompleted++;
          }
        });
      });
    }
  });

  const overallCompletionRate =
    totalLessonsEnrolled > 0
      ? Math.round((totalLessonsCompleted / totalLessonsEnrolled) * 100)
      : 0;

  const averageAssessmentScore =
    totalQuizzesTaken > 0 ? Math.round(totalQuizScore / totalQuizzesTaken) : 0;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAFAFA] text-[#1A1A1A]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-15%] right-[-8%] h-[380px] w-[380px] rounded-full bg-[#FFC107]/15 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-8%] h-[360px] w-[360px] rounded-full bg-[#FF6B2C]/10 blur-[90px]" />
      </div>

      <Header />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-12 lg:px-12">
        <div className="mb-12">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Welcome back,{" "}
              <span className="text-[#FF6B2C]">{firstName}</span>
            </h1>
            <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#FF6B2C]/20 bg-[#FF6B2C]/5 px-4 py-2">
              <Sparkles className="h-4 w-4 text-[#FF6B2C]" />
              <span className="text-sm font-semibold text-[#FF6B2C]">
                {enrolledCourseIds.length} active courses
              </span>
            </div>
          </div>
          <p className="max-w-2xl text-lg text-[rgba(26,26,26,0.6)]">
            Pick up where you left off or discover something new. Your learning
            journey continues here.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-sm lg:col-span-1">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF6B2C]/10">
                <svg
                  className="h-5 w-5 text-[#FF6B2C]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  role="img"
                >
                  <title>Completion Rate Target Icon</title>
                  <circle cx="12" cy="12" r="10" />
                  <path d="m16 10-4 4-4-4" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold">{overallCompletionRate}%</p>
                <p className="text-sm text-[rgba(26,26,26,0.45)]">
                  Completion rate
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-sm lg:col-span-1">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFC107]/20">
                <svg
                  className="h-5 w-5 text-[#d97706]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  role="img"
                >
                  <title>Assessment Score Graduation Cap Icon</title>
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold">{averageAssessmentScore}%</p>
                <p className="text-sm text-[rgba(26,26,26,0.45)]">Avg. score</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-sm lg:col-span-1">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF6B2C]/10">
                <BookOpen className="h-5 w-5 text-[#FF6B2C]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{courses.length}</p>
                <p className="text-sm text-[rgba(26,26,26,0.45)]">
                  Available courses
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-sm lg:col-span-1">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/15">
                <Sparkles className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{enrolledCourseIds.length}</p>
                <p className="text-sm text-[rgba(26,26,26,0.45)]">
                  Purchased courses
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-bold">All courses</h2>
          <CourseList
            courses={courses}
            enrolledCourseIds={enrolledCourseIds}
            showFilters
            showSearch
            emptyMessage="No courses available yet. Check back soon!"
          />
        </div>
      </main>
    </div>
  );
}
