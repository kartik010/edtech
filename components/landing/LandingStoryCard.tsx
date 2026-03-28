"use client";

import Image from "next/image";
import { MuxVideoPlayer } from "@/components/lessons/MuxVideoPlayer";

export type LandingStory = {
  _id: string;
  studentName: string | null;
  courseTitle: string | null;
  quote: string | null;
  avatarUrl: string | null;
  playbackId: string | null;
};

type LandingStoryCardProps = {
  story: LandingStory;
  isActive: boolean;
  onSelect: () => void;
  onDeselect: () => void;
};

export function LandingStoryCard({
  story,
  isActive,
  onSelect,
  onDeselect,
}: LandingStoryCardProps) {
  const hasVideo = Boolean(story.playbackId);
  const posterUrl =
    story.avatarUrl ??
    (hasVideo && story.playbackId
      ? `https://image.mux.com/${story.playbackId}/thumbnail.jpg?time=1&width=960`
      : null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "24px",
          overflow: "hidden",
          aspectRatio: "16/9",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          border: "4px solid white",
          backgroundColor: "#F1F5F9",
        }}
      >
        {isActive && hasVideo ? (
          <div style={{ width: "100%", height: "100%" }}>
            <MuxVideoPlayer
              playbackId={story.playbackId}
              title={`${story.studentName ?? "Student"}'s story`}
              className="[&_mux-player]:min-h-[220px]"
              accentColor="#FF6B2C"
            />
            <button
              type="button"
              onClick={onDeselect}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                zIndex: 20,
                padding: "8px 14px",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                backgroundColor: "rgba(255,255,255,0.95)",
                color: "#1A1A1A",
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {posterUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- Mux thumbs may be unsigned; keep img for resilience
              <img
                alt=""
                src={posterUrl}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(26,26,26,0.25)",
                  fontWeight: 800,
                  fontSize: "48px",
                }}
              >
                {(story.studentName ?? "?")[0]?.toUpperCase() ?? "?"}
              </div>
            )}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(26, 26, 26, 0.2)",
                pointerEvents: "none",
              }}
            />
            {hasVideo ? (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  type="button"
                  onClick={onSelect}
                  aria-label={`Play ${story.studentName ?? "student"} video`}
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "#FF6B2C", fontSize: "36px" }}
                  >
                    play_arrow
                  </span>
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
      <div style={{ padding: "0 8px" }}>
        {story.quote ? (
          <p
            style={{
              color: "rgba(26, 26, 26, 0.8)",
              fontWeight: "500",
              fontStyle: "italic",
              marginBottom: "16px",
              lineHeight: "1.6",
            }}
          >
            &ldquo;{story.quote}&rdquo;
          </p>
        ) : null}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: "2px solid white",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              flexShrink: 0,
              backgroundColor: "#FFE0CC",
            }}
          >
            {story.avatarUrl ? (
              <Image
                src={story.avatarUrl}
                alt=""
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  color: "#FF6B2C",
                }}
              >
                {(story.studentName ?? "?")[0]?.toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <h4 style={{ fontWeight: "700", fontSize: "16px", margin: 0 }}>
              {story.studentName ?? "Student"}
            </h4>
            <p
              style={{
                fontSize: "12px",
                color: "#FF6B2C",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                margin: 0,
              }}
            >
              {story.courseTitle ?? "Sponsored student"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
