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
    {
      judul: "5 Alasan Mengapa Anda Harus Gunakan Graha Pena",
      konten: "Fasilitas modern, lokasi strategis, dan layanan profesional.",
      tanggal: "2025-05-12",
    },
    {
      judul: "Panduan Menyiapkan Acara Seminar",
      konten: "Siapkan rundown, undangan, dan perlengkapan presentasi.",
      tanggal: "2025-05-16",
    },
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({
    judul: "",
    konten: "",
    tanggal: "",
  });

  const handleDelete = (index) => {
    const confirm = window.confirm("Yakin ingin menghapus artikel ini?");
    if (confirm) {
      const filtered = artikelList.filter((_, i) => i !== index);
      setArtikelList(filtered);
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

  const handleUpdate = () => {
    const updatedList = [...artikelList];
    updatedList[editIndex] = editData;
    setArtikelList(updatedList);
    setEditIndex(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 via-blue-50 to-white p-6 pt-24 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[95%] mx-auto border border-blue-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">Daftar Artikel</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow-sm">
            + Tambah Artikel
          </button>
        </div>

        {artikelList.length === 0 ? (
          <p className="text-blue-500">Belum ada artikel ditambahkan.</p>
        ) : (
          <ul className="space-y-4">
            {artikelList.map((item, index) => (
              <li
                key={index}
                className="border border-blue-200 rounded-md p-6 shadow-sm w-full bg-white"
              >
                <h3 className="text-xl font-semibold text-blue-800">
                  {item.judul}
                </h3>
                <p className="text-sm text-blue-500 mb-1">{item.tanggal}</p>
                <p className="text-gray-700 mb-4">{item.konten}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm hover:bg-red-200"
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal Edit */}
      {editIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-auto border border-blue-200">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">
              Edit Artikel
            </h2>
            <input
              type="text"
              name="judul"
              value={editData.judul}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded-md border-blue-300"
              placeholder="Judul"
            />
            <input
              type="date"
              name="tanggal"
              value={editData.tanggal}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded-md border-blue-300"
            />
            <textarea
              name="konten"
              value={editData.konten}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded-md border-blue-300 resize-none"
              placeholder="Konten artikel"
              rows={4}
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Batal
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtikelListWithEdit;
