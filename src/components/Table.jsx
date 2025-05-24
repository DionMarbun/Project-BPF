// components/Table.js
import React from "react";

const Table = ({ teamData }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Foto</th>
            <th className="p-3">Nama</th>
            <th className="p-3">Peran</th>
            <th className="p-3">Email</th>
            <th className="p-3">Telepon</th>
          </tr>
        </thead>
        <tbody>
          {teamData.length > 0 ? (
            teamData.map((member, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </td>
                <td className="p-3 font-medium text-gray-800">{member.name}</td>
                <td className="p-3">{member.role}</td>
                <td className="p-3">{member.email}</td>
                <td className="p-3">{member.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                Tidak ada anggota tim ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
