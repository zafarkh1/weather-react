import React, { useEffect, useRef, useState } from "react";
import "./weather.css";

import { IoMdSearch } from "react-icons/io";
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
            placeholder="Enter a location"
          />
          <div
            className="search-icon"
            onClick={(e) => {
              search(e);
            }}
          >
            <IoMdSearch />
          </div>
        </form>
        {!weather ? (
          error ? (
            <h1>{error}</h1>
          ) : (
            <h1>No data found</h1>
          )
        ) : (
          <div className="container">
            <p>
              Temperature:{" "}
              {weather.main ? <bold>{weather.main.temp}</bold> : null} °C
            </p>
            <p>City: {weather.name ? <bold>{weather.name}</bold> : null}</p>
            <p>
              Description:{" "}
              {weather.weather ? <bold>{weather.weather[0].main}</bold> : null}
            </p>
            <p>
              Humidity:{" "}
              {weather.main ? <bold>{weather.main.humidity}</bold> : null} %
            </p>
            <p>
              Wind Speed:{" "}
              {weather.wind ? <bold>{weather.wind.speed}</bold> : null} km/h
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Weather;
