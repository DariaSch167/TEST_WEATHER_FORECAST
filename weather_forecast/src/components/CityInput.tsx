import React, { useState, useContext } from "react";
import { CityDataContext } from "../context/CityDataContext";

const CityInput: React.FC = () => {
  const [inputCity, setInputCity] = useState<string>(""); // Хранение значения инпута
  const {
    // city,
    fetchCoordinates,
    coordinates,
    fetchWeather,
    weather,
    loading,
    error,
  } = useContext(CityDataContext)!; // Получаем данные и функцию из контекста

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCity(e.target.value); // Обновляем значение инпута
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    // Сначала запрашиваем координаты
    try {
      await fetchCoordinates(inputCity); // Получаем координаты для города
    } catch (err) {
      console.error("Ошибка получения координат", err);
      return;
    }

    // После того как координаты получены, запрашиваем погоду
    if (coordinates.lat && coordinates.lon) {
      try {
        await fetchWeather(coordinates.lat, coordinates.lon); // Получаем погоду по координатам
      } catch (err) {
        console.error("Ошибка получения погоды", err);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputCity}
          onChange={handleInputChange}
          placeholder="Введите название города"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 text-white">
          {loading ? "Загружается..." : "Получить координаты"}
        </button>
      </form>

      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}

      {weather && !loading && !error && (
        <div>
          <ul>
            {weather.list.slice(0, 5).map((day, index) => (
              <li key={index}>
                <strong>{new Date(day.dt * 1000).toLocaleDateString()}</strong>
                <p>Температура: {day.main.temp}°C</p>
                <p>Описание: {day.weather[0].description}</p>
              </li>
            ))}
          </ul>
          {/* <h3>Погода в {city}:</h3>
          <p>Температура: {weather.main.temp}°C</p>
          <p>Описание: {weather.weather[0].description}</p>
          <p>Облачность: {weather.clouds.all}%</p>
          <p>Скорость ветра: {weather.wind.speed} м/с</p> */}
        </div>
      )}
    </div>
  );
};

export default CityInput;
