import { auth } from "@clerk/nextjs/server";
import { sanityFetch } from "@/sanity/lib/live";
import { ENROLLMENT_BY_STUDENT_AND_COURSE_QUERY } from "@/sanity/lib/queries";

/**
 * Check if the current user has access to a specific course.
 * Uses Sanity query to verify valid, unexpired enrollment.
 */
export async function hasCourseAccess(courseId: string): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) return false;

  const { data: enrollment } = await sanityFetch({
    query: ENROLLMENT_BY_STUDENT_AND_COURSE_QUERY,
    params: { studentId: userId, courseId },
  });

  if (!enrollment || !enrollment.expiresAt) return false;

  const isExpired = new Date(enrollment.expiresAt) < new Date();
  return !isExpired;
}
