import React from "react";
import TableProduk from '../components/TableProduk';
import roomData from "../JSON/grahaPena.json";

const ManajemenProduk = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manajemen Produk Ruangan</h1>
      <TableProduk data={roomData} />
    </div>
  );
};

export default ManajemenProduk;
