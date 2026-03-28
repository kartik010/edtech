import { ArrowLeft, BookOpen, Play, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TIER_STYLES } from "@/lib/constants";
import type { COURSE_WITH_MODULES_QUERYResult } from "@/sanity.types";

type Course = NonNullable<COURSE_WITH_MODULES_QUERYResult>;

type CourseHeroProps = Pick<
  Course,
  | "title"
  | "description"
  | "tier"
  | "thumbnail"
  | "category"
  | "moduleCount"
  | "lessonCount"
>;

export function CourseHero({
  title,
  description,
  tier,
  thumbnail,
  category,
  moduleCount,
  lessonCount,
}: CourseHeroProps) {
  const displayTier = tier ?? "free";
  const styles = TIER_STYLES[displayTier];

  return (
    <div className="mb-12">
      <Link
        href="/dashboard"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[rgba(26,26,26,0.55)] transition-colors hover:text-[#FF6B2C]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div
          className={`relative flex h-48 w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br lg:h-52 lg:w-80 ${styles.gradient}`}
        >
          {thumbnail?.asset?.url ? (
            <Image
              src={thumbnail.asset.url}
              alt={title ?? "Course thumbnail"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="text-7xl opacity-50">📚</div>
          )}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="flex-1">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {category?.title && (
              <Badge
                variant="outline"
                className="border-[#e2e8f0] text-[rgba(26,26,26,0.65)]"
              >
                <Tag className="mr-1 h-3 w-3" />
                {category.title}
              </Badge>
            )}
          </div>

          <h1 className="mb-4 text-3xl font-black tracking-tight text-[#1A1A1A] md:text-4xl">
            {title ?? "Untitled Course"}
          </h1>

          {description && (
            <p className="mb-6 max-w-2xl text-lg leading-relaxed text-[rgba(26,26,26,0.62)]">
              {description}
            </p>
          )}

          <div className="flex items-center gap-6 text-sm text-[rgba(26,26,26,0.5)]">
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {moduleCount ?? 0} modules
            </span>
            <span className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              {lessonCount ?? 0} lessons
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
