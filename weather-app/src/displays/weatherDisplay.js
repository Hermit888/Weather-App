function WeatherDisplay({data}){
    const {name, main, wind,weather} = data;

    return(
        <div className="weather">
            <h2>{name}</h2>
            <p>🌡️Temperature: {main.temp} K</p>
            <p>💨Atmospheric pressure: {main.pressure} hPa</p>
            <p>💧Humidity: {main.humidity}%</p>
            <p>🍃Wind speed: {wind.speed} m/s</p>
            <p>Weather: {weather[0].description}</p>
            <img
                alt={weather[0].description}
                src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            />
        </div>
    );
}

export default WeatherDisplay;