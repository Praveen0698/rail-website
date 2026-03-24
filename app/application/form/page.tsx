import Footer from "@/components/mcq/Footer";
import Header from "@/components/mcq/Header"
import PageOne from "@/components/application/pageOne";
import PageTwo from "@/components/application/pageTwo";

export default function ApplicationForm() {
  return (
    <>
      <Header />
      <div className="flex justify-center gap-5 flex-col items-center bg-gray-100 py-10">
        <PageOne />
        <PageTwo />
      </div>
      <Footer />
    </>
  );
}
