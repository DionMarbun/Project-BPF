import axios from 'axios'

const API_URL = "https://gupajcdnaawdxmlkewxq.supabase.co/rest/v1/teams"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1cGFqY2RuYWF3ZHhtbGtld3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNjY5NjMsImV4cCI6MjA2NDk0Mjk2M30.IBCR5tmPPXEx5rTG3GbY1Ovlqts6KTD4rtaSr96uZo4"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const teams = {
    // Ambil semua data tim
    async fetchTeams() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    // Tambah data tim baru
    async createTeams(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },

    // Update status atau isi pesan (optional)
    async updateTeams(id, data) {
        const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers })
        return response.data
    },

    // Hapus data berdasarkan ID
    async deleteTeams(id) {
        const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
        return response.data
    }
}
