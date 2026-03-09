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
        <div className="min-h-screen bg-[#09090b] text-white overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-fuchsia-600/15 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            <Header />

            <main className="relative z-10 px-6 lg:px-12 py-16 max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 mb-6">
                        <Heart className="w-4 h-4 text-fuchsia-400" />
                        <span className="text-sm text-fuchsia-300">Sponsor Program</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                        Apply for a{" "}
                        <span className="bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                            Sponsorship
                        </span>
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                        Can&apos;t afford the course right now? Tell us your story. We select students from passionate backgrounds and sponsor their access.
                    </p>
                </div>

                {submitted ? (
                    /* Success State */
                    <div className="text-center py-16 px-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                        <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
                        <p className="text-zinc-400">
                            We received your application. Our team will review it and reach out to you via email within a few business days.
                        </p>
                    </div>
                ) : !isLoaded ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
                    </div>
                ) : !user ? (
                    /* Not logged in */
                    <div className="text-center py-16 px-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                        <Heart className="w-12 h-12 text-fuchsia-400 mx-auto mb-4" />
                        <h2 className="text-xl font-bold mb-4">Sign in to apply</h2>
                        <p className="text-zinc-400 mb-6">You need an account to submit a sponsorship application.</p>
                        <SignInButton mode="modal">
                            <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0">
                                Sign in to Continue
                            </Button>
                        </SignInButton>
                    </div>
                ) : (
                    /* Application Form */
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={form.studentName}
                                    onChange={(e) => setForm((f) => ({ ...f, studentName: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
                                    placeholder="Your full name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Email *</label>
                                <input
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">Course You&apos;re Applying For</label>
                            <input
                                type="text"
                                value={form.courseTitle}
                                onChange={(e) => setForm((f) => ({ ...f, courseTitle: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
                                placeholder="e.g. React Masterclass"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Video Link *
                            </label>
                            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus-within:border-violet-500 transition-colors">
                                <Video className="w-5 h-5 text-zinc-500 shrink-0" />
                                <input
                                    type="url"
                                    required
                                    value={form.videoUrl}
                                    onChange={(e) => setForm((f) => ({ ...f, videoUrl: e.target.value }))}
                                    className="flex-1 bg-transparent text-white placeholder:text-zinc-600 focus:outline-none"
                                    placeholder="https://youtube.com/... or Google Drive link"
                                />
                            </div>
                            <p className="text-xs text-zinc-500 mt-2">
                                Record a short 1–3 minute video (YouTube, Google Drive, Loom etc.) telling us your story — who you are, why you want this course, and how it will help you.
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Personal Statement * <span className="text-zinc-500">(50–1000 characters)</span>
                            </label>
                            <textarea
                                required
                                minLength={50}
                                maxLength={1000}
                                rows={6}
                                value={form.message}
                                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors resize-none"
                                placeholder="Tell us your story — your background, goals, and why you need this sponsorship..."
                            />
                            <p className="text-xs text-zinc-500 mt-1 text-right">{form.message.length}/1000</p>
                        </div>

                        {error && (
                            <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                                {error}
                            </p>
                        )}

                        <Button
                            type="submit"
                            size="lg"
                            disabled={submitting}
                            className="w-full bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 text-white border-0 shadow-xl shadow-fuchsia-600/30 h-13"
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
