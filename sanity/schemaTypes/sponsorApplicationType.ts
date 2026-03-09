import { HeartIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const sponsorApplicationType = defineType({
    name: "sponsorApplication",
    title: "Sponsor Applications",
    type: "document",
    icon: HeartIcon,
    fields: [
        defineField({
            name: "studentName",
            title: "Student Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: "courseId",
            title: "Course ID",
            type: "string",
            description: "Sanity course document ID",
        }),
        defineField({
            name: "courseTitle",
            title: "Course Title",
            type: "string",
            description: "Name of the course the student is applying for",
        }),
        defineField({
            name: "message",
            title: "Personal Statement",
            type: "text",
            description: "Why the student needs the sponsorship",
            validation: (Rule) => Rule.required().min(50).max(1000),
        }),
        defineField({
            name: "videoUrl",
            title: "Video URL",
            type: "url",
            description: "Link to a YouTube or Google Drive video of the student's pitch",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "status",
            title: "Application Status",
            type: "string",
            options: {
                list: [
                    { title: "Pending Review", value: "pending" },
                    { title: "Accepted", value: "accepted" },
                    { title: "Rejected", value: "rejected" },
                ],
                layout: "radio",
            },
            initialValue: "pending",
        }),
        defineField({
            name: "submittedAt",
            title: "Submitted At",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
            readOnly: true,
        }),
    ],
    preview: {
        select: {
            name: "studentName",
            course: "courseTitle",
            status: "status",
        },
        prepare({ name, course, status }) {
            const emoji = status === "accepted" ? "✅" : status === "rejected" ? "❌" : "⏳";
            return {
                title: `${emoji} ${name || "Unknown"}`,
                subtitle: course || "No course selected",
            };
        },
    },
    orderings: [
        {
            title: "Submitted (Newest First)",
            name: "submittedAtDesc",
            by: [{ field: "submittedAt", direction: "desc" }],
        },
    ],
});
