import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const type = body?._type;
        console.log(`[Sanity Webhook] Revalidating on change to: ${type}`);

        if (type === "course" || type === "lesson" || type === "module" || type === "category" || type === "studentStory") {
            revalidatePath("/");
            revalidatePath("/dashboard");
            revalidatePath("/dashboard/courses");
            revalidatePath("/pricing");
            revalidatePath("/student-stories");

            return NextResponse.json({ revalidated: true, now: Date.now() });
        }

        return NextResponse.json({ revalidated: false, message: "No relevant type changed" });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("Webhook error:", message);
        return new Response(`Webhook error: ${message}`, { status: 400 });
    }
}
