"use client";

import React, { useState } from "react";

const PageTwo = () => {
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedWidow, setSelectedWidow] = useState("");

  const [selectedReligion, setSelectedReligion] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState("");
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
  const [signature, setSignature] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [topSignature, setTopSignature] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(URL.createObjectURL(file));
  };

  const handleTopSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTopSignature(URL.createObjectURL(file));
  };

  const handleUploadSign = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSignature(imageUrl);
  };
  return (
    <div className="bg-white w-3/5 p-20 text-[14px] leading-relaxed">
      <h1 className="text-center font-bold text-[16px]">
        RAILWAY RECRUITMENT CELL, EAST COAST RAILWAY
      </h1>
      <h2 className="text-center font-semibold text-[14px]">
        PERSONAL DATA SHEET
      </h2>

      <div className="flex items-end justify-between gap-2.5">
        <div className="w-3/10">
          <p className="text-center">Roll Number (for office use only)</p>
          <div className="flex items-start border">
            <input className="w-full p-2 h-full outline-none" />
          </div>
        </div>

        <p className="font-semibold underline mb-1">
          Employment Notice No. ECoR /RRC /D /2006/01
        </p>
        <div className="w-3/10">
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
        except column 12 by relevant candidates only.]
      </p>

      <div className="flex flex-row justify-between mb-4">
        <div>
          <div className="mb-4">
            <p className="font-semibold mb-2">
              1. Full Name of the Candidate{" "}
              <span className="font-normal">
                (in capital letters as it appears in school certificate):
              </span>
            </p>

            <table className="border-collapse">
              <tbody>
                {[0, 1].map((row) => (
                  <tr key={row}>
                    {Array.from({ length: 14 }).map((_, colIndex) => (
                      <td key={colIndex} className="border p-0">
                        <input
                          type="text"
                          maxLength={1}
                          className="w-9 h-8 text-center outline-none"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-4">
            <p className="font-semibold mb-2">2. Father / Husband Name:</p>

            <table className="border-collapse">
              <tbody>
                {[0, 1].map((row) => (
                  <tr key={row}>
                    {Array.from({ length: 14 }).map((_, colIndex) => (
                      <td key={colIndex} className="border p-0">
                        <input
                          type="text"
                          maxLength={1}
                          className="w-9 h-8 text-center outline-none"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
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
        <div className="flex flex-col justify-between items-center">
          <label className="relative w-[4cm] h-[5cm] border p-2.5 flex items-center justify-center cursor-pointer overflow-hidden">
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
              Applicant’s full signature in English or Hindi in running script
              in the above box
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-row justify-between w-full">
        <div className="w-[48%]">
          <p className="font-semibold mb-2">
            5. Full Mailing Address for Correspondence:
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
        <div className="w-[48%]">
          <p className="font-semibold mb-2">6. Full Permanent Address:</p>
          <div className="full h-37.5 border p-3 flex flex-col justify-between">
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
      </div>

      <div className="mb-4 w-full flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2.5 w-2/5">
          <p className="font-semibold">7. State of Domicile Code:</p>
          <input
            type="text"
            className="w-20 h-10 text-center border outline-none text-sm"
          />
        </div>
        <div className="flex flex-row items-center gap-2.5 w-3/5">
          <p className="font-semibold">8. Nearest Railway Station:</p>
          <input
            type="text"
            className="flex-1 h-10 text-center border outline-none text-sm"
          />
        </div>
      </div>
      <div className="mb-4 w-full flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2.5 w-3/5">
          <p className="font-semibold">9. Date of Birth:</p>
          <div className="flex flex-row">
            <div className="border border-r-0">
              <p className="text-center border-b w-10 h-5">d</p>
              <input
                type="text"
                className="w-10 h-7 text-center outline-none text-sm"
              />
            </div>
            <div className="border border-r-0">
              <p className="text-center border-b w-10 h-5">d</p>
              <input
                type="text"
                className="w-10 h-7 text-center outline-none text-sm"
              />
            </div>
            <div className="border border-r-0">
              <p className="text-center border-b w-10 h-5">m</p>
              <input
                type="text"
                className="w-10 h-7 text-center outline-none text-sm"
              />
            </div>
            <div className="border border-r-0">
              <p className="text-center border-b w-10 h-5">m</p>
              <input
                type="text"
                className="w-10 h-7 text-center outline-none text-sm"
              />
            </div>
            <div className="border border-r-0">
              <p className="text-center border-b w-10 h-5">y</p>
              <input
                type="text"
                className="w-10 h-7 text-center outline-none text-sm"
              />
            </div>
            <div className="border border-r-0">
              <p className="text-center border-b w-10 h-5">y</p>
              <input
                type="text"
                className="w-10 h-7 text-center outline-none text-sm"
              />
            </div>
            <div className="border border-r-0">
              <p className="text-center border-b w-10 h-5">y</p>
              <input
                type="text"
                className="w-10 h-7 text-center outline-none text-sm"
              />
            </div>
            <div className="border">
              <p className="text-center border-b w-10 h-5">y</p>
              <input
                type="text"
                className="w-10 h-7 text-center outline-none text-sm"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2.5 w-2/5">
          <p className="font-semibold">10. Education Qualifaction:</p>
          <input
            type="text"
            className="flex-1 h-10 text-center border outline-none text-sm"
          />
        </div>
      </div>

      <div className="flex flex-row items-center mb-4 gap-5 justify-between">
        <div className="w-3/5 flex flex-row gap-2.5 items-center">
          <p className="font-semibold mb-1">11. Community</p>

          <table className="w-full border border-collapse text-xs">
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
                      name="religion"
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
          </table>
        </div>
        <div className="flex flex-row items-center gap-2.5">
          <p className="font-semibold w-25">12. Select if your are:</p>
          <div className="w-55 border flex flex-row">
            <div className="flex items-center justify-center p-1.5 w-27.5 border-r">
              <span className="mr-2">Divorcee</span>
              <input
                type="radio"
                name="gender"
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
                name="gender"
                value="Widow"
                checked={selectedWidow === "Widow"}
                onChange={() => setSelectedWidow("Widow")}
                className="w-4 h-4 accent-black"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-row gap-2.5 items-center">
        <p className="font-semibold mb-1">13. Religion</p>

        <table className="w-4/5 border border-collapse text-xs">
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
        </table>
      </div>

      <div className="mb-4">
        <p className="font-semibold mb-2 w-full">
          14. Declaration:
          <span className="font-normal">
            “I hereby declare that the facts and evidences given by me in the
            Application Form and Personal Data Sheet are true, complete and
            correct to the best of my knowledge and belief. In the event of any
            discrepancy in the particulars or any statement being found false at
            any stage, my candidature / service would be cancelled / terminated
            without any notice.” (Above declaration is to be written below in
            the applicant’s own running script in English):{" "}
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
      <div className="mb-4 flex flex-row items-center justify-between">
        <div>
          <div className="flex flex-row gap-1 items-end mb-1">
            <p className="font-semibold">15. Place:</p>
            <input type="text" className="w-1/2 p-1.5 outline-none border-b" />
          </div>

          <div className="flex flex-row gap-1 items-end mb-1">
            <p className="font-semibold">16. Date:</p>
            <input type="text" className="w-1/2 p-1.5 outline-none border-b" />
          </div>
        </div>

        <div className="text-center">
          <p className="font-semibold">17. Applicant’s full signature</p>
          <p className="text-sm mb-1">
            (in English or Hindi in running script)
          </p>

          <label
            className={`relative w-64 h-12 ${!signature && "border-b"} flex items-center justify-center overflow-hidden cursor-pointer`}
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
    </div>
  );
};

export default PageTwo;
