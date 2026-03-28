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

      {/* Main Content Skeleton */}
      <main className="relative z-10 px-6 lg:px-12 py-8 max-w-7xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Skeleton className="h-5 w-36 bg-[#e2e8f0] rounded" />
        </div>

        {/* Course Hero - Horizontal Layout */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Thumbnail */}
          <Skeleton className="w-full md:w-72 h-48 rounded-2xl bg-[#e2e8f0] shrink-0" />

          {/* Course Info */}
          <div className="flex-1 space-y-4">
            {/* Badges */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-7 w-16 rounded-full bg-[#e2e8f0]" />
              <Skeleton className="h-7 w-28 rounded-full bg-[#e2e8f0]" />
            </div>

            {/* Title */}
            <Skeleton className="h-10 w-full max-w-lg bg-[#e2e8f0] rounded-lg" />

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-full bg-[#e2e8f0] rounded" />
              <Skeleton className="h-5 w-3/4 bg-[#e2e8f0] rounded" />
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 pt-2">
              <Skeleton className="h-5 w-24 bg-[#e2e8f0] rounded" />
              <Skeleton className="h-5 w-20 bg-[#e2e8f0] rounded" />
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="rounded-xl border border-[#e2e8f0] bg-white shadow-sm p-5 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Circular Progress */}
              <Skeleton className="w-14 h-14 rounded-full bg-[#e2e8f0]" />
              <div className="space-y-1">
                <Skeleton className="h-5 w-28 bg-[#e2e8f0] rounded" />
                <Skeleton className="h-4 w-36 bg-[#e2e8f0] rounded" />
              </div>
            </div>
            <Skeleton className="h-10 w-44 rounded-lg bg-[#e2e8f0]" />
          </div>
        </div>

        {/* Course Content Section */}
        <Skeleton className="h-8 w-40 bg-[#e2e8f0] rounded mb-6" />

        {/* Module Accordion Skeleton */}
        <div className="space-y-4">
          {["module-1", "module-2", "module-3"].map((id) => (
            <div
              key={id}
              className="rounded-xl border border-[#e2e8f0] bg-white shadow-sm p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Module Number */}
                  <Skeleton className="w-10 h-10 rounded-lg bg-[#e2e8f0]" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-16 bg-[#e2e8f0] rounded" />
                    <Skeleton className="h-5 w-48 bg-[#e2e8f0] rounded" />
                    <Skeleton className="h-4 w-36 bg-[#e2e8f0] rounded" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {/* Progress Bar */}
                  <Skeleton className="w-32 h-2 rounded-full bg-[#e2e8f0] hidden sm:block" />
                  {/* Chevron */}
                  <Skeleton className="w-6 h-6 bg-[#e2e8f0] rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Loading;
