"use client";

import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toggleLessonCompletion } from "@/lib/actions";

interface LessonCompleteButtonProps {
  lessonId: string;
  lessonSlug: string;
  isCompleted: boolean;
}

export function LessonCompleteButton({
  lessonId,
  lessonSlug,
  isCompleted: initialCompleted,
}: LessonCompleteButtonProps) {
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleLessonCompletion(
        lessonId,
        lessonSlug,
        !isCompleted,
      );
      if (result.success) {
        setIsCompleted(result.isCompleted);
      }
    });
  };

  return (
    <Button
      onClick={handleToggle}
      disabled={isPending}
      variant={isCompleted ? "ghost" : "default"}
      className={
        isCompleted
          ? "border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 hover:text-emerald-900"
          : "border-0 bg-[#FF6B2C] text-white hover:bg-[#e85a24]"
      }
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : isCompleted ? (
        <CheckCircle2 className="w-4 h-4 mr-2" />
      ) : (
        <Circle className="w-4 h-4 mr-2" />
      )}
      {isCompleted ? "Completed" : "Mark as Complete"}
    </Button>
  );
}
