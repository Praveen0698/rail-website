/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Page1Form from "@/components/form/Page1Form";
import Page2Form from "@/components/form/Page2Form";
import Page3Form from "@/components/form/Page3Form";
import Header from "@/components/mcq/Header";
import Footer from "@/components/mcq/Footer";

export default function JoiningReportForm() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("apar_session_token");
    const role = Cookies.get("apar_userRole");
    if (!token || role !== "student") {
      router.replace("/apar");
    }
  }, [router]);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [sig1, setSig1] = useState<string | null>(null);
  const [sig2, setSig2] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [declarationSig, setDeclarationSig] = useState<string | null>(null);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setter(reader.result as string);
    reader.readAsDataURL(file);
  };

  const requiredFields: { key: string; label: string }[] = [
    { key: "name", label: "Name" },
    { key: "dateOfBirth", label: "Date of Birth" },
    { key: "sex", label: "Sex" },
    { key: "nameOfFather", label: "Name of Father" },
    { key: "nameOfMother", label: "Name of Mother" },
    { key: "nationality", label: "Nationality" },
    { key: "state", label: "State" },
    { key: "caste", label: "Caste" },
    { key: "religion", label: "Religion" },
    { key: "category", label: "Category" },
    { key: "physicallyHandicapped", label: "Physically Handicapped" },
    { key: "exServicemen", label: "Ex-Servicemen" },
    { key: "panNumber", label: "PAN Number" },
    { key: "voterIdCardNumber", label: "Voter ID Card Number" },
    { key: "aadharCardNumber", label: "Aadhar Card Number" },
    { key: "height", label: "Height" },
    { key: "maritalStatus", label: "Marital Status" },
    { key: "presentHouseNo", label: "Present House No." },
    { key: "presentStreetName", label: "Present Street Name" },
    { key: "presentPlace", label: "Present Place" },
    { key: "presentPin", label: "Present Pin" },
    { key: "presentState", label: "Present State" },
    { key: "presentDistrict", label: "Present District" },
    { key: "mobileNo", label: "Mobile No." },
    { key: "emailAddress", label: "Email Address" },
    { key: "source", label: "Source (Advertisement No.)" },
    { key: "recruitmentType", label: "Recruitment Type" },
    { key: "appointmentOrderNo", label: "Appointment Order No." },
    { key: "appointmentOrderDate", label: "Appointment Order Date" },
    { key: "station", label: "Station" },
    { key: "declarationDate", label: "Declaration Date" },
    { key: "declarationName", label: "Declaration Name" },
  ];

  const validateForm = (): string[] => {
    const missing: string[] = [];
    requiredFields.forEach(({ key, label }) => {
      const val = (formData as any)[key];
      if (!val || String(val).trim() === "") missing.push(label);
    });
    if (formData.employeeCode.some((c: string) => c.trim() === ""))
      missing.push("Employee Code (all 8 digits)");
    const hasEducation = formData.education.some(
      (row: any) => row.courseTitle.trim() !== "",
    );
    if (!hasEducation)
      missing.push("Educational Qualifications (at least one row)");
    if (!sig1) missing.push("Specimen Signature 1");
    if (!sig2) missing.push("Specimen Signature 2");
    if (!photo) missing.push("Passport Photo");
    if (!declarationSig) missing.push("Declaration Signature");
    return missing;
  };

  const handleSubmitClick = () => {
    const missing = validateForm();
    if (missing.length > 0) {
      setErrors(missing);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setErrors([]);
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setShowConfirmModal(false);
    await new Promise((res) => setTimeout(res, 2000));
    router.push("/apar/submitted");
  };

  const [formData, setFormData] = useState({
    employeeCode: Array(8).fill(""),
    department: "",
    office: "",
    name: "",
    dateOfBirth: "",
    sex: "",
    nameOfFather: "",
    nameOfMother: "",
    nationality: "",
    state: "",
    caste: "",
    religion: "",
    category: "",
    physicallyHandicapped: "",
    exServicemen: "",
    panNumber: "",
    voterIdCardNumber: "",
    aadharCardNumber: "",
    identificationMark1: "",
    identificationMark2: "",
    height: "",
    maritalStatus: "",
    spouseName: "",
    spouseReligion: "",
    spouseCaste: "",
    interReligionCaste: "",
    spouseEmployed: "",
    spouseOrganization: "",
    presentHouseNo: "",
    presentStreetName: "",
    presentPlace: "",
    presentPin: "",
    presentState: "",
    presentDistrict: "",
    presentTaluk: "",
    presentVillage: "",
    presentPhoneNo: "",
    presentHomeTown: "",
    permanentHouseNo: "",
    permanentStreetName: "",
    permanentPlace: "",
    permanentPin: "",
    permanentState: "",
    permanentDistrict: "",
    permanentTaluk: "",
    permanentVillage: "",
    permanentPhoneNo: "",
    permanentHomeTown: "",
    mobileNo: "",
    emailAddress: "",
    source: "",
    recruitmentType: "",
    method: "",
    scaleOfPay: "",
    adviceMemoNo: "",
    adviceMemoDate: "",
    districtRecruitment: "",
    directRecruitmentCircular: "",
    serialNoAdviceMemo: "",
    entryCategory: "",
    appointmentOrderNo: "",
    appointmentOrderDate: "",
    prevDepartment: "",
    prevDesignation: "",
    relievingOrderNo: "",
    relievingOrderDate: "",
    officeLastWorked: "",
    earlierRecruitingAgency: "",
    earlierAdviceMemoNo: "",
    earlierAdviceMemoDate: "",
    earlierAppointmentOrderNo: "",
    earlierAppointmentOrderDate: "",
    education: Array(5).fill({
      courseTitle: "",
      subject: "",
      universityBoard: "",
      institutionStudied: "",
      classPercentage: "",
      regNoYear: "",
    }),
    station: "",
    declarationDate: "",
    declarationName: "",
  });

  const handleEducationChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const updated = formData.education.map((row: any, i: number) =>
      i === index ? { ...row, [field]: value } : row,
    );
    setFormData((prev) => ({ ...prev, education: updated }));
  };

  const handleChange = (field: any, value: any) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="min-h-screen bg-[#eef2f7] flex flex-col">
      <Header />

      {/* Title bar */}
      <div className="bg-[#003580] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <svg
              className="shrink-0"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f4a900"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <h1 className="text-sm font-bold uppercase tracking-widest truncate">
              Joining Report Form
            </h1>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-blue-200 bg-white/10 px-3 py-1 hidden sm:inline">
              RRC · Indian Railway
            </span>
          </div>
        </div>
      </div>
      <div className="h-1 bg-[#f4a900]" />

      {/* Validation errors banner */}
      {errors.length > 0 && (
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 pt-4">
          <div className="bg-red-50 border border-red-200 border-l-4 border-l-red-600">
            <div className="flex items-start gap-3 px-4 py-3">
              <svg
                className="shrink-0 mt-0.5 text-red-600"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div className="min-w-0">
                <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-1.5">
                  Please fill in the following required fields before
                  submitting:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {errors.map((e, i) => (
                    <span
                      key={i}
                      className="text-[11px] text-red-700 bg-red-100 border border-red-200 px-2 py-0.5 font-medium"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submitting overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 bg-white/80 flex items-center justify-center">
          <div className="bg-white border border-gray-200 shadow-xl px-10 py-8 flex flex-col items-center gap-4 max-w-xs w-full mx-4">
            <div className="w-12 h-12 border-4 border-[#003580]/20 border-t-[#003580] rounded-full animate-spin" />
            <div className="text-center">
              <p className="text-sm font-bold text-[#003580] uppercase tracking-widest">
                Submitting…
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Please do not close this tab
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form content */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6">
        <div className="flex flex-col gap-0 bg-white border border-gray-200 shadow-sm">
          <Page1Form
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
            sig1={sig1}
            sig2={sig2}
            photo={photo}
            setSig1={setSig1}
            setSig2={setSig2}
            setPhoto={setPhoto}
          />
          <Page2Form formData={formData} handleChange={handleChange} />
          <Page3Form
            formData={formData}
            handleChange={handleChange}
            handleEducationChange={handleEducationChange}
            isSubmitting={isSubmitting}
            showConfirmModal={showConfirmModal}
            setShowConfirmModal={setShowConfirmModal}
            handleSubmitClick={handleSubmitClick}
            handleConfirm={handleConfirm}
            handleFileUpload={handleFileUpload}
            declarationSig={declarationSig}
            setDeclarationSig={setDeclarationSig}
          />
        </div>

        {/* Bottom note */}
        <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest mt-5 mb-2">
          All information provided is subject to verification · Railway
          Recruitment Cell · Indian Railway
        </p>
      </div>

      <Footer />
    </div>
  );
}
