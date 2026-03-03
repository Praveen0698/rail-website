import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MinistersSidebar from "@/components/MinistersSidebar";
import WhatsNew from "@/components/WhatsNew";
import QuickLinks from "@/components/QuickLinks";
import ImportantInfo from "@/components/ImportantInfo";
import SocialSection from "@/components/SocialSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <Navbar />

      <div className="flex gap-0 md:gap-4 px-0 md:px-4 mt-2 md:mt-4 items-start">
        <div className="flex-1 min-w-0">
          <HeroSection />
        </div>
        <MinistersSidebar />
      </div>

      <ImportantInfo />
      <SocialSection />
      <Footer />
    </>
  );
}
