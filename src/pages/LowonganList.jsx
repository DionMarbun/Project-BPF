import React, { useState } from "react";

const initialData = [
  {
    posisi: "Customer Service",
    lokasi: "Graha Pena Pekanbaru",
    tanggalDibuka: "2025-05-01",
    tipe: "Full Time",
  },
  {
    posisi: "Teknisi Gedung",
    lokasi: "Graha Pena Pekanbaru",
    tanggalDibuka: "2025-04-25",
    tipe: "Kontrak",
  },
  {
    posisi: "Marketing Event",
    lokasi: "Graha Pena Pekanbaru",
    tanggalDibuka: "2025-04-15",
    tipe: "Freelance",
  },
  {
    posisi: "Staff Booking Ruangan",
    lokasi: "Graha Pena Pekanbaru",
    tanggalDibuka: "2025-05-10",
    tipe: "Full Time",
  },
];

const LowonganList = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(initialData);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    posisi: "",
    lokasi: "",
    tanggalDibuka: "",
    tipe: "",
  });

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditForm({ ...data[index] });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedData = [...data];
    updatedData[editIndex] = { ...editForm };
    setData(updatedData);
    setEditIndex(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const confirm = window.confirm("Yakin ingin menghapus lowongan ini?");
    if (!confirm) return;
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const filtered = data.filter((item) =>
    item.posisi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white p-6 pt-24 min-h-screen font-[Poppins]">
      <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Daftar Lowongan Pekerjaan
          </h2>
          <input
            type="text"
            placeholder="Cari posisi..."
            className="border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400 px-4 py-2 rounded-md w-full sm:w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white text-gray-700 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-semibold">Posisi</th>
                <th className="text-left p-4 font-semibold">Lokasi</th>
                <th className="text-left p-4 font-semibold">Tanggal Dibuka</th>
                <th className="text-left p-4 font-semibold">Tipe</th>
                <th className="text-left p-4 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  {editIndex === idx ? (
                    <>
                      <td className="p-4">
                        <input
                          type="text"
                          name="posisi"
                          value={editForm.posisi}
                          onChange={handleEditChange}
                          className="w-full border border-gray-300 px-2 py-1 rounded"
                        />
                      </td>
                      <td className="p-4">
                        <input
                          type="text"
                          name="lokasi"
                          value={editForm.lokasi}
                          onChange={handleEditChange}
                          className="w-full border border-gray-300 px-2 py-1 rounded"
                        />
                      </td>
                      <td className="p-4">
                        <input
                          type="date"
                          name="tanggalDibuka"
                          value={editForm.tanggalDibuka}
                          onChange={handleEditChange}
                          className="w-full border border-gray-300 px-2 py-1 rounded"
                        />
                      </td>
                      <td className="p-4">
                        <input
                          type="text"
                          name="tipe"
                          value={editForm.tipe}
                          onChange={handleEditChange}
                          className="w-full border border-gray-300 px-2 py-1 rounded"
                        />
                      </td>
                      <td className="p-4 space-x-2">
                        <button
                          onClick={handleSave}
                          className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition"
                        >
                          Simpan
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-300 transition"
                        >
                          Batal
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-4 text-gray-800">{item.posisi}</td>
                      <td className="p-4 text-gray-700">{item.lokasi}</td>
                      <td className="p-4 text-gray-700">{item.tanggalDibuka}</td>
                      <td className="p-4 text-gray-700">{item.tipe}</td>
                      <td className="p-4 space-x-2">
                        <button
                          onClick={() => handleEdit(idx)}
                          className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-200 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(idx)}
                          className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200 transition"
                        >
                          Hapus
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    Tidak ada lowongan ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LowonganList;
