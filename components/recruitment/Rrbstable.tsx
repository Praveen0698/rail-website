"use client";

import { useState } from "react";

const zones = [
  "Ahmedabad", "Ajmer", "Allahabad", "Bangalore", "Bhopal",
  "Bhubaneshwar", "Bilaspur", "Chandigarh", "Delhi", "Gorakhpur",
  "Guwahati", "Jammu", "Kolkata", "Hajipur", "Mumbai",
  "Muzaffarpur", "Patna", "Ranchi", "Secunderabad", "Siliguri", "Trivendrum",
];

interface ResultData {
  candidateName: string;
  fatherName: string;
  postApplied: string;
  rollNo: string;
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
      const res = await fetch("/api/showdet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roll_no: rollNo, zone }),
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setResultData(data);
    } catch {
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
          width: 420,
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
          width: "min(55%, 420px)",
          minWidth: 280,
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
            />
          </div>
        </div>

        {/* Zone row */}
        <div style={rowStyle}>
          <div style={labelStyle}>Zone</div>
          <div style={valueStyle}>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              style={{
                width: "100%",
                fontSize: 14,
                padding: "4px 6px",
                border: "1px solid #aaaaaa",
                boxSizing: "border-box",
                color: "#000000",
                backgroundColor: "#ffffff",
                height: 30,
              }}
            >
              <option value="">----Select Zone----</option>
              {zones.map((z) => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit row */}
        <div
          style={{
            backgroundColor: "#ffffff",
            textAlign: "center",
            padding: "8px",
          }}
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
        <div id="ss" style={{ width: "75%", margin: "0 auto" }}>

          {/* Print icon */}
          <div style={{ textAlign: "right", marginBottom: 4 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="images/printing-icon.png"
              alt="Print"
              style={{ width: 40, cursor: "pointer" }}
              onClick={() => window.print()}
            />
          </div>

          {/* Result card */}
          <div
            style={{
              width: 420,
              margin: "0 auto",
              border: "3px solid #111111",
              backgroundColor: "#ffffff",
              boxSizing: "border-box",
            }}
          >
            {(
              [
                { label: "Candidate's Name", value: resultData.candidateName },
                { label: "Father's Name",    value: resultData.fatherName },
                { label: "Post Applied",     value: resultData.postApplied },
                { label: "Roll No",          value: resultData.rollNo },
                { label: "Control No",       value: resultData.controlNo },
                { label: "Date of Birth",    value: resultData.dob },
                { label: "Zone",             value: resultData.zone },
              ] as { label: string; value: string }[]
            ).map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  borderBottom: "3px solid #111111",
                }}
              >
                <div
                  style={{
                    width: 160,
                    minWidth: 160,
                    padding: "5px",
                    color: "#000000",
                    fontSize: 13,
                    borderRight: "3px solid #111111",
                    boxSizing: "border-box",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    flex: 1,
                    padding: "5px",
                    color: "#000000",
                    fontSize: 13,
                    textTransform: "uppercase",
                    boxSizing: "border-box",
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
                  width: 160,
                  minWidth: 160,
                  padding: "5px",
                  color: "#000000",
                  fontSize: 16,
                  textAlign: "center",
                  borderRight: "3px solid #111111",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 40,
                  boxSizing: "border-box",
                }}
              >
                Result
              </div>
              <div
                style={{
                  flex: 1,
                  padding: "5px",
                  color: "#000000",
                  fontSize: 16,
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