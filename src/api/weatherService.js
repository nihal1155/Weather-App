import axios from "axios";

const API_KEY = "UV32AAK8J4R43VCX6HF6BCCTV"; // 🔁 Replace this with your Visual Crossing API Key

export const getWeatherData = async (location) => {
  try {
    const response = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
        location
      )}?unitGroup=metric&key=${API_KEY}&contentType=json`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
