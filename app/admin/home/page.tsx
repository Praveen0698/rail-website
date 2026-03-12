"use client";

import useAuthGuard from "@/hooks/useAuthGuard";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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

interface User {
  _id: string;
  roll: string;
  zone: string;
  name: string;
  fatherName: string;
  postApplied: string;
  controlNo: string;
  dob: string;
  result: string;
}

type FormData = Omit<User, "_id">;

const emptyForm: FormData = {
  roll: "",
  zone: "",
  name: "",
  fatherName: "",
  postApplied: "",
  controlNo: "",
  dob: "",
  result: "",
};

const HomePage = () => {
  const { isAuthorized, checking } = useAuthGuard();
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  // Search state
  const [searchRoll, setSearchRoll] = useState("");
  const [searchZone, setSearchZone] = useState("");
  const [searchResult, setSearchResult] = useState<User | null | "not_found">(
    null,
  );
  const [searching, setSearching] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const fetchUsers = async () => {
    setLoadingUsers(true);

    try {
      const res = await fetch("/api/user");
      const data = await res.json();
      setUsers(data.data || []);
    } catch (err) {
      console.error(err);
    }

    setLoadingUsers(false);
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    router.replace("/admin");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddForm = () => {
    setEditingUser(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (user: User) => {
    setEditingUser(user);
    setFormData({
      roll: user.roll,
      zone: user.zone,
      name: user.name,
      fatherName: user.fatherName,
      postApplied: user.postApplied,
      controlNo: user.controlNo,
      dob: user.dob ? user.dob.slice(0, 10) : "",
      result: user.result,
    });
    setShowForm(true);
  };

  const handleSubmit = async () => {
    setSaving(true);
    if (editingUser) {
      await fetch(`/api/user/${editingUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, dob: new Date(formData.dob) }),
      });
    } else {
      await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, dob: new Date(formData.dob) }),
      });
    }
    setSaving(false);
    setShowForm(false);
    setEditingUser(null);
    setFormData(emptyForm);
    fetchUsers();
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    setDeletingId(id);
    await fetch(`/api/user/${id}`, { method: "DELETE" });
    setDeletingId(null);
    fetchUsers();
  };

  const handleSearch = async () => {
    if (!searchRoll.trim() || !searchZone.trim()) return;
    setSearching(true);
    setSearchResult(null);
    const res = await fetch(
      `/api/user/search?roll=${encodeURIComponent(searchRoll)}&zone=${encodeURIComponent(searchZone)}`,
    );
    const data = await res.json();
    setSearchResult(data.success ? data.data : "not_found");
    setSearching(false);
  };

  const clearSearch = () => {
    setSearchRoll("");
    setSearchZone("");
    setSearchResult(null);
    setShowSearch(false);
  };

  if (checking) {
    return (
      <div style={styles.loadingScreen}>
        <div style={styles.spinner} />
        <p style={styles.loadingText}>Verifying Access...</p>
      </div>
    );
  }

  if (!isAuthorized) return null;

  const formFields = [
    { name: "roll", label: "Roll Number", placeholder: "e.g. 10234567" },
    { name: "name", label: "Full Name", placeholder: "Candidate name" },
    {
      name: "fatherName",
      label: "Father's Name",
      placeholder: "Father's full name",
    },
    {
      name: "postApplied",
      label: "Post Applied",
      placeholder: "e.g. Junior Engineer",
    },
    {
      name: "controlNo",
      label: "Control Number",
      placeholder: "e.g. CTRL-001",
    },
    { name: "result", label: "Result", placeholder: "e.g. Pass / Fail" },
  ];

  return (
    <div style={styles.page}>
      <style>{css}</style>
      <div style={styles.sideAccent} />

      <div style={styles.content}>
        {/* HEADER */}
        <header style={styles.header}>
          <div>
            <p style={styles.headerEyebrow}>RAILWAY RECRUITMENT BOARD</p>
            <h1 style={styles.headerTitle}>User Management</h1>
          </div>
          <div style={styles.headerActions}>
            {/* <span style={styles.badge}>{users.length} Records</span> */}
            <button
              className="btn-search-toggle"
              onClick={() => setShowSearch((s) => !s)}
              style={styles.btnSearchToggle}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <button
              className="btn-add"
              onClick={openAddForm}
              style={styles.btnAdd}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add User
            </button>
            <button
              className="btn-logout"
              onClick={handleLogout}
              style={styles.btnLogout}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        </header>

        <div style={styles.divider} />

        {/* SEARCH PANEL */}
        {showSearch && (
          <div className="search-panel" style={styles.searchPanel}>
            <p style={styles.searchTitle}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Search Candidate by Roll & Zone
            </p>
            <div style={styles.searchRow}>
              <input
                placeholder="Roll Number"
                value={searchRoll}
                onChange={(e) => setSearchRoll(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="form-input"
                style={styles.searchInput}
              />
              <select
                value={searchZone}
                onChange={(e) => setSearchZone(e.target.value)}
                className="form-input"
                style={styles.searchInput}
              >
                <option value="">Select Zone</option>
                {zones.map((z) => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))}
              </select>
              <button
                className="btn-add"
                onClick={handleSearch}
                disabled={searching}
                style={{ ...styles.btnAdd, minWidth: "100px" }}
              >
                {searching ? "Searching..." : "Search"}
              </button>
              <button
                className="btn-logout"
                onClick={clearSearch}
                style={styles.btnLogout}
              >
                Clear
              </button>
            </div>

            {searchResult === "not_found" && (
              <div style={styles.searchNotFound}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f87171"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                No candidate found with Roll{" "}
                <strong style={{ marginLeft: 4 }}>{searchRoll}</strong> in{" "}
                <strong style={{ marginLeft: 4 }}>{searchZone}</strong> zone.
              </div>
            )}
            {searchResult && searchResult !== "not_found" && (
              <div style={styles.searchResultCard}>
                <div style={styles.searchResultGrid}>
                  {[
                    ["Roll", searchResult.roll],
                    ["Zone", searchResult.zone],
                    ["Name", searchResult.name],
                    ["Father's Name", searchResult.fatherName],
                    ["Post Applied", searchResult.postApplied],
                    ["Control No", searchResult.controlNo],
                    [
                      "DOB",
                      new Date(searchResult.dob).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }),
                    ],
                    ["Result", searchResult.result],
                  ].map(([label, value]) => (
                    <div key={label} style={styles.searchResultItem}>
                      <span style={styles.searchResultLabel}>{label}</span>
                      <span style={styles.searchResultValue}>{value}</span>
                    </div>
                  ))}
                </div>
                <div
                  style={{ display: "flex", gap: "10px", marginTop: "16px" }}
                >
                  <button
                    className="btn-edit"
                    onClick={() => openEditForm(searchResult as User)}
                    style={{
                      ...styles.btnEdit,
                      padding: "8px 16px",
                      fontSize: "13px",
                      gap: "6px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit Record
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => deleteUser((searchResult as User)._id)}
                    style={{
                      ...styles.btnDelete,
                      padding: "8px 16px",
                      fontSize: "13px",
                      gap: "6px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14H6L5 6" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TABLE */}
        <div style={styles.card}>
          {loadingUsers ? (
            <div style={styles.tableLoader}>
              <div style={styles.spinner} />
              <p style={{ color: "#64748b", marginTop: "10px" }}>
                Loading records...
              </p>
            </div>
          ) : users.length === 0 ? (
            <div style={styles.emptyState}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4b5563"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
              <p style={styles.emptyText}>
                No records found. Add a user to get started.
              </p>
            </div>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {[
                      "Roll",
                      "Zone",
                      "Name",
                      "Father Name",
                      "Post Applied",
                      "Control No",
                      "DOB",
                      "Result",
                      "Actions",
                    ].map((h) => (
                      <th key={h} style={styles.th}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr
                      key={user._id}
                      className="table-row"
                      style={{ animationDelay: `${i * 30}ms` }}
                    >
                      <td style={styles.td}>
                        <span style={styles.rollBadge}>{user.roll}</span>
                      </td>
                      <td style={styles.td}>
                        <span style={styles.zonePill}>{user.zone}</span>
                      </td>
                      <td
                        style={{
                          ...styles.td,
                          fontWeight: 600,
                          color: "#f1f5f9",
                        }}
                      >
                        {user.name}
                      </td>
                      <td style={styles.td}>{user.fatherName}</td>
                      <td style={styles.td}>{user.postApplied}</td>
                      <td style={styles.td}>
                        <code style={styles.code}>{user.controlNo}</code>
                      </td>
                      <td style={styles.td}>
                        {new Date(user.dob).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.resultBadge,
                            ...(user.result?.toLowerCase().includes("pass")
                              ? styles.resultPass
                              : user.result?.toLowerCase().includes("fail")
                                ? styles.resultFail
                                : styles.resultNeutral),
                          }}
                        >
                          {user.result}
                        </span>
                      </td>
                      <td style={{ ...styles.td, whiteSpace: "nowrap" }}>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            className="btn-edit"
                            onClick={() => openEditForm(user)}
                            style={styles.btnEdit}
                            title="Edit"
                          >
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => deleteUser(user._id)}
                            disabled={deletingId === user._id}
                            style={styles.btnDelete}
                            title="Delete"
                          >
                            {deletingId === user._id ? (
                              "·"
                            ) : (
                              <svg
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
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

      {/* ADD / EDIT MODAL */}
      {showForm && (
        <div
          style={styles.overlay}
          onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
        >
          <div className="modal-card" style={styles.modal}>
            <div style={styles.modalHeader}>
              <div>
                <h2 style={styles.modalTitle}>
                  {editingUser ? "Edit Record" : "Add New User"}
                </h2>
                <p style={styles.modalSubtitle}>
                  {editingUser
                    ? `Editing: ${editingUser.name}`
                    : "Fill in the candidate details below"}
                </p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="btn-close"
                style={styles.btnClose}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.formGrid}>
                {formFields.map((field) => (
                  <div key={field.name} style={styles.formGroup}>
                    <label style={styles.label}>{field.label}</label>
                    <input
                      name={field.name}
                      placeholder={field.placeholder}
                      value={(formData as Record<string, string>)[field.name]}
                      onChange={handleChange}
                      className="form-input"
                      style={styles.input}
                    />
                  </div>
                ))}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Zone</label>
                  <select
                    name="zone"
                    value={formData.zone}
                    onChange={handleChange}
                    className="form-input"
                    style={styles.input}
                  >
                    <option value="">Select Zone</option>
                    {zones.map((z) => (
                      <option key={z} value={z}>
                        {z}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="form-input"
                    style={styles.input}
                  />
                </div>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button
                onClick={() => setShowForm(false)}
                className="btn-cancel"
                style={styles.btnCancel}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="btn-save"
                style={styles.btnSave}
              >
                {saving
                  ? "Saving..."
                  : editingUser
                    ? "Update Record"
                    : "Save Record"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#0b0f1a",
    display: "flex",
    fontFamily: "'DM Sans', sans-serif",
    color: "#cbd5e1",
    position: "relative",
  },
  sideAccent: {
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    width: "3px",
    background:
      "linear-gradient(180deg, #3b82f6 0%, #6366f1 50%, transparent 100%)",
  },
  content: {
    flex: 1,
    padding: "40px 48px",
    maxWidth: "1500px",
    margin: "0 auto",
    width: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "28px",
    flexWrap: "wrap",
    gap: "16px",
  },
  headerEyebrow: {
    fontSize: "11px",
    letterSpacing: "0.2em",
    color: "#3b82f6",
    fontWeight: 600,
    marginBottom: "6px",
  },
  headerTitle: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#f1f5f9",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  badge: {
    background: "#1e293b",
    border: "1px solid #334155",
    color: "#94a3b8",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: 500,
  },
  btnAdd: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    background: "linear-gradient(135deg, #3b82f6, #6366f1)",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "14px",
  },
  btnSearchToggle: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    background: "#1e293b",
    color: "#7dd3fc",
    padding: "10px 18px",
    borderRadius: "10px",
    border: "1px solid #2d4a6e",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "14px",
  },
  btnLogout: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    background: "#1e293b",
    color: "#94a3b8",
    padding: "10px 18px",
    borderRadius: "10px",
    border: "1px solid #334155",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "14px",
  },
  divider: {
    height: "1px",
    background:
      "linear-gradient(90deg, #1e3a5f 0%, #334155 40%, transparent 100%)",
    marginBottom: "28px",
  },
  searchPanel: {
    background: "#111827",
    border: "1px solid #1e293b",
    borderRadius: "14px",
    padding: "22px 24px",
    marginBottom: "24px",
  },
  searchTitle: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#64748b",
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
    marginBottom: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  searchRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap" as const,
    alignItems: "center",
  },
  searchInput: {
    background: "#0f172a",
    border: "1px solid #1e293b",
    color: "#e2e8f0",
    padding: "10px 14px",
    borderRadius: "10px",
    fontSize: "14px",
    outline: "none",
    minWidth: "180px",
    flex: 1,
  },
  searchNotFound: {
    marginTop: "16px",
    background: "#2d0a0a",
    border: "1px solid #7f1d1d",
    color: "#f87171",
    borderRadius: "10px",
    padding: "14px 18px",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  searchResultCard: {
    marginTop: "16px",
    background: "#0d1f3a",
    border: "1px solid #2d4a6e",
    borderRadius: "12px",
    padding: "20px",
  },
  searchResultGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "14px",
  },
  searchResultItem: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "3px",
  },
  searchResultLabel: {
    fontSize: "11px",
    fontWeight: 600,
    color: "#475569",
    textTransform: "uppercase" as const,
    letterSpacing: "0.07em",
  },
  searchResultValue: { fontSize: "14px", color: "#e2e8f0", fontWeight: 500 },
  card: {
    background: "#111827",
    border: "1px solid #1e293b",
    borderRadius: "16px",
    overflow: "hidden",
  },
  tableWrapper: { overflowX: "auto" as const },
  table: { width: "100%", borderCollapse: "collapse" as const },
  th: {
    padding: "14px 16px",
    textAlign: "left" as const,
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    color: "#475569",
    background: "#0f172a",
    borderBottom: "1px solid #1e293b",
    whiteSpace: "nowrap" as const,
  },
  td: {
    padding: "13px 16px",
    fontSize: "13.5px",
    color: "#94a3b8",
    borderBottom: "1px solid #1a2234",
    whiteSpace: "nowrap" as const,
  },
  rollBadge: {
    fontFamily: "monospace",
    fontSize: "13px",
    color: "#60a5fa",
    fontWeight: 600,
  },
  zonePill: {
    background: "#1e293b",
    color: "#7dd3fc",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 500,
    border: "1px solid #2d4a6e",
  },
  code: {
    background: "#1a2234",
    color: "#a78bfa",
    padding: "2px 8px",
    borderRadius: "5px",
    fontSize: "12px",
    fontFamily: "monospace",
  },
  resultBadge: {
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
  },
  resultPass: {
    background: "#052e16",
    color: "#4ade80",
    border: "1px solid #166534",
  },
  resultFail: {
    background: "#2d0a0a",
    color: "#f87171",
    border: "1px solid #7f1d1d",
  },
  resultNeutral: {
    background: "#1e293b",
    color: "#94a3b8",
    border: "1px solid #334155",
  },
  btnEdit: {
    background: "#0d2540",
    color: "#60a5fa",
    border: "1px solid #2d4a6e",
    padding: "7px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnDelete: {
    background: "#2d0a0a",
    color: "#f87171",
    border: "1px solid #7f1d1d",
    padding: "7px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    padding: "80px 20px",
    textAlign: "center" as const,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "16px",
  },
  emptyText: { color: "#475569", fontSize: "15px" },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    padding: "20px",
  },
  modal: {
    background: "#111827",
    border: "1px solid #1e293b",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "600px",
    overflow: "hidden",
    boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
  },
  modalHeader: {
    padding: "28px 32px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottom: "1px solid #1e293b",
  },
  modalTitle: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#f1f5f9",
    margin: 0,
  },
  modalSubtitle: { fontSize: "13px", color: "#475569", marginTop: "4px" },
  modalBody: { padding: "28px 32px" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  formGroup: { display: "flex", flexDirection: "column" as const, gap: "6px" },
  label: {
    fontSize: "11px",
    fontWeight: 600,
    color: "#64748b",
    letterSpacing: "0.07em",
    textTransform: "uppercase" as const,
  },
  input: {
    background: "#0f172a",
    border: "1px solid #1e293b",
    color: "#e2e8f0",
    padding: "10px 14px",
    borderRadius: "10px",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box" as const,
  },
  modalFooter: {
    padding: "20px 32px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    borderTop: "1px solid #1e293b",
    background: "#0f172a",
  },
  btnClose: {
    background: "#1e293b",
    border: "1px solid #334155",
    color: "#64748b",
    borderRadius: "8px",
    padding: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  btnCancel: {
    background: "transparent",
    border: "1px solid #334155",
    color: "#94a3b8",
    padding: "10px 22px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "14px",
  },
  btnSave: {
    background: "linear-gradient(135deg, #3b82f6, #6366f1)",
    border: "none",
    color: "#fff",
    padding: "10px 24px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "14px",
  },
  loadingScreen: {
    minHeight: "100vh",
    background: "#0b0f1a",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
  },
  spinner: {
    width: "36px",
    height: "36px",
    border: "3px solid #1e293b",
    borderTop: "3px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: { color: "#475569", fontSize: "15px", letterSpacing: "0.05em" },
  tableLoader: {
    padding: "80px 20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes modalIn { from { opacity: 0; transform: scale(0.96) translateY(12px); } to { opacity: 1; transform: scale(1) translateY(0); } }
  @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
  .search-panel { animation: slideDown 0.2s ease both; }
  .table-row { animation: fadeSlideIn 0.3s ease both; transition: background 0.15s; }
  .table-row:hover { background: #131f35 !important; }
  .table-row:last-child td { border-bottom: none !important; }
  .modal-card { animation: modalIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
  .form-input:focus { border-color: #3b82f6 !important; box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
  .form-input option { background: #0f172a; }
  .btn-add:hover { opacity: 0.9; transform: translateY(-1px); transition: all 0.15s; }
  .btn-search-toggle:hover { border-color: #3b82f6; color: #93c5fd; transition: all 0.15s; }
  .btn-logout:hover { border-color: #475569; color: #cbd5e1; transition: all 0.15s; }
  .btn-edit:hover { background: #1a3a5c !important; border-color: #3b82f6 !important; transform: scale(1.05); transition: all 0.15s; }
  .btn-delete:hover { background: #3b0a0a !important; transform: scale(1.05); transition: all 0.15s; }
  .btn-close:hover { background: #334155 !important; color: #f1f5f9 !important; transition: all 0.15s; }
  .btn-cancel:hover { background: #1e293b !important; transition: all 0.15s; }
  .btn-save:hover { opacity: 0.9; transform: translateY(-1px); transition: all 0.15s; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: #0f172a; }
  ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #475569; }
  input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.5); cursor: pointer; }
`;

export default HomePage;
