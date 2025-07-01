"use client";

import LandingSideSection from "@/components/landing-side-section";
import Typography from "@/components/Typography/Typography";
import { Toaster } from "@/components/ui/sonner";
import { colors } from "@/utils/color";
import { useRegister } from "@/zustand/use-registration";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { toast } from "sonner";
// import gsap from "gsap";

const RegisterPage: React.FC = () => {
  const {
    loadingRegister,
    errorRegister,
    name,
    email,
    password,
    confirmPassword,
    registerSuccess,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    requestRegister,
  } = useRegister();

  const router = useRouter();
  const leftSectionRef = useRef<HTMLDivElement>(null);
  const rightSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // gsap.from([leftSectionRef.current, rightSectionRef.current], {
    //   duration: 0.8,
    //   x: "-100%",
    //   opacity: 0,
    //   ease: "power3.out",
    //   stagger: 0.1,
    // });

    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const disabledButton =
    loadingRegister ||
    !name ||
    !email ||
    !password ||
    !confirmPassword ||
    password.length < 8 ||
    password !== confirmPassword;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    await requestRegister();
  };

  const navigateToLogin = () => {
    // Animate out before navigating
    // gsap.to([leftSectionRef.current, rightSectionRef.current], {
    //   duration: 0.6,
    //   x: ["-100%", "100%"],
    //   opacity: 0,
    //   ease: "power3.in",
    //   onComplete: () => router.push("/login"),
    // });
    router.push("/login");
  };

  useEffect(() => {
    if (errorRegister) {
      toast.error(errorRegister);
      return;
    }
    if (registerSuccess) {
      toast("registration success", {
        description: "You can log into your account now.",
        action: {
          label: "login",
          onClick: navigateToLogin,
        },
        duration: 3000,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorRegister, registerSuccess]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />
      {/* Left Section */}
      <div
        ref={leftSectionRef}
        style={{
          flex: 1,
          backgroundColor: colors.dark.primary,
          color: colors.light.primary,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "40px",
        }}
      >
        <LandingSideSection />
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
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "600",
                marginBottom: "8px",
                color: colors.dark.primary,
              }}
            >
              Create an account
            </h2>
            <p
              style={{
                fontSize: "15px",
                color: colors.dark.secondary,
                lineHeight: "1.5",
              }}
            >
              Get started with your personal finance journey today.
            </p>
          </div>
          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: "16px" }}>
              <label
                htmlFor="full-name-register"
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "8px",
                  color: "#334155",
                }}
              >
                Full Name
              </label>
              <input
                id="full-name-register"
                type="text"
                placeholder="your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

            <div style={{ marginBottom: "16px" }}>
              <label
                htmlFor="email-register"
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "8px",
                  color: "#334155",
                }}
              >
                Email
              </label>
              <input
                id="email-register"
                type="email"
                placeholder="your-email@example.com"
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

            <div style={{ marginBottom: "16px" }}>
              <label
                htmlFor="password-register"
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "8px",
                  color: "#334155",
                }}
              >
                Password
              </label>
              <input
                id="password-register"
                type="password"
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
              {password.length < 8 && (
                <Typography type="caption-md" color="red">
                  minimum 8 character
                </Typography>
              )}
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                htmlFor="confirm-password-register"
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "8px",
                  color: "#334155",
                }}
              >
                Confirm Password
              </label>
              <input
                id="confirm-password-register"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                disabled={!password}
                required
              />
              {password !== confirmPassword && (
                <Typography type="caption-md" color="red">
                  password do not match
                </Typography>
              )}
            </div>

            <button
              type="submit"
              disabled={disabledButton}
              style={{
                width: "100%",
                padding: "12px 16px",
                backgroundColor: disabledButton
                  ? colors.dark.secondary
                  : colors.dark.primary,
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: "500",
                cursor: disabledButton ? "not-allowed" : "pointer",
                marginBottom: "16px",
                transition: "all 0.2s",
                opacity: loadingRegister ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {loadingRegister ? (
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
                  Creating account...
                </>
              ) : (
                "Sign up"
              )}
            </button>

            {/* {errorRegister && (
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
                <span>{errorRegister}</span>
              </div>
            )} */}

            <p
              style={{
                fontSize: "14px",
                color: "#64748b",
                textAlign: "center",
                marginTop: "24px",
              }}
            >
              Already have an account?{" "}
              <button
                type="button"
                onClick={navigateToLogin}
                style={{
                  color: colors.dark.primary,
                  fontWeight: "500",
                  textDecoration: "none",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Sign in
              </button>
            </p>
          </form>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;
