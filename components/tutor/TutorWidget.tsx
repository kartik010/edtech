"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { MessageCircle, PanelRightClose, Sparkles } from "lucide-react";
import { TutorChat } from "./TutorChat";
import { TutorProvider, useTutor } from "./TutorContext";

function TutorUpsell() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="rounded-2xl border border-[#FF6B2C]/25 bg-[#FF6B2C]/5 px-6 py-8">
        <Sparkles className="mx-auto mb-4 h-10 w-10 text-[#FF6B2C]" />
        <h3 className="mb-2 text-lg font-semibold text-[#1A1A1A]">
          AI assistant is an Ultra feature
        </h3>
        <p className="mb-6 text-sm text-[rgba(26,26,26,0.65)]">
          Upgrade to Ultra to chat with the learning assistant and get
          personalized course guidance.
        </p>
        <Link
          href="/pricing"
          className="inline-flex rounded-full bg-[#FF6B2C] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#FF6B2C]/25 transition-opacity hover:opacity-90"
        >
          View Ultra pricing
        </Link>
      </div>
    </div>
  );
}

function TutorPanel({ isUltra }: { isUltra: boolean }) {
  const { isOpen, closeChat, toggleChat } = useTutor();

  return (
    <>
      <button
        type="button"
        aria-label="Close chat"
        className={`
          fixed inset-0 z-[100] cursor-default bg-black/40 backdrop-blur-sm
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}
        `}
        onClick={closeChat}
      />

      <div
        className={`
          fixed top-0 right-0 z-[110] h-full w-full
          transform transition-transform duration-300 ease-out sm:w-[640px] lg:w-[720px]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex h-full w-full flex-col border-l border-[#FF6B2C]/20 bg-gradient-to-b from-[#1a1a1a] via-[#1f1f1f] to-[#141414] shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between border-b border-[#FF6B2C]/20 bg-gradient-to-r from-[#FF6B2C]/10 via-[#FFC107]/10 to-[#FF6B2C]/10 px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B2C] to-[#e85a1f] shadow-lg shadow-[#FF6B2C]/30">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#1a1a1a] bg-[#FFC107]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Learning Assistant
                </h3>
                <p className="text-sm text-[#FFC107]/90">
                  {isUltra ? "Ultra • AI-powered" : "Sign in • Ultra unlocks chat"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={closeChat}
              className="rounded-xl p-2.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <PanelRightClose className="h-6 w-6" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden">
            {isUltra ? <TutorChat /> : <TutorUpsell />}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleChat}
        className={`
          group fixed right-6 bottom-6 z-[110] flex h-16 w-16 items-center justify-center
          rounded-full bg-gradient-to-br from-[#FF6B2C] to-[#e85a1f] shadow-lg
          shadow-[#FF6B2C]/35 transition-all duration-300 hover:shadow-xl
          hover:shadow-[#FF6B2C]/45
          ${isOpen ? "pointer-events-none scale-0 opacity-0" : "scale-100 opacity-100"}
        `}
        aria-label="Open AI tutor"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#FF6B2C] opacity-25" />
        <MessageCircle className="relative h-7 w-7 text-white transition-transform group-hover:scale-110" />
      </button>
    </>
  );
}

export function TutorWidget() {
  const { isLoaded, userId, has } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!userId) {
    return null;
  }

  const isUltra = Boolean(has?.({ plan: "ultra" }));

  return (
    <TutorProvider>
      <TutorPanel isUltra={isUltra} />
    </TutorProvider>
  );
}
