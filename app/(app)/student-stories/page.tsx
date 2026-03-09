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
        <div className="min-h-screen bg-[#09090b] text-white overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-fuchsia-600/15 rounded-full blur-[120px] animate-pulse" />
                <div
                    className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] animate-pulse"
                    style={{ animationDelay: "1s" }}
                />
            </div>

            <Header />

            <main className="relative z-10 px-6 lg:px-12 py-16 max-w-7xl mx-auto">
                {/* Hero */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 mb-6">
                        <Star className="w-4 h-4 text-fuchsia-400" />
                        <span className="text-sm text-fuchsia-300">Sponsored Students</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                        Student{" "}
                        <span className="bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                            Stories
                        </span>
                    </h1>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        Meet the students we have selected for our sponsorship program. Their drive, passion and goals inspired us — watch their stories.
                    </p>
                </div>

                {/* Stories Grid */}
                {stories.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center mx-auto mb-6">
                            <Users className="w-8 h-8 text-zinc-600" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-zinc-400">No stories yet</h2>
                        <p className="text-zinc-600 max-w-md mx-auto">
                            We are in the process of selecting our first cohort of sponsored students. Check back soon!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {stories.map((story) => (
                            <div
                                key={story._id}
                                className="rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all duration-300"
                            >
                                {/* Video */}
                                {story.video?.asset?.playbackId ? (
                                    <MuxVideoPlayer
                                        playbackId={story.video.asset.playbackId}
                                        title={`${story.studentName}'s Story`}
                                        className="rounded-none"
                                    />
                                ) : (
                                    <div className="h-52 bg-zinc-900 flex items-center justify-center">
                                        <Play className="w-12 h-12 text-zinc-700" />
                                    </div>
                                )}

                                {/* Info */}
                                <div className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        {story.avatar?.asset?.url ? (
                                            <Image
                                                src={story.avatar.asset.url}
                                                alt={story.studentName ?? "Student"}
                                                width={48}
                                                height={48}
                                                className="rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center text-lg font-bold">
                                                {(story.studentName ?? "S")[0].toUpperCase()}
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-bold text-lg leading-tight">{story.studentName}</h3>
                                            <p className="text-sm text-fuchsia-400">{story.courseTitle}</p>
                                        </div>
                                    </div>

                                    {story.quote && (
                                        <blockquote className="text-zinc-400 leading-relaxed border-l-2 border-fuchsia-500/40 pl-4 italic">
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
                    <div className="inline-block p-px rounded-2xl bg-gradient-to-r from-fuchsia-500/30 to-violet-500/30">
                        <div className="px-10 py-8 rounded-2xl bg-zinc-900/80">
                            <h2 className="text-2xl font-bold mb-2">Want to be featured?</h2>
                            <p className="text-zinc-400 mb-6">
                                Apply for the sponsorship program and share your story with us.
                            </p>
                            <a
                                href="/sponsor"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 text-white font-semibold transition-all shadow-lg shadow-fuchsia-600/25"
                            >
                                <Star className="w-4 h-4" />
                                Apply for Sponsorship
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
