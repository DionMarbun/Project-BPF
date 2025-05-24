// components/Filters.js
import React from "react";

const Filters = ({ search, setSearch, roleFilter, setRoleFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Cari nama anggota..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-1/2"
      />
      <input
        type="text"
        placeholder="Cari berdasarkan peran (role)..."
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-1/2"
      />
    </div>
  );
};

export default Filters;
