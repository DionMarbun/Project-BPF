import { useEffect, useState } from "react";
import { reservasiAPI } from "../Service/ReservasiAPI"; 
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaClipboardList, FaCheckCircle } from "react-icons/fa";

export default function ReservasiAdmin() {
  const [reservasi, setReservasi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    ruangan: "",
    lantai: "",
    status: "Tersedia",
    pelanggan: "",
    duras: 1,
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

  const totalBooked = reservasi.filter((d) => d.status === "Booked").length;
  const totalAvailable = reservasi.filter((d) => d.status !== "Booked").length;

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
      setFormData({ ruangan: "", lantai: "", status: "Tersedia", pelanggan: "", duras: 1 });
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
      ruangan: item.ruangan,
      lantai: item.lantai,
      status: item.status,
      pelanggan: item.pelanggan,
      duras: item.duras,
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

  const StatCard = ({ icon, label, value, color }) => (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
      <div className={`${color} text-white p-4 rounded-full`}>{icon}</div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-gray-500">{label}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 p-6 pt-24 min-h-screen">
      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <StatCard icon={<FaClipboardList className="text-3xl" />} label="Total Reservasi" value={reservasi.length} color="bg-blue-500" />
        <StatCard icon={<FaCheckCircle className="text-3xl" />} label="Sudah Dipesan" value={totalBooked} color="bg-red-500" />
        <StatCard icon={<FaCheckCircle className="text-3xl" />} label="Tersedia" value={totalAvailable} color="bg-green-500" />
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Manajemen Reservasi</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          >
            {showForm ? "Tutup Form" : "Tambah Reservasi"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <input type="text" name="ruangan" value={formData.ruangan} onChange={handleChange} placeholder="Nama Ruangan" required className="p-3 border rounded-xl" />
            <input type="text" name="lantai" value={formData.lantai} onChange={handleChange} placeholder="Lantai" required className="p-3 border rounded-xl" />
            <select name="status" value={formData.status} onChange={handleChange} className="p-3 border rounded-xl">
              <option value="Tersedia">Tersedia</option>
              <option value="Booked">Sudah Dipesan</option>
            </select>
            <input type="text" name="pelanggan" value={formData.pelanggan} onChange={handleChange} placeholder="Nama Pelanggan" className="p-3 border rounded-xl" />
            <input type="number" name="duras" value={formData.duras} onChange={handleChange} placeholder="Durasi (jam)" min="1" className="p-3 border rounded-xl" />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl col-span-full">
              {editingId ? "Update Data" : "Tambah Data"}
            </button>
          </form>
        )}

        {message && <AlertBox type="info">{message}</AlertBox>}

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white text-left border-b border-gray-200">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Ruangan</th>
                <th className="p-4">Lantai</th>
                <th className="p-4">Status</th>
                <th className="p-4">Pelanggan</th>
                <th className="p-4">Durasi</th>
                <th className="p-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-4 text-center">
                    <LoadingSpinner text="Memuat data..." />
                  </td>
                </tr>
              ) : reservasi.length > 0 ? (
                reservasi.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-white">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{item.ruangan}</td>
                    <td className="p-4">{item.lantai}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        item.status === "Booked"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}>
                        {item.status === "Booked" ? "Sudah Dipesan" : "Tersedia"}
                      </span>
                    </td>
                    <td className="p-4">{item.pelanggan || "-"}</td>
                    <td className="p-4">{item.duras} jam</td>
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
                  <td colSpan="7" className="p-4 text-center text-gray-500">
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
