import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});


export const predictXray = async (file) => {

  const formData = new FormData();

  formData.append("file", file);


  const response = await API.post(
    "/predict",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );


  // Normalize file paths returned by the backend
  const data = response.data;


  if (data.image) {
    data.image = data.image.replace(/\\/g, "/");
  }


  if (data.heatmap) {
    data.heatmap = data.heatmap.replace(/\\/g, "/");
  }


  if (data.report) {
    data.report = data.report.replace(/\\/g, "/");
  }


  return data;
};