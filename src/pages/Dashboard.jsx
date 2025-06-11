import { useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "../components/PageHeader";

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

    return (
        <div className="bg-gray-50 min-h-screen p-6 text-gray-800 font-poppins">
            <div className="flex justify-between items-center mb-8">
                <PageHeader title="Dashboard" breadcrumb={['Dashboard']} />
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Create booking
                </button>
            </div>

            {/* Overview */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
                {[
                    { label: "Today's Check-in", value: 23 },
                    { label: "Today's Check-out", value: 13 },
                    { label: "In hotel", value: 60 },
                    { label: "Available room", value: 10 },
                    { label: "Occupied room", value: 90 },
                    { label: "Total", value: 100 },
                ].map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-md">
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <p className="text-2xl font-bold text-blue-600">{item.value}</p>
                    </div>
                ))}
            </div>

            {/* Rooms Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                    { type: "Single sharing", used: 2, total: 30, price: 568 },
                    { type: "Double sharing", used: 2, total: 35, price: 1068 },
                    { type: "Triple sharing", used: 2, total: 25, price: 1568 },
                    { type: "VIP Suit", used: 4, total: 10, price: 2568 },
                ].map((room, idx) => (
                    <div key={idx} className="bg-white rounded-2xl shadow-md p-5">
                        <span className="inline-block text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full mb-2">2 Deals</span>
                        <h3 className="text-md font-semibold mb-1">{room.type}</h3>
                        <p className="text-sm text-gray-500 mb-2">{room.used}/{room.total}</p>
                        <p className="text-lg font-bold text-blue-600">${room.price.toLocaleString()}/day</p>
                    </div>
                ))}
            </div>

            {/* Room Status & Occupancy Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Room Status */}
                <div className="bg-white p-5 rounded-2xl shadow-md">
                    <h4 className="font-semibold text-md mb-4">Room Status</h4>
                    <div className="grid grid-cols-2 gap-y-3 text-sm">
                        <p>Occupied rooms: <strong>104</strong></p>
                        <p>Available rooms: <strong>20</strong></p>
                        <p>Clean: <strong>90</strong></p>
                        <p>Dirty: <strong>19</strong></p>
                        <p>Inspected: <strong>60</strong></p>
                    </div>
                </div>

                {/* Occupancy Statistics */}
                <div className="bg-white p-5 rounded-2xl shadow-md col-span-2">
                    <h4 className="font-semibold text-md mb-4">Occupancy Statistics</h4>
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-xl text-gray-400">
                        Chart Placeholder
                    </div>
                </div>
            </div>

            {/* Motivational Quote */}
            <div className="bg-white p-5 rounded-2xl shadow-md text-center">
                <h2 className="text-md font-semibold mb-2">Motivational Quote</h2>
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <p className="italic text-gray-600">"{quote}"</p>
                )}
                <button
                    onClick={() => setRefreshTrigger(prev => prev + 1)}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Refresh Quote
                </button>
            </div>
        </div>
    );
}
