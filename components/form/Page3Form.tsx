/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

interface EducationRow {
  courseTitle: string;
  subject: string;
  universityBoard: string;
  institutionStudied: string;
  classPercentage: string;
  regNoYear: string;
}

interface Page3Props {
  formData: any;
  handleChange: (field: string, value: string) => void;
  handleEducationChange: (
    index: number,
    field: keyof EducationRow,
    value: string,
  ) => void;
  isSubmitting: boolean;
  showConfirmModal: boolean;
  setShowConfirmModal: (val: boolean) => void;
  handleSubmitClick: () => void;
  handleConfirm: () => void;
  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: any,
  ) => void;
  declarationSig: string | null;
  setDeclarationSig: (val: string | null) => void;
}

export default function Page3Form({
  formData,
  handleChange,
  handleEducationChange,
  isSubmitting,
  showConfirmModal,
  setShowConfirmModal,
  handleSubmitClick,
  handleConfirm,
  handleFileUpload,
  declarationSig,
  setDeclarationSig,
}: Page3Props) {
  const cellInput =
    "border border-black px-1.5 py-1 align-middle text-[12.5px] font-serif";
  const bareInput =
    "w-full bg-transparent outline-none border-none text-[12.5px] font-serif py-0.5";
  const thCell =
    "border border-black px-1.5 py-1 text-[12.5px] font-serif font-normal align-top bg-white";

  return (
    <div className="min-h-screen bg-white p-5 font-serif text-black text-[13px]">
      <div className="relative max-w-3xl mx-auto border border-gray-400 px-8 py-6 bg-white">
        {/* Page number */}
        <span className="absolute top-4 right-5 text-[13px]">3</span>

        {/* ══ PART-F: EDUCATIONAL QUALIFICATIONS ══ */}
        <p className="text-[13px] font-bold font-serif mb-2">
          PART-F: EDUCATIONAL QUALIFICATIONS
        </p>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className={`${thCell} w-[14%]`}>Course Title</th>
              <th className={`${thCell} w-[18%]`}>Subject</th>
              <th className={`${thCell} w-[20%]`}>University/Board</th>
              <th className={`${thCell} w-[20%]`}>Institution studied</th>
              <th className={`${thCell} w-[14%]`}>Class/ Percentage</th>
              <th className={`${thCell} w-[14%]`}>Reg No. & Year</th>
            </tr>
          </thead>
          <tbody>
            {formData.education.map((row: EducationRow, i: number) => (
              <tr key={i}>
                <td className={cellInput} style={{ height: "48px" }}>
                  <input
                    type="text"
                    value={row.courseTitle}
                    onChange={(e) =>
                      handleEducationChange(i, "courseTitle", e.target.value)
                    }
                    className={bareInput}
                  />
                </td>
                <td className={cellInput}>
                  <input
                    type="text"
                    value={row.subject}
                    onChange={(e) =>
                      handleEducationChange(i, "subject", e.target.value)
                    }
                    className={bareInput}
                  />
                </td>
                <td className={cellInput}>
                  <input
                    type="text"
                    value={row.universityBoard}
                    onChange={(e) =>
                      handleEducationChange(
                        i,
                        "universityBoard",
                        e.target.value,
                      )
                    }
                    className={bareInput}
                  />
                </td>
                <td className={cellInput}>
                  <input
                    type="text"
                    value={row.institutionStudied}
                    onChange={(e) =>
                      handleEducationChange(
                        i,
                        "institutionStudied",
                        e.target.value,
                      )
                    }
                    className={bareInput}
                  />
                </td>
                <td className={cellInput}>
                  <input
                    type="text"
                    value={row.classPercentage}
                    onChange={(e) =>
                      handleEducationChange(
                        i,
                        "classPercentage",
                        e.target.value,
                      )
                    }
                    className={bareInput}
                  />
                </td>
                <td className={cellInput}>
                  <input
                    type="text"
                    value={row.regNoYear}
                    onChange={(e) =>
                      handleEducationChange(i, "regNoYear", e.target.value)
                    }
                    className={bareInput}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ══ PART-G: DECLARATION ══ */}
        <p className="text-[13px] font-bold font-serif mt-6 mb-1">
          PART-G: DECLARATION
        </p>
        <p className="text-[13px] font-bold text-center font-serif mb-2">
          Declaration by the prospective employee
        </p>
        <p className="text-[12.5px] text-justify leading-relaxed font-serif mb-6 indent-8">
          The information furnished by me in this joining report is correct to
          the best of my knowledge and are based on valid documents. I also
          hereby produce the original documents in respect of all the
          information given below before the reporting officer for verification.
          I am also aware of the fact that penal action would be taken against
          me if any of the information provided by me is found fraudulent.
        </p>

        {/* Station / Date / Name / Signature */}
        <div className="grid grid-cols-2 gap-x-16 gap-y-4 mt-4">
          <div className="flex items-end gap-2">
            <span className="text-[12.5px] font-serif whitespace-nowrap">
              Station:
            </span>
            <input
              type="text"
              value={formData.station}
              onChange={(e) => handleChange("station", e.target.value)}
              className="flex-1 border-b border-black bg-transparent outline-none text-[12.5px] font-serif"
            />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-[12.5px] font-serif whitespace-nowrap">
              Name
            </span>
            <input
              type="text"
              value={formData.declarationName}
              onChange={(e) => handleChange("declarationName", e.target.value)}
              className="flex-1 border-b border-black bg-transparent outline-none text-[12.5px] font-serif"
            />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-[12.5px] font-serif whitespace-nowrap">
              Date
            </span>
            <input
              type="date"
              value={formData.declarationDate}
              onChange={(e) => handleChange("declarationDate", e.target.value)}
              className="flex-1 border-b border-black bg-transparent outline-none text-[12.5px] font-serif"
            />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-[12.5px] font-serif whitespace-nowrap">
              Signature
            </span>
            <label className="flex-1 cursor-pointer">
              <div className="border-b border-black h-8 w-full flex items-center justify-end overflow-hidden relative group">
                {declarationSig ? (
                  <>
                    <img
                      src={declarationSig}
                      alt="Signature"
                      className="max-h-full max-w-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setDeclarationSig(null);
                      }}
                      className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <span className="text-[10px] text-gray-400 font-serif group-hover:text-gray-600 transition-colors">
                    Click to upload
                  </span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, setDeclarationSig)}
              />
            </label>
          </div>
        </div>

        {/* ══ PART-H: VERIFICATION ══ */}
        <p className="text-[13px] font-bold font-serif mt-8 mb-4">
          PART-H: VERIFICATION{" "}
          <span className="font-normal">(For office use)</span>
        </p>

        <p className="text-[12.5px] font-serif mb-12 ml-16">
          Verified the original documents and found eligible for admission to
          duty.
        </p>

        <div className="text-right mb-10">
          <p className="text-[12.5px] font-bold font-serif">
            Name &amp; dated signature of the
          </p>
          <p className="text-[12.5px] font-bold font-serif">
            Reporting Officer
          </p>
          <div className="border-b border-black w-48 ml-auto mt-6" />
        </div>

        <p className="text-[12.5px] font-serif mb-12 ml-16">
          Admitted to duty. Employee details may be furnished into SPARK and PEN
          obtained.
        </p>

        <div className="text-right">
          <p className="text-[12.5px] font-bold font-serif">
            Name and dated signature of the
          </p>
          <p className="text-[12.5px] font-bold font-serif">
            Appointing Authority
          </p>
          <div className="border-b border-black w-48 ml-auto mt-6" />
        </div>

        {/* ── Submit button ── */}
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={handleSubmitClick}
            disabled={isSubmitting}
            className="px-8 py-2 border border-black text-[13px] font-serif bg-white hover:bg-gray-50 cursor-pointer tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2 justify-center">
                <svg
                  className="animate-spin w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Form"
            )}
          </button>
        </div>
      </div>

      {/* ── Confirmation Modal — outside the padded container so overlay covers full screen ── */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white border border-black w-80 p-6 font-serif">
            <h2 className="text-[14px] font-bold font-serif mb-3 text-center">
              Confirm Submission
            </h2>
            <p className="text-[12.5px] font-serif text-center leading-relaxed mb-5">
              Are you sure you want to submit the Joining Report? Please ensure
              all details are correct before proceeding.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-5 py-1.5 border border-black text-[12.5px] font-serif bg-white hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-5 py-1.5 border border-black text-[12.5px] font-serif bg-black text-white hover:bg-gray-800 cursor-pointer"
              >
                OK, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
