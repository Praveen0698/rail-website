"use client";

import React, { useState } from "react";

const religions = [
  "Hindu",
  "Muslim",
  "Sikh",
  "Christian",
  "Jain",
  "Buddhist",
  "Parsi",
  "Others",
];
const community = ["UR", "SC", "ST", "OBC"];
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const PageTwo = () => {
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedWidow, setSelectedWidow] = useState("");
  const [selectedReligion, setSelectedReligion] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [signature, setSignature] = useState<string | null>(null);

  const [nameGrid, setNameGrid] = useState<string[][]>([
    Array(16).fill(""),
    Array(16).fill(""),
  ]);
  const [fatherNameGrid, setFatherNameGrid] = useState<string[][]>([
    Array(14).fill(""),
    Array(14).fill(""),
  ]);
  const [topSignature, setTopSignature] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [designation, setDesignation] = useState("");
  const [dob, setDob] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [stateName, setStateName] = useState("");
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [signatureBase64, setSignatureBase64] = useState<string | null>(null);
  const [baseAddress, setBaseAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const formData = {
    name: nameGrid
      .map((r) => r.join(""))
      .join("")
      .trim(),
    fatherName: fatherNameGrid
      .map((r) => r.join(""))
      .join("")
      .trim(),
    designation,
    dob,
    bloodGroup,
    address: `${baseAddress}, State: ${stateName}, Pin: ${pin.join("")}`,
    photo: photoBase64,
    signature: signatureBase64,
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.fatherName) {
      alert("Please fill all required fields");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.error || "Submission failed");
        return;
      }
      alert("Application submitted successfully ✅");
      window.location.reload();
    } catch {
      alert("Something went wrong");
    }
    setSubmitting(false);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(URL.createObjectURL(file));
    setPhotoBase64(await toBase64(file));
  };

  const handleTopSignatureUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTopSignature(URL.createObjectURL(file));
    setSignatureBase64(await toBase64(file));
  };

  const handleNameCell = (row: number, col: number, val: string) => {
    const updated = nameGrid.map((r) => [...r]);
    updated[row][col] = val.slice(-1).toUpperCase();
    setNameGrid(updated);
  };

  const handleFatherNameCell = (row: number, col: number, val: string) => {
    const updated = fatherNameGrid.map((r) => [...r]);
    updated[row][col] = val.slice(-1).toUpperCase();
    setFatherNameGrid(updated);
  };

  const handleUploadSign = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSignature(URL.createObjectURL(file));
  };

  return (
    <div className="bg-white w-full max-w-4xl mx-auto p-4 sm:p-8 md:p-12 lg:p-20 text-[14px] leading-relaxed">
      <h1 className="text-center font-bold text-[16px]">
        RAILWAY RECRUITMENT CELL, EAST COAST RAILWAY
      </h1>
      <h2 className="text-center font-semibold text-[14px]">
        PERSONAL DATA SHEET
      </h2>

      {/* Changed: flex items-end justify-between → flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
        <div className="w-full sm:w-3/10">
          <p className="text-center">Roll Number (for office use only)</p>
          <div className="flex items-start border">
            <input className="w-full p-2 h-full outline-none" />
          </div>
        </div>
        <p className="font-semibold text-center underline mb-1">
          Employment Notice No. ECoR /RRC /D /2006/01
        </p>
        <div className="w-full sm:w-3/10">
          <p className="text-center">Control number (for office use only)</p>
          <div className="flex items-start border">
            <input className="w-full p-2 h-full outline-none" />
          </div>
        </div>
      </div>

      <p className="mt-2 text-[13px]">
        [To be filled by the candidate. Select option wherever required.{" "}
        <span className="font-semibold">
          All Columns are to be filled compulsorily,
        </span>{" "}
        except column 14 by relevant candidates only.]
      </p>

      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">
        <div className="w-full lg:w-auto">
          <div className="mb-4">
            <p className="font-semibold mb-2">
              1. Full Name of the Candidate{" "}
              <span className="font-normal">
                (in capital letters as it appears in school certificate):
              </span>
            </p>
            <div className="overflow-x-auto">
              <table className="border-collapse">
                <tbody>
                  {nameGrid.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      {Array.from({ length: 16 }).map((_, colIdx) => (
                        <td key={colIdx} className="border p-0">
                          <input
                            type="text"
                            maxLength={1}
                            value={row[colIdx]}
                            onChange={(e) =>
                              handleNameCell(rowIdx, colIdx, e.target.value)
                            }
                            className="w-9 h-8 text-center outline-none"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-4">
            <p className="font-semibold mb-2">2. Father / Husband Name:</p>
            <div className="overflow-x-auto">
              <table className="border-collapse">
                <tbody>
                  {fatherNameGrid.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      {Array.from({ length: 14 }).map((_, colIdx) => (
                        <td key={colIdx} className="border p-0">
                          <input
                            type="text"
                            maxLength={1}
                            value={row[colIdx]}
                            onChange={(e) =>
                              handleFatherNameCell(
                                rowIdx,
                                colIdx,
                                e.target.value,
                              )
                            }
                            className="w-9 h-8 text-center outline-none"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col items-start w-full">
            <div className="flex flex-row gap-5">
              <p className="font-semibold w-25">3. Sex:</p>
              <div className="w-55 border border-b-0 flex flex-row">
                <div className="flex items-center justify-center p-1.5 w-27.5 border-r">
                  <span className="mr-2">Male</span>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={selectedGender === "Male"}
                    onChange={() => setSelectedGender("Male")}
                    className="w-4 h-4 accent-black"
                  />
                </div>
                <div className="flex items-center justify-center p-1.5 w-27.5">
                  <span className="mr-2">Female</span>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={selectedGender === "Female"}
                    onChange={() => setSelectedGender("Female")}
                    className="w-4 h-4 accent-black"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-5">
              <p className="font-semibold w-25">4. Nationality:</p>
              <div className="flex items-start border w-55">
                <input className="w-full p-1.5 h-full outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Photo & signature — stacks below until lg */}
        <div className="flex flex-row lg:flex-col justify-start lg:justify-between items-start lg:items-center gap-4 lg:gap-0">
          <label className="relative w-[4cm] h-[5cm] border p-2.5 flex items-center justify-center cursor-pointer overflow-hidden shrink-0">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt="Photo"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <span className="text-[10px] text-center text-gray-400">
                Upload your recent passport size black & white photo, not older
                than one month as on date of application. Photo to be sharp &
                clear, with light background, suitable for scanning and
                printing. Photo to be in 4cm x 5cm size. Photo to be pasted
                firmly
              </span>
            )}
          </label>
          <div className="flex flex-col items-center justify-center">
            <label className="relative w-[5.2cm] h-[1.5cm] border flex items-center justify-center cursor-pointer overflow-hidden">
              <input
                type="file"
                accept="image/*"
                onChange={handleTopSignatureUpload}
                className="hidden"
              />
              {topSignature ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={topSignature}
                  alt="Signature"
                  className="absolute bottom-0 w-[98%] h-[98%] mx-auto object-contain"
                />
              ) : (
                <span className="text-[10px] text-gray-400">
                  Upload Signature
                </span>
              )}
            </label>
            <p className="text-[10px] w-[5cm] text-center">
              Applicant&apos;s full signature in English or Hindi in running
              script in the above box
            </p>
          </div>
        </div>
      </div>

      {/* Changed: flex items-center gap-4 → flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 */}
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <p className="font-semibold shrink-0">5. Designation:</p>
        <div className="flex items-start border w-full sm:flex-1">
          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full p-1.5 outline-none"
          />
        </div>
        <p className="font-semibold shrink-0">6. Date of Birth:</p>
        <div className="border">
          <input
            type="text"
            placeholder="DD/MM/YYYY"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="p-1.5 outline-none w-32"
          />
        </div>
      </div>

      {/* Changed: flex items-center gap-4 → flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 */}
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <p className="font-semibold shrink-0">7. Blood Group:</p>
        <div className="border">
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="p-1.5 outline-none bg-white"
          >
            <option value="">Select</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>
        <p className="font-semibold shrink-0">8. Education Qualifaction:</p>
        <input
          type="text"
          className="w-full sm:flex-1 h-10 text-center border outline-none text-sm"
        />
      </div>

      {/* Changed: flex flex-row justify-between → flex flex-col sm:flex-row justify-between gap-4 */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between w-full gap-4">
        <div className="w-full sm:w-[48%]">
          <p className="font-semibold mb-2">
            9. Full Mailing Address for Correspondence:
          </p>
          <div className="w-full h-37.5 border p-3 flex flex-col justify-between">
            <textarea className="w-full flex-1 resize-none outline-none text-sm" />
            <div className="mt-2">
              <div className="flex items-center gap-2 mb-2">
                <p className="font-semibold text-sm">State:</p>
                <input
                  type="text"
                  className="flex-1 p-1 border-b outline-none text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm">Pin:</p>
                <div className="flex gap-1.5">
                  {[...Array(6)].map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      className="w-7 h-7 text-center border outline-none text-sm"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[48%]">
          <p className="font-semibold mb-2">10. Full Permanent Address:</p>
          <div className="w-full h-37.5 border p-3 flex flex-col justify-between">
            <textarea
              value={baseAddress}
              onChange={(e) => setBaseAddress(e.target.value)}
              className="w-full flex-1 resize-none outline-none text-sm"
            />
            <div className="mt-2">
              <div className="flex items-center gap-2 mb-2">
                <p className="font-semibold text-sm">State:</p>
                <input
                  type="text"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="flex-1 p-1 border-b outline-none text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm">Pin:</p>
                <div className="flex gap-1.5">
                  {pin.map((digit, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const newPin = [...pin];
                        newPin[i] = e.target.value;
                        setPin(newPin);
                      }}
                      className="w-7 h-7 text-center border outline-none text-sm"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Changed: flex flex-row → flex flex-col sm:flex-row */}
      <div className="mb-4 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex flex-row items-center gap-2.5 w-full sm:w-2/5">
          <p className="font-semibold">11. State of Domicile Code:</p>
          <input
            type="text"
            className="w-20 h-10 text-center border outline-none text-sm"
          />
        </div>
        <div className="flex flex-row items-center gap-2.5 w-full sm:w-3/5">
          <p className="font-semibold">12. Nearest Railway Station:</p>
          <input
            type="text"
            className="flex-1 h-10 text-center border outline-none text-sm"
          />
        </div>
      </div>

      {/* Changed: flex flex-row → flex flex-col sm:flex-row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 gap-4 sm:gap-5 justify-between">
        <div className="w-full sm:w-3/5 flex flex-row gap-2.5 items-center">
          <p className="font-semibold mb-1">13. Community</p>
          <div className="overflow-x-auto w-full">
            <table className="w-full border border-collapse text-xs">
              <tbody>
                <tr>
                  {community.map((com) => (
                    <td key={com} className="border text-center p-2">
                      {com}
                    </td>
                  ))}
                </tr>
                <tr>
                  {community.map((com) => (
                    <td key={com} className="border text-center p-2">
                      <label className="flex flex-col items-center justify-center cursor-pointer">
                        <input
                          type="radio"
                          name="community"
                          value={com}
                          checked={selectedCommunity === com}
                          onChange={() => setSelectedCommunity(com)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-[10px] mt-1">Select</span>
                      </label>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2.5">
          <p className="font-semibold w-25">14. Select if your are:</p>
          <div className="w-55 border flex flex-row">
            <div className="flex items-center justify-center p-1.5 w-27.5 border-r">
              <span className="mr-2">Divorcee</span>
              <input
                type="radio"
                name="widow"
                value="Divorcee"
                checked={selectedWidow === "Divorcee"}
                onChange={() => setSelectedWidow("Divorcee")}
                className="w-4 h-4 accent-black"
              />
            </div>
            <div className="flex items-center justify-center p-1.5 w-27.5">
              <span className="mr-2">Widow</span>
              <input
                type="radio"
                name="widow"
                value="Widow"
                checked={selectedWidow === "Widow"}
                onChange={() => setSelectedWidow("Widow")}
                className="w-4 h-4 accent-black"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-col sm:flex-row gap-2.5 items-start sm:items-center">
        <p className="font-semibold mb-1">15. Religion</p>
        <div className="overflow-x-auto w-full sm:w-4/5">
          <table className="w-full border border-collapse text-xs">
            <tbody>
              <tr>
                {religions.map((religion) => (
                  <td key={religion} className="border text-center p-2">
                    {religion}
                  </td>
                ))}
              </tr>
              <tr>
                {religions.map((religion) => (
                  <td key={religion} className="border text-center p-2">
                    <label className="flex flex-col items-center justify-center cursor-pointer">
                      <input
                        type="radio"
                        name="religion"
                        value={religion}
                        checked={selectedReligion === religion}
                        onChange={() => setSelectedReligion(religion)}
                        className="w-4 h-4 accent-black"
                      />
                      <span className="text-[10px] mt-1">Select</span>
                    </label>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-4">
        <p className="font-semibold mb-2 w-full">
          16. Declaration:
          <span className="font-normal">
            &quot;I hereby declare that the facts and evidences given by me in
            the Application Form and Personal Data Sheet are true, complete and
            correct to the best of my knowledge and belief. In the event of any
            discrepancy in the particulars or any statement being found false at
            any stage, my candidature / service would be cancelled / terminated
            without any notice.&quot; (Above declaration is to be written below
            in the applicant&apos;s own running script in English):{" "}
          </span>
        </p>
        <div className="w-full">
          <input
            type="text"
            className="w-full p-1 border-b outline-none text-sm"
          />
          <input
            type="text"
            className="w-full p-1 border-b outline-none text-sm"
          />
          <input
            type="text"
            className="w-full p-1 border-b outline-none text-sm"
          />
          <input
            type="text"
            className="w-full p-1 border-b outline-none text-sm"
          />
        </div>
      </div>

      {/* Changed: flex flex-row items-center justify-between → flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 */}
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-row gap-1 items-end mb-1">
            <p className="font-semibold">17. Place:</p>
            <input type="text" className="w-1/2 p-1.5 outline-none border-b" />
          </div>
          <div className="flex flex-row gap-1 items-end mb-1">
            <p className="font-semibold">18. Date:</p>
            <input type="text" className="w-1/2 p-1.5 outline-none border-b" />
          </div>
        </div>

        <div className="text-center">
          <p className="font-semibold">19. Applicant&apos;s full signature</p>
          <p className="text-sm mb-1">
            (in English or Hindi in running script)
          </p>
          {/* Changed: w-64 → w-48 sm:w-64 */}
          <label
            className={`relative w-48 sm:w-64 h-12 ${!signature && "border-b"} flex items-center justify-center overflow-hidden cursor-pointer`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadSign}
              className="hidden"
            />
            {signature ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={signature}
                alt="Signature"
                className="absolute margin bottom-0 h-10 object-contain"
              />
            ) : (
              <span className="absolute bottom-0 text-xs text-gray-400">
                Upload
              </span>
            )}
          </label>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className={`px-10 py-2.5 border border-black font-semibold tracking-wide 
            ${submitting ? "bg-gray-300" : "bg-white hover:bg-gray-100"} 
            transition-all`}
        >
          {submitting ? "Submitting..." : "SUBMIT APPLICATION"}
        </button>
      </div>
    </div>
  );
};

export default PageTwo;
