/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "@/components/mcq/Header";
import Footer from "@/components/mcq/Footer";

function generateCaptchaText(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  return Array.from(
    { length: 6 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
}

function drawCaptcha(canvas: HTMLCanvasElement, text: string) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const W = canvas.width, H = canvas.height;
  ctx.fillStyle = "#f0f4f8";
  ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = `rgba(${Math.random() * 150},${Math.random() * 150},${Math.random() * 200},0.3)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(Math.random() * W, Math.random() * H);
    ctx.lineTo(Math.random() * W, Math.random() * H);
    ctx.stroke();
  }
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = `rgba(${Math.random() * 180},${Math.random() * 180},${Math.random() * 220},0.4)`;
    ctx.beginPath();
    ctx.arc(Math.random() * W, Math.random() * H, 1, 0, Math.PI * 2);
    ctx.fill();
  }
  const colors = ["#0d2645", "#1a56a0", "#b45309", "#166534", "#1d4ed8", "#b91c1c"];
  const charW = W / (text.length + 1);
  text.split("").forEach((char, i) => {
    ctx.save();
    ctx.translate(charW * (i + 0.9), H / 2 + 6);
    ctx.rotate((Math.random() - 0.5) * 0.45);
    ctx.font = `bold ${19 + Math.random() * 5}px 'Courier New', monospace`;
    ctx.fillStyle = colors[i % colors.length];
    ctx.fillText(char, 0, 0);
    ctx.restore();
  });
}

interface CaptchaProps {
  onVerify: (v: boolean) => void;
  resetKey: number;
}

function CaptchaWidget({ onVerify, resetKey }: CaptchaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const captchaTextRef = useRef<string>("");
  const [inputVal, setInputVal] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const drawOnCanvas = useCallback((text: string) => {
    if (canvasRef.current) drawCaptcha(canvasRef.current, text);
  }, []);

  const regenerate = useCallback(() => {
    const t = generateCaptchaText();
    captchaTextRef.current = t;
    setInputVal("");
    setStatus("idle");
    onVerify(false);
    requestAnimationFrame(() => drawOnCanvas(t));
  }, [onVerify, drawOnCanvas]);

  useEffect(() => { regenerate(); }, [resetKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => {
      if (captchaTextRef.current) drawCaptcha(canvas, captchaTextRef.current);
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputVal(val);
    if (val.length === captchaTextRef.current.length) {
      const ok = val === captchaTextRef.current;
      setStatus(ok ? "success" : "error");
      onVerify(ok);
    } else {
      setStatus("idle");
      onVerify(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
        Security Verification
      </label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={handleChange}
          maxLength={6}
          autoComplete="off"
          spellCheck={false}
          placeholder="Enter characters"
          className={`flex-1 min-w-0 border px-3 py-2 text-sm outline-none font-mono tracking-widest transition-all
            ${status === "success" ? "border-green-500 bg-green-50" : status === "error" ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"}
            focus:border-[#003580] focus:ring-2 focus:ring-[#003580]/10`}
        />
        <canvas
          ref={canvasRef}
          width={150}
          height={38}
          aria-label="CAPTCHA verification"
          className="border border-gray-300 bg-[#f0f4f8] shrink-0 select-none"
        />
        <button
          type="button"
          onClick={regenerate}
          aria-label="Refresh CAPTCHA"
          className="w-9 h-9 shrink-0 flex items-center justify-center border border-gray-300 bg-white text-gray-500 hover:bg-[#003580] hover:text-white hover:border-[#003580] transition-all"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
            <path d="M1 4v6h6" /><path d="M23 20v-6h-6" />
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
          </svg>
        </button>
        {status === "success" && (
          <span className="text-[10px] font-bold text-green-700 bg-green-100 border border-green-300 px-1.5 py-0.5 shrink-0 whitespace-nowrap">
            ✓ OK
          </span>
        )}
        {status === "error" && (
          <span className="text-[10px] font-bold text-red-700 bg-red-100 border border-red-300 px-1.5 py-0.5 shrink-0 whitespace-nowrap">
            ✗ Wrong
          </span>
        )}
      </div>
      {status === "error" && (
        <p className="text-[10px] text-red-500 mt-1">
          Incorrect.{" "}
          <button type="button" onClick={regenerate} className="text-[#003580] underline font-semibold">
            Refresh
          </button>{" "}
          and try again.
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaResetKey, setCaptchaResetKey] = useState(0);
  const router = useRouter();
  const [loadingPage, setLoadingPage] = useState(true);

  const resetCaptcha = () => setCaptchaResetKey((k) => k + 1);

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = Cookies.get("session_token");
        const userRole = Cookies.get("userRole");
        if (token && userRole) {
          if (userRole === "admin") { router.replace("/examination/admin"); return; }
          if (userRole === "user") { router.replace("/examination/instructions"); return; }
        }
      } catch {
        setError("Failed to load application details. Please try again later.");
      } finally {
        setLoadingPage(false);
      }
    };
    initialize();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !password) { setError("Roll No and password are required."); return; }
    if (!captchaVerified) { setError("Please complete the CAPTCHA verification."); return; }
    setLoading(true);
    try {
      const res = await axios.post("/examination/api/auth/login", { username, password });
      if (res.status === 200) {
        const { role, ...userData } = res.data;
        Cookies.set("session_token", "mock-token", { path: "/", secure: false, sameSite: "lax" });
        Cookies.set("userRole", role, { path: "/", secure: false, sameSite: "lax" });
        if (role === "admin") {
          router.replace("/examination/admin");
        } else if (role === "user") {
          sessionStorage.setItem("user", JSON.stringify(userData));
          router.replace("/examination/instructions");
        } else {
          setError("Invalid user role received. Please contact support.");
        }
      } else {
        setError(`Login failed with status: ${res.status}. Please try again.`);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false);
      resetCaptcha();
      if (err.response) setError(err.response.data?.message || `Login failed: ${err.response.statusText}`);
      else if (err.request) setError("Network error. Could not connect to the server.");
      else setError("An unexpected error occurred. Please try again.");
    }
  };

  if (loadingPage) {
    return (
      <div className="min-h-screen bg-[#eef2f7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#003580] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#003580] font-semibold text-sm tracking-wide">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eef2f7] flex flex-col overflow-x-hidden">
      <Header />

      {/* Title bar */}
      <div className="bg-[#003580] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <h1 className="text-sm font-bold uppercase tracking-widest">Candidate Login</h1>
          <span className="text-xs text-blue-200 bg-white/10 px-3 py-1">Secure Portal</span>
        </div>
      </div>
      <div className="h-1 bg-[#f4a900]" />

      <main className="flex-1 flex items-center justify-center py-10 px-4">
        <form onSubmit={handleLogin} noValidate className="bg-white border border-gray-200 shadow-lg w-full max-w-md">

          {/* Card header */}
          <div className="bg-[#003580] px-6 py-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-white/30 overflow-hidden bg-white shrink-0 flex items-center justify-center">
              <img src="/indian-railway.png" alt="Indian Railways Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="text-white font-bold text-base uppercase tracking-wide leading-tight">
                Indian Railways
              </p>
              <p className="text-blue-200 text-[11px] uppercase tracking-widest mt-0.5">
                Ministry of Railways · Govt. of India
              </p>
            </div>
          </div>

          {/* Amber strip */}
          <div className="h-1 bg-[#f4a900]" />

          <div className="px-6 py-6">
            <p className="text-center text-xs text-gray-500 uppercase tracking-widest mb-5 font-semibold">
              Online Examination System
            </p>

            {/* Roll No */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                Roll No.
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your roll number"
                autoComplete="username"
                required
                className="w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-800 outline-none bg-white transition-all focus:border-[#003580] focus:ring-2 focus:ring-[#003580]/10 placeholder:text-gray-400"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full border border-gray-300 px-3 py-2.5 pr-10 text-sm text-gray-800 outline-none bg-white transition-all focus:border-[#003580] focus:ring-2 focus:ring-[#003580]/10 placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#003580] transition-colors"
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* CAPTCHA */}
            <CaptchaWidget onVerify={setCaptchaVerified} resetKey={captchaResetKey} />

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 border-l-4 border-l-red-600 text-red-700 text-xs px-3 py-2.5 mb-4">
                <svg className="shrink-0 mt-0.5" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#003580] hover:bg-[#002560] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold uppercase tracking-widest text-sm px-6 py-3 transition-all"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                  Authenticating…
                </>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  Login to Portal
                </>
              )}
            </button>

            <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest mt-4">
              For authorized personnel only · Govt. of India
            </p>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}