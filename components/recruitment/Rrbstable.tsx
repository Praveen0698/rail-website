"use client";

import { useState } from "react";
import { MdLocalPrintshop } from "react-icons/md";
import Select from "react-select";

const zones = [
  "Ahmedabad",
  "Ajmer",
  "Allahabad",
  "Bangalore",
  "Bhopal",
  "Bhubaneshwar",
  "Bilaspur",
  "Chandigarh",
  "Delhi",
  "Gorakhpur",
  "Guwahati",
  "Jammu",
  "Kolkata",
  "Hajipur",
  "Mumbai",
  "Muzaffarpur",
  "Patna",
  "Ranchi",
  "Secunderabad",
  "Siliguri",
  "Trivendrum",
];

interface ResultData {
  name: string;
  fatherName: string;
  postApplied: string;
  roll: string;
  controlNo: string;
  dob: string;
  zone: string;
  result: string;
}

const BLUE = "#2352b9";

const labelStyle: React.CSSProperties = {
  backgroundColor: BLUE,
  color: "#ffffff",
  fontSize: 14,
  fontWeight: "bold",
  textAlign: "center",
  padding: "10px 14px",
  width: 120,
  minWidth: 120,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  whiteSpace: "nowrap",
};

const valueStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  padding: "6px 8px",
  flex: 1,
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  marginBottom: 2,
};

