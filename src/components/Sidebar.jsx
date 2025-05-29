import { AiTwotonePlusCircle } from "react-icons/ai";
import ListMenu from "./ListMenu";
import sidebarBg from "../assets/img/sidebar-2.jpg";

export default function Sidebar() {
  return (
    <aside
      className="w-[230px] text-white min-h-screen flex flex-col justify-between bg-cover bg-center shadow-xl"
      style={{
        backgroundImage: `url(${sidebarBg})`,
        backgroundColor: "rgba(0,0,0,0.6)",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/20">
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          GrahaPena<b className="text-yellow-400">.</b>
        </h1>
        <p className="text-sm opacity-70">Modern Admin Dashboard</p>
      </div>

      {/* Menu */}
      <div className="flex-1 px-4 py-6">
        <ListMenu />
      </div>

      {/* Footer */}
      <div className="p-4 text-center text-sm border-t border-white/20 bg-black/40">
        <div className="bg-white text-gray-800 p-3 rounded-lg shadow-md mb-4">
          <div className="text-xs">Please organize your menus below</div>
          <div className="mt-2 flex justify-center items-center gap-1 text-purple-700 text-sm font-semibold hover:text-purple-900 cursor-pointer">
            <AiTwotonePlusCircle />
            <span>Add Menus</span>
          </div>
        </div>
        <img
          className="w-14 h-14 mx-auto rounded-full border-2 border-white mb-2"
          src="https://avatar.iran.liara.run/public/28"
          alt="Avatar"
        />
        <div className="font-semibold">Admin Dashboard</div>
        <div className="text-xs opacity-70 mt-1">&copy; 2025 All Rights Reserved</div>
      </div>
    </aside>
  );
}
