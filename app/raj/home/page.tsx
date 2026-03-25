"use client";

import useAuthGuard from "@/hooks/useAuthGuard";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const zones = [
  "Ahmedabad", "Ajmer", "Allahabad", "Bangalore", "Bhopal",
  "Bhubaneshwar", "Bilaspur", "Chandigarh", "Delhi", "Gorakhpur",
  "Guwahati", "Jammu", "Kolkata", "Hajipur", "Mumbai",
  "Muzaffarpur", "Patna", "Ranchi", "Secunderabad", "Siliguri", "Trivendrum",
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
  roll: "", zone: "", name: "", fatherName: "",
  postApplied: "", controlNo: "", dob: "", result: "",
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

  const [searchRoll, setSearchRoll] = useState("");
  const [searchZone, setSearchZone] = useState("");
  const [searchResult, setSearchResult] = useState<User | null | "not_found">(null);
  const [searching, setSearching] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [togglingBlock, setTogglingBlock] = useState(false);
  const [activeNav, setActiveNav] = useState("users");

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch("/api/user");
      const data = await res.json();
      setUsers(data.data || []);
    } catch (err) { console.error(err); }
    setLoadingUsers(false);
  };

  const fetchBlockStatus = async () => {
    try {
      const res = await fetch("/api/user/block");
      const data = await res.json();
      if (data.success) setIsBlocked(data.isBlocked);
    } catch (err) { console.error(err); }
  };

  const toggleBlock = async () => {
    try {
      setTogglingBlock(true);
      const res = await fetch("/api/user/block", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBlocked: !isBlocked }),
      });
      const data = await res.json();
      if (data.success) setIsBlocked(data.data.isBlocked);
    } catch (err) { console.error(err); }
    setTogglingBlock(false);
  };

  useEffect(() => {
    fetchUsers();
    fetchBlockStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    router.replace("/raj");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      roll: user.roll, zone: user.zone, name: user.name,
      fatherName: user.fatherName, postApplied: user.postApplied,
      controlNo: user.controlNo, dob: user.dob ? user.dob.slice(0, 10) : "",
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
      `/api/user/search?roll=${encodeURIComponent(searchRoll)}&zone=${encodeURIComponent(searchZone)}`
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
    { name: "fatherName", label: "Father's Name", placeholder: "Father's full name" },
    { name: "postApplied", label: "Post Applied", placeholder: "e.g. Junior Engineer" },
    { name: "controlNo", label: "Control Number", placeholder: "e.g. CTRL-001" },
    { name: "result", label: "Result", placeholder: "e.g. Pass / Fail" },
  ];

  const navItems = [
    {
      key: "dashboard", label: "Dashboard", icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      )
    },
    {
      key: "users", label: "Users", icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      key: "admitcards", label: "Admit Cards", icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
          <line x1="7" y1="15" x2="10" y2="15" />
          <line x1="14" y1="15" x2="17" y2="15" />
        </svg>
      )
    },
    {
      key: "application", label: "Application Details", icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
          <line x1="7" y1="15" x2="10" y2="15" />
          <line x1="14" y1="15" x2="17" y2="15" />
        </svg>
      )
    },
  ];

  return (
    <div style={styles.layout}>
      <style>{css}</style>

      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarTop}>
          <div style={styles.brandMark}>
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
          <nav style={styles.nav}>
            {navItems.map((item) => (
              <button
                key={item.key}
                className={`nav-item ${activeNav === item.key ? "nav-item-active" : ""}`}
                style={{
                  ...styles.navItem,
                  ...(activeNav === item.key ? styles.navItemActive : {}),
                }}
                onClick={() => {
                  setActiveNav(item.key);
                  if (item.key === "admitcards") router.push("/admitcard");
                  if (item.key === "application") router.push("/application/form/table");
                }}
              >
                <span style={{
                  ...styles.navIcon,
                  color: activeNav === item.key ? "#7c3aed" : "#9ca3af",
                }}>
                  {item.icon}
                </span>
                <span style={styles.navText}>{item.label}</span>
                {activeNav === item.key && <span style={styles.navActiveDot} />}
              </button>
            ))}
          </nav>
        </div>

        <div style={styles.sidebarBottom}>
          <button
            onClick={toggleBlock}
            disabled={togglingBlock}
            className="sidebar-block-btn"
            style={{
              ...styles.sidebarBlockBtn,
              background: isBlocked ? "#fef2f2" : "#f0fdf4",
              color: isBlocked ? "#dc2626" : "#16a34a",
              border: isBlocked ? "1px solid #fecaca" : "1px solid #bbf7d0",
            }}
          >
            <span>{isBlocked ? "🔓" : "🔒"}</span>
            <span>{togglingBlock ? "Updating..." : isBlocked ? "Unblock Site" : "Block Site"}</span>
          </button>
          <button onClick={handleLogout} className="sidebar-logout-btn" style={styles.sidebarLogoutBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        {/* TOP BAR */}
        <div style={styles.topbar}>
          <div>
            <h1 style={styles.pageTitle}>Users</h1>
            <p style={styles.pageSubtitle}>Manage all candidate records</p>
          </div>
          <div style={styles.topbarActions}>
            <span style={styles.countBadge}>{users.length} total records</span>
            <button
              className="btn-search-toggle"
              onClick={() => setShowSearch((s) => !s)}
              style={styles.btnSearchToggle}
              title="Search"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Search
            </button>
            <button className="btn-add" onClick={openAddForm} style={styles.btnAdd}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add User
            </button>
          </div>
        </div>

        <div style={styles.mainBody}>
          {/* SEARCH PANEL */}
          {showSearch && (
            <div className="search-panel" style={styles.searchPanel}>
              <p style={styles.searchTitle}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Search by Roll & Zone
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
                  {zones.map((z) => <option key={z} value={z}>{z}</option>)}
                </select>
                <button className="btn-add" onClick={handleSearch} disabled={searching} style={{ ...styles.btnAdd, minWidth: "100px" }}>
                  {searching ? "Searching..." : "Search"}
                </button>
                <button className="btn-outline" onClick={clearSearch} style={styles.btnOutline}>Clear</button>
              </div>

              {searchResult === "not_found" && (
                <div style={styles.searchNotFound}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  No candidate found with Roll <strong>{searchRoll}</strong> in <strong>{searchZone}</strong> zone.
                </div>
              )}
              {searchResult && searchResult !== "not_found" && (
                <div style={styles.searchResultCard}>
                  <div style={styles.searchResultGrid}>
                    {[
                      ["Roll", searchResult.roll], ["Zone", searchResult.zone],
                      ["Name", searchResult.name], ["Father's Name", searchResult.fatherName],
                      ["Post Applied", searchResult.postApplied], ["Control No", searchResult.controlNo],
                      ["DOB", new Date(searchResult.dob).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })],
                      ["Result", searchResult.result],
                    ].map(([label, value]) => (
                      <div key={label} style={styles.searchResultItem}>
                        <span style={styles.searchResultLabel}>{label}</span>
                        <span style={styles.searchResultValue}>{value}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                    <button className="btn-edit" onClick={() => openEditForm(searchResult as User)}
                      style={{ ...styles.btnEdit, padding: "8px 16px", fontSize: "13px", gap: "6px", display: "flex", alignItems: "center" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Edit Record
                    </button>
                    <button className="btn-delete" onClick={() => deleteUser((searchResult as User)._id)}
                      style={{ ...styles.btnDelete, padding: "8px 16px", fontSize: "13px", gap: "6px", display: "flex", alignItems: "center" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TABLE CARD */}
          <div style={styles.card}>
            {loadingUsers ? (
              <div style={styles.tableLoader}>
                <div style={styles.spinnerLight} />
                <p style={{ color: "#9ca3af", marginTop: "10px", fontSize: "14px" }}>Loading records...</p>
              </div>
            ) : users.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                </div>
                <p style={styles.emptyText}>No records found. Add a user to get started.</p>
              </div>
            ) : (
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      {["Roll", "Zone", "Name", "Father Name", "Post Applied", "Control No", "DOB", "Result", "Actions"].map((h) => (
                        <th key={h} style={styles.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, i) => (
                      <tr key={user._id} className="table-row" style={{ animationDelay: `${i * 30}ms` }}>
                        <td style={styles.td}><span style={styles.rollBadge}>{user.roll}</span></td>
                        <td style={styles.td}><span style={styles.zonePill}>{user.zone}</span></td>
                        <td style={{ ...styles.td, fontWeight: 600, color: "#111827" }}>{user.name}</td>
                        <td style={styles.td}>{user.fatherName}</td>
                        <td style={styles.td}>{user.postApplied}</td>
                        <td style={styles.td}><code style={styles.code}>{user.controlNo}</code></td>
                        <td style={styles.td}>
                          {new Date(user.dob).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        </td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.resultBadge,
                            ...(user.result?.toLowerCase().includes("pass") ? styles.resultPass
                              : user.result?.toLowerCase().includes("fail") ? styles.resultFail
                                : styles.resultNeutral),
                          }}>
                            {user.result}
                          </span>
                        </td>
                        <td style={{ ...styles.td, whiteSpace: "nowrap" }}>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button className="btn-edit" onClick={() => openEditForm(user)} style={styles.btnEdit} title="Edit">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                            </button>
                            <button className="btn-delete" onClick={() => deleteUser(user._id)}
                              disabled={deletingId === user._id} style={styles.btnDelete} title="Delete">
                              {deletingId === user._id ? "·" : (
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
          <div className="modal-card" style={styles.modal}>
            <div style={styles.modalHeader}>
              <div>
                <h2 style={styles.modalTitle}>{editingUser ? "Edit Record" : "Add New User"}</h2>
                <p style={styles.modalSubtitle}>
                  {editingUser ? `Editing: ${editingUser.name}` : "Fill in the candidate details below"}
                </p>
              </div>
              <button onClick={() => setShowForm(false)} className="btn-close" style={styles.btnClose}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
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
                  <select name="zone" value={formData.zone} onChange={handleChange} className="form-input" style={styles.input}>
                    <option value="">Select Zone</option>
                    {zones.map((z) => <option key={z} value={z}>{z}</option>)}
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Date of Birth</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="form-input" style={styles.input} />
                </div>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button onClick={() => setShowForm(false)} className="btn-cancel" style={styles.btnCancel}>Cancel</button>
              <button onClick={handleSubmit} disabled={saving} className="btn-save" style={styles.btnSave}>
                {saving ? "Saving..." : editingUser ? "Update Record" : "Save Record"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  layout: {
    minHeight: "100vh",
    background: "#f3f4f6",
    display: "flex",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    color: "#374151",
  },

  /* ── SIDEBAR ── */
  sidebar: {
    width: "220px",
    minWidth: "220px",
    background: "#ffffff",
    borderRight: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    padding: "0",
    position: "sticky" as const,
    top: 0,
    height: "100vh",
    overflowY: "auto" as const,
  },
  sidebarTop: {
    padding: "20px 16px 16px",
    borderBottom: "1px solid #f3f4f6",
  },
  brandMark: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  brandIcon: {
    width: "36px",
    height: "36px",
    background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  brandName: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#111827",
    margin: 0,
    lineHeight: 1.2,
  },
  brandSub: {
    fontSize: "11px",
    color: "#9ca3af",
    margin: 0,
    lineHeight: 1.4,
  },
  navSection: {
    padding: "20px 12px 12px",
    flex: 1,
  },
  navLabel: {
    fontSize: "10px",
    fontWeight: 600,
    color: "#9ca3af",
    letterSpacing: "0.1em",
    marginBottom: "8px",
    paddingLeft: "8px",
  },
  nav: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "2px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "9px 10px",
    borderRadius: "8px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    width: "100%",
    textAlign: "left" as const,
    transition: "all 0.15s",
    position: "relative" as const,
  },
  navItemActive: {
    background: "#f5f3ff",
  },
  navIcon: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },
  navText: {
    fontSize: "13.5px",
    fontWeight: 500,
    color: "#374151",
    flex: 1,
  },
  navActiveDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#7c3aed",
  },
  sidebarBottom: {
    padding: "12px",
    borderTop: "1px solid #f3f4f6",
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px",
  },
  sidebarBlockBtn: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "12.5px",
    width: "100%",
    justifyContent: "center" as const,
  },
  sidebarLogoutBtn: {
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

  /* ── MAIN ── */
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    minWidth: 0,
  },
  topbar: {
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    padding: "20px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap" as const,
    gap: "12px",
  },
  pageTitle: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#111827",
    margin: 0,
    letterSpacing: "-0.01em",
  },
  pageSubtitle: {
    fontSize: "13px",
    color: "#9ca3af",
    margin: "2px 0 0",
  },
  topbarActions: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap" as const,
  },
  countBadge: {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    color: "#6b7280",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12.5px",
    fontWeight: 500,
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
  btnSearchToggle: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#ffffff",
    color: "#374151",
    padding: "9px 16px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "13.5px",
  },
  btnOutline: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#ffffff",
    color: "#6b7280",
    padding: "9px 16px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "13.5px",
  },
  mainBody: {
    padding: "24px 32px",
    flex: 1,
  },

  /* ── SEARCH PANEL ── */
  searchPanel: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "20px 22px",
    marginBottom: "20px",
  },
  searchTitle: {
    fontSize: "11px",
    fontWeight: 600,
    color: "#9ca3af",
    letterSpacing: "0.07em",
    textTransform: "uppercase" as const,
    marginBottom: "14px",
    display: "flex",
    alignItems: "center",
    gap: "7px",
  },
  searchRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap" as const,
    alignItems: "center",
  },
  searchInput: {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    color: "#111827",
    padding: "9px 13px",
    borderRadius: "8px",
    fontSize: "13.5px",
    outline: "none",
    minWidth: "160px",
    flex: 1,
  },
  searchNotFound: {
    marginTop: "14px",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#dc2626",
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "13.5px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  searchResultCard: {
    marginTop: "14px",
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "18px",
  },
  searchResultGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: "14px",
  },
  searchResultItem: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "3px",
  },
  searchResultLabel: {
    fontSize: "10px",
    fontWeight: 600,
    color: "#9ca3af",
    textTransform: "uppercase" as const,
    letterSpacing: "0.07em",
  },
  searchResultValue: { fontSize: "13.5px", color: "#111827", fontWeight: 500 },

  /* ── TABLE CARD ── */
  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    overflow: "hidden",
  },
  tableWrapper: { overflowX: "auto" as const },
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
  zonePill: {
    background: "#f5f3ff",
    color: "#7c3aed",
    padding: "3px 9px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 500,
    border: "1px solid #ede9fe",
  },
  code: {
    background: "#f3f4f6",
    color: "#6b7280",
    padding: "2px 7px",
    borderRadius: "4px",
    fontSize: "12px",
    fontFamily: "monospace",
  },
  resultBadge: {
    padding: "3px 9px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
  },
  resultPass: { background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" },
  resultFail: { background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" },
  resultNeutral: { background: "#f9fafb", color: "#6b7280", border: "1px solid #e5e7eb" },
  btnEdit: {
    background: "#f5f3ff",
    color: "#7c3aed",
    border: "1px solid #ede9fe",
    padding: "6px 9px",
    borderRadius: "7px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnDelete: {
    background: "#fef2f2",
    color: "#dc2626",
    border: "1px solid #fecaca",
    padding: "6px 9px",
    borderRadius: "7px",
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
    gap: "12px",
  },
  emptyIcon: {
    width: "60px",
    height: "60px",
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: { color: "#9ca3af", fontSize: "14px" },
  tableLoader: {
    padding: "80px 20px",
    textAlign: "center" as const,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },

  /* ── MODAL ── */
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
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "600px",
    overflow: "hidden",
    boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
  },
  modalHeader: {
    padding: "24px 28px 18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottom: "1px solid #f3f4f6",
  },
  modalTitle: { fontSize: "18px", fontWeight: 700, color: "#111827", margin: 0 },
  modalSubtitle: { fontSize: "13px", color: "#9ca3af", marginTop: "3px" },
  modalBody: { padding: "24px 28px" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" },
  formGroup: { display: "flex", flexDirection: "column" as const, gap: "5px" },
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
  modalFooter: {
    padding: "18px 28px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    borderTop: "1px solid #f3f4f6",
    background: "#f9fafb",
  },
  btnClose: {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    color: "#9ca3af",
    borderRadius: "7px",
    padding: "7px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  btnCancel: {
    background: "transparent",
    border: "1px solid #e5e7eb",
    color: "#6b7280",
    padding: "9px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "13.5px",
  },
  btnSave: {
    background: "#7c3aed",
    border: "none",
    color: "#fff",
    padding: "9px 22px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "13.5px",
  },

  /* ── LOADING ── */
  loadingScreen: {
    minHeight: "100vh",
    background: "#f9fafb",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: "14px",
  },
  spinner: {
    width: "32px",
    height: "32px",
    border: "3px solid #e5e7eb",
    borderTop: "3px solid #7c3aed",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  spinnerLight: {
    width: "28px",
    height: "28px",
    border: "2.5px solid #e5e7eb",
    borderTop: "2.5px solid #7c3aed",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: { color: "#9ca3af", fontSize: "14px" },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes modalIn { from { opacity: 0; transform: scale(0.97) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
  @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
  .search-panel { animation: slideDown 0.2s ease both; }
  .table-row { animation: fadeSlideIn 0.25s ease both; transition: background 0.12s; }
  .table-row:hover { background: #f9fafb !important; }
  .table-row:last-child td { border-bottom: none !important; }
  .modal-card { animation: modalIn 0.2s cubic-bezier(0.34, 1.4, 0.64, 1) both; }
  .form-input:focus { border-color: #7c3aed !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); }
  .form-input option { background: #fff; color: #111827; }
  .btn-add:hover { background: #6d28d9 !important; transition: all 0.15s; }
  .btn-search-toggle:hover { border-color: #d1d5db !important; background: #f9fafb !important; transition: all 0.15s; }
  .btn-outline:hover { border-color: #d1d5db !important; background: #f9fafb !important; transition: all 0.15s; }
  .btn-edit:hover { background: #ede9fe !important; border-color: #c4b5fd !important; transition: all 0.15s; }
  .btn-delete:hover { background: #fee2e2 !important; border-color: #fca5a5 !important; transition: all 0.15s; }
  .btn-close:hover { background: #f3f4f6 !important; color: #374151 !important; transition: all 0.15s; }
  .btn-cancel:hover { background: #f9fafb !important; transition: all 0.15s; }
  .btn-save:hover { background: #6d28d9 !important; transition: all 0.15s; }
  .nav-item:hover { background: #f9fafb !important; }
  .nav-item-active .nav-text { color: #7c3aed !important; font-weight: 600 !important; }
  .sidebar-logout-btn:hover { background: #f9fafb !important; color: #374151 !important; transition: all 0.15s; }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: #f9fafb; }
  ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
  input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.5; }
`;

export default HomePage;