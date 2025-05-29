import { useState, useEffect } from "react";
import axios from "axios";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
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
        <div id="dashboard-container" className="bg-gray-100 min-h-screen p-6">
            <PageHeader
                title="Dashboard"
                breadcrumb={['Dashboard', 'Order List']}
            />

            {/* Quote Section */}
            <div className="bg-white p-4 rounded shadow-md text-center mb-6">
                <h2 className="text-lg font-semibold mb-2">Motivational Quote</h2>
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <p className="italic text-gray-700">"{quote}"</p>
                )}
                <button
                    onClick={() => setRefreshTrigger(prev => prev + 1)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Refresh Quote
                </button>
            </div>

            {/* Dashboard Cards */}
            <div id="dashboard-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                {/* Orders Section */}
                <div className="bg-white rounded-lg shadow-md p-4 text-center">
                    <div className="bg-orange-400 w-12 h-12 mx-auto rounded-lg flex items-center justify-center shadow-lg">
                        <FaShoppingCart className="text-white text-xl" />
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-700 text-sm">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">75</p>
                        <p className="text-xs text-red-500 mt-1">Get more space</p>
                    </div>
                </div>

                {/* Delivered Section */}
                <div className="bg-white rounded-lg shadow-md p-4 text-center">
                    <div className="bg-green-500 w-12 h-12 mx-auto rounded-lg flex items-center justify-center shadow-lg">
                        <FaTruck className="text-white text-xl" />
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-700 text-sm">Total Delivered</p>
                        <p className="text-2xl font-bold text-gray-900">175</p>
                        <p className="text-xs text-gray-400 mt-1">Last 24 Hours</p>
                    </div>
                </div>

                {/* Canceled Section */}
                <div className="bg-white rounded-lg shadow-md p-4 text-center">
                    <div className="bg-red-500 w-12 h-12 mx-auto rounded-lg flex items-center justify-center shadow-lg">
                        <FaBan className="text-white text-xl" />
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-700 text-sm">Total Canceled</p>
                        <p className="text-2xl font-bold text-gray-900">40</p>
                        <p className="text-xs text-gray-400 mt-1">Tracked from system</p>
                    </div>
                </div>

                {/* Revenue Section */}
                <div className="bg-white rounded-lg shadow-md p-4 text-center">
                    <div className="bg-cyan-500 w-12 h-12 mx-auto rounded-lg flex items-center justify-center shadow-lg">
                        <FaDollarSign className="text-white text-xl" />
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-700 text-sm">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">Rp.128</p>
                        <p className="text-xs text-gray-400 mt-1">Just Updated</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
