import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#FAFAFA] text-[#1A1A1A]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] animate-pulse rounded-full bg-[#FF6B2C]/12 blur-[120px]" />
        <div
          className="absolute right-[-10%] bottom-[-10%] h-[500px] w-[500px] animate-pulse rounded-full bg-[#FFC107]/10 blur-[100px]"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-[40%] right-[20%] h-[400px] w-[400px] animate-pulse rounded-full bg-[#FF6B2C]/8 blur-[80px]"
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

      {/* Header Skeleton */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-xl bg-[#e2e8f0]" />
          <div className="flex flex-col gap-1">
            <Skeleton className="w-16 h-4 bg-[#e2e8f0]" />
            <Skeleton className="w-12 h-2 bg-[#e2e8f0]" />
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Skeleton className="w-28 h-9 rounded-lg bg-[#e2e8f0]" />
          <Skeleton className="w-28 h-9 rounded-lg bg-[#e2e8f0]" />
          <Skeleton className="w-24 h-9 rounded-lg bg-[#e2e8f0]" />
        </div>
        <Skeleton className="w-9 h-9 rounded-full bg-[#e2e8f0]" />
      </nav>

      {/* Main Content with Sidebar */}
      <main className="relative z-10 px-6 lg:px-12 py-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="space-y-4 rounded-xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
              {/* Back Link */}
              <Skeleton className="h-4 w-28 bg-[#e2e8f0] rounded" />

              {/* Course Title */}
              <Skeleton className="h-6 w-full bg-[#e2e8f0] rounded" />

              {/* Module List */}
              <div className="space-y-3 pt-2">
                {/* Module 1 - Expanded */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-7 h-7 rounded bg-[#e2e8f0]" />
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-14 bg-[#e2e8f0] rounded" />
                        <Skeleton className="h-4 w-36 bg-[#e2e8f0] rounded" />
                        <Skeleton className="h-3 w-20 bg-[#e2e8f0] rounded" />
                      </div>
                    </div>
                    <Skeleton className="w-5 h-5 bg-[#e2e8f0] rounded" />
                  </div>
                  {/* Expanded Lessons */}
                  <div className="pl-10 space-y-1">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-[#e2e8f0]/50">
                      <Skeleton className="w-5 h-5 rounded-full bg-[#cbd5e1]" />
                      <Skeleton className="h-4 w-40 bg-[#cbd5e1] rounded" />
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg">
                      <Skeleton className="w-5 h-5 rounded-full bg-[#e2e8f0]" />
                      <Skeleton className="h-4 w-36 bg-[#e2e8f0] rounded" />
                    </div>
                  </div>
                </div>

                {/* Module 2 - Collapsed */}
                <div className="flex items-center justify-between py-2 border-t border-[#e2e8f0]">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-7 h-7 rounded bg-[#e2e8f0]" />
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-14 bg-[#e2e8f0] rounded" />
                      <Skeleton className="h-4 w-44 bg-[#e2e8f0] rounded" />
                      <Skeleton className="h-3 w-20 bg-[#e2e8f0] rounded" />
                    </div>
                  </div>
                  <Skeleton className="w-5 h-5 bg-[#e2e8f0] rounded" />
                </div>

                {/* Module 3 - Collapsed */}
                <div className="flex items-center justify-between py-2 border-t border-[#e2e8f0]">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-7 h-7 rounded bg-[#e2e8f0]" />
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-14 bg-[#e2e8f0] rounded" />
                      <Skeleton className="h-4 w-48 bg-[#e2e8f0] rounded" />
                      <Skeleton className="h-3 w-20 bg-[#e2e8f0] rounded" />
                    </div>
                  </div>
                  <Skeleton className="w-5 h-5 bg-[#e2e8f0] rounded" />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Video Player Skeleton */}
            <div className="relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-[#f1f5f9]">
              <Skeleton className="w-full aspect-video bg-[#e2e8f0]" />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#cbd5e1]/60 flex items-center justify-center">
                  <Skeleton className="h-6 w-6 rounded bg-[#cbd5e1]" />
                </div>
              </div>
              {/* Video controls bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded bg-[#cbd5e1]" />
                  <Skeleton className="flex-1 h-1 rounded-full bg-[#cbd5e1]" />
                  <Skeleton className="w-12 h-4 rounded bg-[#cbd5e1]" />
                  <Skeleton className="w-8 h-8 rounded bg-[#cbd5e1]" />
                </div>
              </div>
            </div>

            {/* Lesson Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <Skeleton className="h-10 w-80 bg-[#e2e8f0] rounded-lg" />
                <Skeleton className="h-5 w-64 bg-[#e2e8f0] rounded" />
              </div>
              <Skeleton className="h-10 w-32 rounded-full bg-[#e2e8f0] shrink-0" />
            </div>

            {/* Lesson Notes Card */}
            <div className="space-y-6 rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
              {/* Notes Header */}
              <div className="flex items-center gap-2">
                <Skeleton className="w-5 h-5 bg-[#e2e8f0] rounded" />
                <Skeleton className="h-5 w-28 bg-[#e2e8f0] rounded" />
              </div>

              {/* Content Title */}
              <Skeleton className="h-8 w-64 bg-[#e2e8f0] rounded-lg" />

              {/* Paragraph */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-full bg-[#e2e8f0] rounded" />
                <Skeleton className="h-5 w-3/4 bg-[#e2e8f0] rounded" />
              </div>

              {/* Subheading */}
              <Skeleton className="h-7 w-40 bg-[#e2e8f0] rounded" />

              {/* Bullet Points */}
              <div className="space-y-3 pl-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-2 h-2 rounded-full bg-[#e2e8f0]" />
                  <Skeleton className="h-4 w-48 bg-[#e2e8f0] rounded" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="w-2 h-2 rounded-full bg-[#e2e8f0]" />
                  <Skeleton className="h-4 w-56 bg-[#e2e8f0] rounded" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="w-2 h-2 rounded-full bg-[#e2e8f0]" />
                  <Skeleton className="h-4 w-52 bg-[#e2e8f0] rounded" />
                </div>
              </div>

              {/* Blockquote */}
              <div className="space-y-2 border-l-4 border-[#e2e8f0] pl-4">
                <Skeleton className="h-4 w-full bg-[#e2e8f0] rounded" />
                <Skeleton className="h-4 w-2/3 bg-[#e2e8f0] rounded" />
              </div>
            </div>

            {/* Next Lesson Button */}
            <div className="flex justify-end">
              <Skeleton className="h-11 w-48 rounded-lg bg-[#e2e8f0]" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Loading;
