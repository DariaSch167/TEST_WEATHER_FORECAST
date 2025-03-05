import axios from "axios";

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_KEY;

export const fetchCityCoordinates = async (cityName: string) => {
  try {
    const response = await axios.get(
      "http://api.openweathermap.org/geo/1.0/direct",
      {
        params: {
          q: cityName,
          limit: 1,
          appid: API_KEY,
        },
      }
    );

    if (response.data.length > 0) {
      return {
        lat: response.data[0].lat,
        lon: response.data[0].lon,
      };
    } else {
      throw new Error("Город не найден");
    }
  } catch {
    throw new Error("Не удалось получить координаты города");
  }
};
