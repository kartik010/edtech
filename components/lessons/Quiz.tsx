"use client";

import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { submitQuizAttempt } from "@/lib/actions";
import type { LESSON_BY_SLUG_QUERYResult } from "@/sanity.types";

type NonNullLesson = NonNullable<LESSON_BY_SLUG_QUERYResult>;
type QuizQuestions = NonNullable<NonNullLesson["quiz"]>;

interface QuizQuestion {
  _key: string;
  title?: string;
  options?: string[];
  correctAnswer?: string;
}

interface QuizProps {
  lessonId: string;
  lessonSlug: string;
  questions: QuizQuestions;
  bestScore: number | null;
  onSuccess?: () => void;
}

export function Quiz({
  lessonId,
  lessonSlug,
  questions,
  bestScore,
  onSuccess,
}: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    score: number;
    passed: boolean;
  } | null>(null);

  const handleOptionSelect = (questionKey: string, option: string) => {
    if (result) return;
    setAnswers((prev) => ({
      ...prev,
      [questionKey]: option,
    }));
  };

  const handleSubmit = () => {
    if (!questions || questions.length === 0) return;

    let correctCount = 0;
    questions.forEach((q) => {
      const answer = answers[q._key];
      if (answer && answer === q.correctAnswer) {
        correctCount++;
      }
    });

    const scorePercentage = Math.round((correctCount / questions.length) * 100);

    startTransition(async () => {
      const res = await submitQuizAttempt(
        lessonId,
        lessonSlug,
        scorePercentage,
        bestScore,
      );

      setResult({
        score: scorePercentage,
        passed: scorePercentage >= 80,
      });

      if (res.success && res.isCompleted && onSuccess) {
        onSuccess();
      }
    });
  };

  const isComplete =
    questions && Object.keys(answers).length === questions.length;

  return (
    <div className="mt-8 rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="mb-2 text-xl font-bold text-[#1A1A1A]">Lesson quiz</h2>
          <p className="text-sm text-[rgba(26,26,26,0.55)]">
            You must score 80% or higher to complete this lesson.
          </p>
        </div>
        {bestScore !== null && (
          <div className="rounded-lg border border-[#e2e8f0] bg-[#F8F9FA] px-4 py-2 font-medium">
            <span className="mb-1 block text-xs tracking-wider text-[rgba(26,26,26,0.45)] uppercase">
              Best score
            </span>
            <span
              className={`text-xl font-bold ${
                bestScore >= 80 ? "text-emerald-600" : "text-amber-600"
              }`}
            >
              {bestScore}%
            </span>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {questions?.map((q: QuizQuestion, index: number) => {
          return (
            <div
              key={q._key}
              className="rounded-lg border border-[#e2e8f0] bg-[#FAFAFA] p-5"
            >
              <h3 className="mb-4 text-lg font-medium text-[#1A1A1A]">
                {index + 1}. {q.title}
              </h3>

              <div className="space-y-3">
                {q.options?.map((option: string) => {
                  const isSelected = answers[q._key] === option;
                  const showCorrection = result !== null;
                  const isCorrectAnswer = option === q.correctAnswer;

                  let optionClass =
                    "border-[#e2e8f0] text-[#1A1A1A] outline-none hover:border-[#cbd5e1] hover:bg-white";

                  if (isSelected && !showCorrection) {
                    optionClass =
                      "border-[#FF6B2C] bg-[rgba(255,107,44,0.08)] text-[#1A1A1A]";
                  } else if (showCorrection) {
                    if (isCorrectAnswer) {
                      optionClass =
                        "border-emerald-300 bg-emerald-50 text-emerald-900";
                    } else if (isSelected && !isCorrectAnswer) {
                      optionClass = "border-red-300 bg-red-50 text-red-900";
                    } else {
                      optionClass =
                        "border-[#e2e8f0] text-[rgba(26,26,26,0.4)] opacity-60";
                    }
                  }

                  return (
                    <button
                      type="button"
                      key={option}
                      onClick={() => handleOptionSelect(q._key, option)}
                      disabled={result !== null}
                      className={`w-full rounded-lg border px-4 py-3 text-left transition-colors ${optionClass}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showCorrection && isCorrectAnswer && (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        )}
                        {showCorrection && isSelected && !isCorrectAnswer && (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {!result ? (
        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={!isComplete || isPending}
            className="min-w-[120px] border-0 bg-[#FF6B2C] text-white hover:bg-[#e85a24]"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Submit quiz
          </Button>
        </div>
      ) : (
        <div
          className={`mt-8 flex flex-col items-center rounded-xl border p-6 text-center ${
            result.passed
              ? "border-emerald-200 bg-emerald-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          {result.passed ? (
            <CheckCircle2 className="mb-4 h-12 w-12 text-emerald-600" />
          ) : (
            <XCircle className="mb-4 h-12 w-12 text-red-600" />
          )}
          <h3 className="mb-2 text-2xl font-bold text-[#1A1A1A]">
            You scored {result.score}%
          </h3>
          <p className={result.passed ? "text-emerald-800" : "text-red-800"}>
            {result.passed
              ? "Congratulations! You've passed the quiz and completed the lesson."
              : "You need 80% to pass. Review the lesson and try again!"}
          </p>

          {!result.passed && (
            <Button
              onClick={() => {
                setResult(null);
                setAnswers({});
              }}
              variant="outline"
              className="mt-6 border-[#e2e8f0] text-[#1A1A1A] outline-none hover:bg-white"
            >
              Retry quiz
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
