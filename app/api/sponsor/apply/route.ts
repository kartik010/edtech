import { type NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/client";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { studentName, email, courseId, courseTitle, message, videoUrl } = body;

        // Basic validation
        if (!studentName || !email || !message || !videoUrl) {
            return NextResponse.json(
                { error: "Name, email, message and video URL are required." },
                { status: 400 }
            );
        }

        // Create the sponsor application document in Sanity
        await writeClient.create({
            _type: "sponsorApplication",
            studentName,
            email,
            courseId: courseId ?? null,
            courseTitle: courseTitle ?? null,
            message,
            videoUrl,
            status: "pending",
            submittedAt: new Date().toISOString(),
        });

        return NextResponse.json({ success: true });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("[Sponsor Apply] Error:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
