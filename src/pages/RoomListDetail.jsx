import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import grahaPena from "../JSON/grahaPena.json";

export default function RoomListDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const foundRoom = grahaPena.find((r) => r.id === parseInt(id));
    if (!foundRoom) {
      setError("Ruangan tidak ditemukan.");
    } else {
      setRoom(foundRoom);
    }
  }, [id]);

  if (error) {
    return <p className="text-red-500 p-4">{error}</p>;
  }

  if (!room) {
    return <p className="p-4">Memuat detail ruangan...</p>;
  }

  return (
    <div className="pt-24 p-6 max-w-4xl mx-auto bg-white rounded-xl shadow font-[Poppins]">
      <h2 className="text-2xl font-bold mb-4">{room.name}</h2>
      <img
        src={room.image}
        alt={room.name}
        className="w-full max-h-96 object-cover rounded-lg mb-6"
      />

      <div className="mb-4">
        <strong>Harga:</strong> {room.price}<br />
        <strong>Kapasitas:</strong> {room.capacity}
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Fasilitas</h3>
        <ul className="list-disc list-inside">
          <li>Meja: {room.facilities?.meja ?? 'Tidak tersedia'}</li>
          <li>Kursi: {room.facilities?.kursi ?? 'Tidak tersedia'}</li>
          <li>Sound System & Mic: {room.facilities?.sound_system_mic ? 'Ada' : 'Tidak ada'}</li>
          <li>Panggung: {room.facilities?.panggung ? 'Ada' : 'Tidak ada'}</li>
          <li>Ruang Rias Keluarga: {room.facilities?.ruang_rias_keluarga ? 'Ada' : 'Tidak ada'}</li>
          <li>Full AC: {room.facilities?.full_ac ? 'Ya' : 'Tidak'}</li>
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Lokasi</h3>
        <p>
          Gedung: {room.location?.building}<br />
          Lantai: {room.location?.floor}<br />
          Kota: {room.location?.city}
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold">Dimensi Ruangan (meter)</h3>
        <p>
          Lebar: {room.dimensions?.width} m<br />
          Tinggi: {room.dimensions?.height} m<br />
          Dalam: {room.dimensions?.depth} m
        </p>
      </div>
    </div>
  );
}
