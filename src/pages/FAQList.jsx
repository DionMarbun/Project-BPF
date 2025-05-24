import React, { useState } from "react";

const dataFAQ = [
  {
    pertanyaan: "Bagaimana cara memesan ruangan?",
    jawaban: "Anda dapat memesan melalui website kami atau langsung ke Graha Pena Pekanbaru.",
  },
  {
    pertanyaan: "Apakah saya bisa membatalkan pesanan?",
    jawaban: "Ya, pembatalan dapat dilakukan maksimal 24 jam sebelum waktu sewa.",
  },
  {
    pertanyaan: "Apakah tersedia fasilitas projector?",
    jawaban: "Beberapa ruangan sudah dilengkapi projector, silakan cek detail ruangan.",
  },
  {
    pertanyaan: "Apakah tersedia parkir untuk tamu?",
    jawaban: "Ya, kami menyediakan area parkir yang cukup luas untuk tamu.",
  },
  {
    pertanyaan: "Bisakah saya melihat ruangan sebelum menyewa?",
    jawaban: "Tentu, Anda dapat datang langsung untuk melihat ruangan yang tersedia.",
  },
];

const FAQList = () => {
  const [search, setSearch] = useState("");

  const filtered = dataFAQ.filter((item) =>
    item.pertanyaan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 p-6 pt-24 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Daftar FAQ - Pertanyaan Umum</h2>
          <input
            type="text"
            placeholder="Cari pertanyaan..."
            className="border px-4 py-2 rounded-md w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-gray-700">
                <th className="text-left p-4">Pertanyaan</th>
                <th className="text-left p-4">Jawaban</th>
                <th className="text-left p-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr key={idx} className="border-t border-gray-200">
                  <td className="p-4">{item.pertanyaan}</td>
                  <td className="p-4">{item.jawaban}</td>
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
                  <td colSpan="3" className="text-center p-4 text-gray-500">
                    Tidak ada pertanyaan ditemukan.
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

export default FAQList;
