import Header from "@/components/recruitment/Header";
import TopBar from "@/components/recruitment/Topbar";
import Navbar from "@/components/recruitment/Navbar";
import MainContent from "@/components/recruitment/Maincontent";
import Footer from "@/components/recruitment/Footer";

export default function RecruitmentPage() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", fontSize: "14px" }}>
      <TopBar />
      <Header />
      <Navbar />
      <MainContent />
      <Footer />
    </div>
  );
}