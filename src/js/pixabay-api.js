import axios from "axios";

const API_KEY = import.meta.env.VITE_PIXABAY_KEY;
const BASE_URL = "https://pixabay.com/api/";

export async function fetchImages(query, page = 1) {
  if (!API_KEY) {
    const error = new Error("Missing Pixabay API key");
    error.code = "MISSING_KEY";
    throw error;
  }

  const params = {
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: 20,
    page,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
