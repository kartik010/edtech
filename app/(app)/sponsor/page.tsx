"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { CheckCircle2, Heart, Loader2, Upload, Video } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

export default function SponsorPage() {
    const searchParams = useSearchParams();
    const { user, isLoaded } = useUser();

    const courseId = searchParams.get("courseId") ?? "";
    const courseTitle = searchParams.get("courseTitle") ?? "";

    const [form, setForm] = useState({
        studentName: user?.fullName ?? "",
        email: user?.primaryEmailAddress?.emailAddress ?? "",
        courseTitle: courseTitle,
        courseId: courseId,
        message: "",
        videoUrl: "",
    });

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            const res = await fetch("/api/sponsor/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Submission failed");
            setSubmitted(true);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen overflow-hidden bg-white text-[#1A1A1A]">
            <div className="pointer-events-none fixed inset-0">
                <div className="absolute top-[-15%] left-[-10%] h-[400px] w-[400px] rounded-full bg-[#FF6B2C]/10 blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] h-[360px] w-[360px] rounded-full bg-[#FFC107]/20 blur-[90px]" />
            </div>

            <Header />

            <main className="relative z-10 mx-auto max-w-2xl px-6 pt-28 pb-16 lg:px-12">
                <div className="mb-12 text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF6B2C]/20 bg-[#FF6B2C]/5 px-4 py-2">
                        <Heart className="h-4 w-4 text-[#FF6B2C]" />
                        <span className="text-sm font-semibold tracking-wide text-[#FF6B2C] uppercase">
                            Get sponsored
                        </span>
                    </div>
                    <h1 className="mb-4 text-4xl font-black tracking-tight md:text-5xl font-['Outfit',sans-serif]">
                        Apply for a{" "}
                        <span className="text-[#FF6B2C]">sponsorship</span>
                    </h1>
                    <p className="mx-auto max-w-xl text-lg text-[rgba(26,26,26,0.6)]">
                        Can&apos;t afford a course right now? Tell us your story. Selected
                        students are published as{" "}
                        <span className="font-semibold text-[#1A1A1A]">
                            student stories
                        </span>{" "}
                        with video.
                    </p>
                </div>

                {submitted ? (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-8 py-16 text-center">
                        <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-emerald-600" />
                        <h2 className="mb-2 text-2xl font-bold">Application submitted</h2>
                        <p className="text-[rgba(26,26,26,0.65)]">
                            We received your application. Our team will review it and
                            reach out by email within a few business days.
                        </p>
                    </div>
                ) : !isLoaded ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="h-8 w-8 animate-spin text-[#FF6B2C]" />
                    </div>
                ) : !user ? (
                    <div className="rounded-2xl border border-[#e2e8f0] bg-[#F8F9FA] px-8 py-16 text-center">
                        <Heart className="mx-auto mb-4 h-12 w-12 text-[#FF6B2C]" />
                        <h2 className="mb-4 text-xl font-bold">Sign in to apply</h2>
                        <p className="mb-6 text-[rgba(26,26,26,0.6)]">
                            You need an account to submit a sponsorship application.
                        </p>
                        <SignInButton mode="modal">
                            <Button className="border-0 bg-[#1A1A1A] text-white hover:bg-[#2a2a2a]">
                                Sign in to continue
                            </Button>
                        </SignInButton>
                    </div>
                ) : (
                    /* Application Form */
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
                                    Full name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={form.studentName}
                                    onChange={(e) => setForm((f) => ({ ...f, studentName: e.target.value }))}
                                    className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-[#1A1A1A] transition-colors placeholder:text-[rgba(26,26,26,0.4)] focus:border-[#FF6B2C] focus:outline-none"
                                    placeholder="Your full name"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                                    className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-[#1A1A1A] transition-colors placeholder:text-[rgba(26,26,26,0.4)] focus:border-[#FF6B2C] focus:outline-none"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
                                Course you&apos;re applying for
                            </label>
                            <input
                                type="text"
                                value={form.courseTitle}
                                onChange={(e) => setForm((f) => ({ ...f, courseTitle: e.target.value }))}
                                className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-[#1A1A1A] transition-colors placeholder:text-[rgba(26,26,26,0.4)] focus:border-[#FF6B2C] focus:outline-none"
                                placeholder="Course name"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
                                Video link *
                            </label>
                            <div className="flex items-center gap-3 rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 transition-colors focus-within:border-[#FF6B2C]">
                                <Video className="h-5 w-5 shrink-0 text-[rgba(26,26,26,0.45)]" />
                                <input
                                    type="url"
                                    required
                                    value={form.videoUrl}
                                    onChange={(e) => setForm((f) => ({ ...f, videoUrl: e.target.value }))}
                                    className="flex-1 bg-transparent text-[#1A1A1A] placeholder:text-[rgba(26,26,26,0.4)] focus:outline-none"
                                    placeholder="YouTube, Loom, Google Drive…"
                                />
                            </div>
                            <p className="mt-2 text-xs text-[rgba(26,26,26,0.5)]">
                                1–3 min: who you are, why this course, and how it will help you.
                                If you are selected, we can feature a Mux upload from Sanity on the site.
                            </p>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
                                Personal statement *{" "}
                                <span className="font-normal text-[rgba(26,26,26,0.45)]">
                                    (50–1000 characters)
                                </span>
                            </label>
                            <textarea
                                required
                                minLength={50}
                                maxLength={1000}
                                rows={6}
                                value={form.message}
                                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                                className="w-full resize-none rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-[#1A1A1A] transition-colors placeholder:text-[rgba(26,26,26,0.4)] focus:border-[#FF6B2C] focus:outline-none"
                                placeholder="Your background, goals, and why you need this sponsorship…"
                            />
                            <p className="mt-1 text-right text-xs text-[rgba(26,26,26,0.45)]">
                                {form.message.length}/1000
                            </p>
                        </div>

                        {error && (
                            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
                                {error}
                            </p>
                        )}

                        <Button
                            type="submit"
                            size="lg"
                            disabled={submitting}
                            className="h-13 w-full border-0 bg-[#FF6B2C] text-white shadow-lg shadow-[#FF6B2C]/25 hover:bg-[#e85f24]"
                        >
                            {submitting ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
                            ) : (
                                <><Upload className="w-4 h-4 mr-2" /> Submit Application</>
                            )}
                        </Button>
                    </form>
                )}
            </main>
        </div>
    );
}
