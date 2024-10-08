import React, { useState } from 'react';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'd6c6126fa57a8b2af5fea46aee2ca498';

  const getWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found. Please enter a valid city name.');
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
      setCity("");
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };   
  //jjdj

  return (
    <div className="weather-container">
      <h1 className="app-title">Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="city-input"
        />
        <button onClick={getWeather} className="get-data-button">
          Get Data
        </button>
      </div>
      {weatherData && (
        <div className="weather-info">
          <h2 className="city-name">{weatherData.name}</h2>
          <p className="weather-description">{weatherData.weather[0].description}</p>
          <p className="temperature">Temperature: {weatherData.main.temp}°C</p>
          <p className="humidity">Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Weather;
