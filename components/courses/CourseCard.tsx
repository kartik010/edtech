"use client";

import { CheckCircle2, Layers, Lock, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { TIER_STYLES } from "@/lib/constants";
import type { DASHBOARD_COURSES_QUERYResult } from "@/sanity.types";

type SanityCourse = DASHBOARD_COURSES_QUERYResult[number];

export interface CourseCardProps
  extends Pick<
    SanityCourse,
    | "title"
    | "description"
    | "tier"
    | "thumbnail"
    | "moduleCount"
    | "lessonCount"
  > {
  slug?: { current: string } | null;
  href?: string;
  completedLessonCount?: number | null;
  isCompleted?: boolean;
  isLocked?: boolean;
  isEnrolled?: boolean;
  showProgress?: boolean;
}

export function CourseCard({
  slug,
  href,
  title,
  description,
  tier,
  thumbnail,
  moduleCount,
  lessonCount,
  completedLessonCount = 0,
  isCompleted = false,
  isLocked = false,
  isEnrolled = false,
  showProgress = false,
}: CourseCardProps) {
  const displayTier = tier ?? "free";
  const styles = TIER_STYLES[displayTier];
  const totalLessons = lessonCount ?? 0;
  const completed = completedLessonCount ?? 0;
  const progressPercent =
    totalLessons > 0 ? (completed / totalLessons) * 100 : 0;

  const linkHref = href ?? `/courses/${slug?.current ?? ""}`;

  return (
    <Link href={linkHref} className="group block h-full">
      <div className="relative h-full overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm transition-all duration-300 hover:border-[#FF6B2C]/35 hover:shadow-md">
        <div
          className={`relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br ${styles.gradient}`}
        >
          {thumbnail?.asset?.url ? (
            <Image
              src={thumbnail.asset.url}
              alt={title ?? "Course thumbnail"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="text-6xl opacity-50">📚</div>
          )}
          <div className="absolute inset-0 bg-black/15" />

          {isCompleted ? (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Completed
            </div>
          ) : isEnrolled ? (
            <div className="absolute top-3 right-3 rounded-md bg-[#FF6B2C] px-2.5 py-1 text-xs font-semibold text-white">
              Enrolled
            </div>
          ) : (
            <div className="absolute top-3 right-3 rounded-md border border-[#e2e8f0] bg-white/95 px-2.5 py-1 text-xs font-semibold text-[#1A1A1A] shadow-sm">
              $59
            </div>
          )}

          {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
                  <Lock className="h-5 w-5 text-[#1A1A1A]" />
                </div>
                <span className="text-xs font-medium text-white">
                  Upgrade to unlock
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="mb-2 line-clamp-2 text-lg font-bold text-[#1A1A1A] transition-colors group-hover:text-[#FF6B2C]">
            {title ?? "Untitled Course"}
          </h3>

          {description && (
            <p className="mb-4 line-clamp-2 text-sm text-[rgba(26,26,26,0.58)]">
              {description}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-[rgba(26,26,26,0.5)]">
            <span className="flex items-center gap-1.5">
              <Layers className="h-4 w-4" />
              {moduleCount ?? 0} modules
            </span>
            <span className="flex items-center gap-1.5">
              <Play className="h-4 w-4" />
              {lessonCount ?? 0} lessons
            </span>
          </div>

          {showProgress && totalLessons > 0 && (
            <div className="mt-4 border-t border-[#e2e8f0] pt-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-[rgba(26,26,26,0.55)]">
                  {completed}/{totalLessons} lessons
                </span>
                <span className="text-[rgba(26,26,26,0.45)]">
                  {Math.round(progressPercent)}%
                </span>
              </div>
              <Progress
                value={progressPercent}
                className="h-2 bg-[#f1f5f9] [&>div]:bg-[#FF6B2C]"
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
