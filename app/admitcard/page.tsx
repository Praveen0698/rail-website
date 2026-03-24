"use client";

import useAuthGuard from "@/hooks/useAuthGuard";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface AdmitCard {
  _id: string;
  roll_no: string;
  dob: string;
  card?: string;      // base64 data URL — only present when fetching single record
  cardType: string;   // mime type
  cardName: string;   // original filename
  createdAt: string;
}

const isPdf = (cardType: string) => cardType === "application/pdf";

const AdmitCardPage = () => {
  const { isAuthorized, checking } = useAuthGuard();
  const router = useRouter();

  const [cards, setCards] = useState<AdmitCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState<AdmitCard | null>(null);
  const [rollNo, setRollNo] = useState("");
  const [dob, setDob] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchRoll, setSearchRoll] = useState("");
  const [previewCard, setPreviewCard] = useState<AdmitCard | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // ── fetch all (no base64 in list) ─────────────────────────────────────────
  const fetchCards = useCallback(async () => {
    try {
      const res = await fetch("/api/admitcard");
      const data = await res.json();
      setCards(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCards(); }, [fetchCards]);

  // ── fetch single card with base64 for preview ──────────────────────────────
  const openPreview = async (card: AdmitCard) => {
    setLoadingPreview(true);
    setPreviewCard(card); // open modal immediately with spinner
    try {
      const res = await fetch(`/api/admitcard?id=${card._id}`);
      const data = await res.json();
      if (data.success) setPreviewCard(data.data);
    } catch (err) {
      console.error(err);
    }
    setLoadingPreview(false);
  };

  // ── auth guard ─────────────────────────────────────────────────────────────
  if (checking) return <div style={styles.center}><div style={styles.spinner} /></div>;
  if (!isAuthorized) return null;

  // ── handlers ───────────────────────────────────────────────────────────────
  const openAdd = () => {
    setEditingCard(null);
    setRollNo(""); setDob(""); setFile(null); setFilePreview("");
    setShowForm(true);
  };

  const openEdit = (card: AdmitCard) => {
    setEditingCard(card);
    setRollNo(card.roll_no);
    setDob(card.dob ? card.dob.slice(0, 10) : "");
    setFile(null);
    setFilePreview(isPdf(card.cardType) ? "pdf" : "existing-image");
    setShowForm(true);
  };

  const handleFile = (f: File) => {
    setFile(f);
    setFilePreview(f.type.startsWith("image/") ? URL.createObjectURL(f) : "pdf");
  };

  const handleSubmit = async () => {
    if (!rollNo.trim() || !dob) return alert("Roll number and DOB are required.");
    if (!editingCard && !file) return alert("Please upload a file.");
    setSaving(true);
    try {
      const fd = new FormData();
      if (!editingCard) fd.append("roll_no", rollNo);
      fd.append("dob", dob);
      if (file) fd.append("file", file);

      const url = editingCard ? `/api/admitcard?id=${editingCard._id}` : "/api/admitcard";
      const res = await fetch(url, { method: editingCard ? "PUT" : "POST", body: fd });
      const data = await res.json();
      if (!data.success) {
        alert(data.error);
        setSaving(false);
        return;
      }
      setShowForm(false);
      setLoading(true);
      fetchCards();
    } catch {
      alert("Something went wrong.");
    }
    setSaving(false);
  };

  const deleteCard = async (id: string) => {
    if (!confirm("Delete this admit card?")) return;
    setDeletingId(id);
    try {
      await fetch(`/api/admitcard?id=${id}`, { method: "DELETE" });
      setLoading(true);
      fetchCards();
    } catch {
      alert("Delete failed.");
    }
    setDeletingId(null);
  };

  const filtered = searchRoll.trim()
    ? cards.filter((c) => c.roll_no.toLowerCase().includes(searchRoll.toLowerCase()))
    : cards;

  const navItems = [
    // { key: "users", label: "Users", onClick: () => router.push("/") },
    { key: "admitcards", label: "Admit Cards", onClick: () => {} },
  ];

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div style={styles.layout}>
      <style>{css}</style>

      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarTop}>
          <div style={styles.brand}>
            <div style={styles.brandIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <p style={styles.brandName}>Admin</p>
              <p style={styles.brandSub}>Control Panel</p>
            </div>
          </div>
        </div>

        <div style={styles.navSection}>
          <p style={styles.navLabel}>NAVIGATION</p>
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`nav-btn ${item.key === "admitcards" ? "nav-active" : ""}`}
              style={styles.navBtn}
              onClick={item.onClick}
            >
              {item.key === "users" ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <line x1="7" y1="15" x2="10" y2="15" />
                  <line x1="14" y1="15" x2="17" y2="15" />
                </svg>
              )}
              <span>{item.label}</span>
              {item.key === "admitcards" && <span style={styles.activeDot} />}
            </button>
          ))}
        </div>

        <div style={styles.sidebarFoot}>
          <button
            className="logout-btn"
            style={styles.logoutBtn}
            onClick={() => { localStorage.removeItem("auth"); router.replace("/raj"); }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>
        <div style={styles.topbar}>
          <div>
            <h1 style={styles.title}>Admit Cards</h1>
            <p style={styles.subtitle}>Manage candidate admit cards</p>
          </div>
          <div style={styles.topActions}>
            <input
              placeholder="Search roll number..."
              value={searchRoll}
              onChange={(e) => setSearchRoll(e.target.value)}
              className="search-input"
              style={styles.searchInput}
            />
            <button className="btn-add" onClick={openAdd} style={styles.btnAdd}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add
            </button>
          </div>
        </div>

        <div style={styles.body}>
          <div style={styles.card}>
            {loading ? (
              <div style={styles.center}><div style={styles.spinnerPurple} /></div>
            ) : filtered.length === 0 ? (
              <div style={styles.empty}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
                <p style={{ color: "#9ca3af", fontSize: "14px", marginTop: "10px" }}>
                  {searchRoll ? "No matching records found." : "No admit cards yet. Add one to get started."}
                </p>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      {["Roll No", "Date of Birth", "File", "Added On", "Actions"].map((h) => (
                        <th key={h} style={styles.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((card, i) => (
                      <tr key={card._id} className="trow" style={{ animationDelay: `${i * 25}ms` }}>
                        <td style={styles.td}>
                          <span style={styles.rollBadge}>{card.roll_no}</span>
                        </td>
                        <td style={styles.td}>
                          {new Date(card.dob).toLocaleDateString("en-IN", {
                            day: "2-digit", month: "short", year: "numeric",
                          })}
                        </td>
                        <td style={styles.td}>
                          <button className="btn-view" style={styles.btnView} onClick={() => openPreview(card)}>
                            {isPdf(card.cardType) ? "📄 PDF" : "🖼 Image"}
                            <span style={{ marginLeft: 4, fontSize: "11px", color: "#a78bfa" }}>
                              {card.cardName?.length > 16
                                ? card.cardName.slice(0, 14) + "…"
                                : card.cardName}
                            </span>
                          </button>
                        </td>
                        <td style={styles.td}>
                          {new Date(card.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit", month: "short", year: "numeric",
                          })}
                        </td>
                        <td style={styles.td}>
                          <div style={{ display: "flex", gap: "7px" }}>
                            <button className="btn-edit" style={styles.btnEdit} onClick={() => openEdit(card)} title="Edit">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                            </button>
                            <button
                              className="btn-del"
                              style={styles.btnDel}
                              disabled={deletingId === card._id}
                              onClick={() => deleteCard(card._id)}
                              title="Delete"
                            >
                              {deletingId === card._id ? "·" : (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6l-1 14H6L5 6" />
                                  <path d="M10 11v6M14 11v6" />
                                  <path d="M9 6V4h6v2" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ADD / EDIT MODAL */}
      {showForm && (
        <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
          <div className="modal" style={styles.modal}>
            <div style={styles.modalHead}>
              <div>
                <h2 style={styles.modalTitle}>{editingCard ? "Edit Admit Card" : "Add Admit Card"}</h2>
                <p style={styles.modalSub}>
                  {editingCard ? `Roll No: ${editingCard.roll_no}` : "Fill details and upload file"}
                </p>
              </div>
              <button className="close-btn" style={styles.closeBtn} onClick={() => setShowForm(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.row}>
                {!editingCard && (
                  <div style={styles.field}>
                    <label style={styles.label}>Roll Number <span style={{ color: "#dc2626" }}>*</span></label>
                    <input
                      placeholder="e.g. 10234567"
                      value={rollNo}
                      onChange={(e) => setRollNo(e.target.value)}
                      className="finput"
                      style={styles.input}
                    />
                  </div>
                )}
                <div style={styles.field}>
                  <label style={styles.label}>Date of Birth <span style={{ color: "#dc2626" }}>*</span></label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="finput"
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={{ marginTop: "18px" }}>
                <label style={styles.label}>
                  Admit Card File <span style={{ color: "#dc2626" }}>*</span>
                  {editingCard && (
                    <span style={{ color: "#9ca3af", fontWeight: 400, marginLeft: 6, textTransform: "none", letterSpacing: 0 }}>
                      (leave blank to keep current)
                    </span>
                  )}
                </label>
                <div
                  className="dropzone"
                  style={styles.dropzone}
                  onClick={() => fileRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
                >
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*,application/pdf"
                    style={{ display: "none" }}
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                  />

                  {/* New image selected */}
                  {filePreview && filePreview !== "pdf" && filePreview !== "existing-image" ? (
                    <div style={{ textAlign: "center" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={filePreview} alt="preview" style={{ maxHeight: "140px", maxWidth: "100%", borderRadius: "6px", objectFit: "contain" }} />
                      <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "6px" }}>
                        {file?.name} · <span style={{ color: "#7c3aed" }}>click to change</span>
                      </p>
                    </div>

                  /* Existing image (edit mode, no new file chosen) */
                  ) : filePreview === "existing-image" ? (
                    <div style={{ textAlign: "center" }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <p style={{ fontSize: "13px", color: "#374151", fontWeight: 500, marginTop: "6px" }}>
                        Current image saved
                      </p>
                      <p style={{ fontSize: "12px", color: "#7c3aed", marginTop: "2px" }}>click to replace</p>
                    </div>

                  /* PDF selected or existing PDF */
                  ) : filePreview === "pdf" ? (
                    <div style={{ textAlign: "center" }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <p style={{ fontSize: "13px", color: "#374151", fontWeight: 500, marginTop: "6px" }}>
                        {file ? file.name : "Existing PDF"}
                      </p>
                      <p style={{ fontSize: "12px", color: "#7c3aed", marginTop: "2px" }}>click to change</p>
                    </div>

                  /* Empty state */
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <p style={{ fontSize: "13.5px", color: "#6b7280", marginTop: "8px" }}>
                        Drag & drop or <span style={{ color: "#7c3aed", fontWeight: 600 }}>browse</span>
                      </p>
                      <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "3px" }}>JPG, PNG, PDF supported</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div style={styles.modalFoot}>
              <button className="cancel-btn" style={styles.cancelBtn} onClick={() => setShowForm(false)}>Cancel</button>
              <button
                className="save-btn"
                style={{ ...styles.saveBtn, opacity: saving ? 0.7 : 1 }}
                onClick={handleSubmit}
                disabled={saving}
              >
                {saving ? "Saving..." : editingCard ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FILE PREVIEW MODAL */}
      {previewCard && (
        <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && setPreviewCard(null)}>
          <div style={styles.previewModal}>
            <div style={styles.previewHead}>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>Admit Card</p>
                <p style={{ fontSize: "12px", color: "#9ca3af" }}>
                  Roll: {previewCard.roll_no} · {previewCard.cardName}
                </p>
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {/* Download button — only works once base64 is loaded */}
                {previewCard.card && (
                  <a
                    href={previewCard.card}
                    download={previewCard.cardName}
                    style={styles.openLink}
                  >
                    ⬇ Download
                  </a>
                )}
                <button className="close-btn" style={styles.closeBtn} onClick={() => setPreviewCard(null)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            <div style={styles.previewBody}>
              {loadingPreview || !previewCard.card ? (
                <div style={styles.center}><div style={styles.spinnerPurple} /></div>
              ) : isPdf(previewCard.cardType) ? (
                <iframe
                  src={previewCard.card}
                  style={{ width: "100%", height: "100%", border: "none" }}
                  title="PDF"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewCard.card}
                  alt="Admit Card"
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: "8px" }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── STYLES ─────────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  layout:       { minHeight: "100vh", background: "#f3f4f6", display: "flex", fontFamily: "'Inter', sans-serif", color: "#374151" },
  sidebar:      { width: "210px", minWidth: "210px", background: "#fff", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", position: "sticky" as const, top: 0, height: "100vh" },
  sidebarTop:   { padding: "20px 16px 16px", borderBottom: "1px solid #f3f4f6" },
  brand:        { display: "flex", alignItems: "center", gap: "10px" },
  brandIcon:    { width: "36px", height: "36px", background: "linear-gradient(135deg,#7c3aed,#6d28d9)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" },
  brandName:    { fontSize: "14px", fontWeight: 700, color: "#111827", margin: 0 },
  brandSub:     { fontSize: "11px", color: "#9ca3af", margin: 0 },
  navSection:   { padding: "20px 12px", flex: 1 },
  navLabel:     { fontSize: "10px", fontWeight: 600, color: "#9ca3af", letterSpacing: "0.1em", marginBottom: "8px", paddingLeft: "6px" },
  navBtn:       { display: "flex", alignItems: "center", gap: "9px", padding: "9px 10px", borderRadius: "8px", border: "none", background: "transparent", cursor: "pointer", width: "100%", fontSize: "13.5px", fontWeight: 500, color: "#374151", position: "relative" as const },
  activeDot:    { width: "6px", height: "6px", borderRadius: "50%", background: "#7c3aed", marginLeft: "auto" },
  sidebarFoot:  { padding: "12px", borderTop: "1px solid #f3f4f6" },
  logoutBtn:    { display: "flex", alignItems: "center", gap: "7px", background: "transparent", color: "#6b7280", padding: "8px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", cursor: "pointer", fontWeight: 500, fontSize: "12.5px", width: "100%", justifyContent: "center" as const },
  main:         { flex: 1, display: "flex", flexDirection: "column" as const, minWidth: 0 },
  topbar:       { background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "20px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" as const },
  title:        { fontSize: "22px", fontWeight: 700, color: "#111827", margin: 0 },
  subtitle:     { fontSize: "13px", color: "#9ca3af", margin: "2px 0 0" },
  topActions:   { display: "flex", alignItems: "center", gap: "10px" },
  searchInput:  { background: "#f9fafb", border: "1px solid #e5e7eb", color: "#111827", padding: "9px 13px", borderRadius: "8px", fontSize: "13.5px", outline: "none", width: "220px" },
  btnAdd:       { display: "flex", alignItems: "center", gap: "6px", background: "#7c3aed", color: "#fff", padding: "9px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "13.5px" },
  body:         { padding: "24px 28px" },
  card:         { background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" },
  table:        { width: "100%", borderCollapse: "collapse" as const },
  th:           { padding: "12px 16px", textAlign: "left" as const, fontSize: "10.5px", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "#9ca3af", background: "#f9fafb", borderBottom: "1px solid #e5e7eb", whiteSpace: "nowrap" as const },
  td:           { padding: "12px 16px", fontSize: "13.5px", color: "#4b5563", borderBottom: "1px solid #f3f4f6", whiteSpace: "nowrap" as const },
  rollBadge:    { fontFamily: "monospace", fontSize: "13px", color: "#7c3aed", fontWeight: 600 },
  btnView:      { display: "inline-flex", alignItems: "center", gap: "4px", background: "#f5f3ff", color: "#7c3aed", border: "1px solid #ede9fe", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 500, cursor: "pointer" },
  btnEdit:      { background: "#f5f3ff", color: "#7c3aed", border: "1px solid #ede9fe", padding: "6px 8px", borderRadius: "7px", cursor: "pointer", display: "flex", alignItems: "center" },
  btnDel:       { background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", padding: "6px 8px", borderRadius: "7px", cursor: "pointer", display: "flex", alignItems: "center" },
  center:       { minHeight: "200px", display: "flex", alignItems: "center", justifyContent: "center" },
  empty:        { padding: "70px 20px", display: "flex", flexDirection: "column" as const, alignItems: "center" },
  overlay:      { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "20px" },
  modal:        { background: "#fff", borderRadius: "16px", width: "100%", maxWidth: "500px", boxShadow: "0 20px 50px rgba(0,0,0,0.15)", overflow: "hidden" },
  modalHead:    { padding: "22px 26px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid #f3f4f6" },
  modalTitle:   { fontSize: "18px", fontWeight: 700, color: "#111827", margin: 0 },
  modalSub:     { fontSize: "13px", color: "#9ca3af", marginTop: "3px" },
  modalBody:    { padding: "22px 26px" },
  row:          { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" },
  field:        { display: "flex", flexDirection: "column" as const, gap: "5px" },
  label:        { fontSize: "11px", fontWeight: 600, color: "#6b7280", letterSpacing: "0.06em", textTransform: "uppercase" as const },
  input:        { background: "#f9fafb", border: "1px solid #e5e7eb", color: "#111827", padding: "9px 13px", borderRadius: "8px", fontSize: "13.5px", outline: "none", width: "100%", boxSizing: "border-box" as const },
  dropzone:     { marginTop: "7px", border: "2px dashed #e5e7eb", borderRadius: "10px", padding: "22px", cursor: "pointer", background: "#fafafa", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "110px", transition: "all 0.15s" },
  modalFoot:    { padding: "16px 26px", display: "flex", justifyContent: "flex-end", gap: "10px", borderTop: "1px solid #f3f4f6", background: "#f9fafb" },
  closeBtn:     { background: "#f9fafb", border: "1px solid #e5e7eb", color: "#9ca3af", borderRadius: "7px", padding: "7px", cursor: "pointer", display: "flex", alignItems: "center" },
  cancelBtn:    { background: "transparent", border: "1px solid #e5e7eb", color: "#6b7280", padding: "9px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: 500, fontSize: "13.5px" },
  saveBtn:      { background: "#7c3aed", border: "none", color: "#fff", padding: "9px 22px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "13.5px" },
  previewModal: { background: "#fff", borderRadius: "14px", width: "100%", maxWidth: "780px", height: "82vh", display: "flex", flexDirection: "column" as const, boxShadow: "0 20px 50px rgba(0,0,0,0.2)" },
  previewHead:  { padding: "14px 18px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" },
  previewBody:  { flex: 1, overflow: "hidden", padding: "14px", display: "flex", alignItems: "center", justifyContent: "center" },
  openLink:     { fontSize: "13px", fontWeight: 500, color: "#7c3aed", background: "#f5f3ff", border: "1px solid #ede9fe", padding: "6px 12px", borderRadius: "7px", textDecoration: "none" },
  spinner:      { width: "32px", height: "32px", border: "3px solid #e5e7eb", borderTop: "3px solid #7c3aed", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
  spinnerPurple:{ width: "28px", height: "28px", border: "2.5px solid #e5e7eb", borderTop: "2.5px solid #7c3aed", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
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