import { useState } from "react";
import data from "../JSON/pemesanan.json";
import { FaClipboardList, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Orders() {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalBooked = data.filter((d) => d.status === "Booked").length;
  const totalAvailable = data.filter((d) => d.status !== "Booked").length;

  return (
    <div className="pt-24 p-6 max-w-7xl mx-auto font-[Poppins] bg-white">
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
          color="bg-blue-400"
        />
        <StatCard
          icon={<FaCheckCircle className="text-3xl" />}
          label="Tersedia"
          value={totalAvailable}
          color="bg-blue-300"
        />
      </div>

      {/* Box Putih Menyatukan Header dan Tabel */}
      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Header + Input */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4 sm:mb-0">Daftar Reservasi</h2>
          <input
            type="text"
            placeholder="Cari nama ruangan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-blue-300 rounded-lg w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white text-blue-600 border-b border-blue-100">
              <tr>
                <th className="p-4 font-semibold">Ruangan</th>
                <th className="p-4 font-semibold">Lantai</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Pelanggan</th>
                <th className="p-4 font-semibold">Tanggal</th>
                <th className="p-4 font-semibold">Durasi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-blue-100 hover:bg-blue-50 transition duration-150 ease-in-out"
                  >
                    <td className="p-5 text-blue-800 font-medium">
                      <Link
                        to={`/Reservasi/${item.id}`}
                        className="text-blue-500 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-5 text-blue-700">Lantai {item.location.floor}</td>
                    <td className="p-5">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          item.status === "Booked"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-blue-50 text-blue-500"
                        }`}
                      >
                        {item.status === "Booked" ? "Sudah Dipesan" : "Tersedia"}
                      </span>
                    </td>
                    <td className="p-5 text-blue-700">{item.customer_name}</td>
                    <td className="p-5 text-blue-700">{item.booking_date}</td>
                    <td className="p-5 text-blue-700">{item.duration}</td>
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
        <div className="mt-4 text-sm text-blue-600">
          Menampilkan {filteredData.length} dari {data.length} reservasi
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border border-blue-100">
      <div className={`${color} text-white p-4 rounded-full shadow-md`}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-blue-700">{value}</span>
        <span className="text-blue-500">{label}</span>
      </div>
    </div>
  );
}
