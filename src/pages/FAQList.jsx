import React, { useState, useEffect } from "react";
import { FaqAPI } from "../Service/Faq.js";

const FAQList = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Untuk form tambah FAQ
  const [form, setForm] = useState({ tanya: "", jawab: "" });
  const [showForm, setShowForm] = useState(false);

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
      await FaqAPI.createFaq(form); // asumsi endpoint `createFaq` tersedia
      setSuccess("FAQ berhasil ditambahkan.");
      setForm({ tanya: "", jawab: "" });
      setShowForm(false);
      fetchData();
    } catch (err) {
      setError("Gagal menambahkan FAQ.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  const filtered = data.filter((item) =>
    item.tanya.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 p-6 pt-24 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Daftar FAQ - Pertanyaan Umum</h2>
          <input
            type="text"
            placeholder="Cari pertanyaan..."
            className="border px-4 py-2 rounded-md w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            onClick={() => setShowForm(!showForm)}
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
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300"
            />
            <textarea
              name="jawab"
              placeholder="Jawaban"
              value={form.jawab}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              {loading ? "Menyimpan..." : "Simpan FAQ"}
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
              <thead>
                <tr className="text-gray-700">
                  <th className="text-left p-4">Pertanyaan</th>
                  <th className="text-left p-4">Jawaban</th>
                  <th className="text-left p-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, idx) => (
                  <tr key={idx} className="border-t border-gray-200">
                    <td className="p-4">{item.tanya}</td>
                    <td className="p-4">{item.jawab}</td>
                    <td className="p-4">
                      <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-200 mr-2">
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
                        className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200"
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
