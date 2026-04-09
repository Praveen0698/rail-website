/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "@/components/mcq/Header";
import Footer from "@/components/mcq/Footer";

// ─── CAPTCHA ──────────────────────────────────────────────────────────────────

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
  const W = canvas.width,
    H = canvas.height;
  ctx.fillStyle = "#f8faff";
  ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = `rgba(100,120,180,0.2)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(Math.random() * W, Math.random() * H);
    ctx.lineTo(Math.random() * W, Math.random() * H);
    ctx.stroke();
  }
  for (let i = 0; i < 25; i++) {
    ctx.fillStyle = `rgba(80,100,160,0.25)`;
    ctx.beginPath();
    ctx.arc(Math.random() * W, Math.random() * H, 1, 0, Math.PI * 2);
    ctx.fill();
  }
  const colors = [
    "#1e40af",
    "#b45309",
    "#166534",
    "#7c3aed",
    "#b91c1c",
    "#0e7490",
  ];
  const charW = W / (text.length + 1);
  text.split("").forEach((char, i) => {
    ctx.save();
    ctx.translate(charW * (i + 0.9), H / 2 + 6);
    ctx.rotate((Math.random() - 0.5) * 0.4);
    ctx.font = `bold ${18 + Math.random() * 5}px 'Courier New', monospace`;
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

  useEffect(() => {
    regenerate();
  }, [resetKey]); // eslint-disable-line react-hooks/exhaustive-deps

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
    <div>
      <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
        Security Code
      </label>
      <div className="flex items-center gap-2">
        <canvas
          ref={canvasRef}
          width={148}
          height={40}
          aria-label="CAPTCHA"
          className="border border-slate-200 rounded-lg bg-[#f8faff] shrink-0 select-none"
        />
        <button
          type="button"
          onClick={regenerate}
          aria-label="Refresh CAPTCHA"
          title="Refresh"
          className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:border-[#003580] hover:text-[#003580] transition-all"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="14"
            height="14"
          >
            <path d="M1 4v6h6" />
            <path d="M23 20v-6h-6" />
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
          </svg>
        </button>
        <input
          type="text"
          value={inputVal}
          onChange={handleChange}
          maxLength={6}
          autoComplete="off"
          spellCheck={false}
          placeholder="Type here"
          className={`flex-1 min-w-0 h-9 rounded-lg border px-3 text-sm outline-none font-mono tracking-widest transition-all
            ${
              status === "success"
                ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                : status === "error"
                  ? "border-red-400 bg-red-50 text-red-800"
                  : "border-slate-200 bg-white text-slate-800"
            }
            focus:border-[#003580] focus:ring-2 focus:ring-[#003580]/10`}
        />
        {status === "success" && (
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 rounded px-1.5 py-0.5 shrink-0">
            ✓
          </span>
        )}
        {status === "error" && (
          <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-300 rounded px-1.5 py-0.5 shrink-0">
            ✗
          </span>
        )}
      </div>
      {status === "error" && (
        <p className="text-[11px] text-red-500 mt-1.5">
          Incorrect.{" "}
          <button
            type="button"
            onClick={regenerate}
            className="underline font-semibold text-[#003580]"
          >
            Try a new code
          </button>
        </p>
      )}
    </div>
  );
}

// ─── FIELD ────────────────────────────────────────────────────────────────────

