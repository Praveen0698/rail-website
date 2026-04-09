/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

interface Page2Props {
  formData: any;
  handleChange: (field: string, value: string) => void;
}

export default function Page2Form({ formData, handleChange }: Page2Props) {
  const cellLabel =
    "block lg:table-cell border border-black px-1.5 py-1 align-middle text-[12.5px] leading-snug font-serif bg-gray-50 lg:bg-white";
  const cellInput =
    "block lg:table-cell border border-black px-1.5 py-1 align-middle text-[12.5px] font-serif w-full lg:w-auto";
  const bareInput =
    "w-full bg-transparent outline-none border-none text-[12.5px] font-serif py-0.5";
  const headerCell =
    "border border-black px-1.5 py-1 text-[12.5px] font-bold font-serif text-center bg-white";

  // Address fields shared between Present and Permanent
  const addressFields = [
    {
      label: "House No. and Name",
      presentKey: "presentHouseNo",
      permanentKey: "permanentHouseNo",
    },
    {
      label: "Street Name",
      presentKey: "presentStreetName",
      permanentKey: "permanentStreetName",
    },
    {
      label: "Place",
      presentKey: "presentPlace",
      permanentKey: "permanentPlace",
    },
    {
      label: "Pin",
      presentKey: "presentPin",
      permanentKey: "permanentPin",
      maxLength: 6,
    },
    {
      label: "State",
      presentKey: "presentState",
      permanentKey: "permanentState",
    },
    {
      label: "District",
      presentKey: "presentDistrict",
      permanentKey: "permanentDistrict",
    },
    {
      label: "Taluk",
      presentKey: "presentTaluk",
      permanentKey: "permanentTaluk",
    },
    {
      label: "Village",
      presentKey: "presentVillage",
      permanentKey: "permanentVillage",
    },
    {
      label: "Phone No.",
      presentKey: "presentPhoneNo",
      permanentKey: "permanentPhoneNo",
    },
    {
      label: "Home Town",
      presentKey: "presentHomeTown",
      permanentKey: "permanentHomeTown",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-3 lg:p-5 font-serif text-black text-[13px]">
      <div className="relative max-w-3xl mx-auto border border-gray-400 px-3 py-4 lg:px-8 lg:py-6 bg-white">
        {/* Page number */}
        <span className="absolute top-4 right-5 text-[13px]">2</span>

        {/* ══ PART-C: CONTACT DETAILS ══ */}
        <p className="text-[13px] font-bold font-serif mb-2">
          PART-C: CONTACT DETAILS
        </p>

        {/* ── Mobile: two stacked address cards ── */}
        <div className="block lg:hidden space-y-4 mb-2">
          {["Present", "Permanent"].map((type) => (
            <div key={type} className="border border-black">
              <div className={`${headerCell} border-b border-black`}>
                {type} Address
              </div>
              <table className="w-full border-collapse">
                <tbody>
                  {addressFields.map(
                    ({ label, presentKey, permanentKey, maxLength }) => {
                      const key =
                        type === "Present" ? presentKey : permanentKey;
                      return (
                        <tr key={key}>
                          <td className="border border-black px-1.5 py-1 text-[12.5px] font-serif bg-gray-50 w-2/5">
                            {label}
                          </td>
                          <td className="border border-black px-1.5 py-1 text-[12.5px] font-serif w-3/5">
                            <input
                              type="text"
                              value={formData[key]}
                              onChange={(e) =>
                                handleChange(key, e.target.value)
                              }
                              className={bareInput}
                              maxLength={maxLength}
                            />
                          </td>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* ── Desktop: original 4-column side-by-side table ── */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className={`${headerCell} w-1/2`} colSpan={2}>
                  Present Address
                </td>
                <td className={`${headerCell} w-1/2`} colSpan={2}>
                  Permanent Address
                </td>
              </tr>
              {addressFields.map(
                ({ label, presentKey, permanentKey, maxLength }) => (
                  <tr key={presentKey}>
                    <td className={`${cellLabel} lg:bg-white w-1/4`}>
                      {label}
                    </td>
                    <td className={`${cellInput} w-1/4`}>
                      <input
                        type="text"
                        value={formData[presentKey]}
                        onChange={(e) =>
                          handleChange(presentKey, e.target.value)
                        }
                        className={bareInput}
                        maxLength={maxLength}
                      />
                    </td>
                    <td className={`${cellLabel} lg:bg-white w-1/4`}>
                      {label}
                    </td>
                    <td className={`${cellInput} w-1/4`}>
                      <input
                        type="text"
                        value={formData[permanentKey]}
                        onChange={(e) =>
                          handleChange(permanentKey, e.target.value)
                        }
                        className={bareInput}
                        maxLength={maxLength}
                      />
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile + Email */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="block lg:table-row">
                <td className={cellLabel}>Mobile No.</td>
                <td className={cellInput}>
                  <input
                    type="text"
                    value={formData.mobileNo}
                    onChange={(e) => handleChange("mobileNo", e.target.value)}
                    className={bareInput}
                    maxLength={10}
                  />
                </td>
                <td className={cellLabel}>Email address</td>
                <td className={cellInput}>
                  <input
                    type="email"
                    value={formData.emailAddress}
                    onChange={(e) =>
                      handleChange("emailAddress", e.target.value)
                    }
                    className={bareInput}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ══ PART-D: RECRUITMENT DETAILS ══ */}
        <p className="text-[13px] font-bold font-serif mt-4 mb-2">
          PART-D: RECRUITMENT DETAILS
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="block lg:table-row">
                <td className={cellLabel}>
                  Source
                  <br />
                  <span className="text-[11px] italic font-normal">
                    (Advertisement no.)
                  </span>
                </td>
                <td className={cellInput}>
                  <input
                    type="text"
                    value={formData.source}
                    onChange={(e) => handleChange("source", e.target.value)}
                    className={bareInput}
                  />
                </td>
                <td className={cellLabel}>
                  Type
                  <br />
                  <span className="text-[11px] italic font-normal">
                    (General or Special recruitment)
                  </span>
                </td>
                <td className={cellInput}>
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

              <tr className="block lg:table-row">
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

              <tr className="block lg:table-row">
                <td className={cellLabel}>Advice Memo No.</td>
                <td className={cellInput}>
                  <input
                    type="text"
                    value={formData.adviceMemoNo}
                    onChange={(e) =>
                      handleChange("adviceMemoNo", e.target.value)
                    }
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

              <tr className="block lg:table-row">
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

              <tr className="block lg:table-row">
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

              <tr className="block lg:table-row">
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
        </div>

        {/* ══ PART-E: ALREADY WORKING ══ */}
        <p className="text-[13px] font-bold font-serif mt-4 mb-2">
          PART-E: IF ALREADY WORKING IN GOVERNMENT or PRIVATE AGENCIES, GIVE
          DETAILS
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="block lg:table-row">
                <td className={cellLabel}>Department</td>
                <td className={cellInput}>
                  <input
                    type="text"
                    value={formData.prevDepartment}
                    onChange={(e) =>
                      handleChange("prevDepartment", e.target.value)
                    }
                    className={bareInput}
                  />
                </td>
                <td className={cellLabel}>Designation</td>
                <td className={cellInput}>
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

              <tr className="block lg:table-row">
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

              <tr className="block lg:table-row">
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

              <tr className="block lg:table-row">
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

              <tr className="block lg:table-row">
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
                      handleChange(
                        "earlierAppointmentOrderDate",
                        e.target.value,
                      )
                    }
                    className={bareInput}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
