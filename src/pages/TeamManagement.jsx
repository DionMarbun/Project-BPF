import React, { useState, useEffect } from "react";
import { teams } from "../Service/teams";

const TeamManagement = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    photo: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await teams.fetchTeams();
      setData(result);
    } catch {
      setError("Gagal mengambil data tim.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await teams.updateTeams(editId, formData);
      } else {
        await teams.createTeams(formData);
      }
      setFormData({ name: "", position: "", photo: "" });
      setEditId(null);
      setShowForm(false);
      fetchData();
    } catch {
      alert("Gagal menyimpan data tim.");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      position: item.position,
      photo: item.photo,
    });
    setEditId(item.id);
    setShowForm(true);
  };

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 p-6 min-h-screen relative">
      <div className="bg-white rounded-xl shadow p-6 relative z-10">
        {/* Header dan Control */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Manajemen Tim</h2>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="Cari nama anggota..."
              className="border px-4 py-2 rounded-md w-72"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => {
                setShowForm(!showForm);
                setFormData({ name: "", position: "", photo: "" });
                setEditId(null);
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              {showForm ? "Tutup Form" : "Tambah Tim"}
            </button>
            <button
              onClick={() =>
                setViewMode(viewMode === "table" ? "grid" : "table")
              }
              className="border border-blue-500 text-blue-500 px-3 py-2 rounded hover:bg-blue-50"
            >
              {viewMode === "table" ? "Tampilan Grid" : "Tampilan Tabel"}
            </button>
          </div>
        </div>

        {/* Form Tambah/Edit */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-gray-100 p-4 rounded-xl"
          >
            <div>
              <label className="block mb-1 text-sm font-semibold">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white rounded-lg border border-gray-300"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold">Posisi</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white rounded-lg border border-gray-300"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold">
                URL Foto
              </label>
              <input
                type="url"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white rounded-lg border border-gray-300"
              />
            </div>
            <div className="md:col-span-3 text-right">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
              >
                {editId ? "Simpan Perubahan" : "Simpan Tim"}
              </button>
            </div>
          </form>
        )}

        {/* Table / Grid View */}
        {loading ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : viewMode === "table" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-gray-700">
                  <th className="text-left p-4">Foto</th>
                  <th className="text-left p-4">Nama</th>
                  <th className="text-left p-4">Posisi</th>
                  <th className="text-left p-4">Tanggal Dibuat</th>
                  <th className="text-left p-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-t border-gray-200">
                    <td className="p-4">
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    </td>
                    <td
                      className="p-4 text-blue-600 hover:underline cursor-pointer"
                      onClick={() => setSelectedMember(item)}
                    >
                      {item.name}
                    </td>
                    <td className="p-4">{item.position}</td>
                    <td className="p-4">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm("Yakin ingin menghapus?")) {
                            await teams.deleteTeams(item.id);
                            setData(data.filter((d) => d.id !== item.id));
                          }
                        }}
                        className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow p-4 text-center"
              >
                <img
                  src={item.photo}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-3"
                />
                <h3
                  className="text-blue-600 font-semibold cursor-pointer hover:underline"
                  onClick={() => setSelectedMember(item)}
                >
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">{item.position}</p>
                <p className="text-xs text-gray-400 mb-3">
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm("Yakin ingin menghapus?")) {
                        await teams.deleteTeams(item.id);
                        setData(data.filter((d) => d.id !== item.id));
                      }
                    }}
                    className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL: Detail Statistik */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative">
            <img
              src={selectedMember.photo}
              alt={selectedMember.name}
              className="w-20 h-20 object-cover rounded-full mx-auto mb-3"
            />
            <h3 className="text-xl font-semibold mb-2 text-center">
              {selectedMember.name}
            </h3>
            <ul className="text-sm space-y-2 text-gray-700 text-left">
              <li>
                <strong>Posisi:</strong> {selectedMember.position}
              </li>
              <li>
                <strong>Tugas Selesai:</strong> {selectedMember.tasks || "22"}
              </li>
              <li>
                <strong>Presensi:</strong> {selectedMember.attendance || "96%"}
              </li>
              <li>
                <strong>Proyek Aktif:</strong> {selectedMember.projects || "3"}
              </li>
              <li>
                <strong>Rating Kinerja:</strong>{" "}
                {selectedMember.rating || "4.6/5"}
              </li>
            </ul>
            <button
              onClick={() => setSelectedMember(null)}
              className="mt-6 w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;
