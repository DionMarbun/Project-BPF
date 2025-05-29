import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import reviewData from "../JSON/dataReview.json";

export default function ReviewPelangganDetail() {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const found = reviewData.find((item) => item.id === parseInt(id));
    if (!found) {
      setError("Review tidak ditemukan.");
    } else {
      setReview(found);
    }
  }, [id]);

  if (error) return <div className="text-red-600 p-4">{error}</div>;
  if (!review) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-2">{review.nama}</h2>
      <p className="text-gray-600 mb-2 italic">"{review.komentar}"</p>
      <p className="text-yellow-500 font-semibold mb-2">
        Rating: {review.rating} ⭐
      </p>
      <p className="text-gray-500 text-sm">Tanggal Review: {review.tanggal}</p>
    </div>
  );
}
