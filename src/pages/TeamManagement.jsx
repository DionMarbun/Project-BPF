import React, { useState, useEffect } from "react";
import { teams } from "../Service/teams"; // Pastikan path-nya sesuai

const TeamManagement = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null); // 👉 Tambah edit mode
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
    } catch (err) {
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
        // Update mode
        await teams.updateTeams(editId, formData);
      } else {
        // Tambah baru
        await teams.createTeams(formData);
      }
      // Reset form
      setFormData({ name: "", position: "", photo: "" });
      setEditId(null);
      setShowForm(false);
      fetchData();
    } catch (err) {
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
    <div className="bg-gray-50 p-6 pt-24 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Manajemen Tim</h2>
          <div className="flex gap-4">
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
                setEditId(null); // reset edit mode
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              {showForm ? "Tutup Form" : "Tambah Tim"}
            </button>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <input
              type="text"
              name="name"
              placeholder="Nama Lengkap"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
            />
            <input
              type="text"
              name="position"
              placeholder="Posisi"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
            />
            <input
              type="url"
              name="photo"
              placeholder="URL Foto"
              value={formData.photo}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
            >
              {editId ? "Simpan Perubahan" : "Simpan Tim"}
            </button>
          </form>
        )}

        {loading ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
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
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">{item.position}</td>
                    <td className="p-4">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-200 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm("Yakin ingin menghapus?")) {
                            try {
                              await teams.deleteTeams(item.id);
                              setData(data.filter((d) => d.id !== item.id));
                            } catch (err) {
                              alert("Gagal menghapus data");
                            }
                          }
                        }}
                        className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-500">
                      Tidak ada anggota ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamManagement;
