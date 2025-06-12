import React, { useState, useEffect } from "react";
import { teams } from "../Service/teams";

const TeamManagement = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
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
      await teams.createTeams(formData);
      setFormData({ name: "", position: "", photo: "" });
      setShowForm(false);
      fetchData();
    } catch (err) {
      alert("Gagal menambahkan tim.");
    }
  };

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#F5F8FF] p-6 pt-24 min-h-screen font-[Poppins]">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#1E3A8A]">Manajemen Tim</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Cari nama anggota..."
              className="border border-blue-200 px-4 py-2 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
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
              className="w-full p-3 bg-blue-50 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              name="position"
              placeholder="Posisi"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full p-3 bg-blue-50 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="url"
              name="photo"
              placeholder="URL Foto"
              value={formData.photo}
              onChange={handleChange}
              required
              className="w-full p-3 bg-blue-50 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
            >
              Simpan Tim
            </button>
          </form>
        )}

        {loading ? (
          <p className="text-center text-blue-500">Memuat data...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-blue-800 bg-blue-50">
                  <th className="text-left p-4">Foto</th>
                  <th className="text-left p-4">Nama</th>
                  <th className="text-left p-4">Posisi</th>
                  <th className="text-left p-4">Tanggal Dibuat</th>
                  <th className="text-left p-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-t border-blue-100 hover:bg-blue-50">
                    <td className="p-4">
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-full border-2 border-blue-300"
                      />
                    </td>
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">{item.position}</td>
                    <td className="p-4">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-200 mr-2 transition">
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
                        className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200 transition"
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
