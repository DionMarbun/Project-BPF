import axios from "axios";

const BASE_URL = "https://gupajcdnaawdxmlkewxq.supabase.co/rest/v1";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1cGFqY2RuYWF3ZHhtbGtld3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNjY5NjMsImV4cCI6MjA2NDk0Mjk2M30.IBCR5tmPPXEx5rTG3GbY1Ovlqts6KTD4rtaSr96uZo4";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

const API_URL = `${BASE_URL}/media_gallery`;

export const mediaGalleryAPI = {
  async fetchMedia() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  async createMedia(data) {
    // Contoh data:
    // {
    //   title: "Judul Media",
    //   media_type: "image", // atau "video"
    //   media_link: { url: "https://example.com/image.jpg" }
    // }
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  async updateMedia(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
    return response.data;
  },

  async deleteMedia(id) {
    const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
    return response.data;
  },
};
