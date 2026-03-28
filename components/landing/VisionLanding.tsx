"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import {
  LandingStoryCard,
  type LandingStory,
} from "@/components/landing/LandingStoryCard";

export type LandingCourse = {
  _id: string;
  title: string;
  slug: string | null;
  description: string | null;
  thumbnailUrl: string | null;
  moduleCount: number | null;
  lessonCount: number | null;
};

type VisionLandingProps = {
  courses: LandingCourse[];
  stories: LandingStory[];
};

export function VisionLanding({ courses, stories }: VisionLandingProps) {
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);

  const storyAvatarUrls = stories
    .map((s) => s.avatarUrl)
    .filter(Boolean) as string[];
  const ctaAvatars = storyAvatarUrls.slice(0, 3);
  const extraAvatarCount =
    storyAvatarUrls.length > 3 ? storyAvatarUrls.length - 3 : 0;

  return (
    <div
      className="v1000-root"
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: "#1A1A1A",
        backgroundColor: "#FFFFFF",
      }}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

        .material-symbols-outlined {
          font-family: "Material Symbols Outlined";
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          font-feature-settings: "liga";
          -webkit-font-smoothing: antialiased;
        }

        @keyframes v1000-pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .v1000-animate-pulse {
          animation: v1000-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .v1000-hero-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 64px;
          align-items: center;
        }

        .v1000-courses-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: stretch;
          gap: 32px;
        }

        .v1000-courses-grid > a {
          flex: 0 1 320px;
          max-width: 380px;
          min-width: 260px;
        }

        .v1000-stories-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .v1000-cta-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 64px;
          align-items: center;
        }

        .v1000-cta-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .v1000-footer-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 48px;
        }

        .v1000-hero-h1 {
          font-size: clamp(2.75rem, 8vw, 96px);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.05em;
          font-family: "Outfit", sans-serif;
        }

        @media (max-width: 1024px) {
          .v1000-hero-grid,
          .v1000-stories-grid,
          .v1000-cta-grid,
          .v1000-footer-grid {
            grid-template-columns: 1fr;
          }

          .v1000-courses-grid {
            flex-direction: column;
            align-items: center;
          }

          .v1000-courses-grid > a {
            flex: none;
            width: 100%;
            max-width: 480px;
            min-width: 0;
          }

          .v1000-footer-brand {
            grid-column: auto;
          }
        }

        @media (max-width: 640px) {
          .v1000-hero-ctas {
            flex-direction: column;
          }
        }
      `}</style>

      <Header />

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: "96px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              'url("https://www.transparenttextures.com/patterns/cubes.png")',
            opacity: 0.03,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-96px",
            right: "-96px",
            width: "384px",
            height: "384px",
            backgroundColor: "rgba(255, 193, 7, 0.2)",
            filter: "blur(100px)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "-96px",
            width: "384px",
            height: "384px",
            backgroundColor: "rgba(255, 107, 44, 0.1)",
            filter: "blur(100px)",
            borderRadius: "50%",
          }}
        />

        <div
          className="v1000-hero-grid"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            position: "relative",
            zIndex: 10,
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(255, 107, 44, 0.05)",
                border: "1px solid rgba(255, 107, 44, 0.1)",
                padding: "8px 16px",
                borderRadius: "9999px",
                width: "fit-content",
              }}
            >
              <span
                className="v1000-animate-pulse"
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#FF6B2C",
                  borderRadius: "50%",
                }}
              />
              <span
                style={{
                  color: "#FF6B2C",
                  fontWeight: "700",
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                }}
              >
                Bridging the African Tech Gap
              </span>
            </div>

            <h1 className="v1000-hero-h1">
              Empowering <span style={{ color: "#FF6B2C" }}>1000</span> Digital
              Leaders.
            </h1>

            <p
              style={{
                fontSize: "20px",
                color: "rgba(26, 26, 26, 0.6)",
                lineHeight: "1.75",
                maxWidth: "512px",
                fontWeight: "500",
              }}
            >
              We are building a pipeline of world-class African talent.
              Intensive upskilling in high-demand tech disciplines for the
              global marketplace.
            </p>

            <div
              className="v1000-hero-ctas"
              style={{ display: "flex", gap: "20px", paddingTop: "16px", flexWrap: "wrap" }}
            >
              <Link
                href="/pricing"
                style={{
                  backgroundColor: "#FF6B2C",
                  color: "white",
                  padding: "16px 32px",
                  borderRadius: "12px",
                  fontWeight: "700",
                  fontSize: "18px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 15px -3px rgba(255, 107, 44, 0.2)",
                  transition: "all 0.3s",
                }}
              >
                Start learning
              </Link>
              <Link
                href="/sponsor"
                style={{
                  backgroundColor: "#FFC107",
                  color: "#1A1A1A",
                  padding: "16px 32px",
                  borderRadius: "12px",
                  fontWeight: "700",
                  fontSize: "18px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 15px -3px rgba(255, 193, 7, 0.1)",
                  transition: "all 0.3s",
                }}
              >
                Get sponsored
              </Link>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "48px",
                paddingTop: "32px",
                borderTop: "1px solid #f1f5f9",
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={{ fontSize: "30px", fontWeight: "700" }}>94%</div>
                <div
                  style={{
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "rgba(26, 26, 26, 0.4)",
                    fontWeight: "700",
                    marginTop: "4px",
                  }}
                >
                  Placement Rate
                </div>
              </div>
              <div>
                <div style={{ fontSize: "30px", fontWeight: "700" }}>12+</div>
                <div
                  style={{
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "rgba(26, 26, 26, 0.4)",
                    fontWeight: "700",
                    marginTop: "4px",
                  }}
                >
                  Countries
                </div>
              </div>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "relative",
                zIndex: 10,
                borderRadius: "32px",
                overflow: "hidden",
                boxShadow: "0 25px 50px -12px rgba(26, 26, 26, 0.1)",
                border: "8px solid white",
              }}
            >
              <img
                alt="Professional development"
                style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKkU1oYgRj4M_plApiIRuNNOJj4bR0ZiC5nPaOzBwsTTMYbkqPogybYV-LU-Hjdtj2FOqaltoJBZM1aySxDUofQZEJZsV474hyP4dRFjzmJVP7I-vujFE1Ooxi2TOa698s2h8ZEMgVnqV2O2bCYE3dgmfDpWkWOMV6v2gJJNAqfQCz4UKKCf25ysxK3iDijmW0ocSMJd2JNpKoop5GERf4Kd7oBVPDOiOa_qPS0-jWGg9Nozb8XkN1dG5epoJzDkrstJRHDL7LJiNF"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "32px",
                  left: "32px",
                  right: "32px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "32px",
                  padding: "24px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: "#FFC107",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span className="material-symbols-outlined">verified</span>
                  </div>
                  <div>
                    <h3
                      style={{
                        fontWeight: "700",
                        color: "white",
                        fontSize: "14px",
                        marginBottom: "2px",
                        margin: "0 0 2px 0",
                      }}
                    >
                      Next Cohort Starts
                    </h3>
                    <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.8)", margin: 0 }}>
                      March 2024 • 6 Months Intensive
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                top: "32px",
                right: "32px",
                width: "160px",
                height: "160px",
                background: "linear-gradient(135deg, #FF6B2C, #FFC107)",
                borderRadius: "50%",
                filter: "blur(60px)",
                opacity: 0.3,
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="courses"
        style={{ padding: "96px 24px", backgroundColor: "#F8F9FA" }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 56px)",
                fontWeight: "800",
                fontFamily: "'Outfit', sans-serif",
                lineHeight: "1.1",
              }}
            >
              Our <span style={{ color: "#FF6B2C" }}>Courses</span>
            </h2>
            <p
              style={{
                fontSize: "20px",
                color: "rgba(26, 26, 26, 0.6)",
                marginTop: "24px",
                maxWidth: "640px",
                margin: "24px auto 0",
              }}
            >
              Learn with structured modules and lessons. Open a course to start
              or continue your path.
            </p>
          </div>

          {courses.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "rgba(26, 26, 26, 0.5)",
                fontSize: "18px",
                padding: "48px 24px",
              }}
            >
              Courses are being published. Check back soon or browse the{" "}
              <Link href="/dashboard" style={{ color: "#FF6B2C", fontWeight: 700 }}>
                dashboard
              </Link>
              .
            </p>
          ) : (
            <div className="v1000-courses-grid">
              {courses.map((course) => {
                const href = course.slug
                  ? `/courses/${course.slug}`
                  : "/dashboard";
                return (
                  <Link
                    key={course._id}
                    href={href}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "block",
                      height: "100%",
                    }}
                  >
                    <article
                      style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "24px",
                        padding: "24px",
                        boxShadow: "0 4px 24px rgba(26, 26, 26, 0.06)",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        transition: "box-shadow 0.2s, border-color 0.2s",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          aspectRatio: "16/10",
                          borderRadius: "16px",
                          overflow: "hidden",
                          marginBottom: "18px",
                          backgroundColor: "#f1f5f9",
                        }}
                      >
                        {course.thumbnailUrl ? (
                          <Image
                            src={course.thumbnailUrl}
                            alt={course.title ?? "Course"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 320px"
                          />
                        ) : (
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span
                              className="material-symbols-outlined"
                              style={{
                                fontSize: "48px",
                                color: "rgba(255,107,44,0.35)",
                              }}
                            >
                              menu_book
                            </span>
                          </div>
                        )}
                      </div>
                      <h3
                        style={{
                          fontSize: "20px",
                          fontWeight: "700",
                          marginBottom: "8px",
                          fontFamily: "'Outfit', sans-serif",
                          lineHeight: "1.25",
                          color: "#1A1A1A",
                        }}
                      >
                        {course.title ?? "Course"}
                      </h3>
                      <p
                        style={{
                          fontSize: "15px",
                          color: "rgba(26, 26, 26, 0.62)",
                          marginBottom: "14px",
                          lineHeight: "1.55",
                          flex: 1,
                        }}
                      >
                        {course.description
                          ? course.description.length > 160
                            ? `${course.description.slice(0, 160).trim()}…`
                            : course.description
                          : `${course.moduleCount ?? 0} modules · ${course.lessonCount ?? 0} lessons`}
                      </p>
                      <span
                        style={{
                          color: "#FF6B2C",
                          fontWeight: "700",
                          fontSize: "14px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        View course
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: "18px" }}
                        >
                          arrow_forward
                        </span>
                      </span>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}

          {courses.length > 0 ? (
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Link
                href="/dashboard"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#1A1A1A",
                  fontWeight: 700,
                  fontSize: "15px",
                  textDecoration: "none",
                  padding: "14px 28px",
                  borderRadius: "9999px",
                  border: "2px solid rgba(26,26,26,0.12)",
                }}
              >
                Browse all in dashboard
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  dashboard
                </span>
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      {/* Success Stories Section */}
      <section
        id="testimonials"
        style={{ padding: "96px 24px", backgroundColor: "white" }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 56px)",
                fontWeight: "800",
                fontFamily: "'Outfit', sans-serif",
                marginBottom: "16px",
              }}
            >
              Student stories
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "rgba(26, 26, 26, 0.6)",
                maxWidth: "640px",
                margin: "0 auto",
              }}
            >
              Sponsored students selected through Get Sponsored — tap play to
              watch their Mux videos from Sanity.
            </p>
          </div>

          {stories.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px 24px",
                borderRadius: "24px",
                backgroundColor: "#F8F9FA",
                border: "1px solid #e2e8f0",
              }}
            >
              <p
                style={{
                  color: "rgba(26, 26, 26, 0.65)",
                  fontSize: "18px",
                  marginBottom: "20px",
                  maxWidth: "480px",
                  margin: "0 auto 20px",
                }}
              >
                No featured stories yet. Apply for sponsorship — once approved,
                your story can appear here.
              </p>
              <Link
                href="/sponsor"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#FF6B2C",
                  color: "white",
                  padding: "14px 28px",
                  borderRadius: "12px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Get sponsored
              </Link>
            </div>
          ) : (
            <div className="v1000-stories-grid">
              {stories.map((story) => (
                <LandingStoryCard
                  key={story._id}
                  story={story}
                  isActive={activeStoryId === story._id}
                  onSelect={() => setActiveStoryId(story._id)}
                  onDeselect={() => setActiveStoryId(null)}
                />
              ))}
            </div>
          )}

          {stories.length > 0 ? (
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Link
                href="/student-stories"
                style={{
                  color: "#FF6B2C",
                  fontWeight: 700,
                  fontSize: "15px",
                  textDecoration: "none",
                }}
              >
                View all student stories →
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "96px 24px",
          backgroundColor: "#1A1A1A",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              'url("https://www.transparenttextures.com/patterns/cubes.png")',
            opacity: 0.1,
            pointerEvents: "none",
          }}
        />
        <div
          className="v1000-cta-grid"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            position: "relative",
            zIndex: 10,
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <h2
              style={{
                fontSize: "clamp(2.25rem, 6vw, 72px)",
                fontWeight: "900",
                color: "white",
                lineHeight: "1.1",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              Ready to join the <span style={{ color: "#FFC107" }}>Vanguard?</span>
            </h2>
            <p style={{ fontSize: "20px", color: "rgba(255, 255, 255, 0.6)" }}>
              Need access? Explore pricing or apply for sponsorship. Every
              story starts with one step.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "24px",
                alignItems: "center",
              }}
            >
              <Link
                href="/sponsor"
                style={{
                  backgroundColor: "#FFC107",
                  color: "#1A1A1A",
                  padding: "20px 48px",
                  borderRadius: "12px",
                  fontWeight: "700",
                  fontSize: "18px",
                  textDecoration: "none",
                  boxShadow: "0 10px 15px -3px rgba(255, 193, 7, 0.1)",
                }}
              >
                Apply for sponsorship
              </Link>
              {ctaAvatars.length > 0 ? (
                <div style={{ display: "flex", marginLeft: "-16px" }}>
                  {ctaAvatars.map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src}
                      alt=""
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        border: "2px solid #1A1A1A",
                        marginLeft: i === 0 ? 0 : "-16px",
                        objectFit: "cover",
                      }}
                      src={src}
                    />
                  ))}
                  {extraAvatarCount > 0 ? (
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        backgroundColor: "#FFC107",
                        border: "2px solid #1A1A1A",
                        marginLeft: "-16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "10px",
                        fontWeight: "900",
                        color: "#1A1A1A",
                      }}
                    >
                      +{extraAvatarCount}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>

          <div className="v1000-cta-stats">
            {[
              { value: "100%", label: "Scholarship Available", color: "#FF6B2C" },
              { value: "6 Mos", label: "Intensive Program", color: "#FFC107" },
              { value: "Global", label: "Job Placement", color: "white" },
              { value: "1:1", label: "Mentorship Ratio", color: "#FF6B2C" },
            ].map((stat, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(12px)",
                  padding: "32px",
                  borderRadius: "24px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <div
                  style={{
                    fontSize: "36px",
                    fontWeight: "700",
                    color: stat.color,
                    marginBottom: "8px",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "rgba(255, 255, 255, 0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "80px 24px",
          backgroundColor: "white",
          borderTop: "1px solid #f1f5f9",
        }}
      >
        <div
          className="v1000-footer-grid"
          style={{ maxWidth: "1280px", margin: "0 auto" }}
        >
          <div className="v1000-footer-brand" style={{ gridColumn: "span 2" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#FF6B2C",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "700",
                  fontSize: "20px",
                }}
              >
                V
              </div>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "800",
                  letterSpacing: "-0.05em",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Vision <span style={{ color: "#FF6B2C" }}>1000</span>
              </span>
            </div>
            <p
              style={{
                color: "rgba(26, 26, 26, 0.5)",
                maxWidth: "384px",
                fontWeight: "500",
                lineHeight: "1.75",
              }}
            >
              Dedicated to transforming Africa through high-quality tech
              education and market-ready skill acquisition.
            </p>
          </div>

          <div>
            <h4
              style={{
                fontWeight: "900",
                marginBottom: "24px",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontSize: "14px",
              }}
            >
              Courses
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {(courses.length > 0
                ? courses.slice(0, 6)
                : []
              ).map((c) => (
                <li key={c._id}>
                  <Link
                    href={c.slug ? `/courses/${c.slug}` : "/dashboard"}
                    style={{
                      color: "rgba(26, 26, 26, 0.6)",
                      textDecoration: "none",
                      fontWeight: "500",
                    }}
                  >
                    {c.title ?? "Course"}
                  </Link>
                </li>
              ))}
              {courses.length === 0 ? (
                <li>
                  <Link
                    href="/dashboard"
                    style={{
                      color: "rgba(26, 26, 26, 0.6)",
                      textDecoration: "none",
                      fontWeight: "500",
                    }}
                  >
                    Browse dashboard
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>

          <div>
            <h4
              style={{
                fontWeight: "900",
                marginBottom: "24px",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontSize: "14px",
              }}
            >
              Learn
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {[
                { href: "/student-stories", label: "Student stories" },
                { href: "/sponsor", label: "Get sponsored" },
                { href: "/pricing", label: "Pricing" },
                { href: "/dashboard", label: "Dashboard" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{
                      color: "rgba(26, 26, 26, 0.6)",
                      textDecoration: "none",
                      fontWeight: "500",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            maxWidth: "1280px",
            margin: "80px auto 0",
            paddingTop: "32px",
            borderTop: "1px solid #fafafa",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              color: "rgba(26, 26, 26, 0.4)",
              fontWeight: "500",
            }}
          >
            © {new Date().getFullYear()} Vision 1000. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <Link
              href="/student-stories"
              style={{
                color: "rgba(26, 26, 26, 0.45)",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Stories
            </Link>
            <Link
              href="/pricing"
              style={{
                color: "rgba(26, 26, 26, 0.45)",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Pricing
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
