"use client";

import { CheckCircle2, Circle, Play } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { LESSON_BY_ID_QUERYResult } from "@/sanity.types";

type Course = NonNullable<LESSON_BY_ID_QUERYResult>["courses"][number];
type CourseModules = Course["modules"];
type Module = NonNullable<CourseModules>[number];

interface LessonSidebarProps {
  courseSlug: string;
  courseTitle: string | null;
  modules: Module[] | null;
  currentLessonId: string;
  completedLessonIds?: string[];
}

export function LessonSidebar({
  courseSlug,
  courseTitle,
  modules,
  currentLessonId,
  completedLessonIds = [],
}: LessonSidebarProps) {
  if (!modules || modules.length === 0) {
    return null;
  }

  const currentModuleId = modules.find((m) =>
    m.lessons?.some((l) => l._id === currentLessonId),
  )?._id;

  return (
    <div className="w-full shrink-0 lg:w-80">
      <div className="sticky top-24 overflow-hidden rounded-xl border border-[#e2e8f0] bg-white shadow-sm">
        <div className="border-b border-[#e2e8f0] p-4">
          <Link
            href={`/courses/${courseSlug}`}
            className="text-sm text-[rgba(26,26,26,0.55)] transition-colors hover:text-[#FF6B2C]"
          >
            ← Back to course
          </Link>
          <h3 className="mt-2 line-clamp-2 font-semibold text-[#1A1A1A]">
            {courseTitle ?? "Course"}
          </h3>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          <Accordion
            type="multiple"
            defaultValue={currentModuleId ? [currentModuleId] : []}
            className="w-full"
          >
            {modules.map((module, moduleIndex) => {
              const lessonCount = module.lessons?.length ?? 0;
              const completedCount =
                module.lessons?.filter((l) =>
                  completedLessonIds.includes(l._id),
                ).length ?? 0;

              return (
                <AccordionItem
                  key={module._id}
                  value={module._id}
                  className="border-b border-[#e2e8f0] last:border-b-0"
                >
                  <AccordionTrigger className="px-4 py-3 text-left hover:bg-[#F8F9FA] hover:no-underline">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#FF6B2C]/12 text-xs font-bold text-[#FF6B2C]">
                        {moduleIndex + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs tracking-wider text-[rgba(26,26,26,0.45)] uppercase">
                            Module
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-sm font-medium text-[#1A1A1A]">
                          {module.title ?? "Untitled Module"}
                        </p>
                        <p className="text-xs text-[rgba(26,26,26,0.45)]">
                          {completedCount}/{lessonCount} lessons
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pt-1 pb-3">
                    <div className="ml-4 space-y-1 border-l-2 border-[#e2e8f0] pl-3">
                      {module.lessons?.map((lesson, _lessonIndex) => {
                        const isActive = lesson._id === currentLessonId;
                        const isCompleted = completedLessonIds.includes(
                          lesson._id,
                        );

                        return (
                          <Link
                            key={lesson._id}
                            href={`/lessons/${lesson.slug?.current || ""}`}
                            className={cn(
                              "flex items-center gap-2.5 rounded-lg py-2 pr-3 pl-2 text-sm transition-colors",
                              isActive
                                ? "bg-[rgba(255,107,44,0.12)] text-[#c44a1a] ring-1 ring-[#FF6B2C]/25"
                                : "text-[rgba(26,26,26,0.65)] hover:bg-[#F8F9FA] hover:text-[#1A1A1A]",
                            )}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                            ) : isActive ? (
                              <Play className="h-4 w-4 shrink-0 fill-[#FF6B2C] text-[#FF6B2C]" />
                            ) : (
                              <Circle className="h-4 w-4 shrink-0 text-[#cbd5e1]" />
                            )}
                            <span className="truncate">
                              {lesson.title ?? "Untitled Lesson"}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
