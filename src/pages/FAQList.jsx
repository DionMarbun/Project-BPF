import React, { useState, useEffect } from "react";
import { FaqAPI } from "../Service/Faq.js";

const FAQList = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({ tanya: "", jawab: "" });
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await FaqAPI.fetchFaq();
      setData(result);
    } catch (err) {
      setError("Gagal mengambil data FAQ.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editId) {
        await FaqAPI.updateFaq(editId, form);
        setSuccess("FAQ berhasil diperbarui.");
      } else {
        await FaqAPI.createFaq(form);
        setSuccess("FAQ berhasil ditambahkan.");
      }
      setForm({ tanya: "", jawab: "" });
      setEditId(null);
      setShowForm(false);
      fetchData();
    } catch (err) {
      setError("Gagal menyimpan FAQ.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  const handleEdit = (item) => {
    setForm({ tanya: item.tanya, jawab: item.jawab });
    setEditId(item.id);
    setShowForm(true);
  };

  const filtered = data.filter((item) =>
    item.tanya.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray p-6 pt-24 min-h-screen font-[Poppins]">
      <div className="bg-white rounded-xl shadow p-6 border border-blue-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-blue-700">
            Daftar FAQ - Pertanyaan Umum
          </h2>
          <input
            type="text"
            placeholder="Cari pertanyaan..."
            className="border border-blue-300 px-4 py-2 rounded-md w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <button
            className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
            onClick={() => {
              setShowForm(!showForm);
              setForm({ tanya: "", jawab: "" });
              setEditId(null);
            }}
          >
            {showForm ? "Tutup Form" : "Tambah FAQ"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <input
              type="text"
              name="tanya"
              placeholder="Pertanyaan"
              value={form.tanya}
              onChange={handleChange}
              required
              className="w-full p-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <textarea
              name="jawab"
              placeholder="Jawaban"
              value={form.jawab}
              onChange={handleChange}
              required
              className="w-full p-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              {loading
                ? "Menyimpan..."
                : editId
                ? "Simpan Perubahan"
                : "Simpan FAQ"}
            </button>
          </form>
        )}

        {success && <p className="text-green-600 mb-4">{success}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {loading ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-white text-blue-600 border-b border-blue-100">
                <tr>
                  <th className="text-left p-4 font-semibold">Pertanyaan</th>
                  <th className="text-left p-4 font-semibold">Jawaban</th>
                  <th className="text-left p-4 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-blue-100 hover:bg-blue-50 transition"
                  >
                    <td className="p-4 text-blue-800">{item.tanya}</td>
                    <td className="p-4 text-gray-700">{item.jawab}</td>
                    <td className="p-4">
                      <button
                        className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-200 mr-2 transition"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm("Yakin ingin menghapus?")) {
                            try {
                              await FaqAPI.deleteFaq(item.id);
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
                    <td colSpan="3" className="text-center p-4 text-gray-500">
                      Tidak ada pertanyaan ditemukan.
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

export default FAQList;
