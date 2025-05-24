import { useState } from "react";
import data from "../JSON/grahaPena.json"; // pastikan path sesuai

export default function Orders() {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Daftar Orders</h2>

      <input
        type="text"
        placeholder="Cari nama ruangan..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 px-4 py-2 border rounded-lg w-full sm:w-1/2"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Gambar</th>
              <th className="p-3">Ruangan</th>
              <th className="p-3">Harga</th>
              <th className="p-3">Kapasitas</th>
              <th className="p-3">Lantai</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 font-medium text-gray-800">{item.name}</td>
                  <td className="p-3">{item.price}</td>
                  <td className="p-3">{item.capacity}</td>
                  <td className="p-3">{item.location.floor}</td>
                  <td className="p-3">
                    <span className="px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                      Confirmed
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  Tidak ada orders ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
