import React, { useEffect, useRef, useState } from "react";
import "./weather.css";

// REACT_APP_ICON_URL = 'https://openweathermap.org/img/w'
const API_KEY = "609263fe9c110026c99f5e8dc3d6ec68";
const API_URL = "https://api.openweathermap.org/data/2.5";

const Weather = () => {
  const inputValue = useRef();
  const [weather, setWeather] = useState("");
  const [error, setError] = useState(null);

  const search = async (e) => {
    if (!inputValue.current.value) {
      return 0;
    } else {
      e.preventDefault();
      let url = `${API_URL}/weather?q=${inputValue.current.value}&units=Metric&appid=${API_KEY}`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const data = await response.json();
        setWeather(data);
        setError(null);
      } catch (error) {
        console.error(error);
        setWeather("");
        setError(error.message || "City not found");
      }
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <>
      <div className="container">
        <form onSubmit={search} className="top-bar">
          <input
            type="text"
            className="cityInput"
            ref={inputValue}
            placeholder="Enter Location"
          />
        </form>
        {weather ? (
          <div className="container">
            <div className="main">
              <h4 className="city">{weather.name}</h4>
              <h1 className="temperature">{weather.main.temp.toFixed(1)} °C</h1>
              <p className="desc">{weather.weather[0].main}</p>
            </div>
            <div className="footer">
              <div className="pressure">
                <p>{weather.main.pressure} Pa</p>
                <span>Pressure</span>
              </div>
              <div className="humidity">
                <p>{weather.main.humidity} %</p>
                <span>Humidity</span>
              </div>
              <div className="windSpeed">
                <p>{weather.wind.speed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        ) : error ? (
          <h1>{error}</h1>
        ) : null}
      </div>
    </>
  );
};

export default Weather;
