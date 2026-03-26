"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const SubmittedPage = () => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(5);
  const hasRedirected = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0 && !hasRedirected.current) {
      hasRedirected.current = true;
      router.replace("/examination");
    }
  }, [timeLeft, router]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#eef2f7] flex flex-col items-center justify-center px-4"
    >
      {/* Top accent bar */}
      <div className="w-full fixed top-0 left-0 h-1 bg-[#f4a900]" />

      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white border border-gray-200 border-t-4 border-t-[#003580] shadow-lg w-full max-w-md"
      >
        {/* Header */}
        <div className="bg-[#003580] text-white px-6 py-4 text-center">
          <p className="text-xs uppercase tracking-widest text-blue-200 mb-0.5">
            Railway Recruitment Cell
          </p>
          <p className="text-sm font-bold uppercase tracking-wide">
            Online Examination System
          </p>
        </div>

        <div className="p-8 text-center">
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-5"
          >
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>

          <h2 className="text-lg font-bold text-[#003580] uppercase tracking-wide mb-1">
            Examination Submitted
          </h2>
          <div className="w-12 h-0.5 bg-[#f4a900] mx-auto mb-4" />

          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            Thank you for attending the examination. Your responses have been
            successfully recorded and submitted.
          </p>

          {/* Redirect countdown */}
          <div className="bg-[#eef2f7] border border-gray-200 px-5 py-3 text-sm text-gray-600">
            Redirecting to home page in{" "}
            <span className="font-bold text-[#003580] text-base">
              {timeLeft}
            </span>{" "}
            second{timeLeft !== 1 ? "s" : ""}...
          </div>

          {/* Progress bar */}
          <div className="mt-3 w-full h-1 bg-gray-200 overflow-hidden">
            <motion.div
              className="h-full bg-[#003580]"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>

      <p className="mt-6 text-xs text-gray-400 uppercase tracking-widest">
        Indian Railway — Confidential
      </p>
    </motion.div>
  );
};

export default SubmittedPage;
