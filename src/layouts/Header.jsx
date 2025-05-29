import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    return (
        <div
            id="header-container"
            className="flex justify-between items-center pl-6 pr-6 py-4 bg-gray-100 border-b"
        >
            {/* Title */}
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>

            {/* Search + Icons */}
            <div className="flex items-center space-x-8">
                {/* Search Field */}
                <div className="relative">
                    <input
                        id="search-input"
                        type="text"
                        placeholder="Search"
                        className="border border-gray-300 bg-white pl-4 pr-10 py-2 rounded-full shadow-sm outline-none text-sm"
                    />
                    <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-4">
                    <div className="relative cursor-pointer">
                        <FaBell className="text-gray-500 text-lg" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            5
                        </span>
                    </div>
                    <FcAreaChart className="text-xl cursor-pointer" />
                    <SlSettings className="text-gray-600 text-lg cursor-pointer" />
                </div>

                {/* Profile Info */}
                <div className="flex items-center space-x-3 pl-4 border-l border-gray-300">
                    <span className="text-sm text-gray-700">Hello, <b>Dion</b></span>
                    <img
                        src="https://avatar.iran.liara.run/public/28"
                        className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                        alt="User Avatar"
                    />
                </div>
            </div>
        </div>
    );
}