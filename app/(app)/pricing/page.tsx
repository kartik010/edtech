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
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-300">
              Simple, transparent pricing
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Choose your{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              learning path
            </span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
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
                className="relative flex flex-col p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-violet-500/30 transition-colors"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                  <p className="text-zinc-400 min-h-12 mb-6">
                    {course.description || "Start learning today."}
                  </p>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-5xl font-black">$59</span>
                    <span className="text-zinc-400">/ lifetime</span>
                  </div>
                </div>

                <ul className="space-y-4 flex-1 mb-8">
                  <li className="flex items-start gap-3 text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-400 shrink-0" />
                    Full access to {course.title} video lessons
                  </li>
                  <li className="flex items-start gap-3 text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-400 shrink-0" />
                    Quizzes & Assignments
                  </li>
                  <li className="flex items-start gap-3 text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-400 shrink-0" />
                    365 days of course updates
                  </li>
                </ul>

                <Link
                  href={`/courses/${course.slug?.current}`}
                  className="w-full py-4 rounded-xl font-bold text-center bg-white text-black hover:bg-zinc-200 transition-colors"
                >
                  View Course
                </Link>
              </div>
            );
          })}
        </div>

        {/* FAQ or extra info */}
        <div className="mt-16 text-center">
          <p className="text-zinc-400">
            Questions?{" "}
            <Link
              href="#"
              className="text-violet-400 hover:text-violet-300 underline underline-offset-4"
            >
              Contact us
            </Link>{" "}
            or check out our{" "}
            <Link
              href="#"
              className="text-violet-400 hover:text-violet-300 underline underline-offset-4"
            >
              FAQ
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 lg:px-12 py-12 border-t border-zinc-800/50 max-w-7xl mx-auto mt-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">VISION 1000</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-zinc-500">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
          <p className="text-sm text-zinc-600">
            2025 VISION 1000. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
