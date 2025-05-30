import { AiTwotonePlusCircle } from "react-icons/ai";
import ListMenu from "../components/ListMenu";
export default function Sidebar() {
  
  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg"
    >
      {/* Logo */}
      <div id="sidebar-logo" className="flex flex-col">
        <span
          id="logo-title"
          className="font-poppins-extrabold text-[48px] text-gray-900"
        >
          GrahaPena{" "}
          <b id="logo-dot" className="text-hijau">
            .
          </b>
        </span>
        <span id="logo-subtitle">Modern Admin Dashboard</span>
      </div>

      {/* List Menu */}
      <ListMenu />

      {/* Footer */}
      <div id="sidebar-footer" className="mt-auto">
        <div
          id="footer-card"
          className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center"
        >
          <div id="footer-text" className="text-white text-sm">
            <span>Please organize your menus through button below!</span>

            <div
              id="add-menu-button"
              className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2 cursor-pointer"
            >
              <span className="text-gray-600 flex items-center">
                {" "}
                <AiTwotonePlusCircle />
                Add Menus
              </span>
            </div>
          </div>
          <img
            id="footer-avatar"
            className="w-20 rounded-full"
            src="https://avatar.iran.liara.run/public/28"
          />
        </div>
      </div>
    </div>
  );
}
