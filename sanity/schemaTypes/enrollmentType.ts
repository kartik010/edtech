import { defineField, defineType } from "sanity";

export const enrollmentType = defineType({
  name: "enrollment",
  title: "Enrollment",
  type: "document",
  fields: [
    defineField({
      name: "studentId",
      title: "Student ID",
      type: "string",
      description: "Clerk User ID of the student",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "course",
      title: "Course",
      type: "reference",
      to: [{ type: "course" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "amount",
      title: "Amount",
      type: "number",
      description: "Amount paid for the course",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "paymentId",
      title: "Payment ID",
      type: "string",
      description: "Razorpay Payment ID for this enrollment",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "expiresAt",
      title: "Expires At",
      type: "datetime",
      description:
        "When the course access expires (typically 1 year from purchase)",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      studentId: "studentId",
      courseTitle: "course.title",
      date: "createdAt",
    },
    prepare({ studentId, courseTitle, date }) {
      return {
        title: `${studentId} - ${courseTitle || "Unknown Course"}`,
        subtitle: date ? new Date(date).toLocaleDateString() : "",
      };
    },
  },
});
