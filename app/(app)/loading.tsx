import LoadingSpinner from "@/components/LoadingSpinner";

function Loading() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-15%] right-[-8%] h-[320px] w-[320px] rounded-full bg-[#FFC107]/12 blur-[90px]" />
        <div className="absolute bottom-[-10%] left-[-8%] h-[300px] w-[300px] rounded-full bg-[#FF6B2C]/10 blur-[80px]" />
      </div>
      <div className="relative z-10">
        <LoadingSpinner text="Loading..." isFullScreen size="lg" />
      </div>
    </div>
  );
}

export default Loading;
