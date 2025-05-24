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
      tanggal: "2025-05-13",
    },
  ]);

  const handleDelete = (index) => {
    const confirm = window.confirm("Yakin ingin menghapus artikel ini?");
    if (confirm) {
      const filtered = artikelList.filter((_, i) => i !== index);
      setArtikelList(filtered);
    }
  };

  const handleEdit = (index) => {
    alert(`Fungsi edit untuk artikel ke-${index + 1} belum diimplementasikan.`);
    // Di sinilah kamu bisa buka modal form edit
  };

  return (
    <div className="bg-gray-50 p-6 pt-24 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6 w-[95%] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Daftar Artikel</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            + Tambah Artikel
          </button>
        </div>

        {artikelList.length === 0 ? (
          <p className="text-gray-500">Belum ada artikel ditambahkan.</p>
        ) : (
          <ul className="space-y-4">
            {artikelList.map((item, index) => (
              <li
                key={index}
                className="border rounded-md p-6 shadow-sm w-full bg-white"
              >
                <h3 className="text-xl font-semibold">{item.judul}</h3>
                <p className="text-sm text-gray-500 mb-1">{item.tanggal}</p>
                <p className="text-gray-700 mb-4">{item.konten}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-200"
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
    </div>
  );
};

export default ArtikelListWithEdit;
