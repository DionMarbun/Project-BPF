import { AiTwotonePlusCircle } from "react-icons/ai";
import ListMenu from "./ListMenu";
import sidebarBg from "../assets/img/sidebar-2.jpg";

export default function Sidebar() {
  return (
    <aside
      className="fixed top-0 left-0 z-40 w-[230px] h-screen text-white flex flex-col bg-cover bg-center shadow-xl"
      style={{
        backgroundImage: `url(${sidebarBg})`,
        backgroundColor: "rgba(0,0,0,0.6)",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/20">
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          GrahaPena<b className="text-yellow-400"></b>
        </h1>
      </div>

      {/* Scrollable Menu Section */}
      <div className="flex-1 px-4 py-6 overflow-y-auto">
        <ListMenu />
      </div>

      {/* Optional: Footer / Bottom Section if needed */}
      {/* <div className="p-4 border-t border-white/20 text-center text-sm opacity-70">
        © 2025 GrahaPena
      </div> */}
    </aside>
  );
}
