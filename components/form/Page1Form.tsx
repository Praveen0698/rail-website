/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

interface Page2Props {
  formData: any;
  setFormData: any;
  sig1: any;
  sig2: any;
  photo: any;
  setSig1: any;
  setSig2: any;
  setPhoto: any;
  handleChange: (field: string, value: string) => void;
}

export default function Page2Form({
  formData,
  handleChange,
  setFormData,
  sig1,
  sig2,
  photo,
  setSig1,
  setSig2,
  setPhoto,
}: Page2Props) {
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

  const handleEmpCode = (index: any, value: any) => {
    if (value.length > 1) return;
    const updated = [...formData.employeeCode];
    updated[index] = value;
    setFormData((prev: any) => ({ ...prev, employeeCode: updated }));
  };

  const cellLabel =
    "border border-black px-1.5 py-1 align-middle text-[12.5px] leading-snug font-serif bg-white";
  const cellInput =
    "border border-black px-1.5 py-1 align-middle text-[12.5px] font-serif";
  const bareInput =
    "w-full bg-transparent outline-none border-none text-[12.5px] font-serif py-0.5";

  return (
    <div className="min-h-screen bg-white p-5 font-serif text-black text-[13px]">
      <div className="relative max-w-3xl mx-auto border border-gray-400 px-8 py-6 bg-white">
        {/* Page number */}
        <span className="absolute top-4 right-5 text-[13px]">1</span>

        {/* ── Title ── */}
        <div className="text-center mb-3">
          <h1 className="text-[15px] font-bold font-serif m-0">
            Indian Railway Human Resource Management System
          </h1>
          <h2 className="text-[13.5px] font-bold font-serif m-0">
            (JOINING REPORT-Fresh Appointment)
          </h2>
        </div>

        {/* ── Instruction ── */}
        <p className="text-[11.5px] text-justify leading-normal font-serif">
          <strong>Instruction</strong>: This form required to be duly filled up
          and submitted by the prospective employees while reporting for duty on
          fresh appointment. The Authorizing officer have prescribed the
          prospective employee reports for duty and the appointing authority
          required to counter approval the duly filled up form submitted by the
          prospective employee. After getting the form counter approval by the
          appointing authority the Subject Assistant will feed the data into
          HRMS and obtain Permanent Employee Number from the system and write
          down it in the box provided below for the purpose
        </p>

        {/* ── Specimen Signatures + Photo ── */}
        {/* ── Specimen Signatures + Photo ── */}
        <div className="flex items-end gap-4">
          {/* Two signature boxes */}
          <div className="flex-1 mr-20 mb-5">
            <p className="text-[11px] text-center italic font-serif mb-1">
              Signature shall not touch the lines
            </p>
            <div className="flex flex-row gap-10">
              {/* Signature 1 */}
              <div className="flex-1">
                <p className="text-[12.5px] font-bold font-serif mb-1">
                  Specimen Signature
                </p>
                <label className="block cursor-pointer">
                  <div className="border border-black h-14 w-full flex items-center justify-center overflow-hidden relative group">
                    {sig1 ? (
                      <>
                        <img
                          src={sig1}
                          alt="Signature 1"
                          className="max-h-full max-w-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setSig1(null);
                          }}
                          className="absolute top-0.5 right-0.5 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <span className="text-[10px] text-gray-400 font-serif group-hover:text-gray-600 transition-colors">
                        Click to upload signature
                      </span>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, setSig1)}
                  />
                </label>
              </div>

              {/* Signature 2 */}
              <div className="flex-1">
                <p className="text-[12.5px] font-bold font-serif mb-1">
                  Specimen Signature
                </p>
                <label className="block cursor-pointer">
                  <div className="border border-black h-14 w-full flex items-center justify-center overflow-hidden relative group">
                    {sig2 ? (
                      <>
                        <img
                          src={sig2}
                          alt="Signature 2"
                          className="max-h-full max-w-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setSig2(null);
                          }}
                          className="absolute top-0.5 right-0.5 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <span className="text-[10px] text-gray-400 font-serif group-hover:text-gray-600 transition-colors">
                        Click to upload signature
                      </span>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, setSig2)}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Photo box */}
          <label className="block cursor-pointer shrink-0">
            <div className="w-35 min-h-40 border border-black flex items-center justify-center text-center overflow-hidden relative group">
              {photo ? (
                <>
                  <img
                    src={photo}
                    alt="Passport photo"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setPhoto(null);
                    }}
                    className="absolute top-1 right-1 w-5 h-5 bg-black text-white text-[11px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    ×
                  </button>
                </>
              ) : (
                <span className="text-[11.5px] text-gray-500 font-serif p-2 group-hover:text-gray-700 transition-colors">
                  Affix a recently taken passport size photo
                </span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, setPhoto)}
            />
          </label>
        </div>

        {/* ══════════════════════════════
            PART-A  (For Office use)
        ══════════════════════════════ */}
        <p className="text-[13px] font-serif mb-0">
          <strong>PART-A</strong>{" "}
          <span className="font-normal">(For Office use)</span>
        </p>

        <table className="w-full border-collapse mt-0">
          <tbody>
            {/* Employee Code */}
            <tr>
              <td className={`${cellLabel} w-36`}>Employee Code</td>
              <td className={cellInput}>
                <div className="flex gap-1">
                  {formData.employeeCode.map((val: any, i: any) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={val}
                      onChange={(e) => handleEmpCode(i, e.target.value)}
                      className="w-7 h-7 border border-black text-center text-[13px] font-serif outline-none bg-white"
                    />
                  ))}
                </div>
              </td>
            </tr>

            {/* Department + Office */}
            <tr>
              <td className={cellLabel}>Department</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => handleChange("department", e.target.value)}
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>Office</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.office}
                  onChange={(e) => handleChange("office", e.target.value)}
                  className={bareInput}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* ══════════════════════════════
            PART-B  PERSONAL DETAILS
        ══════════════════════════════ */}
        <p className="text-[13px] font-bold font-serif mt-3 mb-0">
          PART-B: PERSONAL DETAILS
        </p>
        <p className="text-[13px] font-bold underline font-serif mb-0">
          (To be filled up by the prospective employee)
        </p>

        <table className="w-full border-collapse">
          <tbody>
            {/* Name */}
            <tr>
              <td className={`${cellLabel} w-44`}>
                Name
                <br />
                <span className="text-[11px] italic font-normal">
                  (In capital letters and initials after the name)
                </span>
              </td>
              <td className={cellInput} colSpan={3}>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Date of Birth + Sex */}
            <tr>
              <td className={cellLabel}>Date of birth</td>
              <td className={cellInput}>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>Sex</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.sex}
                  onChange={(e) => handleChange("sex", e.target.value)}
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Name of Father */}
            <tr>
              <td className={cellLabel}>Name of father</td>
              <td className={cellInput} colSpan={3}>
                <input
                  type="text"
                  value={formData.nameOfFather}
                  onChange={(e) => handleChange("nameOfFather", e.target.value)}
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Name of Mother */}
            <tr>
              <td className={cellLabel}>Name of Mother</td>
              <td className={cellInput} colSpan={3}>
                <input
                  type="text"
                  value={formData.nameOfMother}
                  onChange={(e) => handleChange("nameOfMother", e.target.value)}
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Nationality + State */}
            <tr>
              <td className={cellLabel}>Nationality</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => handleChange("nationality", e.target.value)}
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>State</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Caste + Religion */}
            <tr>
              <td className={cellLabel}>Caste</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.caste}
                  onChange={(e) => handleChange("caste", e.target.value)}
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>Religion</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.religion}
                  onChange={(e) => handleChange("religion", e.target.value)}
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Category + Physically Handicapped */}
            <tr>
              <td className={cellLabel}>
                Category
                <br />
                <span className="text-[11px] italic font-normal">
                  General/ SC/ST/OBC/OEC
                </span>
              </td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>
                Whether physically
                <br />
                handicapped (yes or no)
              </td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.physicallyHandicapped}
                  onChange={(e) =>
                    handleChange("physicallyHandicapped", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Ex-Servicemen + PAN */}
            <tr>
              <td className={cellLabel}>Whether ex-servicemen? (yes or no)</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.exServicemen}
                  onChange={(e) => handleChange("exServicemen", e.target.value)}
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>PAN Number</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.panNumber}
                  onChange={(e) => handleChange("panNumber", e.target.value)}
                  className={bareInput}
                  maxLength={10}
                />
              </td>
            </tr>

            {/* Voter ID + Ration Card */}
            <tr>
              <td className={cellLabel}>Voter ID Card Number</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.voterIdCardNumber}
                  onChange={(e) =>
                    handleChange("voterIdCardNumber", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>Ration Card Number</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.rationCardNumber}
                  onChange={(e) =>
                    handleChange("rationCardNumber", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Identification Marks — 2 rows, merged label */}
            <tr>
              <td className={cellLabel} rowSpan={2}>
                Identifications marks of the prospective employee
              </td>
              <td className={cellInput} colSpan={3}>
                <div className="flex items-center gap-2">
                  <span className="text-[12.5px] font-serif shrink-0">1</span>
                  <input
                    type="text"
                    value={formData.identificationMark1}
                    onChange={(e) =>
                      handleChange("identificationMark1", e.target.value)
                    }
                    className={bareInput}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className={cellInput} colSpan={3}>
                <div className="flex items-center gap-2">
                  <span className="text-[12.5px] font-serif shrink-0">2</span>
                  <input
                    type="text"
                    value={formData.identificationMark2}
                    onChange={(e) =>
                      handleChange("identificationMark2", e.target.value)
                    }
                    className={bareInput}
                  />
                </div>
              </td>
            </tr>

            {/* Height + Marital Status */}
            <tr>
              <td className={cellLabel}>Height</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.height}
                  onChange={(e) => handleChange("height", e.target.value)}
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>
                Marital status
                <br />
                <span className="text-[11px] italic font-normal">
                  (unmarried/married/divorced)
                </span>
              </td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.maritalStatus}
                  onChange={(e) =>
                    handleChange("maritalStatus", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Spouse Name */}
            <tr>
              <td className={cellLabel}>Spouse&apos;s Name</td>
              <td className={cellInput} colSpan={3}>
                <input
                  type="text"
                  value={formData.spouseName}
                  onChange={(e) => handleChange("spouseName", e.target.value)}
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Spouse Religion + Caste */}
            <tr>
              <td className={cellLabel}>Spouse&apos;s religion</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.spouseReligion}
                  onChange={(e) =>
                    handleChange("spouseReligion", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>Spouse&apos;s caste</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.spouseCaste}
                  onChange={(e) => handleChange("spouseCaste", e.target.value)}
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Inter-religion + Spouse Employed */}
            <tr>
              <td className={cellLabel}>
                Whether inter religion/cast marriage (yes/no)
              </td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.interReligionCaste}
                  onChange={(e) =>
                    handleChange("interReligionCaste", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>Whether spouse is employed</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.spouseEmployed}
                  onChange={(e) =>
                    handleChange("spouseEmployed", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Spouse Organization */}
            <tr>
              <td className={cellLabel}>
                Spouse employed in (Specify organization)
              </td>
              <td className={cellInput} colSpan={3}>
                <input
                  type="text"
                  value={formData.spouseOrganization}
                  onChange={(e) =>
                    handleChange("spouseOrganization", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
