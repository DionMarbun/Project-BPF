import { useState, useEffect } from "react"
import { companyProfileAPI } from "../Service/companyProfileAPI.js"
import AlertBox from "../components/AlertBox"
import LoadingSpinner from "../components/LoadingSpinner"
import GenericTable from "../components/GenericTable"
import EmptyState from "../components/EmptyState"
import { AiFillDelete, AiFillEdit } from "react-icons/ai"

export default function CompanyProfile() {
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    alamat: "",
    telepon: "",
    email: "",
  })

  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [editingId, setEditingId] = useState(null)

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
        await companyProfileAPI.updateProfile(editingId, formData)
        setSuccess("Profil berhasil diperbarui.")
      } else {
        await companyProfileAPI.createProfile(formData)
        setSuccess("Profil berhasil ditambahkan.")
      }

      setFormData({
        nama: "",
        deskripsi: "",
        alamat: "",
        telepon: "",
        email: "",
      })
      setEditingId(null)
      setTimeout(() => setSuccess(""), 3000)
      loadProfiles()
    } catch (err) {
      console.error("Error saat menyimpan:", err)
      setError(`Terjadi kesalahan: ${err?.response?.data?.message || err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const loadProfiles = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await companyProfileAPI.fetchProfiles()
      console.log("Hasil fetchProfiles:", data)

      if (!Array.isArray(data)) {
        throw new Error("Format data tidak valid")
      }

      setProfiles(data)
    } catch (err) {
      console.error("Gagal memuat profil:", err)
      setError(err?.response?.data?.message || err.message || "Gagal memuat data profil")
      setProfiles([]) // Kosongkan agar UI tidak freeze
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus profil ini?")
    if (!konfirmasi) return

    try {
      setLoading(true)
      setSuccess("")
      await companyProfileAPI.deleteProfile(id)
      setSuccess("Profil berhasil dihapus.")
      if (editingId === id) {
        setFormData({
          nama: "",
          deskripsi: "",
          alamat: "",
          telepon: "",
          email: "",
        })
        setEditingId(null)
      }
      loadProfiles()
    } catch (err) {
      console.error("Gagal menghapus profil:", err)
      setError(`Gagal menghapus: ${err?.response?.data?.message || err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (profile) => {
    setFormData({
      nama: profile.nama || "",
      deskripsi: profile.deskripsi || "",
      alamat: profile.alamat || "",
      telepon: profile.telepon || "",
      email: profile.email || "",
    })
    setEditingId(profile.id)
    setError("")
    setSuccess("")
  }

  useEffect(() => {
    loadProfiles()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <br/>
      <br/>
      <br/>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">
          {editingId ? "Edit Profil Perusahaan" : "Tambah Profil Perusahaan"}
        </h2>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nama"
            placeholder="Nama Perusahaan"
            value={formData.nama}
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />
          <textarea
            name="deskripsi"
            placeholder="Deskripsi Perusahaan"
            value={formData.deskripsi}
            onChange={handleChange}
            rows="3"
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 resize-none"
          />
          <textarea
            name="alamat"
            placeholder="Alamat"
            value={formData.alamat}
            onChange={handleChange}
            rows="3"
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 resize-none"
          />
          <input
            type="text"
            name="telepon"
            placeholder="Telepon"
            value={formData.telepon}
            onChange={handleChange}
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : editingId ? "Perbarui Profil" : "Simpan Profil"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-10">
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold">
            Daftar Profil Perusahaan ({profiles.length})
          </h3>
        </div>

        {loading && <LoadingSpinner text="Memuat data profil..." />}
        {!loading && profiles.length === 0 && !error && (
          <EmptyState text="Belum ada data profil." />
        )}
        {!loading && profiles.length === 0 && error && (
          <EmptyState text="Terjadi kesalahan. Coba lagi nanti." />
        )}

        {!loading && profiles.length > 0 && (
          <GenericTable
            columns={["#", "Nama", "Telepon", "Email", "Aksi"]}
            data={profiles}
            renderRow={(item, index) => (
              <>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{item.nama}</td>
                <td className="px-6 py-4">{item.telepon}</td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4 space-x-3 flex items-center">
                  <button onClick={() => handleEdit(item)} disabled={loading}>
                    <AiFillEdit className="text-blue-500 text-xl hover:text-blue-700" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} disabled={loading}>
                    <AiFillDelete className="text-red-500 text-xl hover:text-red-700" />
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
