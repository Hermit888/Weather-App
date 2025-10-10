const baseUrl_curr = "https://api.openweathermap.org/data/2.5/weather?";
const baseUrl_fore = "https://api.openweathermap.org/data/2.5/forecast?"
const key = process.env.REACT_APP_API_KEY;

// fetch data by city name
export async function fetchCityWeather(city){
    const res = await fetch(
        `${baseUrl_curr}q=${city}&appid=${key}`
    );

    if (!res.ok) throw new Error("The city not found or an invalid value");
    
    return res.json();
}

// fetch data by zip code
export async function fetchZipWeather(zip){
    const res = await fetch(
        `${baseUrl_curr}zip=${zip}&appid=${key}`
    );

    if (!res.ok) throw new Error("The zip code not found or an invalid value");

    return res.json();
}

// fetch data by coordinates
export async function fetchCoorWeather(coor){
    const res = await fetch(
        `${baseUrl_curr}lat=${coor.lat}&lon=${coor.lon}&appid=${key}`
    );

    if (!res.ok) throw new Error("The coordinates code not found or an invalid value");

    return res.json();
}

// fetch data about the forecats by city name
export async function fetchCityForecast(city){
    const res = await fetch(
        `${baseUrl_fore}q=${city}&appid=${key}`
    );

    if (!res.ok) throw new Error("Forecast not found or an invalid value");
    return res.json();
}

// fetch data about the forecats by zip code
export async function fetchZipForecast(zip){
    const res = await fetch(
        `${baseUrl_fore}zip=${zip}&appid=${key}`
    );

    if (!res.ok) throw new Error("Forecast not found or an invalid value");
    return res.json();
}

// fetch data about the forecats by coordinates
export async function fetchCoorForecast(coor){
    const res = await fetch(
        `${baseUrl_fore}lat=${coor.lat}&lon=${coor.lon}&appid=${key}`
    );

    if (!res.ok) throw new Error("Forecast not found or an invalid value");
    return res.json();
}