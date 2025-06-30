import { useEffect, useState } from "react";
import { reservasiAPI } from "../Service/ReservasiAPI";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ReservasiAdmin() {
  const [reservasi, setReservasi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    nama: "",
    nohp: "",
    tanggal: "",
    waktu_mulai: "",
    waktu_selesai: "",
    jumlah_orang: 1,
    total_harga: 0,
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadReservasi = async () => {
    try {
      setLoading(true);
      const data = await reservasiAPI.fetchReservasi();
      setReservasi(data);
    } catch (err) {
      setMessage("Gagal memuat data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservasi();
  }, []);

  useEffect(() => {
    const { waktu_mulai, waktu_selesai, jumlah_orang } = formData;

    if (waktu_mulai && waktu_selesai && jumlah_orang) {
      const [startHour, startMinute] = waktu_mulai.split(":").map(Number);
      const [endHour, endMinute] = waktu_selesai.split(":").map(Number);

      const start = new Date(0, 0, 0, startHour, startMinute);
      const end = new Date(0, 0, 0, endHour, endMinute);

      let durasi = (end - start) / (1000 * 60 * 60); // hasil jam

      if (durasi > 0) {
        const hargaPerOrangPerJam = 30000;
        const total = durasi * parseInt(jumlah_orang) * hargaPerOrangPerJam;
        setFormData((prev) => ({ ...prev, total_harga: total }));
      } else {
        setFormData((prev) => ({ ...prev, total_harga: 0 }));
      }
    }
  }, [formData.waktu_mulai, formData.waktu_selesai, formData.jumlah_orang]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        await reservasiAPI.updateReservasi(editingId, formData);
        setMessage("Data berhasil diperbarui");
      } else {
        await reservasiAPI.createReservasi(formData);
        setMessage("Data berhasil ditambahkan");
      }
      setFormData({
        nama: "",
        nohp: "",
        tanggal: "",
        waktu_mulai: "",
        waktu_selesai: "",
        jumlah_orang: 1,
        total_harga: 0,
      });
      setEditingId(null);
      setShowForm(false);
      loadReservasi();
    } catch (err) {
      setMessage("Gagal menyimpan data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      nama: item.nama,
      nohp: item.nohp,
      tanggal: item.tanggal,
      waktu_mulai: item.waktu_mulai,
      waktu_selesai: item.waktu_selesai,
      jumlah_orang: item.jumlah_orang,
      total_harga: item.total_harga,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus data ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      await reservasiAPI.deleteReservasi(id);
      setMessage("Data berhasil dihapus");
      loadReservasi();
    } catch (err) {
      setMessage("Gagal menghapus data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray p-6 pt-6 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Manajemen Reservasi</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-400 hover:bg-blue-400 text-white px-4 py-2 rounded-md"
          >
            {showForm ? "Tutup Form" : "Tambah Reservasi"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-semibold mb-1">Nama Lengkap</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap Anda"
                required
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Nomor HP</label>
              <input
                type="tel"
                name="nohp"
                value={formData.nohp}
                onChange={handleChange}
                placeholder="081234567890"
                required
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">
                Tanggal Pemesanan
              </label>
              <input
                type="date"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Waktu Mulai</label>
              <input
                type="time"
                name="waktu_mulai"
                value={formData.waktu_mulai}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              />
              <p className="text-xs text-gray-500 mt-1">
                Pilih waktu mulai pemesanan
              </p>
            </div>

            <div>
              <label className="block font-semibold mb-1">Waktu Selesai</label>
              <input
                type="time"
                name="waktu_selesai"
                value={formData.waktu_selesai}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              />
              <p className="text-xs text-gray-500 mt-1">
                Pilih waktu selesai pemesanan
              </p>
            </div>

            <div>
              <label className="block font-semibold mb-1">Jumlah Orang</label>
              <input
                type="number"
                name="jumlah_orang"
                value={formData.jumlah_orang}
                onChange={handleChange}
                min="1"
                required
                className="w-full border rounded-lg p-3"
              />
              <p className="text-xs text-gray-500 mt-1">
                Jumlah peserta yang akan hadir
              </p>
            </div>

            <div>
              <label className="block font-semibold mb-1">Total Harga</label>
              <input
                type="text"
                value={`Rp${formData.total_harga.toLocaleString("id-ID")}`}
                readOnly
                className="w-full bg-gray-100 border rounded-lg p-3"
              />
              <p className="text-xs text-gray-500 mt-1">
                Total harga otomatis dihitung berdasarkan durasi
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            >
              {editingId ? "Update Data" : "Kirim Reservasi"}
            </button>
          </form>
        )}

        {message && <AlertBox type="info">{message}</AlertBox>}

        <div className="overflow-x-auto mt-6">
          <table className="min-w-full text-sm">
            <thead className="bg-white text-left border-b border-gray-200">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Nama</th>
                <th className="p-4">No HP</th>
                <th className="p-4">Tanggal</th>
                <th className="p-4">Mulai</th>
                <th className="p-4">Selesai</th>
                <th className="p-4">Orang</th>
                <th className="p-4">Harga</th>
                <th className="p-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="p-4 text-center">
                    <LoadingSpinner text="Memuat data..." />
                  </td>
                </tr>
              ) : reservasi.length > 0 ? (
                reservasi.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-white"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{item.nama}</td>
                    <td className="p-4">{item.nohp}</td>
                    <td className="p-4">{item.tanggal}</td>
                    <td className="p-4">{item.waktu_mulai}</td>
                    <td className="p-4">{item.waktu_selesai}</td>
                    <td className="p-4">{item.jumlah_orang}</td>
                    <td className="p-4">
                      Rp {item.total_harga.toLocaleString("id-ID")}
                    </td>
                    <td className="p-4 flex gap-2">
                      <button onClick={() => handleEdit(item)}>
                        <AiFillEdit className="text-blue-500 hover:text-blue-700 text-xl" />
                      </button>
                      <button onClick={() => handleDelete(item.id)}>
                        <AiFillDelete className="text-red-500 hover:text-red-700 text-xl" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="p-4 text-center text-gray-500">
                    Tidak ada data reservasi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