export default function RRBsTable() {
  const [rollNo, setRollNo] = useState("");
  const [zone, setZone] = useState("");
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!rollNo || !zone) {
      setError("Please enter Roll No and select a Zone.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`/api/user/search?roll=${rollNo}&zone=${zone}`);

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      setResultData(data.data);
    } catch (error) {
      setError("Could not fetch result. Please try again.");
      setResultData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", minHeight: "100vh" }}>
      {/* Banner */}
      <div
        style={{
          width: 450,
          margin: "0 auto 20px auto",
          border: "1px solid transparent",
          backgroundColor: BLUE,
          padding: "8px 12px",
          boxSizing: "border-box",
        }}
      >
        <span style={{ fontSize: 14, fontWeight: "bold", color: "#ffffff" }}>
          Official website of Railway Recruitment Boards (RRBs)
        </span>
      </div>

      <p>&nbsp;</p>

      {/* Form */}
      <div
        style={{
          width: "min(55%, 450px)",
          minWidth: 300,
          margin: "0 auto",
          backgroundColor: "transparent",
          border: "1px solid transparent",
          padding: 2,
          boxSizing: "border-box",
        }}
      >
        {/* Roll No row */}
        <div style={rowStyle}>
          <div style={labelStyle}>Roll No</div>
          <div style={valueStyle}>
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              style={{
                width: "100%",
                fontSize: 14,
                padding: "4px 6px",
                border: "1px solid #aaaaaa",
                boxSizing: "border-box",
                color: "#000000",
                backgroundColor: "#ffffff",
              }}
              className="rounded-sm"
            />
          </div>
        </div>

        {/* Zone row */}
        <div style={rowStyle}>
          <div style={labelStyle}>Zone</div>

          <div style={valueStyle}>
            <Select
              value={zone ? { value: zone, label: zone } : null}
              onChange={(selected) => setZone(selected ? selected.value : "")}
              options={zones.map((z) => ({ value: z, label: z }))}
              placeholder="----Select Zone----"
              menuPlacement="auto"
              styles={{
                container: (base) => ({
                  ...base,
                  width: "100%",
                }),

                control: (base) => ({
                  ...base,
                  width: "100%",
                  minHeight: 30,
                  height: 30,
                  border: "1px solid #aaaaaa",
                  boxShadow: "none",
                  fontSize: 14,
                  backgroundColor: "#ffffff",
                  color: "#000000",
                }),

                valueContainer: (base) => ({
                  ...base,
                  height: 30,
                  padding: "0 6px",
                  display: "flex",
                  alignItems: "center",
                  color: "#000000",
                }),

                indicatorsContainer: (base) => ({
                  ...base,
                  height: 30,
                }),

                dropdownIndicator: (base) => ({
                  ...base,
                  padding: 4,
                }),

                menu: (base) => ({
                  ...base,
                  marginTop: 2,
                  width: "100%",
                }),

                menuList: (base) => ({
                  ...base,
                  maxHeight: 250,
                  padding: 0,
                  scrollbarWidth: "thin",
                }),

                option: (base, state) => ({
                  ...base,
                  textAlign: "left", // left aligned options
                  padding: "8px 10px",
                  fontSize: 14,
                  backgroundColor: state.isFocused ? "#f2f2f2" : "#ffffff",
                  color: "#000",
                }),

                singleValue: (base) => ({
                  ...base,
                  textAlign: "left",
                  color: "#000000",
                }),

                placeholder: (base) => ({
                  ...base,
                  color: "#666",
                }),
              }}
            />
          </div>
        </div>

        {/* Submit row */}
        <div
          style={{
            backgroundColor: "#ffffff",
            textAlign: "center",
            padding: "8px",
          }}
          className="mt-1 lg:mt-4"
        >
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              fontSize: 14,
              padding: "3px 20px",
              cursor: loading ? "not-allowed" : "pointer",
              backgroundColor: "#f0f0f0",
              border: "2px outset #cccccc",
              color: "#000000",
              fontFamily: "inherit",
              minWidth: 80,
            }}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p style={{ color: "red", fontSize: 14, marginTop: 10 }}>{error}</p>
      )}

      <br />

      {/* Result */}
      {resultData && (
        <div
          id="ss"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Icon row - same width as card, icon on far right */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "end",
              justifyContent: "flex-end",
              marginBottom: 2,
            }}
            className="min-w-[99%] md:min-w-[90%] lg:min-w-[80%] xl:min-w-[70%]"
          >
            <MdLocalPrintshop
              size={40}
              style={{ cursor: "pointer", color: "#2e6da4" }}
              onClick={() => window.print()}
            />
          </div>

          {/* Result card */}
          <div
            style={{
              width: "min(450px, 90vw)",
              border: "3px solid #111111",
              backgroundColor: "#ffffff",
              boxSizing: "border-box",
            }}
            className="rounded-sm"
          >
            {(
              [
                { label: "Candidate's Name", value: resultData.name },
                { label: "Father's Name", value: resultData.fatherName },
                { label: "Post Applied", value: resultData.postApplied },
                { label: "Roll No", value: resultData.roll },
                { label: "Control No", value: resultData.controlNo },
                {
                  label: "Date of Birth",
                  value: (() => {
                    const d = new Date(resultData.dob);
                    const dd = String(d.getDate()).padStart(2, "0");
                    const mm = String(d.getMonth() + 1).padStart(2, "0");
                    const yyyy = d.getFullYear();
                    return `${dd}/${mm}/${yyyy}`;
                  })(),
                },
                { label: "Zone", value: resultData.zone },
              ] as { label: string; value: string }[]
            ).map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  borderBottom: "1px solid #111111",
                }}
              >
                <div
                  style={{
                    width: "38%",
                    minWidth: 0,
                    padding: "6px 8px",
                    color: "#000000",
                    fontSize: 14,
                    textAlign: "center",
                    borderRight: "1px solid #111111",
                    boxSizing: "border-box",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    flex: 1,
                    padding: "6px 8px",
                    color: "#000000",
                    fontSize: 14,
                    textTransform: "uppercase",
                    boxSizing: "border-box",
                    display: "flex",
                    alignItems: "center",
                    wordBreak: "break-word",
                  }}
                >
                  {value}
                </div>
              </div>
            ))}

            {/* Result row */}
            <div style={{ display: "flex" }}>
              <div
                style={{
                  width: "38%",
                  minWidth: 0,
                  padding: "8px",
                  color: "#000000",
                  fontSize: 15,
                  textAlign: "center",
                  borderRight: "1px solid #111111",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 44,
                  boxSizing: "border-box",
                }}
              >
                Result
              </div>
              <div
                style={{
                  flex: 1,
                  padding: "8px",
                  color: "#000000",
                  fontSize: 15,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxSizing: "border-box",
                }}
              >
                <strong>&quot;{resultData.result}&quot;</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      <p>&nbsp;</p>
    </div>
  );
}
