import ListMenu from "./ListMenu";

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 z-40 w-[230px] h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col">
      {/* Brand Name */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100 shrink-0">
        <h1 className="text-xl font-semibold text-blue-600">Graha Pena</h1>
      </div>

      {/* Menu List (scrollable area) */}
      <div className="flex-1 overflow-y-auto px-3 py-6">
        <ListMenu />
      </div>
    </aside>
  );
}
