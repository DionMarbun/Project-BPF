import React, { useState } from "react";

const ArtikelListWithEdit = () => {
  const [artikelList, setArtikelList] = useState([
    {
      judul: "Tips Memilih Ruangan Meeting",
      konten: "Pilihlah ruangan sesuai kapasitas dan fasilitas yang dibutuhkan.",
      tanggal: "2025-05-01",
    },
    {
      judul: "Keuntungan Sewa Ruangan di Graha Pena",
      konten: "Lokasi strategis, harga terjangkau, dan fasilitas lengkap.",
      tanggal: "2025-05-10",
    },
    {
      judul: "Cara Booking Ruangan Online",
      konten: "Gunakan sistem booking online kami yang mudah dan cepat.",
      tanggal: "2025-05-11",
    },
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({
    judul: "",
    konten: "",
    tanggal: "",
  });

  const handleDelete = (index) => {
    if (confirm("Yakin ingin menghapus artikel ini?")) {
      setArtikelList(artikelList.filter((_, i) => i !== index));
      if (editIndex === index) {
        setEditIndex(null);
        setEditData({ judul: "", konten: "", tanggal: "" });
      }
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData(artikelList[index]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = [...artikelList];
    if (editIndex !== null) {
      updated[editIndex] = editData;
    } else {
      updated.push(editData);
    }
    setArtikelList(updated);
    setEditData({ judul: "", konten: "", tanggal: "" });
    setEditIndex(null);
  };

  const handleCancel = () => {
    setEditData({ judul: "", konten: "", tanggal: "" });
    setEditIndex(null);
  };

  return (
    <div className="bg-gray-100 p-6 pt-6 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-4xl mx-auto border border-blue-200">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          {editIndex !== null ? "Edit Artikel" : "Tambah Artikel"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 mb-10">
          <input
            type="text"
            name="judul"
            value={editData.judul}
            onChange={handleChange}
            required
            placeholder="Judul Artikel"
            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300"
          />
          <input
            type="date"
            name="tanggal"
            value={editData.tanggal}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300"
          />
          <textarea
            name="konten"
            value={editData.konten}
            onChange={handleChange}
            required
            placeholder="Konten Artikel"
            rows="4"
            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-300 resize-none"
          ></textarea>
          <div className="flex gap-2">
            {editIndex !== null && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-300 text-black rounded-xl hover:bg-gray-400"
              >
                Batal
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
            >
              {editIndex !== null ? "Simpan Perubahan" : "Tambah Artikel"}
            </button>
          </div>
        </form>

        <h3 className="text-xl font-semibold text-blue-700 mb-4">
          Daftar Artikel ({artikelList.length})
        </h3>
        {artikelList.length === 0 ? (
          <p className="text-gray-500">Belum ada artikel ditambahkan.</p>
        ) : (
          <ul className="space-y-4">
            {artikelList.map((item, index) => (
              <li
                key={index}
                className="bg-white border border-blue-200 rounded-xl p-6 shadow-sm"
              >
                <h4 className="text-lg font-bold text-blue-800">
                  {item.judul}
                </h4>
                <p className="text-sm text-blue-500 mb-1">{item.tanggal}</p>
                <p className="text-gray-700 mb-4">{item.konten}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 text-sm"
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ArtikelListWithEdit;
