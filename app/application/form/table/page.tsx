/* eslint-disable @next/next/no-img-element */
"use client";

import useAuthGuard from "@/hooks/useAuthGuard";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

interface Application {
  _id: string;
  rollNumber: string;
  name: string;
  fatherName: string;
  designation: string;
  zone: string;
  group: string;
  dob: string;
  bloodGroup: string;
  address: string;
  photo: string;
  signature: string;
  createdAt: string;
}

const AdmitCardPage = () => {
  const { isAuthorized, checking } = useAuthGuard();
  const router = useRouter();

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    try {
      const res = await fetch("/api/application");
      const data = await res.json();
      setApplications(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  if (checking)
    return (
      <div style={styles.center}>
        <div style={styles.spinner} />
      </div>
    );
  if (!isAuthorized) return null;

  const deleteApplication = async (id: string) => {
    if (!confirm("Delete this record?")) return;

    try {
      await fetch(`/api/application?id=${id}`, {
        method: "DELETE",
      });
      fetchApplications();
    } catch {
      alert("Delete failed.");
    }
  };

  return (
    <div style={styles.layout}>
      <style>{css}</style>

      {/* MAIN */}
      <main style={styles.main}>
        <div style={styles.topbar}>
          <div className="flex flex-row items-center gap-5">
            <button
              className="btn-add"
              style={styles.btnAdd}
              onClick={() => router.back()}
            >
              Back
            </button>
            <h1 style={styles.title}>Application Forms</h1>
            <p style={styles.subtitle}>Manage submitted application records</p>
          </div>
        </div>

        <div style={styles.body}>
          <div style={styles.card}>
            {loading ? (
              <div style={styles.center}>
                <div style={styles.spinnerPurple} />
              </div>
            ) : applications.length === 0 ? (
              <div style={styles.empty}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#d1d5db"
                  strokeWidth="1.5"
                >
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
                <p
                  style={{
                    color: "#9ca3af",
                    fontSize: "14px",
                    marginTop: "10px",
                  }}
                >
                  No applications found.
                </p>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      {[
                        "Roll Number",
                        "Name",
                        "Father Name",
                        "Designation",
                        "Zone",
                        "Group",
                        "DOB",
                        "Blood Group",
                        "Address",
                        "Photo",
                        "Signature",
                        "Added On",
                        "Actions",
                      ].map((h) => (
                        <th key={h} style={styles.th}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((item) => (
                      <tr key={item._id} className="trow">
                        <td style={styles.td}>{item.rollNumber}</td>
                        <td style={styles.td}>{item.name}</td>
                        <td style={styles.td}>{item.fatherName}</td>
                        <td style={styles.td}>{item.designation}</td>
                        <td style={styles.td}>{item?.zone || ""}</td>
                        <td style={styles.td}>{item?.group || ""}</td>

                        <td style={styles.td}>{item.dob}</td>

                        <td style={styles.td}>{item.bloodGroup}</td>

                        <td
                          style={{
                            ...styles.td,
                            whiteSpace: "normal",
                            maxWidth: 200,
                          }}
                        >
                          {item.address}
                        </td>

                        {/* PHOTO */}
                        <td style={styles.td}>
                          <button
                            style={styles.btnView}
                            onClick={() => setPreviewImage(item.photo)}
                          >
                            🖼 View
                          </button>
                        </td>

                        {/* SIGNATURE */}
                        <td style={styles.td}>
                          <button
                            style={styles.btnView}
                            onClick={() => setPreviewImage(item.signature)}
                          >
                            ✍️ View
                          </button>
                        </td>

                        <td style={styles.td}>
                          {new Date(item.createdAt).toLocaleDateString("en-IN")}
                        </td>

                        <td style={styles.td}>
                          <button
                            style={styles.btnDel}
                            onClick={() => deleteApplication(item._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {previewImage && (
          <div style={styles.overlay} onClick={() => setPreviewImage(null)}>
            <div
              style={styles.previewModal}
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div style={styles.previewHead}>
                <p style={{ fontWeight: 600 }}>Preview</p>

                <div style={{ display: "flex", gap: "10px" }}>
                  {/* DOWNLOAD BUTTON */}
                  <a
                    href={previewImage}
                    download={`application-${Date.now()}.png`}
                    style={styles.openLink}
                  >
                    ⬇ Download
                  </a>

                  {/* CLOSE */}
                  <button
                    style={styles.closeBtn}
                    onClick={() => setPreviewImage(null)}
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* BODY */}
              <div style={styles.previewBody}>
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// ── STYLES ─────────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  layout: {
    minHeight: "100vh",
    background: "#f3f4f6",
    display: "flex",
    fontFamily: "'Inter', sans-serif",
    color: "#374151",
  },
  sidebar: {
    width: "210px",
    minWidth: "210px",
    background: "#fff",
    borderRight: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    position: "sticky" as const,
    top: 0,
    height: "100vh",
  },
  sidebarTop: { padding: "20px 16px 16px", borderBottom: "1px solid #f3f4f6" },
  brand: { display: "flex", alignItems: "center", gap: "10px" },
  brandIcon: {
    width: "36px",
    height: "36px",
    background: "linear-gradient(135deg,#7c3aed,#6d28d9)",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  brandName: { fontSize: "14px", fontWeight: 700, color: "#111827", margin: 0 },
  brandSub: { fontSize: "11px", color: "#9ca3af", margin: 0 },
  navSection: { padding: "20px 12px", flex: 1 },
  navLabel: {
    fontSize: "10px",
    fontWeight: 600,
    color: "#9ca3af",
    letterSpacing: "0.1em",
    marginBottom: "8px",
    paddingLeft: "6px",
  },
  navBtn: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    padding: "9px 10px",
    borderRadius: "8px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    width: "100%",
    fontSize: "13.5px",
    fontWeight: 500,
    color: "#374151",
    position: "relative" as const,
  },
  activeDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#7c3aed",
    marginLeft: "auto",
  },
  sidebarFoot: { padding: "12px", borderTop: "1px solid #f3f4f6" },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    background: "transparent",
    color: "#6b7280",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "12.5px",
    width: "100%",
    justifyContent: "center" as const,
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    minWidth: 0,
  },
  topbar: {
    background: "#fff",
    borderBottom: "1px solid #e5e7eb",
    padding: "20px 28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap" as const,
  },
  title: { fontSize: "22px", fontWeight: 700, color: "#111827", margin: 0 },
  subtitle: { fontSize: "13px", color: "#9ca3af", margin: "2px 0 0" },
  topActions: { display: "flex", alignItems: "center", gap: "10px" },
  searchInput: {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    color: "#111827",
    padding: "9px 13px",
    borderRadius: "8px",
    fontSize: "13.5px",
    outline: "none",
    width: "220px",
  },
  btnAdd: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#7c3aed",
    color: "#fff",
    padding: "9px 18px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "13.5px",
  },
  body: { padding: "24px 28px" },
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    overflow: "hidden",
  },
  table: { width: "100%", borderCollapse: "collapse" as const },
  th: {
    padding: "12px 16px",
    textAlign: "left" as const,
    fontSize: "10.5px",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    color: "#9ca3af",
    background: "#f9fafb",
    borderBottom: "1px solid #e5e7eb",
    whiteSpace: "nowrap" as const,
  },
  td: {
    padding: "12px 16px",
    fontSize: "13.5px",
    color: "#4b5563",
    borderBottom: "1px solid #f3f4f6",
    whiteSpace: "nowrap" as const,
  },
  rollBadge: {
    fontFamily: "monospace",
    fontSize: "13px",
    color: "#7c3aed",
    fontWeight: 600,
  },
  btnView: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    background: "#f5f3ff",
    color: "#7c3aed",
    border: "1px solid #ede9fe",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: 500,
    cursor: "pointer",
  },
  btnEdit: {
    background: "#f5f3ff",
    color: "#7c3aed",
    border: "1px solid #ede9fe",
    padding: "6px 8px",
    borderRadius: "7px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  btnDel: {
    background: "#fef2f2",
    color: "#dc2626",
    border: "1px solid #fecaca",
    padding: "6px 8px",
    borderRadius: "7px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  center: {
    minHeight: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    padding: "70px 20px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    padding: "20px",
  },
  modal: {
    background: "#fff",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
    overflow: "hidden",
  },
  modalHead: {
    padding: "22px 26px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottom: "1px solid #f3f4f6",
  },
  modalTitle: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#111827",
    margin: 0,
  },
  modalSub: { fontSize: "13px", color: "#9ca3af", marginTop: "3px" },
  modalBody: { padding: "22px 26px" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" },
  field: { display: "flex", flexDirection: "column" as const, gap: "5px" },
  label: {
    fontSize: "11px",
    fontWeight: 600,
    color: "#6b7280",
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
  },
  input: {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    color: "#111827",
    padding: "9px 13px",
    borderRadius: "8px",
    fontSize: "13.5px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box" as const,
  },
  dropzone: {
    marginTop: "7px",
    border: "2px dashed #e5e7eb",
    borderRadius: "10px",
    padding: "22px",
    cursor: "pointer",
    background: "#fafafa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "110px",
    transition: "all 0.15s",
  },
  modalFoot: {
    padding: "16px 26px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    borderTop: "1px solid #f3f4f6",
    background: "#f9fafb",
  },
  closeBtn: {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    color: "#9ca3af",
    borderRadius: "7px",
    padding: "7px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  cancelBtn: {
    background: "transparent",
    border: "1px solid #e5e7eb",
    color: "#6b7280",
    padding: "9px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "13.5px",
  },
  saveBtn: {
    background: "#7c3aed",
    border: "none",
    color: "#fff",
    padding: "9px 22px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "13.5px",
  },
  previewModal: {
    background: "#fff",
    borderRadius: "14px",
    width: "100%",
    maxWidth: "780px",
    height: "82vh",
    display: "flex",
    flexDirection: "column" as const,
    boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
  },
  previewHead: {
    padding: "14px 18px",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  previewBody: {
    flex: 1,
    overflow: "hidden",
    padding: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  openLink: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#7c3aed",
    background: "#f5f3ff",
    border: "1px solid #ede9fe",
    padding: "6px 12px",
    borderRadius: "7px",
    textDecoration: "none",
  },
  spinner: {
    width: "32px",
    height: "32px",
    border: "3px solid #e5e7eb",
    borderTop: "3px solid #7c3aed",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  spinnerPurple: {
    width: "28px",
    height: "28px",
    border: "2.5px solid #e5e7eb",
    borderTop: "2.5px solid #7c3aed",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
  @keyframes modalIn { from { opacity:0; transform:scale(0.97) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }
  .trow { animation: fadeIn 0.25s ease both; transition: background 0.1s; }
  .trow:hover { background: #f9fafb !important; }
  .trow:last-child td { border-bottom: none !important; }
  .modal { animation: modalIn 0.2s cubic-bezier(0.34,1.4,0.64,1) both; }
  .finput:focus { border-color: #7c3aed !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); }
  .search-input:focus { border-color: #7c3aed !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.08); outline: none; }
  .btn-add:hover { background: #6d28d9 !important; }
  .btn-edit:hover { background: #ede9fe !important; }
  .btn-del:hover { background: #fee2e2 !important; }
  .btn-view:hover { background: #ede9fe !important; }
  .close-btn:hover { background: #f3f4f6 !important; }
  .cancel-btn:hover { background: #f9fafb !important; }
  .save-btn:hover { background: #6d28d9 !important; }
  .nav-active { background: #f5f3ff !important; color: #7c3aed !important; }
  .nav-active span { color: #7c3aed !important; font-weight: 600 !important; }
  .nav-btn:hover { background: #f9fafb !important; }
  .logout-btn:hover { background: #f9fafb !important; }
  .dropzone:hover { border-color: #a78bfa !important; background: #faf5ff !important; }
  input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.5; }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: #f9fafb; }
  ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 3px; }
`;

export default AdmitCardPage;
