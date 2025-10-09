import React, {useState} from "react";
import {fetchWeather, fetchForecast} from "./api";
import WeatherDisplay from "./displays/weatherDisplay";
import ForecastDisplay from "./displays/forecastDisplay";
import "./App.css"

function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const[forecast, setForecst] = useState(null);
  const[error, setError] = useState("");

  const handleSearch =async(e) => {
    e.preventDefault();
    try{
      setError("");
      const weaData = await fetchWeather(location);
      setWeather(weaData);

      const foreData = await fetchForecast(location);
      setForecst(foreData);
    } catch (err){
      setError(err.message);
      setWeather(null);
      setForecst(null);
    }
  };


  return (
    <div className="App">
      <h1>🌦️Weather App</h1>
      <form onSubmit={handleSearch}>
        <input 
          type="text"
          placeholder="Enter city name e.g. Los Angeles"
          value = {location}
          onChange={(e) => setLocation(e.target.value)}
          />

          <button type="submit">Search Weather</button>
      </form>

      {error && <p className="error">{error}</p>}
      {weather && <WeatherDisplay data={weather} />}
      {forecast && <ForecastDisplay data={forecast} />}
    </div>
  );
}

export default App;