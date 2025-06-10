import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Right side with header and content */}
      <div className="pl-[230px] flex flex-col min-h-screen">
        {/* Header - Full width & top */}
        <Header />

        {/* Main content */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