function Field({
  id,
  label,
  required,
  hint,
  children,
}: {
  id?: string;
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-wider text-slate-500"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-slate-400">{hint}</p>}
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [rollNo, setRollNo] = useState("");
  const [dob, setDob] = useState("");
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
        const token = Cookies.get("apar_session_token");
        const userRole = Cookies.get("apar_userRole");

        if (token && userRole) {
          if (userRole === "admin") {
            router.replace("/apar/admin/dashboard");
            return;
          }

          if (userRole === "student") {
            router.replace("/apar/application/form");
            return;
          }
        }
      } catch {
        setError("Failed to load. Please try again.");
      } finally {
        setLoadingPage(false);
      }
    };

    initialize();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!rollNo.trim()) {
      setError("Roll Number is required.");
      return;
    }

    if (!dob && rollNo !== process.env.NEXT_PUBLIC_ADMIN_ROLL_NO) {
      setError("Date of Birth is required.");
      return;
    }

    if (!captchaVerified) {
      setError("Please complete the security verification.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.get(`/apar/api/students/${rollNo.trim()}`);

      if (res.status === 200) {
        const { role, student } = res.data.data;

        if (role === "admin") {
          Cookies.set("apar_session_token", "admin-token");
          Cookies.set("apar_userRole", "admin");

          router.replace("/apar/admin/dashboard");
          return;
        }

        if (!student) {
          setError("Invalid response from server.");
          setLoading(false);
          return;
        }

        const backendDob = new Date(student.dob).toISOString().split("T")[0];

        if (backendDob !== dob) {
          setError(
            "Invalid Roll Number or Date of Birth. Please check and try again.",
          );
          resetCaptcha();
          setLoading(false);
          return;
        }

        Cookies.set("apar_session_token", "student-token");
        Cookies.set("apar_userRole", "student");

        sessionStorage.setItem("user", JSON.stringify(student));

        router.replace("/apar/application/form");

        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
      resetCaptcha();

      if (err.response?.status === 404) {
        setError("Roll Number not found. Please verify and try again.");
      } else if (err.response) {
        setError(
          err.response.data?.message || `Error: ${err.response.statusText}`,
        );
      } else if (err.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  if (loadingPage) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-[3px] border-[#003580]/20 border-t-[#003580] rounded-full animate-spin" />
          <p className="text-sm text-slate-500">Loading portal…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      {/* Thin amber accent under header */}
      <div className="h-0.5 bg-[#f4a900]" />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-105">
          {/* Logo + org name */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
              <img
                src="/indian-railway.png"
                alt="Indian Railways"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#003580] uppercase tracking-widest leading-none">
                Railway Recruitment Cell
              </p>
              <p className="text-[10px] text-slate-400 tracking-wide mt-0.5">
                Indian Railway · Form Fill-Up Portal
              </p>
            </div>
          </div>

          {/* Login card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="h-1 bg-[#003580]" />

            <div className="px-7 pt-6 pb-7">
              <h1 className="text-xl font-bold text-slate-800 tracking-tight mb-1">
                Candidate Login
              </h1>
              <p className="text-sm text-slate-400 mb-6">
                Sign in with your roll number and date of birth.
              </p>

              <form
                onSubmit={handleLogin}
                noValidate
                className="flex flex-col gap-5"
              >
                <Field id="rollNo" label="User Id" required>
                  <input
                    id="rollNo"
                    type="text"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="e.g. 21000012345678"
                    autoComplete="off"
                    required
                    className="h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-800 bg-white outline-none transition-all placeholder:text-slate-300 focus:border-[#003580] focus:ring-2 focus:ring-[#003580]/10"
                  />
                </Field>

                <Field
                  id="dob"
                  label="Password"
                  required
                  hint="As per your registration records"
                >
                  <input
                    id="dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    className="h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-800 bg-white outline-none transition-all focus:border-[#003580] focus:ring-2 focus:ring-[#003580]/10"
                  />
                </Field>

                <CaptchaWidget
                  onVerify={setCaptchaVerified}
                  resetKey={captchaResetKey}
                />

                <div className="border-t border-slate-100 -mx-1" />

                {error && (
                  <div className="flex items-start gap-2.5 rounded-lg bg-red-50 border border-red-100 px-3.5 py-3">
                    <svg
                      className="shrink-0 mt-0.5 text-red-500"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span className="text-xs text-red-700 leading-relaxed">
                      {error}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="h-11 w-full flex items-center justify-center gap-2 rounded-lg bg-[#003580] hover:bg-[#002560] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold tracking-wide transition-all"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                      Verifying…
                    </>
                  ) : (
                    <>
                      Proceed to Application
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <p className="text-center text-[10px] text-slate-300 uppercase tracking-widest mt-5">
            Authorised candidates only · Govt. of India
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
