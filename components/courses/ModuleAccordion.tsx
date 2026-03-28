"use client";

import { BookOpen, CheckCircle2, Circle, Play } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import type { COURSE_WITH_MODULES_QUERYResult } from "@/sanity.types";

// Infer types from Sanity query result
type Module = NonNullable<
  NonNullable<COURSE_WITH_MODULES_QUERYResult>["modules"]
>[number];
type Lesson = NonNullable<Module["lessons"]>[number];

interface ModuleAccordionProps {
  modules: Module[] | null;
  userId?: string | null;
}

export function ModuleAccordion({ modules, userId }: ModuleAccordionProps) {
  if (!modules || modules.length === 0) {
    return (
      <div className="py-12 text-center text-[rgba(26,26,26,0.45)]">
        <BookOpen className="mx-auto mb-4 h-12 w-12 opacity-50" />
        <p>No modules available yet.</p>
      </div>
    );
  }

  const isLessonCompleted = (lesson: Lesson): boolean => {
    if (!userId || !lesson.completedBy) return false;
    return lesson.completedBy.includes(userId);
  };

  const getModuleProgress = (
    module: Module,
  ): { completed: number; total: number } => {
    const lessons = module.lessons ?? [];
    const total = lessons.length;
    const completed = lessons.filter((lesson) =>
      isLessonCompleted(lesson),
    ).length;
    return { completed, total };
  };

  return (
    <div className="space-y-4">
      <h2 className="mb-6 text-2xl font-bold text-[#1A1A1A]">Course content</h2>

      <Accordion type="multiple" className="space-y-3">
        {modules.map((module, index) => {
          const { completed, total } = getModuleProgress(module);
          const isModuleComplete = total > 0 && completed === total;

          return (
            <AccordionItem
              key={module._id}
              value={module._id}
              className="overflow-hidden rounded-xl border border-[#e2e8f0] bg-white shadow-sm data-[state=open]:shadow-md"
            >
              <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-[#F8F9FA] hover:no-underline">
                <div className="flex flex-1 items-center gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FF6B2C]/12 text-sm font-bold text-[#FF6B2C]">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-xs tracking-wider text-[rgba(26,26,26,0.45)] uppercase">
                        Module
                      </span>
                    </div>
                    <h3 className="font-semibold text-[#1A1A1A]">
                      {module.title ?? "Untitled Module"}
                    </h3>
                    <p className="mt-1 text-sm text-[rgba(26,26,26,0.5)]">
                      {total} {total === 1 ? "lesson" : "lessons"}
                      {userId && total > 0 && (
                        <span className="ml-2">
                          • {completed}/{total} completed
                        </span>
                      )}
                    </p>
                  </div>

                  {userId && total > 0 && (
                    <div className="hidden w-36 shrink-0 items-center gap-3 sm:flex">
                      <Progress
                        value={(completed / total) * 100}
                        className="h-2 flex-1 bg-[#e2e8f0] [&>div]:bg-emerald-500"
                      />
                      <div className="w-5">
                        {isModuleComplete && (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-5 pt-2 pb-4">
                <div className="ml-4 space-y-1 border-l-2 border-[#e2e8f0] pl-3">
                  {module.lessons?.map((lesson, _lessonIndex) => {
                    const completed = isLessonCompleted(lesson);
                    const hasVideo = !!lesson.video?.asset?.playbackId;

                    return (
                      <Link
                        key={lesson._id}
                        href={`/lessons/${lesson.slug?.current || ""}`}
                        className="group flex items-center gap-2.5 rounded-lg py-2 pr-3 pl-2 transition-colors hover:bg-[#F8F9FA]"
                      >
                        {completed ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                        ) : (
                          <Circle className="h-4 w-4 shrink-0 text-[#cbd5e1]" />
                        )}

                        <span
                          className={`flex-1 text-sm transition-colors ${
                            completed
                              ? "text-[rgba(26,26,26,0.5)]"
                              : "text-[#1A1A1A]"
                          } group-hover:text-[#FF6B2C]`}
                        >
                          {lesson.title ?? "Untitled Lesson"}
                        </span>

                        {hasVideo && (
                          <Play className="h-4 w-4 text-[rgba(26,26,26,0.35)] transition-colors group-hover:text-[#FF6B2C]" />
                        )}
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
  );
}
