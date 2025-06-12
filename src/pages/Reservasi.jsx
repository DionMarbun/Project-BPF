import { useState } from "react";
import data from "../JSON/pemesanan.json";
import { FaClipboardList, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Orders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredData = data.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Booked" && item.status === "Booked") ||
      (statusFilter === "Available" && item.status !== "Booked");
    return matchesSearch && matchesStatus;
  });

  const totalBooked = data.filter((d) => d.status === "Booked").length;
  const totalAvailable = data.filter((d) => d.status !== "Booked").length;

  return (
    <div className="pt-24 p-6 max-w-7xl mx-auto font-[Poppins]">
      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <StatCard
          icon={<FaClipboardList className="text-3xl" />}
          label="Total Reservasi"
          value={data.length}
          color="bg-blue-500"
        />
        <StatCard
          icon={<FaCheckCircle className="text-3xl" />}
          label="Sudah Dipesan"
          value={totalBooked}
          color="bg-red-500"
        />
        <StatCard
          icon={<FaCheckCircle className="text-3xl" />}
          label="Tersedia"
          value={totalAvailable}
          color="bg-green-500"
        />
      </div>

      {/* Box Putih Menyatukan Header dan Tabel */}
      <div className="bg-white rounded-xl shadow p-6">
        {/* Header + Input + Filter */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
          <h2 className="text-2xl font-semibold text-gray-800">Daftar Reservasi</h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Cari nama ruangan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-blue-300 rounded-lg w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="All">Semua Status</option>
              <option value="Booked">Sudah Dipesan</option>
              <option value="Available">Tersedia</option>
            </select>
          </div>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white text-gray-500">
              <tr>
                <th className="p-4 font-bold text-left">Ruangan</th>
                <th className="p-4 font-bold text-left">Lantai</th>
                <th className="p-4 font-bold text-left">Status</th>
                <th className="p-4 font-bold text-left">Pelanggan</th>
                <th className="p-4 font-bold text-left">Tanggal</th>
                <th className="p-4 font-bold text-left">Durasi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <td className="p-5 text-gray-800 font-medium">
                      <Link to={`/Reservasi/${item.id}`} className="text-blue-600 hover:underline">
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-5 text-gray-700">Lantai {item.location.floor}</td>
                    <td className="p-5">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          item.status === "Booked"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {item.status === "Booked" ? "Sudah Dipesan" : "Tersedia"}
                      </span>
                    </td>
                    <td className="p-5 text-gray-700">
                      {item.customer_name || "-"}
                    </td>
                    <td className="p-5 text-gray-700">{item.booking_date}</td>
                    <td className="p-5 text-gray-700">{item.duration}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">
                    Tidak ada data ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Total Data */}
        <div className="mt-4 text-sm text-gray-500">
          Menampilkan {filteredData.length} dari {data.length} reservasi
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
      <div className={`${color} text-white p-4 rounded-full`}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-gray-500">{label}</span>
      </div>
    </div>
  );
}
