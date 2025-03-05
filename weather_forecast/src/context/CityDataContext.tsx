import React, { createContext, useState, ReactNode } from "react";
import { fetchCityCoordinates } from "../services/cityCoordsService";
import { fetchCityWeather } from "../services/cityWeatherService";

interface Coordinates {
  lat: number | null;
  lon: number | null;
}

interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface WeatherClouds {
  all: number;
}

interface WeatherWind {
  speed: number;
  deg: number;
  gust: number;
}

interface WeatherList {
  dt: number; // Временная метка (timestamp)
  main: WeatherMain;
  weather: WeatherDescription[];
  clouds: WeatherClouds;
  wind: WeatherWind;
  dt_txt: string; // Дата в строковом формате
}

interface WeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherList[]; // Массив с прогнозами
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
  };
}

type WeatherData = WeatherResponse | null;

interface CityDataContextType {
  city: string;
  coordinates: Coordinates;
  weather: WeatherData;
  loading: boolean;
  error: string | null;
  fetchCoordinates: (cityName: string) => void;
  fetchWeather: (lat: number, lon: number) => void;
}

const CityDataContext = createContext<CityDataContextType | undefined>(
  undefined
);

interface CityDataProviderProps {
  children: ReactNode;
}

const CityDataProvider: React.FC<CityDataProviderProps> = ({ children }) => {
  const [city, setCity] = useState<string>("");
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: null,
    lon: null,
  });
  const [weather, setWeather] = useState<WeatherData>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCoordinates = async (cityName: string) => {
    setLoading(true);
    setError(null);
    try {
      const coords = await fetchCityCoordinates(cityName);
      setCity(cityName);
      setCoordinates(coords);
    } catch {
      setError("Не удалось получить данные");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async (lat: number, lon: number) => {
    if (lat && lon) {
      setLoading(true);
      setError(null);
      try {
        const weatherData = await fetchCityWeather(lat, lon);
        setWeather(weatherData);
      } catch {
        setError("Не удалось получить данные о погоде");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <CityDataContext.Provider
      value={{
        city,
        coordinates,
        weather,
        loading,
        error,
        fetchCoordinates,
        fetchWeather,
      }}>
      {children}
    </CityDataContext.Provider>
  );
};

export { CityDataProvider, CityDataContext };
