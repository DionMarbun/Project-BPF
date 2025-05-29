import React, { useState } from "react";
import { Link } from "react-router-dom";
import reviewData from "../JSON/dataReview.json"; // pastikan tidak ada spasi di nama file

const ReviewList = () => {
  const [search, setSearch] = useState("");

  const filtered = reviewData.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 p-6 pt-24 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Review Pelanggan</h2>
          <input
            type="text"
            placeholder="Cari nama pelanggan..."
            className="border px-4 py-2 rounded-md w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm px-6">
            <thead>
              <tr className="text-gray-700">
                <th className="text-left p-4">Nama</th>
                <th className="text-left p-4">Komentar</th>
                <th className="text-left p-4">Rating</th>
                <th className="text-left p-4">Tanggal</th>
                <th className="text-left p-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr key={idx} className="border-t border-gray-200">
                  <td className="p-4">
                    <Link
                      to={`/ReviewPelanggan/${item.id}`}
                      className="text-emerald-500 hover:text-emerald-600 underline"
                    >
                      {item.nama}
                    </Link>
                  </td>
                  <td className="p-4">{item.komentar}</td>
                  <td className="p-4">{item.rating} ⭐</td>
                  <td className="p-4">{item.tanggal}</td>
                  <td className="p-4">
                    <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-200 mr-3">
                      Edit
                    </button>
                    <button className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200 mr-3">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    Tidak ada review ditemukan.
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

export default ReviewList;
