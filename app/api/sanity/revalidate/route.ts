import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // In a real app we'd verify the sanity webhook signature here
        // using @sanity/webhook parser, but for now we'll accept the ping

        const type = body?._type;
        console.log(`[Sanity Webhook] Revalidating on change to: ${type}`);

        if (type === "course" || type === "lesson" || type === "module" || type === "category") {
            // Revalidate individual caches
            revalidatePath("/");
            revalidatePath("/dashboard");
            revalidatePath("/dashboard/courses");
            revalidatePath("/pricing");

            // Also tag based since queries might use tags
            revalidateTag(String(type));

            return NextResponse.json({ revalidated: true, now: Date.now() });
        }

        return NextResponse.json({ revalidated: false, message: "No relevant type changed" });
    } catch (err: any) {
        console.error("Webhook error:", err.message);
        return new Response(`Webhook error: ${err.message}`, { status: 400 });
    }
}
