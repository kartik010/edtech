"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { Loader2, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TIER_STYLES, type Tier } from "@/lib/constants";

const TIER_GRADIENT_MUTED: Record<Tier, string> = {
  free: "from-emerald-500/15 to-teal-600/15",
  pro: "from-[#FF6B2C]/15 to-amber-500/15",
  ultra: "from-amber-400/15 to-orange-600/15",
};

const ctaClass =
  "border-0 bg-[#FF6B2C] text-white shadow-lg shadow-[#FF6B2C]/25 hover:bg-[#e85a24] px-8";

export function GatedFallback({
  courseId,
  courseTitle,
  requiredTier,
}: {
  courseId: string;
  courseTitle: string;
  requiredTier: Tier | null | undefined;
}) {
  const [isPending, setIsPending] = useState(false);
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const displayTier = requiredTier ?? "pro";
  const styles = TIER_STYLES[displayTier];
  const gradientMuted = TIER_GRADIENT_MUTED[displayTier];

  const handlePurchase = async () => {
    setIsPending(true);
    try {
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create order");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Acme EdTech",
        description: `Lifetime access to ${courseTitle}`,
        order_id: data.orderId,
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                courseId,
                studentId: user?.id,
                amount: data.amount,
              }),
            });
            if (verifyRes.ok) {
              router.refresh();
            } else {
              console.error("Payment verification failed on server");
            }
          } catch (err) {
            console.error(err);
          } finally {
            setIsPending(false);
          }
        },
        prefill: {
          name: user?.fullName || "Student",
          email: user?.primaryEmailAddress?.emailAddress,
        },
        theme: {
          color: "#FF6B2C",
        },
      };

      const paymentObject = new (
        window as unknown as {
          Razorpay: new (
            opts: unknown,
          ) => {
            open: () => void;
            on: (event: string, cb: (res: { error: unknown }) => void) => void;
          };
        }
      ).Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", (response: { error: unknown }) => {
        console.error("Payment failed", response.error);
        setIsPending(false);
      });
    } catch (e) {
      console.error(e);
      setIsPending(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div
        className={`relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white p-8 shadow-sm md:p-12`}
      >
        <div
          className={`pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-gradient-to-br ${gradientMuted} blur-[100px] opacity-60`}
        />

        <div className="relative z-10 mx-auto max-w-xl text-center">
          <div
            className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border bg-[rgba(255,107,44,0.1)] ${styles.border}`}
          >
            <Lock className={`h-7 w-7 ${styles.text}`} />
          </div>

          <h2 className="mb-4 text-2xl font-bold text-[#1A1A1A] md:text-3xl">
            Enroll in <span className={styles.text}>{courseTitle}</span> to
            unlock this content
          </h2>

          <p className="mx-auto mb-8 max-w-md text-[rgba(26,26,26,0.58)]">
            This module is part of the premium course curriculum. Secure your
            lifetime access today for just $59.
          </p>

          {!isLoaded ? (
            <Button size="lg" disabled className={ctaClass}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking access...
            </Button>
          ) : user ? (
            <Button
              size="lg"
              disabled={isPending}
              onClick={handlePurchase}
              className={ctaClass}
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              {isPending ? "Processing..." : "Purchase course — $59"}
            </Button>
          ) : (
            <SignInButton mode="modal">
              <Button size="lg" className={ctaClass}>
                <Lock className="mr-2 h-4 w-4" />
                Sign in to purchase
              </Button>
            </SignInButton>
          )}

          <p className="mt-5 text-sm text-[rgba(26,26,26,0.45)]">
            Can&apos;t afford it?{" "}
            <Link
              href={`/sponsor?courseId=${courseId}&courseTitle=${encodeURIComponent(courseTitle)}`}
              className="text-[#FF6B2C] underline underline-offset-4 transition-colors hover:text-[#e85a24]"
            >
              Apply for a sponsorship →
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
