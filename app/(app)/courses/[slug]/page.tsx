import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { CourseContent } from "@/components/courses";
import { Header } from "@/components/Header";
import { hasCourseAccess } from "@/lib/course-access";
import { sanityFetch } from "@/sanity/lib/live";
import { COURSE_WITH_MODULES_QUERY } from "@/sanity/lib/queries";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const { userId } = await auth();

  const { data: course } = await sanityFetch({
    query: COURSE_WITH_MODULES_QUERY,
    params: { slug, userId: userId },
  });

  if (!course) {
    notFound();
  }

  const isEnrolled = await hasCourseAccess(course._id);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAFAFA] text-[#1A1A1A]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-15%] right-[-8%] h-[380px] w-[380px] rounded-full bg-[#FFC107]/12 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-8%] h-[360px] w-[360px] rounded-full bg-[#FF6B2C]/10 blur-[90px]" />
      </div>

      <Header />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-12 lg:px-12">
        <CourseContent
          course={course}
          userId={userId}
          isEnrolled={isEnrolled}
        />
      </main>
    </div>
  );
}
