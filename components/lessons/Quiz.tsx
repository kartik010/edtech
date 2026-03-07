"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { submitQuizAttempt } from "@/lib/actions";
import type { LESSON_BY_SLUG_QUERYResult } from "@/sanity.types";

type NonNullLesson = NonNullable<LESSON_BY_SLUG_QUERYResult>;
// Extract the quiz array type from the lesson type
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
    if (result) return; // Prevent changing answers after submission
    setAnswers((prev) => ({
      ...prev,
      [questionKey]: option,
    }));
  };

  const handleSubmit = () => {
    if (!questions || questions.length === 0) return;

    // Calculate score
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
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 md:p-8 mt-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Lesson Quiz</h2>
          <p className="text-zinc-400 text-sm">
            You must score 80% or higher to complete this lesson.
          </p>
        </div>
        {bestScore !== null && (
          <div className="bg-zinc-800/80 px-4 py-2 rounded-lg border border-zinc-700 font-medium">
            <span className="text-zinc-400 text-xs uppercase tracking-wider block mb-1">
              Best Score
            </span>
            <span
              className={`text-xl font-bold ${
                bestScore >= 80 ? "text-emerald-400" : "text-amber-400"
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
              className="bg-zinc-800/30 rounded-lg p-5 border border-zinc-800"
            >
              <h3 className="text-lg font-medium text-white mb-4">
                {index + 1}. {q.title}
              </h3>

              <div className="space-y-3">
                {q.options?.map((option: string) => {
                  const isSelected = answers[q._key] === option;
                  const showCorrection = result !== null;
                  const isCorrectAnswer = option === q.correctAnswer;

                  let optionClass =
                    "border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 outline-none text-zinc-300";

                  if (isSelected && !showCorrection) {
                    optionClass =
                      "border-violet-500 bg-violet-500/10 text-violet-300";
                  } else if (showCorrection) {
                    if (isCorrectAnswer) {
                      optionClass =
                        "border-emerald-500/50 bg-emerald-500/10 text-emerald-400";
                    } else if (isSelected && !isCorrectAnswer) {
                      optionClass =
                        "border-red-500/50 bg-red-500/10 text-red-400";
                    } else {
                      optionClass = "border-zinc-800 text-zinc-500 opacity-50";
                    }
                  }

                  return (
                    <button
                      type="button"
                      key={option}
                      onClick={() => handleOptionSelect(q._key, option)}
                      disabled={result !== null}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${optionClass}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showCorrection && isCorrectAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        )}
                        {showCorrection && isSelected && !isCorrectAnswer && (
                          <XCircle className="w-5 h-5 text-red-500" />
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
            className="bg-violet-600 hover:bg-violet-500 text-white min-w-[120px]"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : null}
            Submit Quiz
          </Button>
        </div>
      ) : (
        <div
          className={`mt-8 p-6 rounded-xl border flex flex-col items-center text-center ${
            result.passed
              ? "bg-emerald-500/10 border-emerald-500/20"
              : "bg-red-500/10 border-red-500/20"
          }`}
        >
          {result.passed ? (
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4" />
          ) : (
            <XCircle className="w-12 h-12 text-red-500 mb-4" />
          )}
          <h3 className="text-2xl font-bold text-white mb-2">
            You scored {result.score}%
          </h3>
          <p className={result.passed ? "text-emerald-400" : "text-red-400"}>
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
              className="mt-6 border-zinc-700 hover:bg-zinc-800 text-white outline-none"
            >
              Retry Quiz
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
