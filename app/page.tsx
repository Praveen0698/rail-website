"use client";

import { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MinistersSidebar from "@/components/MinistersSidebar";
import SocialSection from "@/components/ImportantInfo";
import Footer from "@/components/Footer";

export default function Home() {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetchBlockStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBlockStatus = async () => {
    try {
      const res = await fetch("/api/user/block");
      const data = await res.json();

      if (data.isBlocked) {
        window.location.replace("https://indianrailways.gov.in/");
        return;
      }
    } catch (err) {
      console.error(err);
    }

    setChecking(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <TopBar />
      <Header />
      <Navbar />

      {/* Main content + sidebar always side by side */}
      <div className="flex gap-0 items-start w-full">
        <div className="flex-1 min-w-0">
          <HeroSection />
        </div>
        {/* Sidebar: visible at all sizes, narrow on mobile */}
        <MinistersSidebar />
      </div>

      <SocialSection />
      <Footer />
    </>
  );
}
