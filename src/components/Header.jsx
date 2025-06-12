import { useState, useRef, useEffect } from "react";
import { FaBell, FaSearch } from "react-icons/fa";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Tutup dropdown saat klik di luar area dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    window.location.href = "https://reservasi-app.vercel.app/";
  };

  return (
    <div className="h-20 bg-white flex items-center justify-between px-6 border-b border-gray-200">
      {/* Search bar di kiri */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search for rooms and offers"
          className="w-full px-4 py-2 pr-10 text-sm bg-gray-100 border border-gray-200 rounded-md outline-none"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      {/* Notifikasi & Profil di kanan */}
      <div className="flex items-center space-x-6">
        <div className="relative cursor-pointer">
          <FaBell className="text-gray-600 text-lg" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            1
          </span>
        </div>

        {/* Profile dengan Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src="https://asset.kompas.com/crops/hBzWTjpeNOa41rog4RARve2DvVs=/0x98:1080x818/1200x800/data/photo/2025/02/18/67b42fd54b20f.jpg"
              className="w-10 h-10 rounded-full"
              alt="profile"
            />
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Setting
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
