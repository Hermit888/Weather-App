import {useState} from "react";
import {fetchCityWeather, fetchCityForecast, fetchZipWeather, fetchZipForecast, fetchCoorWeather, fetchCoorForecast} from "./api";
import WeatherDisplay from "./displays/weatherDisplay";
import ForecastDisplay from "./displays/forecastDisplay";
import "./App.css"

function App() {
  // update dynamic data 
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [coor, setCoor] = useState({lat:"", lon:""});

  const [weather, setWeather] = useState(null);
  const[forecast, setForecst] = useState(null);
  const[error, setError] = useState("");

  
  const [method, setMethod] = useState("city");

  // different type of input
  let typeInput;

  switch (method){
    case "zip":
      typeInput = (
        <input 
          type="text"
          placeholder="Enter a zip code e.g. 90001,US"
          value = {zip}
          onChange={(e) => setZip(e.target.value)}
          />
      );
      break;
    case "coor":
      typeInput = (
        <input 
          type="text"
          placeholder="Enter coordinates e.g. 34.05,-118.25"
          value = {`${coor.lat}${coor.lon ? ',' + coor.lon : ''}`}
          onChange={(e) => {
            const [lat, lon] = e.target.value.split(',');
            setCoor({lat: lat || "", lon: lon || ""});
          }}
          />
        );
        break;
    default:
      typeInput = (
        <input 
          type="text"
          placeholder="Enter a city name e.g. Los Angeles"
          value = {city}
          onChange={(e) => setCity(e.target.value)}
          />
        );
        break;
        }

  // throw error if something is wrong
  const handleSearch =async(e) => {
    e.preventDefault();
    try{
      setError("");

      // determine the method of searching
      if (method==="zip"){
        const weaData = await fetchZipWeather(zip);
        setWeather(weaData);
        const foreData = await fetchZipForecast(zip);
        setForecst(foreData);
      } else if (method === "coor") {
        const weaData = await fetchCoorWeather(coor);
        setWeather(weaData);
        const foreData = await fetchCoorForecast(coor);
        setForecst(foreData);
      } else {
        const weaData = await fetchCityWeather(city);
        setWeather(weaData);
        const foreData = await fetchCityForecast(city);
        setForecst(foreData);
      }
    } catch (err){
      setError(err.message);
      setWeather(null);
      setForecst(null);
    }
  };


  return (
    <div className="App">
      <h1>🌦️How Is The Weather?</h1>

      <form onSubmit={handleSearch}>
        <div className='method'>
          <label>
            Search by: 
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="city">City</option>
              <option value="zip">Zip code</option>
              <option value="coor">Coordinates</option>
            </select>
          </label>
        </div>

        {typeInput}

        <button type="submit">Search Weather</button>
      </form>

      {error && <p className="error">{error}</p>}
      {weather && <WeatherDisplay data={weather} />}
      {forecast && <ForecastDisplay data={forecast} />}
    </div>
  );
}

export default App;