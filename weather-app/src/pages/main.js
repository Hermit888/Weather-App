import {useState} from "react";
import {fetchCityWeather, fetchCityForecast, fetchZipWeather, 
        fetchZipForecast, fetchCoorWeather, fetchCoorForecast} from "../api";
import WeatherDisplay from "../displays/weatherDisplay";
import ForecastDisplay from "../displays/forecastDisplay";

export default function Main(){
  // update dynamic data 
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [coor, setCoor] = useState({lat:"", lon:""});

  const [weather, setWeather] = useState(null);
  const[forecast, setForecst] = useState(null);
  const[error, setError] = useState("");
  
  const [method, setMethod] = useState("city");
  const [tempRange, setTempRange] = useState(3);
  const [range, setRange] = useState(3);

  // different type of input
  let typeInput;

  switch (method){
    case "zip":
      typeInput = (
        <input 
          className="weatherInput"
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
          className="weatherInput"
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
          className="weatherInput"
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

    // days range to the true range 
    // avoid dynamic range slider
    setRange(tempRange);

    let weaData, foreData;

    try{
      setError("");
      
      // determine the method of searching
      if (method==="zip"){
        weaData = await fetchZipWeather(zip);
        // setWeather(weaData);
        foreData = await fetchZipForecast(zip);
        // setForecst(foreData);
      } else if (method === "coor") {
        weaData = await fetchCoorWeather(coor);
        // setWeather(weaData);
        foreData = await fetchCoorForecast(coor);
        // setForecst(foreData);
      } else {
        weaData = await fetchCityWeather(city);
        foreData = await fetchCityForecast(city);
      }

      setWeather(weaData);
      setForecst(foreData);

        //prepare forecast
        const forecasts = foreData.list.map(item => ({
            date: item.dt,
            description:item.weather[0].description,
            temp: item.main.temp,
            pressure: item.main.pressure,
            humidity: item.main.humidity,
            wind_speed: item.wind.speed
        }));

        await fetch("http://127.0.0.1:5000/addWeather", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                city:weaData.name,
                current: {
                    description:weaData.weather[0].description,
                    temp:weaData.main.temp,
                    pressure: weaData.main.pressure,
                    humidity:weaData.main.humidity,
                    wind_speed:weaData.wind.speed
                },
                daysRange: range,
                forecats: forecasts
            })
        });

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
        
        <div>
          <input 
            className="range"
            type="range" 
            min="1"
            max="5" 
            step= "1"
            value = {tempRange}
            onChange={(e) => setTempRange(e.target.value)}/>
          <br/>
          <label className="dates">Date range: {tempRange}</label>
        </div>
      </form>

      {error && <p className="error">{error}</p>}
      {weather && <WeatherDisplay data={weather} />}
      {forecast && <ForecastDisplay data={forecast} range={range}/>}
    </div>
  );
}