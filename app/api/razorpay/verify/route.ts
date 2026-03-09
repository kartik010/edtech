import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
      studentId,
      amount,
    } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      return NextResponse.json(
        { error: "Razorpay secret is not set" },
        { status: 500 },
      );
    }

    // Verify signature
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 },
      );
    }

    // Insert purchase record into Sanity
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 365); // 1 year access

    await writeClient.create({
      _type: "enrollment",
      studentId: studentId,
      course: {
        _type: "reference",
        _ref: courseId,
      },
      amount: amount / 100, // store in actual dollars/currency
      paymentId: razorpay_payment_id,
      createdAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
    });

    // Revalidate all pages to clear cached enrollment queries
    revalidatePath("/", "layout");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 },
    );
  }
}
