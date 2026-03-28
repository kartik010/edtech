"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import type { DASHBOARD_COURSES_QUERYResult } from "@/sanity.types";
import { CourseCard } from "./CourseCard";

// Infer course type from Sanity query result
export type CourseListCourse = DASHBOARD_COURSES_QUERYResult[number];

interface CourseListProps {
  courses: CourseListCourse[];
  enrolledCourseIds?: string[];
  showFilters?: boolean;
  showSearch?: boolean;
  emptyMessage?: string;
}

export function CourseList({
  courses,
  enrolledCourseIds = [],
  showFilters = true,
  showSearch = true,
  emptyMessage = "No courses found",
}: CourseListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter courses based on search query
  const filteredCourses = courses.filter((course) => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const title = course.title?.toLowerCase() ?? "";
      const description = course.description?.toLowerCase() ?? "";
      if (!title.includes(query) && !description.includes(query)) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      {(showFilters || showSearch) && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {showSearch && (
            <div className="relative w-full sm:w-72">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[rgba(26,26,26,0.4)]" />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-[#e2e8f0] bg-white pl-10 text-[#1A1A1A] placeholder:text-[rgba(26,26,26,0.4)] focus-visible:ring-[#FF6B2C]/40"
              />
            </div>
          )}
        </div>
      )}

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course._id}
              slug={{ current: course.slug?.current || "" }}
              title={course.title}
              description={course.description}
              tier={course.tier}
              thumbnail={course.thumbnail}
              moduleCount={course.moduleCount}
              lessonCount={course.lessonCount}
              isLocked={!enrolledCourseIds.includes(course._id)}
              isEnrolled={enrolledCourseIds.includes(course._id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#e2e8f0] bg-[#F8F9FA]">
            <Search className="h-6 w-6 text-[rgba(26,26,26,0.35)]" />
          </div>
          <p className="text-[rgba(26,26,26,0.55)]">{emptyMessage}</p>
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
              }}
              className="mt-2 text-sm font-medium text-[#FF6B2C] transition-colors hover:text-[#e85a24]"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
