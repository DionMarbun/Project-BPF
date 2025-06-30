import { useState, useEffect } from "react"
import { userAPI } from "../Service/userAPI.js"
import GenericTable from "../components/GenericTable"
import AlertBox from "../components/AlertBox"
import EmptyState from "../components/EmptyState"
import LoadingSpinner from "../components/LoadingSpinner"
import { AiFillDelete, AiFillEdit } from "react-icons/ai"

export default function Role() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    role: "",
  })

  const [users, setUsers] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError("")
      setSuccess("")

      if (editingId) {
        await userAPI.updateUser(editingId, formData)
        setSuccess("User berhasil diperbarui.")
      } else {
        await userAPI.createUser(formData)
        setSuccess("User berhasil ditambahkan!")
      }

      setFormData({ nama: "", email: "", telepon: "", role: "" })
      setEditingId(null)
      setTimeout(() => setSuccess(""), 3000)
      loadUsers()
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const loadUsers = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await userAPI.fetchUsers()
      setUsers(data)
    } catch (err) {
      setError("Gagal memuat data pengguna")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus user ini?")) return
    try {
      setLoading(true)
      setSuccess("")
      await userAPI.deleteUser(id)
      setSuccess("User berhasil dihapus.")
      loadUsers()
    } catch (err) {
      setError(`Gagal menghapus: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item) => {
    setFormData({
      nama: item.nama,
      email: item.email,
      telepon: item.telepon,
      role: item.role,
    })
    setEditingId(item.id)
    window.scrollTo({ top: 0, behavior: "smooth" }) // auto scroll ke form saat edit
  }

  const handleCancel = () => {
    setFormData({ nama: "", email: "", telepon: "", role: "" })
    setEditingId(null)
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="bg-white border border-blue-100 rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">
          {editingId ? "Edit User" : "Form Tambah User"}
        </h2>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nama"
            placeholder="Nama Lengkap"
            value={formData.nama}
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 bg-white rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 bg-white rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="telepon"
            placeholder="Nomor Telepon"
            value={formData.telepon}
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 bg-white rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="role"
            placeholder="Role (misal: admin, user)"
            value={formData.role}
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 bg-white rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex gap-4">
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded-xl transition"
              >
                Batal
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition disabled:opacity-50"
            >
              {loading
                ? "Menyimpan..."
                : editingId
                ? "Update User"
                : "Simpan User"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white border border-blue-100 rounded-2xl shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-blue-100 bg-blue-50">
          <h3 className="text-lg font-semibold text-blue-700">
            Daftar User ({users.length})
          </h3>
        </div>

        {loading && <LoadingSpinner text="Memuat pengguna..." />}
        {!loading && users.length === 0 && !error && (
          <EmptyState text="Belum ada user." />
        )}
        {!loading && users.length === 0 && error && (
          <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
        )}

        {!loading && users.length > 0 && (
          <GenericTable
            columns={["#", "Nama", "Email", "Telepon", "Role", "Aksi"]}
            data={users}
            renderRow={(item, index) => (
              <>
                <td className="px-6 py-4">{index + 1}.</td>
                <td className="px-6 py-4">{item.nama}</td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.telepon}</td>
                <td className="px-6 py-4">
                  <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {item.role}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button onClick={() => handleEdit(item)} disabled={loading}>
                    <AiFillEdit className="text-blue-400 text-2xl hover:text-blue-600 transition-colors" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={loading}
                  >
                    <AiFillDelete className="text-red-400 text-2xl hover:text-red-600 transition-colors" />
                  </button>
                </td>
              </>
            )}
          />
        )}
      </div>
    </div>
  )
}
