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
    <div className="min-h-screen bg-[#09090b] text-white overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[80px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 px-6 lg:px-12 py-12 max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                {firstName}
              </span>
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 shrink-0">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-violet-300">
                {enrolledCourseIds.length} Active Courses
              </span>
            </div>
          </div>
          <p className="text-lg text-zinc-400 max-w-2xl">
            Pick up where you left off or discover something new. Your learning
            journey continues here.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {/* Completion Rate */}
          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 lg:col-span-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-400"
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
                <p className="text-sm text-zinc-500">Completion Rate</p>
              </div>
            </div>
          </div>

          {/* Assessment Score */}
          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 lg:col-span-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-orange-400"
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
                <p className="text-sm text-zinc-500">Avg. Score</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 lg:col-span-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{courses.length}</p>
                <p className="text-sm text-zinc-500">Available Courses</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 lg:col-span-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{enrolledCourseIds.length}</p>
                <p className="text-sm text-zinc-500">Purchased Courses</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">All Courses</h2>
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
