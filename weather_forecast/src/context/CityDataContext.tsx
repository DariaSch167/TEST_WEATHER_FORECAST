import React, { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";

// Определим типы для координат
interface Coordinates {
  lat: number | null;
  lon: number | null;
}

// Определим типы для контекста
interface CityDataContextType {
  city: string;
  coordinates: Coordinates;
  loading: boolean;
  error: string | null;
  fetchCoordinates: (cityName: string) => void;
}

// Создаём контекст с типом CityDataContextType
const CityDataContext = createContext<CityDataContextType | undefined>(
  undefined
);

// Типизация для пропсов CityDataProvider
interface CityDataProviderProps {
  children: ReactNode;
}

export const CityDataProvider: React.FC<CityDataProviderProps> = ({
  children,
}) => {
  const [city, setCity] = useState<string>("");
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: null,
    lon: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCoordinates = async (cityName: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: cityName,
            appid: "your_api_key_here", // Замените на свой API ключ
            units: "metric",
          },
        }
      );
      setCity(cityName);
      setCoordinates({
        lat: response.data.coord.lat,
        lon: response.data.coord.lon,
      });
    } catch (err) {
      console.log("Ошибка запроса:", err);
      setError("Не удалось получить данные");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CityDataContext.Provider
      value={{ city, coordinates, loading, error, fetchCoordinates }}>
      {children}
    </CityDataContext.Provider>
  );
};

// Хук для получения данных из контекста
export const useCity = (): CityDataContextType => {
  const context = useContext(CityDataContext);
  if (!context) {
    throw new Error("useCity must be used within a CityDataProvider");
  }
  return context;
};
