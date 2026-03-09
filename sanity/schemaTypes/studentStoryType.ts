import { PlayIcon, StarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const studentStoryType = defineType({
    name: "studentStory",
    title: "Student Stories",
    type: "document",
    icon: StarIcon,
    groups: [
        { name: "story", title: "Story", default: true },
        { name: "video", title: "Video", icon: PlayIcon },
    ],
    fields: [
        defineField({
            name: "studentName",
            title: "Student Name",
            type: "string",
            group: "story",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "courseTitle",
            title: "Course Title",
            type: "string",
            group: "story",
            description: "The course this student received sponsorship for",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "quote",
            title: "Student Quote",
            type: "text",
            group: "story",
            description: "A short, inspiring quote from the student to display on the page",
            validation: (Rule) => Rule.required().max(300),
        }),
        defineField({
            name: "avatar",
            title: "Student Photo",
            type: "image",
            group: "story",
            description: "Optional profile photo of the student",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            title: "Story Video",
            name: "video",
            type: "mux.video",
            group: "video",
            description: "Upload the selected student's video pitch via Mux",
        }),
        defineField({
            name: "featured",
            title: "Featured on Student Stories Page",
            type: "boolean",
            group: "story",
            initialValue: true,
            description: "Toggle to show or hide this story on the public page",
        }),
        defineField({
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
            group: "story",
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            name: "studentName",
            course: "courseTitle",
            featured: "featured",
            media: "avatar",
        },
        prepare({ name, course, featured, media }) {
            return {
                title: `${featured ? "⭐ " : ""}${name || "Unnamed Student"}`,
                subtitle: course || "No course",
                media,
            };
        },
    },
    orderings: [
        {
            title: "Published (Newest First)",
            name: "publishedAtDesc",
            by: [{ field: "publishedAt", direction: "desc" }],
        },
    ],
});
