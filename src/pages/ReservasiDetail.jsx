import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import data from '../JSON/grahaPena.json'

export default function ReservasiDetail() {
    const { id } = useParams()
    const [room, setRoom] = useState(null)
    const [error, setError] = useState(null)

useEffect(() => {
    const foundRoom = data.find((item) => item.id === parseInt(id))
    if (!foundRoom) {
        setError("Ruangan tidak ditemukan")
    } else {
        setRoom(foundRoom)
    }
}, [id])


    if (error) return <div className="text-red-600 p-4">{error}</div>
    if (!room) return <div className="p-4">Memuat data...</div>

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto mt-6">
            <img
                src={room.image}
                alt={room.name}
                className="rounded-xl mb-4 w-full h-64 object-cover"
            />
            <h2 className="text-2xl font-bold mb-2">{room.name}</h2>
            <p className="text-gray-600 mb-1">
                Lokasi: {room.location.building}, Lt. {room.location.floor}, {room.location.city}
            </p>
            <p className="text-gray-600 mb-1">Kapasitas: {room.capacity}</p>
            <p className="text-gray-600 mb-1">Harga: {room.price}</p>
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-1">Fasilitas:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {room.facilities.meja && <li>Meja: {room.facilities.meja}</li>}
                    {room.facilities.kursi && <li>Kursi: {room.facilities.kursi}</li>}
                    {room.facilities.sound_system_mic && <li>Sound System & Mic</li>}
                    {room.facilities.panggung && <li>Panggung</li>}
                    {room.facilities.ruang_rias_keluarga && <li>Ruang Rias Keluarga</li>}
                    {room.facilities.full_ac && <li>Full AC</li>}
                </ul>
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-1">Dimensi:</h3>
                <p className="text-gray-700">
                    {room.dimensions.width}m x {room.dimensions.depth}m x {room.dimensions.height}m
                </p>
            </div>
        </div>
    )
}
