import axios from "axios";

export default async function fetchData() {
    try {
      const response = await axios.get("http://localhost:8080/form-data");
      return response.data.data.formData;
    } catch (err) {
      console.error("Error fetching data:", err);
      return [];
    }
  }