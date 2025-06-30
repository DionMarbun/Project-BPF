import { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [quote, setQuote] = useState("");
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      axios
        .get("https://api.adviceslip.com/advice")
        .then((res) => {
          setQuote(res.data.slip.advice);
          setError(null);
        })
        .catch(() => {
          setError("Gagal mengambil kutipan motivasi.");
        });
    }, 100);
    return () => clearTimeout(timeout);
  }, [refreshTrigger]);

  const completed = 75;
  const remaining = 100 - completed;
  const floorData = [
    { name: "Terpakai", value: completed, color: "#3B82F6" },
    { name: "Kosong", value: remaining, color: "#E5E7EB" },
  ];

  return (
    <div className="bg-gray min-h-screen p-6 text-gray-800 font-poppins">
      {/* Overview */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {[
            { label: "Pemesanan", value: 12, sub: "Hari Ini" },
            { label: "Pembatalan", value: 2, sub: "Hari Ini" },
            { label: "Total Pemesanan", value: 85, sub: "Bulan Ini" },
            { label: "Ruang Tersedia", value: 5, sub: "Hari Ini" },
            { label: "Ruang Terpakai", value: 20, sub: "Hari Ini" },
          ].map((item, index) => (
            <div key={index}>
              <p className="text-sm text-gray-400">{item.sub}</p>
              <p className="text-md text-gray-700">
                {item.label}{" "}
                <span className="text-blue-600 font-bold text-xl">
                  {item.value}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Rooms Section */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Ruangan</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { type: "Aula Serbaguna", used: 2, total: 4, price: 1500000 },
            { type: "Ruang Rapat", used: 3, total: 6, price: 750000 },
            { type: "Ruang Pelatihan", used: 1, total: 3, price: 1250000 },
            { type: "Hall Pameran", used: 1, total: 2, price: 2500000 },
          ].map((room, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-5 relative"
            >
              <h3 className="text-md font-semibold text-gray-800 mb-1">
                {room.type}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                <span className="text-lg font-semibold text-gray-700">
                  {room.used}
                </span>
                /{room.total} dipakai
              </p>
              <p className="text-lg font-bold text-blue-600">
                Rp{room.price.toLocaleString("id-ID")}
                <span className="text-sm font-normal text-gray-500"> /hari</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Room & Floor Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white px-6 py-4 rounded-2xl shadow-md col-span-2">
          <h4 className="text-lg font-semibold mb-4">Status Ruangan</h4>
          <div className="grid grid-cols-2 text-sm text-gray-700">
            <div>
              <p className="font-semibold">Ruang Dipakai</p>
              <p className="mb-2">20</p>
              <p>Siap Pakai</p>
              <p className="mb-2">15</p>
              <p>Perlu Pembersihan</p>
              <p className="mb-2">3</p>
            </div>
            <div>
              <p className="font-semibold">Ruang Kosong</p>
              <p className="mb-2">5</p>
              <p>Sudah Dipesan</p>
              <p className="mb-2">8</p>
              <p>Tersedia</p>
              <p>10</p>
            </div>
          </div>
        </div>

        {/* Floor Status */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center justify-center">
          <h4 className="text-lg font-semibold mb-4">Persentase Pemakaian</h4>
          <div className="w-40 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={floorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                >
                  {floorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-2xl font-semibold text-gray-800 mt-2">
            {completed}%
          </div>
          <div className="flex justify-center gap-4 text-sm mt-2 text-gray-500">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
              Terpakai
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-gray-200 inline-block"></span>
              Kosong
            </div>
          </div>
        </div>
      </div>

      {/* Statistik & Feedback */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Statistik Pemesanan Bulanan
          </h2>
          <div className="w-full h-56">
            <div className="grid grid-cols-8 gap-2 items-end h-full">
              {[75, 60, 85, 45, 90, 65, 88, 95].map((value, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className="bg-blue-500 w-4 rounded"
                    style={{ height: `${value}%` }}
                  ></div>
                  <span className="text-xs mt-1 text-gray-500">
                    {
                      ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"][
                        idx
                      ]
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Masukan Pengunjung
          </h2>
          {[
            { name: "Budi", room: "Aula 1", comment: "Ruangan nyaman dan bersih." },
            {
              name: "Sari",
              room: "R. Rapat 2",
              comment: "Perlu tambahan sound system.",
            },
            {
              name: "Dedi",
              room: "Hall",
              comment: "Tempat luas, cocok untuk event besar.",
            },
          ].map((feedback, idx) => (
            <div key={idx} className="border-b py-2 flex justify-between items-start">
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  {feedback.name}
                </p>
                <p className="text-sm text-gray-500">{feedback.comment}</p>
              </div>
              <span className="text-sm font-semibold text-gray-400">
                {feedback.room}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Kutipan Motivasi */}
      <div className="bg-white p-5 rounded-2xl shadow-md text-center mt-8">
        <h2 className="text-md font-semibold mb-2">Kutipan Motivasi</h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="italic text-gray-600">"{quote}"</p>
        )}
        <button
          onClick={() => setRefreshTrigger((prev) => prev + 1)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Refresh Quote
        </button>
      </div>
    </div>
  );
}
