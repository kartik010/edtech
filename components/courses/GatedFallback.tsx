"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { Loader2, Lock, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TIER_STYLES, type Tier } from "@/lib/constants";

// Muted gradient variants for background overlays
const TIER_GRADIENT_MUTED: Record<Tier, string> = {
  free: "from-emerald-500/20 to-teal-600/20",
  pro: "from-violet-500/20 to-fuchsia-600/20",
  ultra: "from-cyan-400/20 to-blue-600/20",
};

interface GatedFallbackProps {
  courseId: string;
  courseTitle: string;
  requiredTier: Tier | null | undefined;
}

export function GatedFallback({
  courseId,
  courseTitle,
  requiredTier,
}: GatedFallbackProps) {
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
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Ensure this is set in .env.local
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
            // Verify Payment
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
          color: "#8b5cf6",
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

      // Handle failed payment closing
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
        className={`relative rounded-2xl bg-gradient-to-br ${gradientMuted} border ${styles.border} p-8 md:p-12 overflow-hidden`}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[#09090b]/80" />
        <div
          className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${gradientMuted} rounded-full blur-[100px] opacity-50`}
        />

        <div className="relative z-10 max-w-xl mx-auto text-center">
          {/* Lock icon */}
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-800/50 border ${styles.border} mb-6`}
          >
            <Lock className={`w-7 h-7 ${styles.text}`} />
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Enroll in <span className={styles.text}>{courseTitle}</span> to
            unlock this content
          </h2>

          {/* Description */}
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">
            This module is part of the premium course curriculum. Secure your
            lifetime access today for just $59.
          </p>

          {/* CTA Button */}
          {!isLoaded ? (
            <Button
              size="lg"
              disabled
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 shadow-xl shadow-violet-600/30 px-8"
            >
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Checking access...
            </Button>
          ) : user ? (
            <Button
              size="lg"
              disabled={isPending}
              onClick={handlePurchase}
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 shadow-xl shadow-violet-600/30 px-8"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              {isPending ? "Processing..." : "Purchase Course  —  $59"}
            </Button>
          ) : (
            <SignInButton mode="modal">
              <Button
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 shadow-xl shadow-violet-600/30 px-8"
              >
                <Lock className="w-4 h-4 mr-2" />
                Sign in to Purchase
              </Button>
            </SignInButton>
          )}
        </div>
      </div>
    </>
  );
}
