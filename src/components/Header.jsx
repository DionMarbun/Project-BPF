import { FaBell, FaSearch } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";

export default function Header() {
    return (
    <div className="fixed top-0 left-[230px] right-0 h-20 bg-white flex items-center justify-between px-6 border-b border-gray-200 z-50">

            {/* Search Bar */}
            <div className="flex-1 max-w-xl relative">
                <input
                    type="text"
                    placeholder="Search items, collections, and users"
                    className="w-full px-4 py-2 pl-4 pr-10 text-sm bg-gray-100 border border-gray-200 rounded-md outline-none"
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                    <BsSun className="text-black" />
                    <BsMoon className="text-gray-400" />
                </div>

                <div className="relative cursor-pointer">
                    <FaBell className="text-red-500 text-lg" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">1</span>
                </div>

                <div className="flex items-center space-x-2 cursor-pointer">
                    <img
                        src="https://avatar.iran.liara.run/public/28"
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium text-sm">Leonard</span>
                    <span className="text-gray-500">▼</span>
                </div>
            </div>
        </div>
    );
}
