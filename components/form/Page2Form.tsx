/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

interface Page2Props {
  formData: any;
  handleChange: (field: string, value: string) => void;
}

export default function Page2Form({ formData, handleChange }: Page2Props) {
  const cellLabel =
    "border border-black px-1.5 py-1 align-middle text-[12.5px] leading-snug font-serif bg-white";
  const cellInput =
    "border border-black px-1.5 py-1 align-middle text-[12.5px] font-serif";
  const bareInput =
    "w-full bg-transparent outline-none border-none text-[12.5px] font-serif py-0.5";
  const headerCell =
    "border border-black px-1.5 py-1 text-[12.5px] font-bold font-serif text-center bg-white";

  return (
    <div className="min-h-screen bg-white p-5 font-serif text-black text-[13px]">
      <div className="relative max-w-3xl mx-auto border border-gray-400 px-8 py-6 bg-white">
        {/* Page number */}
        <span className="absolute top-4 right-5 text-[13px]">2</span>

        {/* ══ PART-C: CONTACT DETAILS ══ */}
        <p className="text-[13px] font-bold font-serif mb-2">
          PART-C: CONTACT DETAILS
        </p>

        <table className="w-full border-collapse">
          <tbody>
            {/* Header row */}
            <tr>
              <td className={`${headerCell} w-1/2`} colSpan={2}>
                Present Address
              </td>
              <td className={`${headerCell} w-1/2`} colSpan={2}>
                Permanent Address
              </td>
            </tr>

            {/* House No. and Name */}
            <tr>
              <td className={`${cellLabel} w-1/4`}>House No. and Name</td>
              <td className={`${cellInput} w-1/4`}>
                <input
                  type="text"
                  value={formData.presentHouseNo}
                  onChange={(e) =>
                    handleChange("presentHouseNo", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
              <td className={`${cellLabel} w-1/4`}>House No. and Name</td>
              <td className={`${cellInput} w-1/4`}>
                <input
                  type="text"
                  value={formData.permanentHouseNo}
                  onChange={(e) =>
                    handleChange("permanentHouseNo", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Street Name */}
            <tr>
              <td className={cellLabel}>Street Name</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.presentStreetName}
                  onChange={(e) =>
                    handleChange("presentStreetName", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>Street Name</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.permanentStreetName}
                  onChange={(e) =>
                    handleChange("permanentStreetName", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Place */}
            <tr>
              <td className={cellLabel}>Place</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.presentPlace}
                  onChange={(e) => handleChange("presentPlace", e.target.value)}
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>Place</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.permanentPlace}
                  onChange={(e) =>
                    handleChange("permanentPlace", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Pin */}
            <tr>
              <td className={cellLabel}>Pin</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.presentPin}
                  onChange={(e) => handleChange("presentPin", e.target.value)}
                  className={bareInput}
                  maxLength={6}
                />
              </td>
              <td className={cellLabel}>Pin</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.permanentPin}
                  onChange={(e) => handleChange("permanentPin", e.target.value)}
                  className={bareInput}
                  maxLength={6}
                />
              </td>
            </tr>

            {/* State */}
            <tr>
              <td className={cellLabel}>State</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.presentState}
                  onChange={(e) => handleChange("presentState", e.target.value)}
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>State</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.permanentState}
                  onChange={(e) =>
                    handleChange("permanentState", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>

            {/* District */}
            <tr>
              <td className={cellLabel}>District</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.presentDistrict}
                  onChange={(e) =>
                    handleChange("presentDistrict", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>District</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.permanentDistrict}
                  onChange={(e) =>
                    handleChange("permanentDistrict", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Taluk */}
            <tr>
              <td className={cellLabel}>Taluk</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.presentTaluk}
                  onChange={(e) => handleChange("presentTaluk", e.target.value)}
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>Taluk</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.permanentTaluk}
                  onChange={(e) =>
                    handleChange("permanentTaluk", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Village */}
            <tr>
              <td className={cellLabel}>Village</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.presentVillage}
                  onChange={(e) =>
                    handleChange("presentVillage", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>Village</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.permanentVillage}
                  onChange={(e) =>
                    handleChange("permanentVillage", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Phone No. */}
            <tr>
              <td className={cellLabel}>Phone No.</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.presentPhoneNo}
                  onChange={(e) =>
                    handleChange("presentPhoneNo", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>Phone No.</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.permanentPhoneNo}
                  onChange={(e) =>
                    handleChange("permanentPhoneNo", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Home Town */}
            <tr>
              <td className={cellLabel}>Home Town</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.presentHomeTown}
                  onChange={(e) =>
                    handleChange("presentHomeTown", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>Home Town</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.permanentHomeTown}
                  onChange={(e) =>
                    handleChange("permanentHomeTown", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Mobile + Email — separate table with gap */}
        <table className="w-full border-collapse mt-2">
          <tbody>
            <tr>
              <td className={`${cellLabel} w-1/4`}>Mobile No.</td>
              <td className={`${cellInput} w-1/4`}>
                <input
                  type="text"
                  value={formData.mobileNo}
                  onChange={(e) => handleChange("mobileNo", e.target.value)}
                  className={bareInput}
                  maxLength={10}
                />
              </td>
              <td className={`${cellLabel} w-1/4`}>Email address</td>
              <td className={`${cellInput} w-1/4`}>
                <input
                  type="email"
                  value={formData.emailAddress}
                  onChange={(e) => handleChange("emailAddress", e.target.value)}
                  className={bareInput}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* ══ PART-D: RECRUITMENT DETAILS ══ */}
        <p className="text-[13px] font-bold font-serif mt-4 mb-2">
          PART-D: RECRUITMENT DETAILS
        </p>

        <table className="w-full border-collapse">
          <tbody>
            {/* Source + Type */}
            <tr>
              <td className={`${cellLabel} w-1/4`}>
                Source
                <br />
                <span className="text-[11px] italic font-normal">
                  (Advertisement no.)
                </span>
              </td>
              <td className={`${cellInput} w-1/4`}>
                <input
                  type="text"
                  value={formData.source}
                  onChange={(e) => handleChange("source", e.target.value)}
                  className={bareInput}
                />
              </td>
              <td className={`${cellLabel} w-1/4`}>
                Type
                <br />
                <span className="text-[11px] italic font-normal">
                  (General or Special recruitment)
                </span>
              </td>
              <td className={`${cellInput} w-1/4`}>
                <input
                  type="text"
                  value={formData.recruitmentType}
                  onChange={(e) =>
                    handleChange("recruitmentType", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Method + Scale of Pay */}
            <tr>
              <td className={cellLabel}>
                Method{" "}
                <span className="text-[11px] italic font-normal">
                  (Direct/ By transfer)
                </span>
              </td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.method}
                  onChange={(e) => handleChange("method", e.target.value)}
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>Scale of Pay</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.scaleOfPay}
                  onChange={(e) => handleChange("scaleOfPay", e.target.value)}
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Advice Memo No. + Date */}
            <tr>
              <td className={cellLabel}>Advice Memo No.</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.adviceMemoNo}
                  onChange={(e) => handleChange("adviceMemoNo", e.target.value)}
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>Advice Memo date</td>
              <td className={cellInput}>
                <input
                  type="date"
                  value={formData.adviceMemoDate}
                  onChange={(e) =>
                    handleChange("adviceMemoDate", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>

            {/* District Recruitment + Direct Recruitment Circular */}
            <tr>
              <td className={cellLabel}>Is District recruitment (Y/N)</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.districtRecruitment}
                  onChange={(e) =>
                    handleChange("districtRecruitment", e.target.value)
                  }
                  className={bareInput}
                  maxLength={1}
                />
              </td>
              <td className={cellLabel}>
                If Direct recruitment specifies the circular number
              </td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.directRecruitmentCircular}
                  onChange={(e) =>
                    handleChange("directRecruitmentCircular", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Serial No. + Entry Category */}
            <tr>
              <td className={cellLabel}>Serial No. in the advice memo</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.serialNoAdviceMemo}
                  onChange={(e) =>
                    handleChange("serialNoAdviceMemo", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>Entry category</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.entryCategory}
                  onChange={(e) =>
                    handleChange("entryCategory", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Appointment Order No. + Date */}
            <tr>
              <td className={cellLabel}>Appointment Order No.</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.appointmentOrderNo}
                  onChange={(e) =>
                    handleChange("appointmentOrderNo", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>Appointment Order date</td>
              <td className={cellInput}>
                <input
                  type="date"
                  value={formData.appointmentOrderDate}
                  onChange={(e) =>
                    handleChange("appointmentOrderDate", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* ══ PART-E: ALREADY WORKING ══ */}
        <p className="text-[13px] font-bold font-serif mt-4 mb-2">
          PART-E: IF ALREADY WORKING IN GOVERNMENT or PRIVATE AGENCIES, GIVE
          DETAILS
        </p>

        <table className="w-full border-collapse">
          <tbody>
            {/* Department + Designation */}
            <tr>
              <td className={`${cellLabel} w-1/4`}>Department</td>
              <td className={`${cellInput} w-1/4`}>
                <input
                  type="text"
                  value={formData.prevDepartment}
                  onChange={(e) =>
                    handleChange("prevDepartment", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
              <td className={`${cellLabel} w-1/4`}>Designation</td>
              <td className={`${cellInput} w-1/4`}>
                <input
                  type="text"
                  value={formData.prevDesignation}
                  onChange={(e) =>
                    handleChange("prevDesignation", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Relieving Order No. + Date */}
            <tr>
              <td className={cellLabel}>Relieving Order No.</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.relievingOrderNo}
                  onChange={(e) =>
                    handleChange("relievingOrderNo", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>Relieving Order Date</td>
              <td className={cellInput}>
                <input
                  type="date"
                  value={formData.relievingOrderDate}
                  onChange={(e) =>
                    handleChange("relievingOrderDate", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Office Last Worked + Earlier Recruiting Agency */}
            <tr>
              <td className={cellLabel}>Office last worked</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.officeLastWorked}
                  onChange={(e) =>
                    handleChange("officeLastWorked", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>Earlier Recruiting agency</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.earlierRecruitingAgency}
                  onChange={(e) =>
                    handleChange("earlierRecruitingAgency", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Earlier Advice Memo No. + Date */}
            <tr>
              <td className={cellLabel}>Earlier Advice Memo No</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.earlierAdviceMemoNo}
                  onChange={(e) =>
                    handleChange("earlierAdviceMemoNo", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>Earlier Advice Memo Date</td>
              <td className={cellInput}>
                <input
                  type="date"
                  value={formData.earlierAdviceMemoDate}
                  onChange={(e) =>
                    handleChange("earlierAdviceMemoDate", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
            </tr>

            {/* Earlier Appointment Order No. + Date */}
            <tr>
              <td className={cellLabel}>Earlier Appointment Order No.</td>
              <td className={cellInput}>
                <input
                  type="text"
                  value={formData.earlierAppointmentOrderNo}
                  onChange={(e) =>
                    handleChange("earlierAppointmentOrderNo", e.target.value)
                  }
                  className={bareInput}
                />
              </td>
              <td className={cellLabel}>Earlier Appointment Order Date</td>
              <td className={cellInput}>
                <input
                  type="date"
                  value={formData.earlierAppointmentOrderDate}
                  onChange={(e) =>
                    handleChange("earlierAppointmentOrderDate", e.target.value)
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
