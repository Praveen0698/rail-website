"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "@/app/maq/components/Header";
import Footer from "@/app/maq/components/Footer";

// ─── CAPTCHA ──────────────────────────────────────────────────────────────────
function generateCaptchaText(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  return Array.from({ length: 6 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

function drawCaptcha(canvas: HTMLCanvasElement, text: string) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const W = canvas.width, H = canvas.height;

  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(0, 0, W, H);

  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = `rgba(${Math.random()*150},${Math.random()*150},${Math.random()*200},0.3)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(Math.random() * W, Math.random() * H);
    ctx.lineTo(Math.random() * W, Math.random() * H);
    ctx.stroke();
  }
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = `rgba(${Math.random()*180},${Math.random()*180},${Math.random()*220},0.4)`;
    ctx.beginPath();
    ctx.arc(Math.random() * W, Math.random() * H, 1, 0, Math.PI * 2);
    ctx.fill();
  }

  const colors = ["#0d2645","#1a56a0","#b45309","#166534","#1d4ed8","#b91c1c"];
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

interface CaptchaProps { onVerify: (v: boolean) => void; resetKey: number; }

function CaptchaWidget({ onVerify, resetKey }: CaptchaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Store the current captcha text in a ref so draw can always access latest
  const captchaTextRef = useRef<string>("");
  const [inputVal, setInputVal] = useState("");
  const [status, setStatus]     = useState<"idle"|"success"|"error">("idle");

  // Draw onto canvas whenever canvas is available and text is set
  const drawOnCanvas = useCallback((text: string) => {
    if (canvasRef.current) {
      drawCaptcha(canvasRef.current, text);
    }
  }, []);

  const regenerate = useCallback(() => {
    const t = generateCaptchaText();
    captchaTextRef.current = t;
    setInputVal("");
    setStatus("idle");
    onVerify(false);
    // Use requestAnimationFrame to ensure canvas is painted after React renders
    requestAnimationFrame(() => {
      drawOnCanvas(t);
    });
  }, [onVerify, drawOnCanvas]);

  // On mount and on resetKey change — generate new captcha
  useEffect(() => {
    regenerate();
  }, [resetKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fallback: if canvas mounts but is still blank, draw again
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => {
      if (captchaTextRef.current) {
        drawCaptcha(canvas, captchaTextRef.current);
      }
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

  const borderColor = status === "success" ? "#22c55e" : status === "error" ? "#ef4444" : "#cbd5e1";
  const bgColor     = status === "success" ? "#f0fdf4" : status === "error" ? "#fff5f5" : "#fff";

  return (
    <div className="fg">
      <label className="field-label">Security Verification</label>

      {/* Single row: Input | Canvas | Refresh */}
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>

        {/* Text input */}
        <input
          type="text"
          value={inputVal}
          onChange={handleChange}
          maxLength={6}
          autoComplete="off"
          spellCheck={false}
          placeholder="Enter characters"
          className="field-input"
          style={{
            flex: 1, minWidth: 0,
            fontFamily: "'Courier New', monospace",
            letterSpacing: "0.18em",
            borderColor,
            background: bgColor,
          }}
          onFocus={e => { e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.12)"; }}
          onBlur={e  => { e.currentTarget.style.boxShadow = "none"; }}
        />

        {/* CAPTCHA canvas */}
        <canvas
          ref={canvasRef}
          width={150}
          height={38}
          style={{
            border: "1px solid #cbd5e1",
            borderRadius: 5,
            flexShrink: 0,
            userSelect: "none",
            display: "block",
            background: "#f8fafc",
          }}
        />

        {/* Refresh button */}
        <button
          type="button"
          onClick={regenerate}
          aria-label="Refresh CAPTCHA"
          style={{
            display:"flex", alignItems:"center", justifyContent:"center",
            width:34, height:34, flexShrink:0, background:"#fff",
            border:"1px solid #cbd5e1", borderRadius:5, cursor:"pointer",
            color:"#64748b", transition:"all 0.15s",
          }}
          onMouseEnter={e => { const b = e.currentTarget; b.style.background="#1d4ed8"; b.style.color="#fff"; b.style.borderColor="#1d4ed8"; }}
          onMouseLeave={e => { const b = e.currentTarget; b.style.background="#fff"; b.style.color="#64748b"; b.style.borderColor="#cbd5e1"; }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
            <path d="M1 4v6h6"/><path d="M23 20v-6h-6"/>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
          </svg>
        </button>

        {/* Status badge */}
        {status === "success" && (
          <span style={{ fontSize:10, fontWeight:700, color:"#15803d", background:"#dcfce7",
            border:"1px solid #bbf7d0", borderRadius:3, padding:"2px 5px",
            flexShrink:0, whiteSpace:"nowrap" }}>✓ OK</span>
        )}
        {status === "error" && (
          <span style={{ fontSize:10, fontWeight:700, color:"#b91c1c", background:"#fee2e2",
            border:"1px solid #fecaca", borderRadius:3, padding:"2px 5px",
            flexShrink:0, whiteSpace:"nowrap" }}>✗ Wrong</span>
        )}
      </div>

      {status === "error" && (
        <p style={{ fontSize:10, color:"#ef4444", marginTop:3 }}>
          Incorrect.{" "}
          <button type="button" onClick={regenerate}
            style={{ background:"none", border:"none", cursor:"pointer", color:"#1d4ed8",
              textDecoration:"underline", fontSize:10, padding:0, fontWeight:600 }}>
            Refresh
          </button>{" "}and try again.
        </p>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [username, setUsername]               = useState("");
  const [password, setPassword]               = useState("");
  const [showPassword, setShowPassword]       = useState(false);
  const [error, setError]                     = useState("");
  const [loading, setLoading]                 = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaResetKey, setCaptchaResetKey] = useState(0);
  const router                                = useRouter();
  const [loadingPage, setLoadingPage]         = useState(true);

  const resetCaptcha = () => setCaptchaResetKey(k => k + 1);

  useEffect(() => {
    const initialize = async () => {
      try {
        const token    = Cookies.get("session_token");
        const userRole = Cookies.get("userRole");
        if (token && userRole) {
          if (userRole === "admin") { router.replace("/admin"); return; }
          if (userRole === "user")  { router.replace("/instructions"); return; }
        }
        await axios.get("/api/admin/assignments/latest");
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
    if (!captchaVerified)        { setError("Please complete the CAPTCHA verification."); return; }
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", { username, password });
      if (res.status === 200) {
        const { token, role, ...userData } = res.data;
        Cookies.set("session_token", token, { path:"/", secure:true, sameSite:"strict" });
        Cookies.set("userRole",       role,  { path:"/", secure:true, sameSite:"strict" });
        if (role === "admin")     { router.replace("/admin"); }
        else if (role === "user") { sessionStorage.setItem("user", JSON.stringify(userData)); router.replace("/instructions"); }
        else                      { setError("Invalid user role received. Please contact support."); }
      } else { setError(`Login failed with status: ${res.status}. Please try again.`); }
    } catch (err: any) {
      setLoading(false); resetCaptcha();
      if (err.response)     setError(err.response.data?.message || `Login failed: ${err.response.statusText}`);
      else if (err.request) setError("Network error. Could not connect to the server.");
      else                  setError("An unexpected error occurred. Please try again.");
    }
  };

  if (loadingPage) {
    return (
      <>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ minHeight:"100vh", display:"flex", alignItems:"center",
          justifyContent:"center", background:"#eef4fb" }}>
          <div style={{ width:40, height:40, border:"3px solid #bfdbfe",
            borderTop:"3px solid #1d4ed8", borderRadius:"50%",
            animation:"spin 0.8s linear infinite" }} />
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .page-root {
          display: flex;
          flex-direction: column;
          height: 100vh;
          max-height: 100vh;
          overflow: hidden;
          background: #eef4fb;
        }

        .page-body {
          flex: 1 1 0;
          min-height: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(150deg, #f0f7ff 0%, #e2edfb 50%, #cfe0f8 100%);
          padding: 10px 16px;
          overflow: hidden;
        }

        /* ── Card ── */
        .login-card {
          background: #ffffff;
          border: 1px solid #dde8f5;
          border-radius: 12px;
          width: 100%;
          max-width: 440px;
          padding: 20px 28px 16px;
          box-shadow: 0 2px 16px rgba(37,99,235,0.1), 0 1px 3px rgba(0,0,0,0.05);
          position: relative;
          animation: riseIn 0.4s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes riseIn {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .login-card::before, .login-card::after {
          content:'❖'; position:absolute; font-size:8px; color:#93c5fd; opacity:0.55;
        }
        .login-card::before { top:8px; left:10px; }
        .login-card::after  { bottom:8px; right:10px; }

        /* ── Brand row: row on desktop, column on mobile ── */
        .brand-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 14px;
          margin-bottom: 12px;
        }
        @media (max-width: 480px) {
          .brand-row {
            flex-direction: column;
            align-items: center;
            gap: 8px;
            text-align: center;
          }
          .brand-text { align-items: center !important; }
        }

        .logo-ring {
          width: 64px; height: 64px; flex-shrink: 0;
          border-radius: 50%; border: 2px solid #bfdbfe;
          box-shadow: 0 2px 8px rgba(59,130,246,0.18), 0 0 0 4px rgba(219,234,254,0.45);
          overflow: hidden; background: #fff;
        }
        .logo-ring img { width:100%; height:100%; object-fit:contain; display:block; }

        .brand-text { display:flex; flex-direction:column; justify-content:center; }
        .ir-title {
          font-family: 'Rajdhani', sans-serif; font-weight:700; font-size:1.15rem;
          color:#1e3a5f; letter-spacing:0.18em; text-transform:uppercase; line-height:1.1;
        }
        .ir-sub {
          font-size:0.6rem; color:#2563eb; letter-spacing:0.16em;
          text-transform:uppercase; margin-top:3px; opacity:0.65;
        }

        /* ── Divider ── */
        .divider { display:flex; align-items:center; gap:7px; margin-bottom:12px; }
        .div-line { flex:1; height:1px; background:linear-gradient(90deg,transparent,#bfdbfe,transparent); }
        .div-dot  { width:4px; height:4px; background:#93c5fd; border-radius:50%; }

        /* ── Labels ── */
        .field-label {
          display:block; font-family:'Rajdhani',sans-serif; font-weight:600;
          font-size:0.62rem; letter-spacing:0.13em; text-transform:uppercase;
          color:#475569; margin-bottom:4px;
        }

        /* ── Inputs — plain white, gray border ── */
        .field-input {
          width:100%; border:1px solid #cbd5e1; border-radius:5px;
          padding:8px 12px; font-size:0.88rem; color:#0f172a;
          background:#fff; outline:none;
          transition:border-color 0.15s, box-shadow 0.15s;
        }
        .field-input:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,0.12); }
        .field-input::placeholder { color:#94a3b8; font-size:0.83rem; }

        /* ── Password eye ── */
        .pw-wrap { position:relative; }
        .pw-wrap .field-input { padding-right:36px; }
        .eye-btn {
          position:absolute; right:9px; top:50%; transform:translateY(-50%);
          background:none; border:none; cursor:pointer; color:#94a3b8;
          display:flex; align-items:center; padding:2px; transition:color 0.15s;
        }
        .eye-btn:hover { color:#1d4ed8; }

        /* ── Field spacing ── */
        .fg { margin-bottom:10px; }

        /* ── Error ── */
        .err-box {
          display:flex; align-items:flex-start; gap:5px;
          background:#fef2f2; border:1px solid #fecaca;
          border-left:3px solid #dc2626; color:#b91c1c;
          font-size:0.7rem; line-height:1.4; padding:4px 8px;
          border-radius:4px; margin-bottom:8px;
        }
        .err-icon { flex-shrink:0; margin-top:1px; }

        /* ── Login button — always dark navy ── */
        .login-btn {
          width:100%; display:flex; align-items:center; justify-content:center; gap:8px;
          background:linear-gradient(135deg,#1e3a5f 0%,#2d5a9e 60%,#1d4ed8 100%);
          color:#fff; border:none; border-radius:6px; padding:10px 16px;
          font-family:'Rajdhani',sans-serif; font-weight:700; font-size:0.9rem;
          letter-spacing:0.25em; text-transform:uppercase; cursor:pointer;
          position:relative; overflow:hidden;
          box-shadow:0 3px 10px rgba(29,78,216,0.35),inset 0 1px 0 rgba(255,255,255,0.1);
          transition:transform 0.15s,box-shadow 0.15s; margin-top:2px;
        }
        .login-btn::before {
          content:''; position:absolute; top:0; left:-100%;
          width:100%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent);
          transition:left 0.4s;
        }
        .login-btn:hover::before { left:100%; }
        .login-btn:hover:not(:disabled) {
          box-shadow:0 5px 18px rgba(29,78,216,0.42),inset 0 1px 0 rgba(255,255,255,0.12);
          transform:translateY(-1px);
        }
        .login-btn:active:not(:disabled) { transform:translateY(0); }
        .login-btn:disabled {
          background:linear-gradient(135deg,#1e3a5f 0%,#2d5a9e 60%,#1d4ed8 100%) !important;
          opacity:0.65; cursor:not-allowed; box-shadow:none;
        }
        .btn-arrow { display:flex; align-items:center; flex-shrink:0; }

        .footer-note {
          font-size:0.6rem; color:#94a3b8;
          text-align:center; margin-top:8px; letter-spacing:0.03em;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="page-root">
        <Header />

        <main className="page-body">
          <form onSubmit={handleLogin} className="login-card" noValidate>

            {/* Brand row */}
            <div className="brand-row">
              <div className="logo-ring">
                <img src="/maq/Images/indian-railway.png" alt="Indian Railways Logo" />
              </div>
              <div className="brand-text">
                <div className="ir-title">Indian Railways</div>
                <div className="ir-sub">Ministry of Railways · Govt. of India</div>
              </div>
            </div>

            {/* Divider */}
            <div className="divider">
              <div className="div-line" />
              <div className="div-dot" />
              <div className="div-line" />
            </div>

            {/* Roll No */}
            <div className="fg">
              <label htmlFor="username" className="field-label">Roll No.</label>
              <input id="username" type="text" className="field-input"
                value={username} onChange={e => setUsername(e.target.value)}
                placeholder="Enter your roll number"
                autoComplete="username" required />
            </div>

            {/* Password */}
            <div className="fg">
              <label htmlFor="password" className="field-label">Password</label>
              <div className="pw-wrap">
                <input id="password" type={showPassword ? "text" : "password"}
                  className="field-input"
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password" required />
                <button type="button" className="eye-btn"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* CAPTCHA */}
            <CaptchaWidget onVerify={setCaptchaVerified} resetKey={captchaResetKey} />

            {/* Error */}
            {error && (
              <div className="err-box">
                <span className="err-icon">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </span>
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="login-btn" disabled={loading}
              title={!captchaVerified ? "Complete CAPTCHA to enable login" : ""}>
              {loading ? (
                <>
                  <span style={{ width:14, height:14, borderRadius:"50%",
                    border:"2px solid rgba(255,255,255,0.35)", borderTop:"2px solid #fff",
                    animation:"spin 0.7s linear infinite", display:"inline-block", flexShrink:0 }} />
                  Authenticating…
                </>
              ) : (
                <>
                  <span className="btn-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                      <polyline points="10 17 15 12 10 7"/>
                      <line x1="15" y1="12" x2="3" y2="12"/>
                    </svg>
                  </span>
                  Login
                </>
              )}
            </button>

            <p className="footer-note">For authorized personnel only · Govt. of India</p>
          </form>
        </main>

        <Footer />
      </div>
    </>
  );
}