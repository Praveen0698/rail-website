/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Header from "@/components/mcq/Header";
import Footer from "@/components/mcq/Footer";

type ResponseStatus =
  | "answered"
  | "review"
  | "review-answered"
  | "skipped"
  | "";
type Responses = {
  [questionNumber: number]: {
    selected: number | null;
    status: ResponseStatus;
  };
};

type Option = { text: string; image?: string };
type Question = {
  id: string;
  question: string;
  image?: string;
  options: Option[];
};

const shuffleArray = (array: Question[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function MCQPage() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [responses, setResponses] = useState<Responses>({});
  const [timeLeft, setTimeLeft] = useState<number>(120 * 60);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [assData, setAssData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [examStarted, setExamStarted] = useState(false);

  useEffect(() => {
    const token = Cookies.get("session_token");
    const role = Cookies.get("userRole");
    if (!token || role !== "user") {
      router.replace("/examination");
    }
  }, [router]);

  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraStream]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const requestCameraAccess = async () => {
    try {
      if (!window.isSecureContext) {
        alert("Camera requires HTTPS connection.");
        return false;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      setCameraStream(stream);
      return true;
    } catch (error) {
      console.error(error);
      alert("Please allow camera permission.");
      return false;
    }
  };

  useEffect(() => {
    const handleBackButton = () => {
      handleSubmit();
    };
    window.history.pushState(null, "", window.location.href);
    const onPopState = () => {
      handleBackButton();
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cameraStream, assData]);

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
      videoRef.current.onloadedmetadata = async () => {
        try {
          videoRef?.current?.setAttribute("playsinline", "true");
          await videoRef.current?.play();
        } catch (err) {
          console.error("Video play error:", err);
        }
      };
    }
  }, [cameraStream]);

  useEffect(() => {
    const fetchAssignmentAndQuestions = async () => {
      try {
        const assignmentRes = await axios.get(
          "/examination/api/admin/assignments/latest",
        );
        setAssData(assignmentRes.data);
        const questionIds = assignmentRes.data.questionIds;
        const questionsRes = await axios.post(
          "/examination/api/admin/questions/ass-questions",
          { ids: questionIds },
        );
        const fetchedQuestions: Question[] = questionsRes.data.map(
          (q: any) => ({
            id: q._id,
            question: q.text,
            image: q.image,
            options: q.options.map((opt: any) => ({
              text: opt.text,
              image: opt.image,
            })),
          }),
        );
        if (!fetchedQuestions.length) {
          router.push("/examination");
          return;
        }
        let finalQuestions: Question[] = [];
        const storageKey = `selectedQuestions_${assignmentRes.data._id}`;
        if (fetchedQuestions.length <= 50) {
          finalQuestions = fetchedQuestions;
        } else {
          const stored = sessionStorage.getItem(storageKey);
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.length === 100) {
              finalQuestions = parsed;
            } else {
              const shuffled = shuffleArray(fetchedQuestions);
              finalQuestions = shuffled.slice(0, 50);
              sessionStorage.setItem(
                storageKey,
                JSON.stringify(finalQuestions),
              );
            }
          } else {
            const shuffled = shuffleArray(fetchedQuestions);
            finalQuestions = shuffled.slice(0, 50);
            sessionStorage.setItem(storageKey, JSON.stringify(finalQuestions));
          }
        }
        setQuestions(finalQuestions);
        setCurrentQuestion(1);
      } catch (error) {
        console.log("Error fetching questions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignmentAndQuestions();
  }, [router]);

  useEffect(() => {
    if (!assData?.durationMinutes) return;
    const now = Date.now();
    const durationInMs = assData.durationMinutes * 60 * 1000;
    let storedEndTime = sessionStorage.getItem("examEndTime");
    if (!storedEndTime) {
      const newEndTime = now + durationInMs;
      sessionStorage.setItem("examEndTime", newEndTime.toString());
      storedEndTime = newEndTime.toString();
    }
    const endTime = parseInt(storedEndTime, 10);
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timeRemaining = Math.max(
        0,
        Math.floor((endTime - currentTime) / 1000),
      );
      setTimeLeft(timeRemaining);
      if (timeRemaining <= 0) {
        clearInterval(interval);
        setIsTimeUp(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [assData]);

  useEffect(() => {
    if (isTimeUp) {
      Cookies.remove("session_token");
      Cookies.remove("userRole");
      setTimeout(() => {
        router.replace("/examination/submitted");
      }, 3000);
    }
  }, [isTimeUp, router]);

  const formatTime = () => {
    const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const isWarning = timeLeft <= 300;

  const updateResponse = (type: ResponseStatus) => {
    setResponses((prev) => ({
      ...prev,
      [currentQuestion]: {
        selected: prev[currentQuestion]?.selected ?? null,
        status: type,
      },
    }));
  };

  const handleOptionChange = (value: number) => {
    setResponses((prev) => ({
      ...prev,
      [currentQuestion]: { selected: value, status: "answered" },
    }));
  };

  const goToQuestion = (q: number) => setCurrentQuestion(q);
  const nextQuestion = () =>
    setCurrentQuestion((q) => Math.min(q + 1, questions.length));
  const prevQuestion = () => setCurrentQuestion((q) => Math.max(q - 1, 1));

  const renderStatusColor = (q: number): string => {
    const status = responses[q]?.status;
    if (!responses[q]) return "bg-gray-200 text-gray-700 border-gray-300";
    if (status === "answered")
      return "bg-green-600 text-white border-green-700";
    if (status === "review")
      return "bg-purple-600 text-white border-purple-700";
    if (status === "review-answered")
      return "bg-indigo-600 text-white border-indigo-700";
    if (status === "skipped") return "bg-red-500 text-white border-red-600";
    return "bg-gray-200 text-gray-700 border-gray-300";
  };

  const answeredCount = Object.values(responses).filter(
    (r) => r.status === "answered" || r.status === "review-answered",
  ).length;
  const notAnsweredCount = Object.values(responses).filter(
    (r) => r.status === "skipped",
  ).length;
  const markedCount = Object.values(responses).filter(
    (r) => r.status === "review" || r.status === "review-answered",
  ).length;

  const openSubmitModal = () => setIsSubmitModalOpen(true);
  const closeSubmitModal = () => setIsSubmitModalOpen(false);

  const handleSubmit = () => {
    if (submitting) return;
    setSubmitting(true);
    sessionStorage.removeItem("examEndTime");
    if (assData?._id)
      sessionStorage.removeItem(`selectedQuestions_${assData._id}`);
    if (cameraStream) cameraStream.getTracks().forEach((track) => track.stop());
    Cookies.remove("session_token");
    Cookies.remove("userRole");
    router.replace("/examination/submitted");
  };

  const current = questions[currentQuestion - 1];

  if (loading)
    return (
      <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#003580] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#003580] font-semibold text-sm tracking-wide">
            Loading Examination...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#eef2f7] font-sans text-gray-800 flex flex-col">
      {/* Camera Permission Modal */}
      {!examStarted && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-none border-t-4 border-[#003580] shadow-2xl p-8 w-[90%] max-w-md text-center">
            <div className="w-16 h-16 bg-[#003580] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.069A1 1 0 0121 8.868v6.264a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold mb-2 text-[#003580] uppercase tracking-wide">
              Camera Permission Required
            </h2>
            <div className="w-12 h-0.5 bg-[#f4a900] mx-auto mb-4"></div>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              To maintain examination integrity, camera access is mandatory
              throughout the assessment.
            </p>
            <button
              onClick={async () => {
                const allowed = await requestCameraAccess();
                if (allowed) setExamStarted(true);
              }}
              className="w-full bg-[#003580] hover:bg-[#002560] text-white py-3 rounded-none font-semibold transition tracking-wide text-sm uppercase"
            >
              Allow Camera & Start Examination
            </button>
          </div>
        </div>
      )}

      <Header />

      {/* Exam Info Bar */}
      <div className="bg-[#003580] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            {/* Camera feed */}
            <div className="w-10 h-8 sm:w-14 sm:h-10 bg-black rounded overflow-hidden border border-white/30 shrink-0">
              <video
                ref={videoRef}
                className="w-full h-full object-cover scale-x-[-1]"
                autoPlay
                muted
                playsInline
              />
            </div>
            <div>
              <p className="text-[10px] text-blue-200 uppercase tracking-widest">
                Candidate
              </p>
              <p className="text-sm font-bold leading-tight">
                {user?.name || "[Your Name]"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-[10px] text-blue-200 uppercase tracking-widest">
                Answered
              </p>
              <p className="text-sm font-bold text-green-300">
                {answeredCount}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-blue-200 uppercase tracking-widest">
                Marked
              </p>
              <p className="text-sm font-bold text-yellow-300">{markedCount}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-blue-200 uppercase tracking-widest">
                Total
              </p>
              <p className="text-sm font-bold">{questions.length}</p>
            </div>
            <div
              className={`text-center px-3 py-1 rounded ${isWarning ? "bg-red-600 animate-pulse" : "bg-white/10"}`}
            >
              <p className="text-[10px] text-blue-200 uppercase tracking-widest">
                Time Left
              </p>
              <p
                className={`text-base font-bold font-mono ${isWarning ? "text-white" : "text-yellow-300"}`}
              >
                {formatTime()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section bar */}
      <div className="bg-[#f4a900] border-b border-[#d4900a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between">
          <p className="text-[#003580] text-xs font-bold uppercase tracking-widest">
            General Examination
          </p>
          <p className="text-[#003580] text-xs font-semibold">
            Question {currentQuestion} of {questions.length}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto py-4 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto lg:grid grid-cols-3 gap-5">
          {/* Question Panel */}
          <div className="col-span-2 mb-4 lg:mb-0">
            <div className="bg-white border border-gray-200 shadow-sm">
              {/* Question header */}
              <div className="bg-[#003580] text-white px-5 py-3 flex items-center justify-between">
                <span className="text-sm font-bold tracking-wide">
                  Question No. {String(currentQuestion).padStart(2, "0")}
                </span>
                <span className="text-xs text-blue-200 bg-white/10 px-2 py-0.5 rounded">
                  1 Mark
                </span>
              </div>

              <div className="p-5">
                {/* Question text */}
                <div className="mb-5 pb-4 border-b border-gray-100">
                  <p className="text-sm sm:text-base leading-relaxed text-gray-800">
                    {current?.question}
                  </p>
                  {current?.image && (
                    <img
                      src={current.image}
                      alt="question"
                      style={{ maxHeight: "140px" }}
                      className="max-w-full h-auto mt-3 border border-gray-200"
                    />
                  )}
                </div>

                {/* Options */}
                <div className="space-y-2 mb-6">
                  {current?.options?.map((option, idx) => {
                    const isSelected =
                      responses[currentQuestion]?.selected === idx;
                    const label = String.fromCharCode(65 + idx);
                    return (
                      <label
                        key={idx}
                        className={`flex items-start gap-3 p-3 border cursor-pointer transition-all ${
                          isSelected
                            ? "border-[#003580] bg-[#eef2ff]"
                            : "border-gray-200 hover:border-[#003580]/40 hover:bg-gray-50"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                            isSelected
                              ? "border-[#003580] bg-[#003580] text-white"
                              : "border-gray-400 text-gray-500"
                          }`}
                        >
                          {label}
                        </div>
                        <div className="flex-1">
                          <input
                            type="radio"
                            name="option"
                            value={idx}
                            checked={isSelected}
                            onChange={() => handleOptionChange(idx)}
                            className="hidden"
                          />
                          <span className="text-sm leading-relaxed">
                            {option.text}
                          </span>
                          {option.image && (
                            <img
                              src={option.image}
                              alt={`option-${label}`}
                              className="max-w-full h-auto mt-2"
                              style={{ maxHeight: "60px" }}
                            />
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>

                {/* Action buttons */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button
                      onClick={() => {
                        updateResponse("answered");
                        nextQuestion();
                      }}
                      className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wide transition"
                    >
                      Save & Next
                    </button>
                    <button
                      onClick={() => {
                        updateResponse("review-answered");
                        nextQuestion();
                      }}
                      className="bg-[#f4a900] hover:bg-[#d4900a] text-[#003580] px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wide transition"
                    >
                      Save & Mark for Review
                    </button>
                    <button
                      onClick={() =>
                        setResponses((prev) => ({
                          ...prev,
                          [currentQuestion]: { selected: null, status: "" },
                        }))
                      }
                      className="border border-gray-400 hover:bg-gray-100 text-gray-700 px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wide transition"
                    >
                      Clear Response
                    </button>
                    <button
                      onClick={() => {
                        updateResponse("review");
                        nextQuestion();
                      }}
                      className="bg-[#6a1b9a] hover:bg-[#4a148c] text-white px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wide transition"
                    >
                      Mark for Review & Next
                    </button>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={prevQuestion}
                      className="border-2 border-[#003580] text-[#003580] hover:bg-[#003580] hover:text-white px-5 py-2 text-xs sm:text-sm font-bold uppercase tracking-wide transition"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={nextQuestion}
                      className="border-2 border-[#003580] text-[#003580] hover:bg-[#003580] hover:text-white px-5 py-2 text-xs sm:text-sm font-bold uppercase tracking-wide transition"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Palette Panel */}
          <div className="bg-white border border-gray-200 shadow-sm h-fit">
            <div className="bg-[#003580] text-white px-4 py-3">
              <h3 className="text-sm font-bold uppercase tracking-wide">
                Question Palette
              </h3>
            </div>

            {/* Legend */}
            <div className="p-4 border-b border-gray-100 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {[
                { color: "bg-gray-200 border-gray-300", label: "Not Visited" },
                { color: "bg-red-500 border-red-600", label: "Not Answered" },
                { color: "bg-green-600 border-green-700", label: "Answered" },
                {
                  color: "bg-purple-600 border-purple-700",
                  label: "Marked for Review",
                },
                {
                  color: "bg-indigo-600 border-indigo-700",
                  label: "Answered & Marked",
                },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className={`w-4 h-4 border shrink-0 ${color}`}></span>
                  <span className="text-gray-600 leading-tight">{label}</span>
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="p-4">
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-6 lg:grid-cols-6 gap-1.5">
                {questions.map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => goToQuestion(i + 1)}
                    className={`text-xs w-8 h-8 border font-semibold flex items-center justify-center transition-all
                      ${currentQuestion === i + 1 ? "ring-2 ring-[#f4a900] ring-offset-1" : ""}
                      ${renderStatusColor(i + 1)}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="px-4 pb-2 grid grid-cols-3 gap-2 text-center text-xs border-t border-gray-100 pt-3">
              <div>
                <p className="text-lg font-bold text-green-600">
                  {answeredCount}
                </p>
                <p className="text-gray-500 leading-tight">Answered</p>
              </div>
              <div>
                <p className="text-lg font-bold text-red-500">
                  {notAnsweredCount}
                </p>
                <p className="text-gray-500 leading-tight">Not Answered</p>
              </div>
              <div>
                <p className="text-lg font-bold text-purple-600">
                  {markedCount}
                </p>
                <p className="text-gray-500 leading-tight">Marked</p>
              </div>
            </div>

            <div className="p-4 pt-2">
              <button
                onClick={openSubmitModal}
                className="w-full bg-[#003580] hover:bg-[#002560] text-white px-4 py-2.5 font-bold uppercase tracking-widest text-sm transition"
              >
                Submit Examination
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Submit Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white border-t-4 border-[#003580] shadow-2xl w-[90%] max-w-md">
            <div className="bg-[#003580] text-white px-6 py-4">
              <h2 className="text-base font-bold uppercase tracking-wide">
                Confirm Submission
              </h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                Are you sure you want to submit your examination?
              </p>
              <div className="bg-yellow-50 border border-yellow-300 p-3 mb-5 text-xs text-yellow-800">
                ⚠ Once submitted, you will not be able to change your answers.
              </div>
              <div className="grid grid-cols-3 gap-3 text-center text-xs mb-5">
                <div className="bg-green-50 border border-green-200 p-2">
                  <p className="text-lg font-bold text-green-600">
                    {answeredCount}
                  </p>
                  <p className="text-gray-600">Answered</p>
                </div>
                <div className="bg-red-50 border border-red-200 p-2">
                  <p className="text-lg font-bold text-red-500">
                    {notAnsweredCount}
                  </p>
                  <p className="text-gray-600">Not Answered</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 p-2">
                  <p className="text-lg font-bold text-purple-600">
                    {markedCount}
                  </p>
                  <p className="text-gray-600">Marked</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={closeSubmitModal}
                  className="flex-1 border-2 border-gray-400 text-gray-700 hover:bg-gray-100 font-semibold py-2.5 text-sm uppercase tracking-wide transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-[#003580] hover:bg-[#002560] text-white font-bold py-2.5 text-sm uppercase tracking-wide transition"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Time Up Modal */}
      {isTimeUp && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white border-t-4 border-red-600 shadow-2xl p-8 w-[90%] max-w-md text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-red-600 uppercase tracking-wide mb-2">
              Time&apos;s Up!
            </h2>
            <div className="w-12 h-0.5 bg-red-600 mx-auto mb-4"></div>
            <p className="text-sm text-gray-600 leading-relaxed">
              The examination time has expired. Your test is being submitted
              automatically.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
