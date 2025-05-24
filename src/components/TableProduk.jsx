import React from "react";

const TableProduk = ({ rooms }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Gambar</th>
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Harga</th>
            <th className="p-2 border">Kapasitas</th>
            <th className="p-2 border">Fasilitas</th>
            <th className="p-2 border">Lokasi</th>
            <th className="p-2 border">Dimensi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((produk) => (
            <tr key={produk.id} className="hover:bg-gray-50">
              <td className="p-2 border">
                <img src={produk.image} alt={produk.name} className="w-24 h-16 object-cover rounded" />
              </td>
              <td className="p-2 border">{produk.name}</td>
              <td className="p-2 border">{produk.price}</td>
              <td className="p-2 border">{produk.capacity}</td>
              <td className="p-2 border text-xs">
                <ul className="list-disc ml-4">
                  {produk.facilities.meja && <li>Meja: {produk.facilities.meja}</li>}
                  {produk.facilities.kursi && <li>Kursi: {produk.facilities.kursi}</li>}
                  {produk.facilities.sound_system_mic && <li>Sound System + Mic</li>}
                  {produk.facilities.panggung && <li>Panggung</li>}
                  {produk.facilities.ruang_rias_keluarga && <li>Ruang Rias Keluarga</li>}
                  {produk.facilities.full_ac && <li>Full AC</li>}
                </ul>
              </td>
              <td className="p-2 border">
                Lt {produk.location.floor}, {produk.location.building}, {produk.location.city}
              </td>
              <td className="p-2 border">
                {produk.dimensions.width}m x {produk.dimensions.depth}m x {produk.dimensions.height}m
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableProduk;
