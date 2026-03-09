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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
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
          <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mb-4">
            <Search className="w-6 h-6 text-zinc-500" />
          </div>
          <p className="text-zinc-400">{emptyMessage}</p>
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
              }}
              className="mt-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
