import axios from 'axios'

// Ganti URL endpoint sesuai nama tabel reservasi di Supabase
const API_URL = "https://gupajcdnaawdxmlkewxq.supabase.co/rest/v1/pemesanan"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1cGFqY2RuYWF3ZHhtbGtld3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNjY5NjMsImV4cCI6MjA2NDk0Mjk2M30.IBCR5tmPPXEx5rTG3GbY1Ovlqts6KTD4rtaSr96uZo4"

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
}

const reservasiAPI = {
  // Ambil semua data reservasi
  async fetchReservasi() {
    const response = await axios.get(`${API_URL}?select=*`, { headers })
    return response.data
  },

  // Tambah data reservasi baru
  async createReservasi(data) {
    const response = await axios.post(API_URL, data, { headers })
    return response.data
  },

  // Perbarui data berdasarkan ID
  async updateReservasi(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers })
    return response.data
  },

  // Hapus data berdasarkan ID
  async deleteReservasi(id) {
    const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    return response.data
  }
}

export { reservasiAPI }
