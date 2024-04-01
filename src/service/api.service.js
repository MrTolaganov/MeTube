import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  headers: {
    "X-RapidAPI-Key": "a90ca38effmsh09ca1e0c34aea83p1244a1jsn99741bfc1adc",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const ApiService = {
  async fetching(url) {
    const response = await axios.get(`${BASE_URL}/${url}`, options);
    return response.data;
  },
};
