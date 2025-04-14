import React from "react";

function WeatherCard({
  location,
  weatherData,
  handleSearchReset,
  handleRefresh,
}) {
  if (!weatherData) return null;

  return (
    <>
      <div className="weather-card">
        <h2 className="city-name">{location}</h2>
        <div className="temp-box">
          <h1>{weatherData.temp}°</h1>
          <p>{weatherData.conditions}</p>
        </div>
        <div className="details-box">
          <p>Wind speed: {weatherData.windspeed} km/h</p>
          <p>Chance of Rain: {weatherData.precipprob}%</p>
        </div>
      </div>
      <div className="buttons">
        <button onClick={handleSearchReset} className="reset-btn">
          Clear
        </button>
        <button onClick={handleRefresh} className="refresh-btn">
          Sync
        </button>
      </div>
    </>
  );
}

export default WeatherCard;
