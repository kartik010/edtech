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
      <main className="relative z-10 px-6 lg:px-12 py-12 max-w-7xl mx-auto">
        {/* Welcome Header Skeleton */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <Skeleton className="h-12 w-80 bg-[#e2e8f0] rounded-lg" />
            <Skeleton className="h-10 w-36 rounded-full bg-[#e2e8f0]" />
          </div>
          <Skeleton className="h-6 w-96 bg-[#e2e8f0] rounded" />
        </div>

        {/* Quick Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {["stat-1", "stat-2", "stat-3"].map((id) => (
            <div
              key={id}
              className="p-6 rounded-xl border border-[#e2e8f0] bg-white shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-lg bg-[#e2e8f0]" />
                <div className="space-y-2">
                  <Skeleton className="h-7 w-12 bg-[#e2e8f0] rounded" />
                  <Skeleton className="h-4 w-24 bg-[#e2e8f0] rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Course List Header Skeleton */}
        <Skeleton className="h-8 w-32 bg-[#e2e8f0] rounded mb-6" />

        {/* Filter Tabs Skeleton */}
        <div className="flex gap-2 mb-6">
          {["tab-1", "tab-2", "tab-3", "tab-4"].map((id) => (
            <Skeleton key={id} className="h-9 w-20 rounded-lg bg-[#e2e8f0]" />
          ))}
        </div>

        {/* Course Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "course-1",
            "course-2",
            "course-3",
            "course-4",
            "course-5",
            "course-6",
          ].map((id) => (
            <div
              key={id}
              className="rounded-2xl border border-[#e2e8f0] bg-white shadow-sm overflow-hidden"
            >
              <Skeleton className="w-full aspect-video bg-[#e2e8f0]" />
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-16 rounded-full bg-[#e2e8f0]" />
                </div>
                <Skeleton className="h-6 w-3/4 bg-[#e2e8f0] rounded" />
                <Skeleton className="h-4 w-full bg-[#e2e8f0] rounded" />
                <Skeleton className="h-4 w-2/3 bg-[#e2e8f0] rounded" />
                <div className="flex items-center gap-4 pt-2">
                  <Skeleton className="h-4 w-20 bg-[#e2e8f0] rounded" />
                  <Skeleton className="h-4 w-20 bg-[#e2e8f0] rounded" />
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
