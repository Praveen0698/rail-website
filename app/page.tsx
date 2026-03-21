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
      <style>{`
#userwayAccessibilityIcon {
  position: fixed;
  top: 15px; /* Adjust this to line up with your search bar */
  right: 5px;
  z-index: 999;

  /* 1. The Circle Size */
  width: 46px; 
  height: 46px;
  border-radius: 50%;
  
  /* 2. Solid Blue Background - No outside rings */
  background: #0049ff; 
  border: none;
  outline: none;
  box-shadow: none;

  /* 3. Perfect Centering */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
}

/* 4. THE ICON: Large and bold to fill the blue circle */
#userwayAccessibilityIcon img.ui_w {
  width: 42px;  
  height: 42px;
  display: block;
  margin: 0;
  padding: 0;
}

/* 5. Force hide all extra UserWay elements/wrappers */
#userwayAccessibilityIcon .ups,
#userwayAccessibilityIcon .usr,
#userwayAccessibilityIcon .userway_check_on,
#userwayAccessibilityIcon .uiiw {
  display: none !important;
}
      `}</style>

      <div
        id="userwayAccessibilityIcon"
        aria-label="Accessibility Menu"
        role="button"
        tabIndex={0}
        title="Accessibility Menu"
      >
        <img
          className="ui_w"
          alt=""
          src="https://cdn.userway.org/widgetapp/images/body_wh.svg"
        />
      </div>

      <div className="min-w-full max-w-full">
        <TopBar />
        <Header />
        <Navbar />

        <div className="flex gap-0 items-start w-full">
          <div className="flex-1 min-w-0">
            <HeroSection />
          </div>
          <MinistersSidebar />
        </div>

        <SocialSection />
        <Footer />
      </div>
    </>
  );
}
