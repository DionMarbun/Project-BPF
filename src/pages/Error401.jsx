import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2] px-4 font-poppins">
      <div className="text-center text-white max-w-md bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
        {/* Ilustrasi 404 - Ganti dengan asset asli */}
        <div className="mb-8 animate-bounce">
          <div className="bg-white/20 rounded-full p-6 inline-block">
            <span className="text-6xl font-bold block">404</span>
            <span className="text-xl">16A!</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">OPPSI PAGE NOT FOUND</h1>
        
        <p className="text-gray-200 mb-8">
          Halaman yang Anda cari mungkin telah dihapus atau tidak tersedia
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-white text-[#764ba2] 
          rounded-lg hover:rounded-xl transition-all duration-300 
          font-semibold shadow-md hover:shadow-lg"
        >
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
}