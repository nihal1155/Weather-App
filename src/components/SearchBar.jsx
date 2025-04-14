import { GoSearch } from "react-icons/go";
import { useState } from "react";
import WeatherCard from "./WeatherCard";
import Loader from "./Loader";
import axios from "axios";

const API_KEY = "UV32AAK8J4R43VCX6HF6BCCTV";
const WEATHER_API_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearchSubmit = async () => {
    if (!searchValue.trim()) return;
    setLoading(true);

    try {
      const weatherRes = await axios.get(
        `${WEATHER_API_URL}${searchValue}?key=${API_KEY}&unitGroup=metric`
      );

      // Check if weather data exists
      if (weatherRes.data && weatherRes.data.currentConditions) {
        setWeatherData(weatherRes.data.currentConditions);
        setSelectedValue(searchValue); // Store the city name
        setIsSearchSubmitted(true);
      } else {
        console.error("Weather data not found");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle the refresh button (re-fetch weather data)
  const handleRefresh = async () => {
    if (!selectedValue) return;

    try {
      const weatherRes = await axios.get(
        `${WEATHER_API_URL}${selectedValue}?key=${API_KEY}&unitGroup=metric`
      );

      // Check if weather data exists
      if (weatherRes.data && weatherRes.data.currentConditions) {
        setWeatherData(weatherRes.data.currentConditions);
      } else {
        console.error("Weather data not found");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // Reset the search state
  const handleSearchReset = () => {
    setIsSearchSubmitted(false);
    setWeatherData(null);
    setSearchValue("");
  };

  const handleSearch = (e) => {
    if (e?.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  return (
    <>
      <div className="search-wrapper">
        <input
          className="search-bar"
          type="text"
          placeholder="Enter city name"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleSearch}
        />
        <GoSearch className="search-icon" onClick={handleSearchSubmit} />
      </div>
      <div>
        {loading ? (
          <Loader />
        ) : (
          isSearchSubmitted &&
          weatherData && (
            <>
              <WeatherCard
                handleSearchReset={handleSearchReset}
                handleRefresh={handleRefresh}
                location={selectedValue}
                weatherData={weatherData}
              />
              {/* <button onClick={handleSearchReset} className="reset-btn">
                Search Again
              </button>
              <button onClick={handleRefresh} className="refresh-btn">
                Refresh
              </button> */}
            </>
          )
        )}
      </div>
    </>
  );
}

export default SearchBar;
