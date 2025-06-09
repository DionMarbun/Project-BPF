    import { useState, useEffect } from "react"
    import { kontakMasukAPI } from "../Service/kontakMasukAPI.js"
    import GenericTable from "../components/GenericTable"
    import AlertBox from "../components/AlertBox"
    import EmptyState from "../components/EmptyState.jsx"
    import LoadingSpinner from "../components/LoadingSpinner"
    import { AiFillDelete } from "react-icons/ai"

    export default function KontakMasuk() {
    const [dataForm, setDataForm] = useState({
        nama: "",
        email: "",
        telepon: "",
        subjek: "",
        pesan: "",
        status: "belum dibaca",
    })

    const [kontak, setKontak] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setDataForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        setLoading(true)
        setError("")
        setSuccess("")

        await kontakMasukAPI.createKontak(dataForm)

        setSuccess("Kontak berhasil dikirim!")

        setDataForm({
            nama: "",
            email: "",
            telepon: "",
            subjek: "",
            pesan: "",
            status: "belum dibaca",
        })

        setTimeout(() => setSuccess(""), 3000)
        loadKontak()
        } catch (err) {
        setError(`Terjadi kesalahan: ${err.message}`)
        } finally {
        setLoading(false)
        }
    }

    const loadKontak = async () => {
        try {
        setLoading(true)
        setError("")
        const data = await kontakMasukAPI.fetchKontak()
        setKontak(data)
        } catch (err) {
        setError("Gagal memuat data kontak")
        } finally {
        setLoading(false)
        }
    }

    // Fungsi hapus data kontak
    const handleDelete = async (id) => {
        const konfirmasi = confirm("Yakin ingin menghapus kontak ini?")
        if (!konfirmasi) return

        try {
        setLoading(true)
        setError("")
        setSuccess("")
        await kontakMasukAPI.deleteKontak(id)
        setSuccess("Kontak berhasil dihapus.")
        loadKontak()
        } catch (err) {
        setError(`Gagal menghapus: ${err.message}`)
        } finally {
        setLoading(false)
        }
    }

    useEffect(() => {
        loadKontak()
    }, [])

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Form Kontak Masuk</h2>

            {error && <AlertBox type="error">{error}</AlertBox>}
            {success && <AlertBox type="success">{success}</AlertBox>}

            <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form Input Fields */}
            <input
                type="text"
                name="nama"
                placeholder="Nama Pengirim"
                value={dataForm.nama}
                onChange={handleChange}
                disabled={loading}
                required
                className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={dataForm.email}
                onChange={handleChange}
                disabled={loading}
                required
                className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
            />
            <input
                type="text"
                name="telepon"
                placeholder="Telepon (opsional)"
                value={dataForm.telepon}
                onChange={handleChange}
                disabled={loading}
                className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
            />
            <input
                type="text"
                name="subjek"
                placeholder="Subjek Pesan"
                value={dataForm.subjek}
                onChange={handleChange}
                disabled={loading}
                required
                className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
            />
            <textarea
                name="pesan"
                placeholder="Isi Pesan"
                value={dataForm.pesan}
                onChange={handleChange}
                disabled={loading}
                required
                rows="4"
                className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 resize-none"
            ></textarea>

            <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl disabled:opacity-50"
            >
                {loading ? "Mohon Tunggu..." : "Kirim Pesan"}
            </button>
            </form>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-10">
            <div className="px-6 py-4">
            <h3 className="text-lg font-semibold">
                Daftar Kontak Masuk ({kontak.length})
            </h3>
            </div>

            {loading && <LoadingSpinner text="Memuat kontak..." />}
            {!loading && kontak.length === 0 && !error && (
            <EmptyState text="Belum ada pesan masuk." />
            )}
            {!loading && kontak.length === 0 && error && (
            <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
            )}

            {!loading && kontak.length > 0 && (
            <GenericTable
                columns={["#", "Nama", "Email", "Subjek", "Status", "Aksi"]}
                data={kontak}
                renderRow={(item, index) => (
                <>
                    <td className="px-6 py-4">{index + 1}.</td>
                    <td className="px-6 py-4">{item.nama}</td>
                    <td className="px-6 py-4">{item.email}</td>
                    <td className="px-6 py-4">{item.subjek}</td>
                    <td className="px-6 py-4">
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "sudah dibaca"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                        {item.status}
                    </span>
                    </td>
                    <td className="px-6 py-4">
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
