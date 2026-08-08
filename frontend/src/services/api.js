import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const predictXray = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await API.post("/predict", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // Convert heatmap path to full URL
  if (response.data.heatmap) {
    response.data.heatmap =
      "http://127.0.0.1:8000/" +
      response.data.heatmap.replace(/\\/g, "/");
  }

  return response.data;
};