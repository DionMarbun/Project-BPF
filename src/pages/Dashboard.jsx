import { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

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

  const completed = 80;
  const remaining = 100 - completed;
  const floorData = [
    { name: "Completed", value: completed, color: "#3B82F6" },
    { name: "Remaining", value: remaining, color: "#E5E7EB" }
  ];

  return (
    <div className="bg-gray min-h-screen p-6 text-gray-800 font-poppins">
      <div className="flex justify-end mb-6">
      </div>

      {/* Overview */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {[
            { label: "Check-in", value: 23, sub: "Today's" },
            { label: "Check-out", value: 13, sub: "Today's" },
            { label: "In hotel", value: 60, sub: "Total" },
            { label: "Available room", value: 10, sub: "Total" },
            { label: "Occupied room", value: 90, sub: "Total" }
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
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { type: "Single sharing", used: 2, total: 30, price: 568 },
            { type: "Double sharing", used: 2, total: 35, price: 1068 },
            { type: "Triple sharing", used: 2, total: 25, price: 1568 },
            { type: "VIP Suit", used: 4, total: 10, price: 2568 }
          ].map((room, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-5 relative"
            >
              <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v.01M12 12v.01M12 18v.01"
                  />
                </svg>
              </button>
              <span className="inline-block text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full mb-2">
                2 Deals
              </span>
              <h3 className="text-md font-semibold text-gray-800 mb-1">
                {room.type}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                <span className="text-lg font-semibold text-gray-700">
                  {room.used}
                </span>
                /{room.total}
              </p>
              <p className="text-lg font-bold text-blue-600">
                ${room.price.toLocaleString()}
                <span className="text-sm font-normal text-gray-500">/day</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Room & Floor Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Room Status */}
        <div className="bg-white px-6 py-4 rounded-2xl shadow-md col-span-2">
          <h4 className="text-lg font-semibold mb-4">Room status</h4>
          <div className="grid grid-cols-2 text-sm text-gray-700">
            <div>
              <p className="font-semibold">Occupied rooms</p>
              <p className="mb-2">104</p>
              <p>Clean</p>
              <p className="mb-2">90</p>
              <p>Dirty</p>
              <p className="mb-2">4</p>
              <p>Inspected</p>
              <p>60</p>
            </div>
            <div>
              <p className="font-semibold">Available rooms</p>
              <p className="mb-2">20</p>
              <p>Clean</p>
              <p className="mb-2">30</p>
              <p>Dirty</p>
              <p className="mb-2">19</p>
              <p>Inspected</p>
              <p>30</p>
            </div>
          </div>
        </div>

        {/* Floor Status */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center justify-center">
          <h4 className="text-lg font-semibold mb-4">Floor status</h4>
          <div className="w-40 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={floorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {floorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-2xl font-semibold text-gray-800 mt-2">{completed}%</div>
          <div className="flex justify-center gap-4 text-sm mt-2 text-gray-500">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
              Completed
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-gray-200 inline-block"></span>
              Remaining
            </div>
          </div>
        </div>
      </div>

      {/* Occupancy Statistics & Feedback */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {/* Occupancy Statistics */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Occupancy Statistics</h2>
            <button className="flex items-center gap-1 border px-2 py-1 rounded text-sm text-gray-600 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3M16 7V3M3 11h18M5 19h14a2 2 0 002-2v-5H3v5a2 2 0 002 2z" />
              </svg>
              Monthly
            </button>
          </div>
          <div className="w-full h-56">
            <div className="grid grid-cols-8 gap-2 items-end h-full">
              {[90, 70, 85, 45, 100, 88, 88, 100].map((value, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className="bg-blue-500 w-4 rounded"
                    style={{ height: `${value}%` }}
                  ></div>
                  <span className="text-xs mt-1 text-gray-500">
                    {[
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Jan",
                      "Feb"
                    ][idx]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Feedback */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Customers feedback</h2>
          {[
            { name: "Mark", room: "A201", comment: "Food could be better." },
            { name: "Christian", room: "A101", comment: "Facilities are not enough for amount paid." },
            { name: "Alexander", room: "A301", comment: "Room cleaning could be better." }
          ].map((feedback, idx) => (
            <div key={idx} className="border-b py-2 flex justify-between items-start">
              <div>
                <p className="text-sm font-semibold text-gray-700">{feedback.name}</p>
                <p className="text-sm text-gray-500">{feedback.comment}</p>
              </div>
              <span className="text-sm font-semibold text-gray-400">{feedback.room}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-white p-5 rounded-2xl shadow-md text-center mt-8">
        <h2 className="text-md font-semibold mb-2">Motivational Quote</h2>
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