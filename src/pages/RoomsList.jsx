import React, { useState } from "react";
import data from "../JSON/grahaPena.json";
import { FaClipboardList, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

// Komponen Statistik Kartu
const StatCard = ({ icon, label, value, color }) => (
  <div className={`p-4 rounded-xl text-white flex items-center gap-4 ${color}`}>
    <div className="text-4xl">{icon}</div>
    <div>
      <div className="text-sm">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  </div>
);

export default function RoomsList() {
  const [search, setSearch] = useState("");
  const [minCapacity, setMinCapacity] = useState("");
  const [minFloor, setMinFloor] = useState("");

  const parseCapacity = (str) => {
    const match = str.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const filteredData = data.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(search.toLowerCase());
    const capacity = parseCapacity(item.capacity);
    const floor = item.location?.floor || 0;
    const capacityMatch = minCapacity ? capacity >= parseInt(minCapacity) : true;
    const floorMatch = minFloor ? floor >= parseInt(minFloor) : true;
    return nameMatch && capacityMatch && floorMatch;
  });

  const totalRooms = data.length;
  const totalBooked = data.filter((room) => room.status === "booked").length;
  const totalAvailable = totalRooms - totalBooked;

  return (
    <div className="pt-24 p-6 max-w-7xl mx-auto font-[Poppins] bg-blue-50 min-h-screen">
      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <StatCard
          icon={<FaClipboardList />}
          label="Total Reservasi"
          value={totalRooms}
          color="bg-blue-600"
        />
        <StatCard
          icon={<FaCheckCircle />}
          label="Sudah Dipesan"
          value={totalBooked}
          color="bg-blue-500"
        />
        <StatCard
          icon={<FaCheckCircle />}
          label="Tersedia"
          value={totalAvailable}
          color="bg-blue-400"
        />
      </div>

      {/* Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari nama ruangan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-blue-300 focus:ring-2 focus:ring-blue-400 rounded-lg w-full sm:w-1/3"
        />
        <input
          type="number"
          placeholder="Min Kapasitas"
          value={minCapacity}
          onChange={(e) => setMinCapacity(e.target.value)}
          className="px-4 py-2 border border-blue-300 focus:ring-2 focus:ring-blue-400 rounded-lg w-full sm:w-1/3"
        />
        <input
          type="number"
          placeholder="Min Lantai"
          value={minFloor}
          onChange={(e) => setMinFloor(e.target.value)}
          className="px-4 py-2 border border-blue-300 focus:ring-2 focus:ring-blue-400 rounded-lg w-full sm:w-1/3"
        />
      </div>

      {/* Card List */}
      <div className="space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl shadow-md border border-blue-100"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-48 h-32 object-cover rounded-lg"
              />
              <div className="flex-1 space-y-2 text-gray-800">
                <h3 className="text-xl font-bold">
                  <Link to={`/RoomsList/${item.id}`} className="text-blue-500 hover:text-blue-600">
                    {item.name}
                  </Link>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold text-blue-600">Harga:</span> {item.price}
                  </div>
                  <div>
                    <span className="font-semibold text-blue-600">Kapasitas:</span>{" "}
                    {item.capacity}
                  </div>
                  <div>
                    <span className="font-semibold text-blue-600">Lantai:</span>{" "}
                    {item.location?.floor}
                  </div>
                  <div className="col-span-full">
                    <span className="font-semibold text-blue-600">Fasilitas:</span>{" "}
                    {Object.entries(item.facilities || {})
                      .filter(([_, val]) => val)
                      .map(([key, val]) =>
                        typeof val === "string" ? val : key.replaceAll("_", " ")
                      )
                      .join(", ")}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500 bg-white rounded-xl shadow border border-blue-100">
            Tidak ada ruangan ditemukan.
          </div>
        )}
      </div>
    </div>
  );
}
