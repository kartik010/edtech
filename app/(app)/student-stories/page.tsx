import { Play, Star, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { MuxVideoPlayer } from "@/components/lessons/MuxVideoPlayer";
import { sanityFetch } from "@/sanity/lib/live";
import { STUDENT_STORIES_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function StudentStoriesPage() {
    const { data: stories } = await sanityFetch({ query: STUDENT_STORIES_QUERY });

    return (
        <div className="min-h-screen overflow-hidden bg-white text-[#1A1A1A]">
            <div className="pointer-events-none fixed inset-0">
                <div className="absolute top-[-20%] right-[-10%] h-[420px] w-[420px] rounded-full bg-[#FFC107]/20 blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] h-[380px] w-[380px] rounded-full bg-[#FF6B2C]/10 blur-[100px]" />
            </div>

            <Header />

            <main className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-16 lg:px-12">
                {/* Hero */}
                <div className="mb-16 text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF6B2C]/20 bg-[#FF6B2C]/5 px-4 py-2">
                        <Star className="h-4 w-4 text-[#FF6B2C]" />
                        <span className="text-sm font-semibold tracking-wide text-[#FF6B2C] uppercase">
                            Sponsored students
                        </span>
                    </div>
                    <h1 className="mb-6 text-4xl font-black tracking-tight md:text-6xl font-['Outfit',sans-serif]">
                        Student{" "}
                        <span className="text-[#FF6B2C]">stories</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-[rgba(26,26,26,0.6)]">
                        Selected from Get Sponsored — watch their videos and read
                        their words.
                    </p>
                </div>

                {/* Stories Grid */}
                {stories.length === 0 ? (
                    <div className="py-20 text-center">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#e2e8f0] bg-[#F8F9FA]">
                            <Users className="h-8 w-8 text-[rgba(26,26,26,0.35)]" />
                        </div>
                        <h2 className="mb-3 text-2xl font-bold text-[#1A1A1A]">
                            No stories yet
                        </h2>
                        <p className="mx-auto max-w-md text-[rgba(26,26,26,0.55)]">
                            Apply via Get Sponsored. When you are featured in Sanity,
                            your story appears here.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                        {stories.map((story) => (
                            <div
                                key={story._id}
                                className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-[#F8F9FA] shadow-sm transition-all hover:border-[#FF6B2C]/30"
                            >
                                {story.video?.asset?.playbackId ? (
                                    <MuxVideoPlayer
                                        playbackId={story.video.asset.playbackId}
                                        title={`${story.studentName}'s Story`}
                                        className="rounded-none"
                                        accentColor="#FF6B2C"
                                    />
                                ) : (
                                    <div className="flex h-52 items-center justify-center bg-[#e2e8f0]">
                                        <Play className="h-12 w-12 text-[rgba(26,26,26,0.25)]" />
                                    </div>
                                )}

                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-4">
                                        {story.avatar?.asset?.url ? (
                                            <Image
                                                src={story.avatar.asset.url}
                                                alt={story.studentName ?? "Student"}
                                                width={48}
                                                height={48}
                                                className="rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6B2C] text-lg font-bold text-white">
                                                {(story.studentName ?? "S")[0].toUpperCase()}
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="text-lg leading-tight font-bold">
                                                {story.studentName}
                                            </h3>
                                            <p className="text-sm font-semibold text-[#FF6B2C]">
                                                {story.courseTitle}
                                            </p>
                                        </div>
                                    </div>

                                    {story.quote && (
                                        <blockquote className="border-l-2 border-[#FF6B2C]/40 pl-4 leading-relaxed text-[rgba(26,26,26,0.7)] italic">
                                            &ldquo;{story.quote}&rdquo;
                                        </blockquote>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* CTA to apply */}
                <div className="mt-20 text-center">
                    <div className="inline-block rounded-2xl border border-[#e2e8f0] bg-[#F8F9FA] p-px">
                        <div className="rounded-2xl px-10 py-8">
                            <h2 className="mb-2 text-2xl font-bold">Want to be featured?</h2>
                            <p className="mb-6 text-[rgba(26,26,26,0.6)]">
                                Apply for sponsorship and share your story with us.
                            </p>
                            <a
                                href="/sponsor"
                                className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B2C] px-6 py-3 font-semibold text-white shadow-lg shadow-[#FF6B2C]/25 transition-opacity hover:opacity-90"
                            >
                                <Star className="h-4 w-4" />
                                Get sponsored
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
