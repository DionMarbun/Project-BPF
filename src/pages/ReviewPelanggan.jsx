import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { testimonis } from "../Service/testtimonis.js";

const ReviewPelanggan = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null); // ID untuk edit mode
  const [newTestimoni, setNewTestimoni] = useState({
    name: "",
    role: "",
    comment: "",
    created_at: "",
  });

  const fetchData = async () => {
    try {
      const result = await testimonis.fetchTestimonis();
      setData(result);
    } catch (err) {
      setError("Gagal mengambil data review.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Edit mode
        await testimonis.updateTestimonis(editId, newTestimoni);
      } else {
        // Create mode
        await testimonis.createTestimonis(newTestimoni);
      }

      setNewTestimoni({
        name: "",
        role: "",
        comment: "",
        created_at: "",
      });
      setShowForm(false);
      setEditId(null);
      fetchData();
    } catch (err) {
      alert("Gagal menyimpan testimoni.");
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus testimoni ini?");
    if (!konfirmasi) return;

    try {
      await testimonis.deleteTestimonis(id);
      fetchData();
    } catch (err) {
      alert("Gagal menghapus testimoni.");
    }
  };

  const handleEdit = (item) => {
    setNewTestimoni({
      name: item.name,
      role: item.role,
      comment: item.comment,
      created_at: item.created_at,
    });
    setEditId(item.id);
    setShowForm(true);
  };

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray p-6 pt-6 min-h-screen font-[Poppins]">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-blue-700">
            Review Pelanggan
          </h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Cari nama pelanggan..."
              className="border border-blue-300 focus:ring-2 focus:ring-blue-400 px-4 py-2 rounded-md w-72"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => {
                setShowForm(!showForm);
                setNewTestimoni({
                  name: "",
                  role: "",
                  comment: "",
                  created_at: "",
                });
                setEditId(null); // reset edit mode
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              {showForm ? "Tutup Form" : "Tambah Testimoni"}
            </button>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 space-y-4">
            <input
              type="text"
              placeholder="Nama"
              className="border border-blue-300 px-4 py-2 rounded-md w-full"
              value={newTestimoni.name}
              onChange={(e) =>
                setNewTestimoni({ ...newTestimoni, name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Role (Penyewa, Mahasiswa, dll)"
              className="border border-blue-300 px-4 py-2 rounded-md w-full"
              value={newTestimoni.role}
              onChange={(e) =>
                setNewTestimoni({ ...newTestimoni, role: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Komentar"
              className="border border-blue-300 px-4 py-2 rounded-md w-full"
              value={newTestimoni.comment}
              onChange={(e) =>
                setNewTestimoni({ ...newTestimoni, comment: e.target.value })
              }
              required
            />
            <input
              type="date"
              className="border border-blue-300 px-4 py-2 rounded-md w-full"
              value={newTestimoni.created_at}
              onChange={(e) =>
                setNewTestimoni({
                  ...newTestimoni,
                  created_at: e.target.value,
                })
              }
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {editId ? "Simpan Perubahan" : "Simpan"}
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
                <tr className="text-blue-700 bg-blue-100">
                  <th className="text-left p-4">Nama</th>
                  <th className="text-left p-4">Role</th>
                  <th className="text-left p-4">Komentar</th>
                  <th className="text-left p-4">Tanggal</th>
                  <th className="text-left p-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-blue-100 hover:bg-blue-50"
                  >
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">{item.role}</td>
                    <td className="p-4">{item.comment}</td>
                    <td className="p-4">{item.created_at}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-200 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-blue-500">
                      Tidak ada review ditemukan.
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

export default ReviewPelanggan;
