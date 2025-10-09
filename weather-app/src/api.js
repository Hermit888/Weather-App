const baseUrl_curr = "https://api.openweathermap.org/data/2.5/weather?";
const baseUrl_fore = "https://api.openweathermap.org/data/2.5/forecast?"
const key = process.env.REACT_APP_API_KEY;

export async function fetchWeather(location){
    const res = await fetch(
        `${baseUrl_curr}q=${location}&appid=${key}`
    );

    if (!res.ok) throw new Error("Location not found");
    
    return res.json();
}

export async function fetchForecast(location){
    const res = await fetch(
        `${baseUrl_fore}q=${location}&appid=${key}`
    );

    if (!res.ok) throw new Error("Forecast not found");
    return res.json();
}