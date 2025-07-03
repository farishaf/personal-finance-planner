"use client";

import React, { useEffect, useRef, useState } from "react";
import useLogin from "@/zustand/use-login";
import { colors } from "@/utils/color";
// import Typography from "@/components/Typography/Typography";
import { useRouter } from "next/navigation";
import LandingSideSection from "@/components/landing-side-section";
import gsap from "gsap";

const AuthPage: React.FC = () => {
  const {
    loadingLogin,
    errorLogin,
    email,
    password,
    setEmail,
    setPassword,
    requestLogin,
  } = useLogin();

  const router = useRouter();

  const rightSectionRef = React.useRef<HTMLDivElement>(null);

  const [currentFace, setCurrentFace] = useState(0); // 0, 1, 2
  const leftCardRef = useRef<HTMLDivElement>(null);

  const flipToNext = () => {
    const nextFace = (currentFace + 1) % faces.length;

    const tl = gsap.timeline();

    // First, tilt the card slightly to start the page turn
    tl.to(leftCardRef.current, {
      transformOrigin: "left center",
      duration: 0.3,
      ease: "power2.out",
    })
      // Add a second timeline for the return rotation
  tl.to(leftCardRef.current, {
    rotateY: -270, // Continue rotating past 180 to 270 degrees
    transformOrigin: "left center",
    duration: 0.4,
    ease: "power2.in"
  })
  .to(leftCardRef.current, {
    rotateY: -360, // Complete full rotation back to 0
    transformOrigin: "left center",
    duration: 0.5,
    ease: "power2.out",
    onComplete: () => {
      // Reset to 0 to avoid potential rendering issues
      gsap.set(leftCardRef.current, { rotateY: 0 });
    }
  });

    // Switch content halfway through the rotation
    tl.call(
      () => {
        setCurrentFace(nextFace);
      },
      null,
      ">-=0.3"
    ); // Adjust timing to match when the "page" would be fully turned
  };
  useEffect(() => {
    // gsap.from([leftSectionRef.current, rightSectionRef.current], {
    //   duration: 0.8,
    //   x: "100%",
    //   opacity: 0,
    //   ease: "power3.out",
    //   stagger: 0.1,
    // });

    // Check for existing token
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await requestLogin();
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const faces = [
    <LandingSideSection key="1" title="Face 1" />,
    <LandingSideSection key="2" title="Face 2" />,
    <LandingSideSection key="3" title="Face 3" />,
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Left Section */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          backgroundColor: "#111827",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: "1200px", // Add perspective to the container
        }}
      >
        <div
          ref={leftCardRef}
          style={{
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            position: "relative",
            backfaceVisibility: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              color: "#fff",
              padding: "40px",
              boxSizing: "border-box",
            }}
          >
            {faces[currentFace]}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div
        ref={rightSectionRef}
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "40px",
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            maxWidth: "360px",
            width: "100%",
            textAlign: "left",
          }}
        >
          <div style={{ marginBottom: "32px" }}>
            <button
              onClick={flipToNext}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                background: "#0f172a",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Flip Left Section
            </button>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "600",
                marginBottom: "8px",
                color: "#0f172a",
              }}
            >
              Welcome back
            </h2>
            <p
              style={{
                fontSize: "15px",
                color: "#64748b",
                lineHeight: "1.5",
              }}
            >
              Sign in to access your financial dashboard and continue managing
              your money.
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "16px" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "8px",
                  color: "#334155",
                }}
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "15px",
                  boxSizing: "border-box",
                  transition: "all 0.2s",
                  backgroundColor: colors.light.fade,
                  outline: "none",
                }}
                required
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <label
                  htmlFor="password"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#334155",
                  }}
                >
                  Password
                </label>
                <a
                  href="#"
                  style={{
                    fontSize: "13px",
                    color: colors.dark.secondary,
                    textDecoration: "none",
                    fontWeight: "500",
                    transition: "all 0.2s",
                  }}
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "15px",
                  boxSizing: "border-box",
                  transition: "all 0.2s",
                  backgroundColor: colors.light.fade,
                  outline: "none",
                }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loadingLogin}
              style={{
                width: "100%",
                padding: "12px 16px",
                backgroundColor: loadingLogin
                  ? colors.dark.secondary
                  : colors.dark.primary,
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: "500",
                cursor: "pointer",
                marginBottom: "16px",
                transition: "all 0.2s",
                opacity: loadingLogin ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {loadingLogin ? (
                <>
                  <span
                    style={{
                      display: "inline-block",
                      width: "16px",
                      height: "16px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "white",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>

            {errorLogin && (
              <div
                style={{
                  padding: "12px",
                  backgroundColor: "#fee2e2",
                  color: "#b91c1c",
                  borderRadius: "8px",
                  fontSize: "14px",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>Invalid credentials. Please try again.</span>
              </div>
            )}

            <p
              style={{
                fontSize: "14px",
                color: "#64748b",
                textAlign: "center",
                marginTop: "24px",
              }}
            >
              Don&apos;t have an account?{" "}
              <a
                href="/login/get-started"
                style={{
                  color: colors.dark.primary,
                  fontWeight: "500",
                  textDecoration: "none",
                }}
              >
                Get started
              </a>
            </p>
          </form>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AuthPage;
