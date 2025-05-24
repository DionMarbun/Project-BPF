import React, { useState } from "react";
import data from '../JSON/grahaPena.json'; // relative path dari file .jsx kamu

export default function CustomerList() {
  const [search, setSearch] = useState("");
  const [minCapacity, setMinCapacity] = useState("");
  const [minFloor, setMinFloor] = useState("");

  // Konversi kapasitas seperti "100 Orang" menjadi 100
  const parseCapacity = (str) => {
    const match = str.match(/\d+/); // ambil angka pertama
    return match ? parseInt(match[0]) : 0;
  };

  const filteredData = data.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(search.toLowerCase());

    const capacity = parseCapacity(item.capacity); // pastikan ini angka
    const floor = item.location?.floor || 0;

    const capacityMatch = minCapacity ? capacity >= parseInt(minCapacity) : true;
    const floorMatch = minFloor ? floor >= parseInt(minFloor) : true;

    return nameMatch && capacityMatch && floorMatch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Daftar Customer Booking Ruangan
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari berdasarkan nama ruangan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full sm:w-1/2"
        />
        <input
          type="number"
          placeholder="Min Kapasitas"
          value={minCapacity}
          onChange={(e) => setMinCapacity(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full sm:w-1/4"
        />
        <input
          type="number"
          placeholder="Min Lantai"
          value={minFloor}
          onChange={(e) => setMinFloor(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full sm:w-1/4"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Foto</th>
              <th className="p-3">Ruangan</th>
              <th className="p-3">Harga</th>
              <th className="p-3">Kapasitas</th>
              <th className="p-3">Lantai</th>
              <th className="p-3">Fasilitas</th>
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
                  <td className="p-3 text-sm text-gray-700">
                    {Object.entries(item.facilities)
                      .filter(([_, val]) => val)
                      .map(([key, val]) =>
                        typeof val === "string" ? val : key.replaceAll("_", " ")
                      )
                      .join(", ")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  Tidak ada ruangan ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}