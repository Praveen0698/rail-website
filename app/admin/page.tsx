"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const STATIC_USER = "AdminRaj";
    const STATIC_PASS = "Tejas@2021";

    if (userId === STATIC_USER && password === STATIC_PASS) {
      const sessionKey = uuidv4();

      localStorage.setItem(
        "auth",
        JSON.stringify({
          userId,
          sessionKey,
          loginTime: Date.now(),
        }),
      );

      router.replace("/admin/home");
    } else {
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Image
        src="/background.jpg"
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>

      <div className="relative z-10 w-full max-w-md p-8">
        <div className="backdrop-blur-xs bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 text-white">
          <h1 className="text-2xl font-bold text-center mb-6 tracking-wide">
            Welcome to Raj Private House
          </h1>

          {error && <p className="text-red-400 text-center mb-4">{error}</p>}

          <div className="space-y-5">
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full bg-white/20 border border-white/30 placeholder-white/70 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/20 border border-white/30 placeholder-white/70 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />

            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-lg font-semibold text-white 
              bg-gradient-to-r from-blue-500 to-indigo-600 
              hover:from-blue-600 hover:to-indigo-700 
              shadow-lg hover:shadow-xl 
              transform hover:-translate-y-1 transition duration-300"
            >
              Login
            </button>
          </div>

          <p className="text-center text-sm mt-6 opacity-80">
            Authorized Access Only
          </p>
        </div>
      </div>
    </div>
  );
}
