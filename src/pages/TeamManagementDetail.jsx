import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import teamData from "../JSON/team.json";

export default function TeamManagementDetail() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const foundMember = teamData.find((item) => item.id === parseInt(id));
    if (!foundMember) {
      setError("Anggota tidak ditemukan.");
    } else {
      setMember(foundMember);
    }
  }, [id]);

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  if (!member) {
    return <div className="p-4">Memuat detail anggota...</div>;
  }

  return (
    <div className="pt-24 p-6 max-w-2xl mx-auto bg-white rounded-xl shadow font-[Poppins]">
      <div className="flex flex-col items-center">
        <img
          src={member.image}
          alt={member.name}
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
        <h2 className="text-2xl font-bold mb-1">{member.name}</h2>
        <p className="text-gray-500 mb-2">{member.role}</p>
        <div className="w-full mt-4">
          <p className="text-gray-600 mb-1"><strong>Email:</strong> {member.email}</p>
          <p className="text-gray-600 mb-1"><strong>Telepon:</strong> {member.phone}</p>
        </div>
      </div>
    </div>
  );
}
