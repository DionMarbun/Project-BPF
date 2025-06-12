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
    <div className="bg-blue-50 p-6 pt-24 min-h-screen font-[Poppins]">
      <div className="bg-white rounded-xl shadow p-6 border border-blue-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-blue-700">
            Daftar Lowongan Pekerjaan
          </h2>
          <input
            type="text"
            placeholder="Cari posisi..."
            className="border border-blue-300 bg-white focus:ring-2 focus:ring-blue-400 px-4 py-2 rounded-md w-full sm:w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white text-blue-600 border-b border-blue-100">
              <tr>
                <th className="text-left p-4 font-semibold">Posisi</th>
                <th className="text-left p-4 font-semibold">Lokasi</th>
                <th className="text-left p-4 font-semibold">Tanggal Dibuka</th>
                <th className="text-left p-4 font-semibold">Tipe</th>
                <th className="text-left p-4 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-t border-blue-100 hover:bg-blue-50 transition"
                >
                  <td className="p-4 text-blue-700">{item.posisi}</td>
                  <td className="p-4 text-gray-700">{item.lokasi}</td>
                  <td className="p-4 text-gray-700">{item.tanggalDibuka}</td>
                  <td className="p-4 text-gray-700">{item.tipe}</td>
                  <td className="p-4">
                    <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-200 mr-2 transition">
                      Edit
                    </button>
                    <button className="bg-blue-50 text-blue-500 px-3 py-1 rounded-md text-sm hover:bg-blue-100 transition">
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
