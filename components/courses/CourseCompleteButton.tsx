"use client";

import { CheckCircle2, Circle, Loader2, Trophy } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toggleCourseCompletion } from "@/lib/actions";

interface CourseCompleteButtonProps {
  courseId: string;
  courseSlug: string;
  isCompleted: boolean;
  completedLessons: number;
  totalLessons: number;
}

export function CourseCompleteButton({
  courseId,
  courseSlug,
  isCompleted: initialCompleted,
  completedLessons,
  totalLessons,
}: CourseCompleteButtonProps) {
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [isPending, startTransition] = useTransition();

  const allLessonsCompleted =
    completedLessons === totalLessons && totalLessons > 0;
  const progressPercent =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleCourseCompletion(
        courseId,
        courseSlug,
        !isCompleted,
      );
      if (result.success) {
        setIsCompleted(result.isCompleted);
      }
    });
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <Trophy className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <p className="font-semibold text-emerald-800">Course completed</p>
            <p className="text-sm text-[rgba(26,26,26,0.55)]">
              {completedLessons} of {totalLessons} lessons completed
            </p>
          </div>
        </div>
        <Button
          onClick={handleToggle}
          disabled={isPending}
          variant="ghost"
          size="sm"
          className="text-[rgba(26,26,26,0.55)] hover:bg-white/80 sm:ml-auto"
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Circle className="mr-2 h-4 w-4" />
          )}
          Mark incomplete
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-4 rounded-xl border border-[#e2e8f0] bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <div className="flex flex-1 items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FF6B2C]/10">
          <span className="text-base font-bold text-[#FF6B2C]">
            {progressPercent}%
          </span>
        </div>
        <div>
          <p className="font-semibold text-[#1A1A1A]">Your progress</p>
          <p className="text-sm text-[rgba(26,26,26,0.55)]">
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>
      </div>

      <Button
        onClick={handleToggle}
        disabled={isPending || !allLessonsCompleted}
        className={
          allLessonsCompleted
            ? "border-0 bg-[#FF6B2C] text-white hover:bg-[#e85a24]"
            : "cursor-not-allowed bg-[#f1f5f9] text-[rgba(26,26,26,0.4)]"
        }
      >
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <CheckCircle2 className="mr-2 h-4 w-4" />
        )}
        {allLessonsCompleted
          ? "Mark course complete"
          : "Complete all lessons first"}
      </Button>
    </div>
  );
}
