import { CheckCircle2, Code2, Sparkles } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { getTierColorClasses } from "@/lib/constants";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_COURSES_QUERY } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const { data: courses } = await sanityFetch({ query: ALL_COURSES_QUERY });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAFAFA] text-[#1A1A1A]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-18%] left-[-10%] h-[420px] w-[420px] rounded-full bg-[#FF6B2C]/10 blur-[100px]" />
        <div className="absolute right-[-10%] bottom-[-12%] h-[400px] w-[400px] rounded-full bg-[#FFC107]/15 blur-[95px]" />
      </div>

      <Header />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-12 lg:px-12">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF6B2C]/20 bg-[#FF6B2C]/5 px-4 py-2">
            <Sparkles className="h-4 w-4 text-[#FF6B2C]" />
            <span className="text-sm font-semibold text-[#FF6B2C]">
              Simple, transparent pricing
            </span>
          </div>
          <h1 className="mb-6 text-4xl font-black tracking-tight md:text-6xl">
            Choose your{" "}
            <span className="text-[#FF6B2C]">learning path</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[rgba(26,26,26,0.6)]">
            Start free, upgrade when you&apos;re ready. Unlock Pro for advanced
            content or go Ultra for AI-powered learning, exclusive
            masterclasses, and 1-on-1 access.
          </p>
        </div>

        {/* Custom Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => {
            const displayTier = course.tier ?? "free";
            const _colorClasses = getTierColorClasses(
              displayTier === "free"
                ? "emerald"
                : displayTier === "pro"
                  ? "violet"
                  : displayTier === "ultra"
                    ? "cyan"
                    : "emerald",
            );

            return (
              <div
                key={course._id}
                className="relative flex flex-col rounded-2xl border border-[#e2e8f0] bg-white p-8 shadow-sm transition-colors hover:border-[#FF6B2C]/35"
              >
                <div className="mb-6">
                  <h3 className="mb-2 text-2xl font-bold">{course.title}</h3>
                  <p className="mb-6 min-h-12 text-[rgba(26,26,26,0.58)]">
                    {course.description || "Start learning today."}
                  </p>
                  <div className="mb-6 flex items-baseline gap-2">
                    <span className="text-5xl font-black text-[#1A1A1A]">
                      $59
                    </span>
                    <span className="text-[rgba(26,26,26,0.5)]">/ lifetime</span>
                  </div>
                </div>

                <ul className="mb-8 flex-1 space-y-4">
                  <li className="flex items-start gap-3 text-[rgba(26,26,26,0.75)]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#FF6B2C]" />
                    Full access to {course.title} video lessons
                  </li>
                  <li className="flex items-start gap-3 text-[rgba(26,26,26,0.75)]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#FF6B2C]" />
                    Quizzes & assignments
                  </li>
                  <li className="flex items-start gap-3 text-[rgba(26,26,26,0.75)]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#FF6B2C]" />
                    365 days of course updates
                  </li>
                </ul>

                <Link
                  href={`/courses/${course.slug?.current}`}
                  className="w-full rounded-xl bg-[#1A1A1A] py-4 text-center font-bold text-white transition-colors hover:bg-[#2a2a2a]"
                >
                  View course
                </Link>
              </div>
            );
          })}
        </div>

        {/* FAQ or extra info */}
        <div className="mt-16 text-center">
          <p className="text-[rgba(26,26,26,0.55)]">
            Questions?{" "}
            <Link
              href="/student-stories"
              className="font-semibold text-[#FF6B2C] underline underline-offset-4 hover:text-[#e85a24]"
            >
              Student stories
            </Link>{" "}
            or{" "}
            <Link
              href="/sponsor"
              className="font-semibold text-[#FF6B2C] underline underline-offset-4 hover:text-[#e85a24]"
            >
              get sponsored
            </Link>
            .
          </p>
        </div>
      </main>

      <footer className="relative z-10 mx-auto mt-20 max-w-7xl border-t border-[#e2e8f0] px-6 py-12 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6B2C]">
              <Code2 className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold">VISION 1000</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-[rgba(26,26,26,0.5)]">
            <Link href="/" className="transition-colors hover:text-[#1A1A1A]">
              Home
            </Link>
            <Link
              href="/pricing"
              className="transition-colors hover:text-[#1A1A1A]"
            >
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="transition-colors hover:text-[#1A1A1A]"
            >
              Dashboard
            </Link>
          </div>
          <p className="text-sm text-[rgba(26,26,26,0.45)]">
            © {new Date().getFullYear()} VISION 1000
          </p>
        </div>
      </footer>
    </div>
  );
}
