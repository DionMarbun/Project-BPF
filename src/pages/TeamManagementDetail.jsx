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
    <div className="pt-24 min-h-screen bg-[#F5F8FF] font-[Poppins]">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <div className="flex flex-col items-center">
          <img
            src={member.image}
            alt={member.name}
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-[#3B82F6]"
          />
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-1">{member.name}</h2>
          <p className="text-gray-500 mb-4">{member.role}</p>
          <div className="w-full space-y-2 text-sm text-gray-700">
            <div>
              <span className="font-semibold text-[#2563EB]">Email:</span> {member.email}
            </div>
            <div>
              <span className="font-semibold text-[#2563EB]">Telepon:</span> {member.phone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
