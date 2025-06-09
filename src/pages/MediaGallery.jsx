import { useState, useEffect } from "react";
import { mediaGalleryAPI } from "../Service/mediaGallery.js";
import GenericTable from "../components/GenericTable";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState.jsx";
import LoadingSpinner from "../components/LoadingSpinner";
import { AiFillDelete } from "react-icons/ai";

export default function MediaGallery() {
  const [dataForm, setDataForm] = useState({
    title: "",
    description: "",
    media_type: "image", // default value
    media_link: "", // URL string input dari user, nanti kita simpan di objek JSON
  });

  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit tambah media baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validasi sederhana
    if (!dataForm.title || !dataForm.media_type || !dataForm.media_link) {
      setError("Judul, tipe media, dan link media wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      // media_link simpan sebagai objek JSON sesuai skema:
      const payload = {
        ...dataForm,
        media_link: { url: dataForm.media_link },
      };

      await mediaGalleryAPI.createMedia(payload);

      setSuccess("Media berhasil ditambahkan!");
      setDataForm({
        title: "",
        description: "",
        media_type: "image",
        media_link: "",
      });

      loadMedia();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(`Gagal menambah media: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Load semua media
  const loadMedia = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await mediaGalleryAPI.fetchMedia();
      setMedia(data);
    } catch {
      setError("Gagal memuat data media.");
    } finally {
      setLoading(false);
    }
  };

  // Hapus media berdasarkan ID
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus media ini?")) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await mediaGalleryAPI.deleteMedia(id);
      setSuccess("Media berhasil dihapus.");
      loadMedia();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(`Gagal menghapus media: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Tambah Media Gallery</h2>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Judul Media"
            value={dataForm.title}
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />

          <textarea
            name="description"
            placeholder="Deskripsi (opsional)"
            value={dataForm.description}
            onChange={handleChange}
            disabled={loading}
            rows={3}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 resize-none"
          ></textarea>

          <select
            name="media_type"
            value={dataForm.media_type}
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>

          <input
            type="url"
            name="media_link"
            placeholder="Link Media (URL)"
            value={dataForm.media_link}
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl disabled:opacity-50"
          >
            {loading ? "Mohon Tunggu..." : "Tambah Media"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-10">
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold">
            Daftar Media Gallery ({media.length})
          </h3>
        </div>

        {loading && <LoadingSpinner text="Memuat media..." />}
        {!loading && media.length === 0 && !error && (
          <EmptyState text="Belum ada media." />
        )}
        {!loading && media.length === 0 && error && (
          <EmptyState text="Terjadi kesalahan. Coba lagi nanti." />
        )}

        {!loading && media.length > 0 && (
          <GenericTable
            columns={["#", "Judul", "Deskripsi", "Tipe", "Link", "Aksi"]}
            data={media}
            renderRow={(item, index) => (
              <>
                <td className="px-6 py-4">{index + 1}.</td>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">{item.description || "-"}</td>
                <td className="px-6 py-4">{item.media_type}</td>
                <td className="px-6 py-4">
                  <a
                    href={item.media_link?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Lihat Media
                  </a>
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
  );
}
