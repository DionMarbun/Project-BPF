import { Link } from "react-router-dom";
export default function Unauthorized() {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-8xl font-extrabold text-purple-500">403</h1>
        <p className="text-3xl text-gray-700 mt-4">Unauthorized</p>
        <p className="text-lg text-gray-500 mt-2">The request could not be understood or was missing required parameters.</p>

        <Link
          to="/"
          className="mt-6 inline-block bg-hijau text-white px-6 py-3 rounded-lg text-xl hover:bg-green-600 transition-all duration-300"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
    );
  }