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

  const handlePrint = () => {
    if (!resultData) return;

    const dob = (() => {
      const d = new Date(resultData.dob);
      const dd = String(d.getDate()).padStart(2, "0");
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const yyyy = d.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    })();

    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, "0")}/${String(
      now.getMonth() + 1,
    ).padStart(2, "0")}/${now.getFullYear()}`;

    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes(),
    ).padStart(2, "0")}`;

    const dateTimeStr = `${dateStr}, ${timeStr}`;
    const pageUrl = window.location.href;

    const STYLE_ID = "rrb-print-style";
    const SECTION_ID = "rrb-print-section";

    document.getElementById(STYLE_ID)?.remove();
    document.getElementById(SECTION_ID)?.remove();

    const style = document.createElement("style");
    style.id = STYLE_ID;

    style.innerHTML = `
@media print {

body > *:not(#${SECTION_ID}) {
display: none !important;
}

#${SECTION_ID} {
display: block !important;
}

@page {
size: A4 portrait;
}

body {
-webkit-print-color-adjust: exact !important;
print-color-adjust: exact !important;
background: #fff;
}
}

#${SECTION_ID}{
display:none;
font-family:Arial, sans-serif;
width:100%;
}

/* top meta */
#${SECTION_ID} .p-meta{
display:flex;
justify-content:space-between;
align-items:center;
font-size:9.5px;
margin-bottom:6px;
}

#${SECTION_ID} .p-meta-title{
flex:1;
text-align:center;
}

/* railway header */
#${SECTION_ID} .p-header{
background:#3D76C0;
display:flex;
align-items:center;
justify-content:space-between;
padding:10px 14px;
}

#${SECTION_ID} .p-header-logo{
height:70px;
}

#${SECTION_ID} .p-header-emblem{
height:70px;
}

#${SECTION_ID} .p-header-text{
text-align:center;
color:#fff;
flex:1;
line-height:1.15;
}

#${SECTION_ID} .p-hindi{
font-size:30px;
font-weight:bold;
}

#${SECTION_ID} .p-hindi-sub{
font-size:13px;
}

#${SECTION_ID} .p-english{
font-size:12px;
font-weight:bold;
letter-spacing:1px;
}

#${SECTION_ID} .p-english-sub{
font-size:11px;
}

/* table */
#${SECTION_ID} .p-table-wrap{
margin:60px auto 0 auto;
width:440px;
}

#${SECTION_ID} table{
width:100%;
border-collapse:collapse;
}

#${SECTION_ID} td{
border:1px solid #000;
padding:6px 8px;
font-size:11px;
}

#${SECTION_ID} .p-col-label{
width:40%;
}

#${SECTION_ID} .p-result-label{
text-align:center;
}

#${SECTION_ID} .p-result-value{
text-align:center;
font-weight:bold;
font-size:12px;
}

/* footer */
#${SECTION_ID} .p-footer{
position:fixed;
bottom:0;
left:0;
right:0;
display:flex;
justify-content:space-between;
font-size:9px;
}
`;

    document.head.appendChild(style);

    const section = document.createElement("div");
    section.id = SECTION_ID;

    section.innerHTML = `

<div class="p-meta">
<span>${dateTimeStr}</span>
<span class="p-meta-title">Ministry of Railways (Railway Board)</span>
<span></span>
</div>

<div class="p-header">

<img class="p-header-logo" src="/printlogo.png"/>

<div class="p-header-text">
<div class="p-hindi">भारतीय रेल <span class="p-hindi-sub">राष्ट्र की जीवन रेखा...</span></div>
<div class="p-english">INDIAN RAILWAYS <span class="p-english-sub">Lifeline to the Nation...</span></div>
</div>

<img class="p-header-emblem" src="/printemblem.jpg"/>

</div>

<div class="p-table-wrap">
<table>
<tr><td class="p-col-label">Candidate's Name</td><td>${resultData.name}</td></tr>
<tr><td class="p-col-label">Father's Name</td><td>${resultData.fatherName}</td></tr>
<tr><td class="p-col-label">Post Applied</td><td>${resultData.postApplied}</td></tr>
<tr><td class="p-col-label">Roll No</td><td>${resultData.roll}</td></tr>
<tr><td class="p-col-label">Control No</td><td>${resultData.controlNo}</td></tr>
<tr><td class="p-col-label">Date of Birth</td><td>${dob}</td></tr>
<tr><td class="p-col-label">Zone</td><td>${resultData.zone}</td></tr>
<tr>
<td class="p-result-label">Result</td>
<td class="p-result-value">"${resultData.result}"</td>
</tr>
</table>
</div>

<div class="p-footer">
<span>${pageUrl}</span>
<span>1/1</span>
</div>
`;

    document.body.appendChild(section);

    window.print();

    setTimeout(() => {
      document.getElementById(STYLE_ID)?.remove();
      document.getElementById(SECTION_ID)?.remove();
    }, 1500);
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
          <div
            style={{
              width: 450,
              margin: "20px auto",
              border: "1px solid #888",
            }}
          >
            <div
              style={{
                backgroundColor: "#8b0000",
                color: "#fff",
                fontWeight: "bold",
                padding: "6px",
                borderBottom: "1px solid #888",
              }}
            >
              Name of RRBs
            </div>

            {zones.map((z) => (
              <div
                key={z}
                onClick={() => setZone(z)}
                style={{
                  padding: "6px",
                  borderBottom: "1px solid #bbb",
                  backgroundColor: zone === z ? "#dce8ff" : "#f5f5f5",
                  cursor: "pointer",
                  color: "#0033cc",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
              >
                {z}
              </div>
            ))}
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

      <p className="mt-10">Source : Ministry of Railways (Railway Board) CMS Team</p>
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
              onClick={handlePrint}
            />
          </div>

          {/* Result card */}
          <div
            style={{
              width: "min(490px, 90vw)",
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
