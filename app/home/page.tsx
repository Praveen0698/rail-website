import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MinistersSidebar from "@/components/MinistersSidebar";
import SocialSection from "@/components/ImportantInfo"
import Footer from "@/components/Footer";

export default function Home() {
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