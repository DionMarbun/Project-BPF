import React, { useState } from "react";

const dataLowongan = [
  {
    posisi: "Customer Service",
    lokasi: "Graha Pena Pekanbaru",
    tanggalDibuka: "2025-05-01",
    tipe: "Full Time",
  },
  {
    posisi: "Teknisi Gedung",
    lokasi: "Graha Pena Pekanbaru",
    tanggalDibuka: "2025-04-25",
    tipe: "Kontrak",
  },
  {
    posisi: "Marketing Event",
    lokasi: "Graha Pena Pekanbaru",
    tanggalDibuka: "2025-04-15",
    tipe: "Freelance",
  },
  {
    posisi: "Staff Booking Ruangan",
    lokasi: "Graha Pena Pekanbaru",
    tanggalDibuka: "2025-05-10",
    tipe: "Full Time",
  },
];

const LowonganList = () => {
  const [search, setSearch] = useState("");

  const filtered = dataLowongan.filter((item) =>
    item.posisi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 p-6 pt-24 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Daftar Lowongan Pekerjaan</h2>
          <input
            type="text"
            placeholder="Cari posisi..."
            className="border px-4 py-2 rounded-md w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-gray-700">
                <th className="text-left p-4">Posisi</th>
                <th className="text-left p-4">Lokasi</th>
                <th className="text-left p-4">Tanggal Dibuka</th>
                <th className="text-left p-4">Tipe</th>
                <th className="text-left p-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr key={idx} className="border-t border-gray-200">
                  <td className="p-4">{item.posisi}</td>
                  <td className="p-4">{item.lokasi}</td>
                  <td className="p-4">{item.tanggalDibuka}</td>
                  <td className="p-4">{item.tipe}</td>
                  <td className="p-4">
                    <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-200 mr-2">
                      Edit
                    </button>
                    <button className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    Tidak ada lowongan ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LowonganList;
