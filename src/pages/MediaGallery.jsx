import { useState, useEffect } from "react";
import { mediaGalleryAPI } from "../Service/mediaGalleryAPI.js";
import GenericTable from "../components/GenericTable";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState.jsx";
import LoadingSpinner from "../components/LoadingSpinner";
import { AiFillDelete } from "react-icons/ai";

export default function MediaGallery() {
  const [dataForm, setDataForm] = useState({
    title: "",
    media_type: "image",
    media_link: "",
  });

  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!dataForm.title || !dataForm.media_type || !dataForm.media_link) {
      setError("Judul, tipe media, dan link media wajib diisi.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...dataForm,
        media_link: { url: dataForm.media_link },
      };
      await mediaGalleryAPI.createMedia(payload);
      setSuccess("Media berhasil ditambahkan!");
      setDataForm({ title: "", media_type: "image", media_link: "" });
      loadMedia();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(`Gagal menambah media: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

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

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus media ini?")) return;
    try {
      setLoading(true);
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
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">
          Tambah Media Gallery
        </h2>
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
            className="w-full p-3 bg-blue-50 rounded-2xl border border-blue-200 focus:ring-2 focus:ring-blue-300"
          />

          <select
            name="media_type"
            value={dataForm.media_type}
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 bg-blue-50 rounded-2xl border border-blue-200 focus:ring-2 focus:ring-blue-300"
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
            className="w-full p-3 bg-blue-50 rounded-2xl border border-blue-200 focus:ring-2 focus:ring-blue-300"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-400 hover:bg-blue-600 text-white font-semibold rounded-2xl disabled:opacity-50"
          >
            {loading ? "Mohon Tunggu..." : "Tambah Media"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-10 border border-blue-100">
        <div className="px-6 py-4 border-b border-blue-100">
          <h3 className="text-lg font-semibold text-blue-700">
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
            columns={["#", "Judul", "Tipe", "Link", "Aksi"]}
            data={media}
            renderRow={(item, index) => (
              <>
                <td className="px-6 py-4 text-blue-900">{index + 1}.</td>
                <td className="px-6 py-4 text-blue-900">{item.title}</td>
                <td className="px-6 py-4 text-blue-800">{item.media_type}</td>
                <td className="px-6 py-4">
                  {item.media_link?.url ? (
                    item.media_type === "image" ? (
                      <a
                        href={item.media_link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={item.media_link.url}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-lg hover:ring-2 hover:ring-blue-300 transition"
                        />
                      </a>
                    ) : (
                      <a
                        href={item.media_link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Lihat Media
                      </a>
                    )
                  ) : (
                    <span className="italic text-gray-400">Tidak ada link</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(item.id)} disabled={loading}>
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
