import React, { useState } from "react";
import teamData from "../JSON/team.json"; // Pastikan data JSON memuat field "image", "name", "role", "email", "phone"

export default function TeamManagement() {
  const [search, setSearch] = useState("");

  const filteredTeam = teamData.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-24 p-6 max-w-7xl mx-auto font-[Poppins]">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Daftar Tim</h2>
        <input
          type="text"
          placeholder="Cari nama anggota..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-80"
        />
      </div>

      {/* Table Card */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-white text-gray-500">
            <tr>
              <th className="p-4 font-bold text-left">Foto</th>
              <th className="p-4 font-bold text-left">Nama</th>
              <th className="p-4 font-bold text-left">Peran</th>
              <th className="p-4 font-bold text-left">Email</th>
              <th className="p-4 font-bold text-left">Telepon</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeam.length > 0 ? (
              filteredTeam.map((member) => (
                <tr key={member.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="p-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-800">{member.name}</td>
                  <td className="p-4">{member.role}</td>
                  <td className="p-4">{member.email}</td>
                  <td className="p-4">{member.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  Tidak ada anggota ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
