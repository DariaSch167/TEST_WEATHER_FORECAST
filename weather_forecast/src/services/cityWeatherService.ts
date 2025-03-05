import axios from "axios";

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_KEY;

export const fetchCityWeather = async (
  lat: number | null,
  lon: number | null
) => {
  if (lat === null || lon === null) {
    throw new Error("Некорректные координаты");
  }
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          lat: lat,
          lon: lon,
          appid: API_KEY,
          units: "metric",
          lang: "ru",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("Не удалось получить информацию о погоде");
  }
};
