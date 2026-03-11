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

const HomePage = () => {
  const { isAuthorized, checking } = useAuthGuard();
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    roll: "",
    zone: "",
    name: "",
    fatherName: "",
    postApplied: "",
    controlNo: "",
    dob: "",
    result: "",
  });

  const fetchUsers = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();
    setUsers(data.data || []);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    router.replace("/admin");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        dob: new Date(formData.dob),
      }),
    });

    setShowForm(false);

    setFormData({
      roll: "",
      zone: "",
      name: "",
      fatherName: "",
      postApplied: "",
      controlNo: "",
      dob: "",
      result: "",
    });

    fetchUsers();
  };

  const deleteUser = async (id: string) => {
    await fetch(`/api/user/${id}`, {
      method: "DELETE",
    });

    fetchUsers();
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Checking Authentication...</p>
      </div>
    );
  }

  if (!isAuthorized) return null;

  return (
    <div className="p-8">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>

        <div className="flex gap-3">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add User
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-[420px] space-y-3">
            <h2 className="text-lg font-bold">Add User</h2>

            <input
              name="roll"
              placeholder="Roll"
              value={formData.roll}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />

            {/* ZONE DROPDOWN */}
            <select
              name="zone"
              value={formData.zone}
              onChange={(e) =>
                setFormData({ ...formData, zone: e.target.value })
              }
              className="border w-full p-2 rounded"
            >
              <option value="">Select Zone</option>

              {zones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>

            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />

            <input
              name="fatherName"
              placeholder="Father Name"
              value={formData.fatherName}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />

            <input
              name="postApplied"
              placeholder="Post Applied"
              value={formData.postApplied}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />

            <input
              name="controlNo"
              placeholder="Control Number"
              value={formData.controlNo}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />

            {/* DOB */}
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />

            <input
              name="result"
              placeholder="Result"
              value={formData.result}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* USERS TABLE */}

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Roll</th>
              <th className="border p-2">Zone</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Father Name</th>
              <th className="border p-2">Post Applied</th>
              <th className="border p-2">Control No</th>
              <th className="border p-2">DOB</th>
              <th className="border p-2">Result</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border p-2">{user.roll}</td>
                <td className="border p-2">{user.zone}</td>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.fatherName}</td>
                <td className="border p-2">{user.postApplied}</td>
                <td className="border p-2">{user.controlNo}</td>

                <td className="border p-2">
                  {new Date(user.dob).toLocaleDateString()}
                </td>

                <td className="border p-2">{user.result}</td>

                <td className="border p-2">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
