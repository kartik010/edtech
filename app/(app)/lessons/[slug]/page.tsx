import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { LessonPageContent } from "@/components/lessons";
import { hasCourseAccess } from "@/lib/course-access";
import { sanityFetch } from "@/sanity/lib/live";
import { LESSON_BY_SLUG_QUERY } from "@/sanity/lib/queries";

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const { userId } = await auth();

  const { data: lesson } = await sanityFetch({
    query: LESSON_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!lesson) {
    notFound();
  }

  let isEnrolled = false;
  if (lesson.courses && lesson.courses.length > 0) {
    const accessResults = await Promise.all(
      lesson.courses.map((course) => hasCourseAccess(course._id)),
    );
    isEnrolled = accessResults.some((hasAccess) => hasAccess);
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAFAFA] text-[#1A1A1A]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-15%] left-[-8%] h-[360px] w-[360px] rounded-full bg-[#FF6B2C]/10 blur-[90px]" />
        <div className="absolute right-[-8%] bottom-[-10%] h-[340px] w-[340px] rounded-full bg-[#FFC107]/12 blur-[85px]" />
      </div>

      <Header />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-8 lg:px-12">
        <LessonPageContent
          lesson={lesson}
          userId={userId}
          isEnrolled={isEnrolled}
        />
      </main>
    </div>
  );
}
