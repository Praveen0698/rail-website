"use client";

import React, { useState } from "react";

const PageOne = () => {
  const [selected, setSelected] = useState("");
  const [selectedLang, setSelectedLang] = useState("");
  const [sign1, setSign1] = useState<string | null>(null);
  const [sign2, setSign2] = useState<string | null>(null);
  const [thumbs, setThumbs] = useState<(string | null)[]>([null, null, null]);
  const [signature, setSignature] = useState<string | null>(null);

  const handleUploadSign = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setSignature(imageUrl);
  };

  const handleUploadThumb = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    const updated = [...thumbs];
    updated[index] = imageUrl;
    setThumbs(updated);
  };

  const handleUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "one" | "two",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    if (type === "one") setSign1(imageUrl);
    else setSign2(imageUrl);
  };

  const languages = ["Odia", "Telugu", "Hindi", "English"];
  const options = ["DD", "Pay order", "IPO"];

  return (
    <div className="bg-white w-full max-w-4xl mx-auto p-4 sm:p-8 md:p-12 lg:p-20 text-[14px] leading-relaxed">
      <h1 className="text-center font-bold text-[16px]">
        RAILWAY RECRUITMENT CELL, INDIAN RAILWAY
      </h1>
      <h2 className="text-center font-semibold text-[14px]">
        APPLICATION FORM
      </h2>

      {/* Changed: flex justify-between → flex flex-col sm:flex-row justify-between gap-4 */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="w-full sm:w-[60%]">
          <p>To</p>
          <p className="font-semibold">
            Dy.Chief Personnel Officer (Recruitment),
          </p>
          <p>Railway Recruitment Cell, Indian Railway Headquarters,</p>
          <p>C-57/G, Rail Vihar, Chandrasekharpur, Bhubaneswar-751023</p>
        </div>

        {/* Changed: w-[35%] → w-full sm:w-[35%] */}
        <div className="w-full sm:w-[35%] border">
          <div className="text-center font-semibold border-b py-1">
            For office use only
          </div>
          <div className="flex border-b">
            <div className="w-1/2 border-r p-1">Control Number</div>
            <input type="text" className="w-1/2 p-1.5 outline-none" />
          </div>
          <div className="flex">
            <div className="w-1/2 border-r p-1">Roll Number</div>
            <input type="text" className="w-1/2 p-1.5 outline-none" />
          </div>
        </div>
      </div>

      <p className="mt-4 text-[13px]">
        <span className="font-semibold">(Note:</span> Application to be filled
        by the candidate in own handwriting using black ink ball point pen.{" "}
        <span className="font-semibold underline">
          All Columns are to be filled compulsorily
        </span>{" "}
        by all applicants, except columns 6, 7 & 10 by the relevant candidates
        only.)
      </p>

      <p className="mt-3">
        <span className="font-semibold">Sub:</span>{" "}
        <span className="underline font-semibold">
          Application for Recruitment to the Post(s) under Employment
          Notification
        </span>
      </p>

      <p className="mt-2 mb-4 text-justify">
        I hereby apply for recruitment to the posts mentioned in the above
        notification and furnish the following particulars:
      </p>

      <div className="mb-4">
        <p className="font-semibold mb-2">
          1. Full Name of the Candidate{" "}
          <span className="font-normal">
            (in capital letters as it appears in school certificate):
          </span>
        </p>
        {/* Changed: overflow-x-auto wrapper added for small screens */}
        <div className="overflow-x-auto scrollbar-hide">
          <table className="border-collapse">
            <tbody>
              {[0, 1].map((row) => (
                <tr key={row}>
                  {Array.from({ length: 20 }).map((_, colIndex) => (
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
      </div>

      {/* Changed: flex items-center gap-4 → flex flex-col sm:flex-row items-start sm:items-center gap-4 */}
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="font-semibold sm:w-62.5">
          2. Two marks of physical identification:
        </p>
        <div className="flex w-full">
          <div className="flex items-start border w-1/2">
            <span className="px-2">(i)</span>
            <input className="w-full p-1.5 outline-none" />
          </div>
          <div className="flex items-start border border-l-0 w-1/2">
            <span className="px-2">(ii)</span>
            <input className="w-full p-1.5 outline-none" />
          </div>
        </div>
      </div>

      {/* Changed: flex flex-row justify-between gap-10 → flex flex-col md:flex-row justify-between gap-4 md:gap-10 */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4 lg:gap-10 mb-4">
        {/* Q3 */}
        <div className="flex flex-col gap-1 w-full lg:w-auto">
          <div className="p-1 font-semibold">3. Priority of Category</div>
          <div className="overflow-x-auto scrollbar-hide">
            <table className="border-collapse">
              <tbody>
                <tr>
                  <td className="border p-1 text-xs">Category Code</td>
                  <td className="border p-1">
                    <input
                      type="text"
                      className="w-15 h-5 text-center outline-none"
                    />
                  </td>
                  <td className="border p-1">
                    <input
                      type="text"
                      className="w-15 h-5 text-center outline-none"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 text-xs">Priority</td>
                  <td className="border p-1">1st</td>
                  <td className="border p-1">2nd</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Q4 */}
        <div className="flex flex-col gap-1 w-full lg:w-auto">
          <div className="p-1 font-semibold">
            4. Priority of Division/Workshop for appointment
          </div>
          <div className="overflow-x-auto scrollbar-hide">
            <table className="border-collapse">
              <tbody>
                <tr>
                  <td className="border p-1 text-xs whitespace-nowrap">
                    Recruitemnt Unit Code
                  </td>
                  <td className="border p-1">
                    <input
                      type="text"
                      className="w-15 h-5 text-center outline-none"
                    />
                  </td>
                  <td className="border p-1">
                    <input
                      type="text"
                      className="w-15 h-5 text-center outline-none"
                    />
                  </td>
                  <td className="border p-1">
                    <input
                      type="text"
                      className="w-15 h-5 text-center outline-none"
                    />
                  </td>
                  <td className="border p-1">
                    <input
                      type="text"
                      className="w-15 h-5 text-center outline-none"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border p-1 text-xs">Priority</td>
                  <td className="border p-1">1st</td>
                  <td className="border p-1">2nd</td>
                  <td className="border p-1">3rd</td>
                  <td className="border p-1">4th</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Changed: flex flex-row justify-between gap-10 → flex flex-col md:flex-row justify-between gap-4 md:gap-10 */}
      <div className="mb-4 flex flex-col md:flex-row justify-between gap-4 md:gap-10">
        <p className="font-semibold">
          5. Language Odia Telugu Hindi English . Medium of written examination
          question paper (select one medium):
        </p>
        <div className="overflow-x-auto scrollbar-hide w-full">
          <table className="border-collapse w-full">
            <tbody>
              <tr>
                <td className="border p-1 text-center text-xs w-1/5">
                  language
                </td>
                {languages.map((lang) => (
                  <td key={lang} className="border text-center p-1 text-xs">
                    {lang}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border p-1 text-center text-xs">
                  Select option
                </td>
                {languages.map((lang) => (
                  <td
                    key={lang}
                    className="border p-1 text-center align-middle"
                  >
                    <label className="flex items-center justify-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="language"
                        value={lang}
                        checked={selectedLang === lang}
                        onChange={() => setSelectedLang(lang)}
                        className="w-4 h-4 accent-black"
                      />
                      <span className="text-xs">Select</span>
                    </label>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-4">
        <p className="font-semibold">
          6. For serving Railway employees (Certificate in proof of status to be
          furnished for availing age relaxation):
        </p>
        <div className="overflow-x-auto scrollbar-hide">
          <table className="border-collapse w-full">
            <tbody>
              <tr>
                <td className="border p-1 text-center text-xs w-1/5">
                  Designation
                </td>
                <td className="border text-center p-1 text-xs">
                  Department / Railway office with address
                </td>
                <td className="border text-center p-1 text-xs">
                  Number of years of service
                </td>
              </tr>
              <tr>
                <td className="border p-1 text-xs">
                  <input
                    type="text"
                    className="h-5 text-center outline-none w-full"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="text"
                    className="h-5 text-center outline-none w-full"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="text"
                    className="h-5 text-center outline-none w-full"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-4">
        <p className="font-semibold">
          7. For Ex-Servicemen [ONLY those who did not yet avail government
          employment under ex.servicemen quota] (Certificate in proof to be
          furnished for availing age relaxation & ex.servicemen quota
          vacancies):
        </p>
        <div className="overflow-x-auto scrollbar-hide">
          <table className="border-collapse w-full">
            <tbody>
              <tr>
                <td className="border p-1 text-center text-xs">
                  Enrolment date
                </td>
                <td className="border text-center p-1 text-xs">
                  Attestation date
                </td>
                <td className="border text-center p-1 text-xs">
                  State unit with address
                </td>
                <td className="border text-center p-1 text-xs">
                  Discharge / Retirement date
                </td>
                <td className="border text-center p-1 text-xs">
                  Length of Service (Years, Months)
                </td>
              </tr>
              <tr>
                <td className="border p-1 text-xs">
                  <input
                    type="text"
                    className="h-5 text-center outline-none w-full"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="text"
                    className="h-5 text-center outline-none w-full"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="text"
                    className="h-5 text-center outline-none w-full"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="text"
                    className="h-5 text-center outline-none w-full"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="text"
                    className="h-5 text-center outline-none w-full"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-4">
        <p className="font-semibold">
          8. List of Enclosures (as applicable and explained in the
          instructions):
        </p>
        <div className="flex w-full">
          <div className="flex items-start border w-1/2">
            <span className="px-2">a.</span>
            <input className="w-full p-1.5 outline-none" />
          </div>
          <div className="flex items-start border border-l-0 w-1/2">
            <span className="px-2">b.</span>
            <input className="w-full p-1.5 outline-none" />
          </div>
          <div className="flex items-start border border-l-0 w-1/2">
            <span className="px-2">c.</span>
            <input className="w-full p-1.5 outline-none" />
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex items-start border border-t-0 w-1/2">
            <span className="px-2">d.</span>
            <input className="w-full p-1.5 outline-none" />
          </div>
          <div className="flex items-start border border-t-0 border-l-0 w-1/2">
            <span className="px-2">e.</span>
            <input className="w-full p-1.5 outline-none" />
          </div>
          <div className="flex items-start border border-t-0 border-l-0 w-1/2">
            <span className="px-2">f.</span>
            <input className="w-full p-1.5 outline-none" />
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-col">
        <p className="font-semibold">
          9. Full Sample signatures in running script in English or Hindi:
        </p>
        {/* Changed: w-4/5 → w-full sm:w-4/5 */}
        <div className="flex w-full sm:w-4/5 gap-5 mt-2">
          <div className="flex flex-row gap-1 w-1/2 items-end">
            <span className="px-2">(i)</span>
            <label
              className={`relative ${!sign1 && "border-b"} w-full h-12 cursor-pointer flex items-end`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleUpload(e, "one")}
                className="hidden"
              />
              {sign1 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={sign1}
                  alt="Signature 1"
                  className="absolute bottom-0 h-10 object-contain"
                />
              ) : (
                <span className="text-xs text-gray-400 absolute bottom-0">
                  Upload
                </span>
              )}
            </label>
          </div>
          <div className="flex flex-row gap-1 w-1/2 items-end">
            <span className="px-2">(ii)</span>
            <label
              className={`relative ${!sign2 && "border-b"} w-full h-12 cursor-pointer flex items-end`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleUpload(e, "two")}
                className="hidden"
              />
              {sign2 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={sign2}
                  alt="Signature 2"
                  className="absolute bottom-0 h-10 object-contain"
                />
              ) : (
                <span className="text-xs text-gray-400 absolute bottom-0">
                  Upload
                </span>
              )}
            </label>
          </div>
        </div>
      </div>

      <div className="mb-4">
        {/* Changed: flex justify-between items-end mb-1.5 → flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-1.5 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-1.5">
          <p className="font-semibold">10. Examination Fees Paid through:</p>
          {/* Changed: w-3/5 mr-10 → w-full sm:w-3/5 sm:mr-10 */}
          <div className="flex justify-between gap-2 sm:gap-5 w-full sm:w-3/5 sm:mr-10">
            {options.map((option) => (
              <div key={option} className="flex flex-row w-full">
                <div className="flex items-center border border-r-0 w-1/2 p-1 sm:p-1.5">
                  <span className="text-xs sm:text-sm">{option}</span>
                </div>
                <div className="flex items-center justify-center p-1 sm:p-1.5 border w-1/2">
                  <input
                    type="radio"
                    name="paymentMode"
                    value={option}
                    checked={selected === option}
                    onChange={() => setSelected(option)}
                    className="w-4 h-4 mr-1 accent-black"
                  />
                  <span className="text-xs sm:text-sm">Select</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <table className="border-collapse w-full">
            <tbody>
              <tr>
                <td className="border p-1 text-center text-xs">
                  Bank / P.O name/ location
                </td>
                <td className="border text-center p-1 text-xs">
                  DD / Pay Order / IPO No.
                </td>
                <td className="border text-center p-1 text-xs">Date</td>
                <td className="border text-center p-1 text-xs">Amount (Rs.)</td>
              </tr>
              <tr>
                <td className="border p-1 w-5/12">
                  <input
                    type="text"
                    className="h-5 text-center outline-none w-full"
                  />
                </td>
                <td className="border p-1 w-5/12">
                  <input
                    type="text"
                    className="h-5 text-center outline-none w-full"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="text"
                    className="h-5 text-center outline-none w-full"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="text"
                    className="h-5 text-center outline-none w-full"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-4">
        <p className="font-semibold">
          11. Left thumb impression of the candidate (After applying ink on the
          left thumb once, three impressions are to be made one after the other
          in the three boxes without applying ink once again. Impressions should
          not be smudged.)
        </p>
        {/* Changed: w-3/5 → w-full sm:w-3/5 */}
        <div className="flex flex-row w-full sm:w-3/5 mt-2">
          {thumbs.map((thumb, index) => (
            <label
              key={index}
              className={`relative flex items-center justify-center border h-20 w-1/3 cursor-pointer ${
                index !== 2 ? "border-r-0" : ""
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleUploadThumb(e, index)}
                className="hidden"
              />
              {thumb ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={thumb}
                  alt={`Thumb ${index + 1}`}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-xs text-gray-400">Upload</span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Changed: flex flex-row items-center justify-between → flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 */}
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-row gap-1 items-end mb-1">
            <p className="font-semibold">12. Place:</p>
            <input type="text" className="w-1/2 p-1.5 outline-none border-b" />
          </div>
          <div className="flex flex-row gap-1 items-end mb-1">
            <p className="font-semibold">13. Date:</p>
            <input type="text" className="w-1/2 p-1.5 outline-none border-b" />
          </div>
        </div>

        <div className="text-center">
          <p className="font-semibold">14. Applicant&apos;s full signature</p>
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
    </div>
  );
};

export default PageOne;
