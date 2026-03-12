"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
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

  if (checking) return null;

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white flex flex-col items-center px-6 py-10">
      <div className="mb-8">
        <Image
          src="/logo.gif"
          alt="Indian Railways Logo"
          width={220}
          height={120}
          className="drop-shadow-lg"
        />
      </div>

      <div className="max-w-5xl bg-white shadow-xl rounded-2xl p-8 border border-blue-100">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-800 text-center mb-6">
          Move Towards a Cashless Digital Economy
        </h1>

        <p className="text-gray-700 leading-relaxed mb-6 text-justify">
          Government of India encourages citizens to move towards a
          <span className="font-semibold text-blue-700"> Cashless Economy</span>
          . This can be achieved by using debit/credit cards and electronic
          payment systems such as IMPS, NEFT and RTGS.
        </p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">
            Advantages of a Cashless Economy:
          </h2>

          <ul className="space-y-3 list-disc pl-6 text-gray-700">
            <li>Risk of loss of physical cash is avoided</li>
            <li>Facilitates exact payments and reduces transaction costs</li>
            <li>Convenient payment of bills and purchases</li>
            <li>Improves financial transparency and tax compliance</li>
            <li>Reduces cost of printing and transporting currency</li>
            <li>Helps curb corruption and black money</li>
            <li>Prevents money laundering</li>
            <li>Increases revenue for public welfare activities</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">
            Indian Railways Cashless Services
          </h2>

          <p className="text-gray-700 leading-relaxed text-justify">
            Indian Railways offers cashless ticketing through IRCTC for booking
            reserved tickets online. More than 58% of train accommodation is
            reserved through e-ticketing. Season Tickets for suburban services
            are available digitally on Western and Central Railways.
            <br />
            <br />
            Unreserved tickets can be purchased via mobile phones in major
            cities including Delhi, Mumbai, Chennai, Kolkata, and Secunderabad.
            Automatic Ticket Vending Machines using smart cards are installed at
            over 1000 locations across multiple railway zones.
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-blue-900 font-semibold text-lg">
            Indian Railways seeks your cooperation in building a Cashless
            Digital India 🇮🇳
          </p>
        </div>

        <div className="flex justify-center my-5">
          <button
            onClick={() => router.push("/home")}
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
