"use client";

import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { GatedFallback } from "@/components/courses/GatedFallback";
import { Button } from "@/components/ui/button";
import type { LESSON_BY_ID_QUERYResult } from "@/sanity.types";
import { LessonCompleteButton } from "./LessonCompleteButton";
import { LessonContent } from "./LessonContent";
import { LessonSidebar } from "./LessonSidebar";
import { MuxVideoPlayer } from "./MuxVideoPlayer";
import { Quiz } from "./Quiz";

interface LessonPageContentProps {
  lesson: NonNullable<LESSON_BY_ID_QUERYResult>;
  userId: string | null;
  isEnrolled: boolean;
}

export function LessonPageContent({
  lesson,
  userId,
  isEnrolled,
}: LessonPageContentProps) {
  // Use the first course for gated fallback UI
  const courses = lesson.courses ?? [];
  const activeCourse = courses[0];

  // Check if user has completed this lesson
  const isCompleted = userId
    ? (lesson.completedBy?.includes(userId) ?? false)
    : false;

  const hasQuiz = lesson.quiz && lesson.quiz.length > 0;

  // Find highest score if user has taken quiz
  const userScoreRecord = userId
    ? lesson.quizScores?.find((score) => score.userId === userId)
    : null;
  const bestScore = userScoreRecord?.score ?? null;

  // Find previous and next lessons for navigation
  const modules = activeCourse?.modules;
  let prevLesson: { id: string; slug: string; title: string } | null = null;
  let nextLesson: { id: string; slug: string; title: string } | null = null;
  const completedLessonIds: string[] = [];

  if (modules) {
    const allLessons: Array<{ id: string; slug: string; title: string }> = [];

    for (const module of modules) {
      if (module.lessons) {
        for (const l of module.lessons) {
          allLessons.push({
            id: l._id,
            slug: l.slug?.current || "",
            title: l.title ?? "Untitled Lesson",
          });
          if (userId && l.completedBy?.includes(userId)) {
            completedLessonIds.push(l._id);
          }
        }
      }
    }

    const currentIndex = allLessons.findIndex((l) => l.id === lesson._id);
    prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
    nextLesson =
      currentIndex < allLessons.length - 1
        ? allLessons[currentIndex + 1]
        : null;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      {activeCourse && isEnrolled && (
        <LessonSidebar
          courseSlug={activeCourse.slug?.current || ""}
          courseTitle={activeCourse.title}
          modules={activeCourse.modules ?? null}
          currentLessonId={lesson._id}
          completedLessonIds={completedLessonIds}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 min-w-0">
        {isEnrolled ? (
          <>
            {/* Video Player */}
            {lesson.video?.asset?.playbackId && (
              <MuxVideoPlayer
                playbackId={lesson.video?.asset?.playbackId}
                title={lesson.title ?? undefined}
                className="mb-6"
              />
            )}

            {/* Lesson Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h1 className="mb-2 text-2xl font-bold text-[#1A1A1A] md:text-3xl">
                  {lesson.title ?? "Untitled Lesson"}
                </h1>
                {lesson.description && (
                  <p className="text-[rgba(26,26,26,0.58)]">
                    {lesson.description}
                  </p>
                )}
              </div>

              {userId && !hasQuiz && (
                <LessonCompleteButton
                  lessonId={lesson._id}
                  lessonSlug={lesson.slug?.current || ""}
                  isCompleted={isCompleted}
                />
              )}
            </div>

            {/* Lesson Content */}
            {lesson.content && (
              <div className="mb-6 rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-sm md:p-8">
                <div className="mb-6 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#FF6B2C]" />
                  <h2 className="text-lg font-semibold text-[#1A1A1A]">
                    Lesson notes
                  </h2>
                </div>
                <LessonContent content={lesson.content} />
              </div>
            )}

            {/* Quiz Component */}
            {hasQuiz && lesson.quiz && (
              <Quiz
                lessonId={lesson._id}
                lessonSlug={lesson.slug?.current || ""}
                questions={lesson.quiz}
                bestScore={bestScore}
              />
            )}

            {/* Navigation between lessons */}
            <div className="flex items-center justify-between border-t border-[#e2e8f0] pt-6">
              {prevLesson ? (
                <Link href={`/lessons/${prevLesson.slug}`}>
                  <Button
                    variant="ghost"
                    className="text-[rgba(26,26,26,0.6)] hover:bg-[#F8F9FA] hover:text-[#1A1A1A]"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">{prevLesson.title}</span>
                    <span className="sm:hidden">Previous</span>
                  </Button>
                </Link>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <Link href={`/lessons/${nextLesson.slug}`}>
                  <Button className="border-0 bg-[#FF6B2C] text-white hover:bg-[#e85a24]">
                    <span className="hidden sm:inline">{nextLesson.title}</span>
                    <span className="sm:hidden">Next</span>
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </>
        ) : (
          <GatedFallback
            courseId={activeCourse?._id || ""}
            courseTitle={activeCourse?.title || "Course"}
            requiredTier={activeCourse?.tier}
          />
        )}
      </div>
    </div>
  );
}
