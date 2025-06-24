"use client"

import React from "react";
import useLogin from "@/zustand/use-login";

const AuthPage: React.FC = () => {

  const {
  loadingLogin,
  errorLogin,
  username,
  password,
  setUsername,
  setPassword,
  login
  } = useLogin();

  const handleLogin = async () => {
    await login();
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Section */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#0D0D0D",
          color: "#FFF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>
          ⌘ Omnichannel Pusdalops BNPB
        </div>
        <blockquote style={{ fontStyle: "italic", fontSize: "16px" }}>
          “This library has saved me countless hours of work and helped me deliver
          stunning designs to my clients faster than ever before.”
          <br />
          <strong>Sofia Davis</strong>
        </blockquote>
      </div>

      {/* Right Section */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: "320px", width: "100%", textAlign: "center" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Welcome!</h2>
          <p style={{ fontSize: "14px", marginBottom: "20px" }}>
            Please enter your credential to login
          </p>

          <input
            type="text"
            placeholder="name@example.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#202020",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "14px",
              cursor: "pointer",
              marginBottom: "10px",
              // "&:hover": {
              //   backgroundColor: "#333",
              // },
            }}
          >
            Login
          </button>

          {loadingLogin && (
            <div>
              <p>Loading...</p>
            </div>
          )}
          {errorLogin && (
            <div>
              <p>ErrorLogin</p>
            </div>
          )}

          {/* <div style={{ margin: "10px 0", fontSize: "12px", color: "#777" }}>OR CONTINUE WITH</div>

          <button
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#FFF",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <span>⚫</span> GitHub
          </button> */}

          <p style={{ fontSize: "12px", marginTop: "15px", color: "#777" }}>
            By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
