import React from "react";

function ForecastDisplay({data}){
    // get the 5 days forecast data
    const days = data.list.filter((_,idx) => idx%8 === 0);

    return(
        <div className="forecast">
            <h3>5 Day Forecast</h3>
            <div className="foregrid">
                {
                    days.map(
                        (day, i) => (
                            <div key={i} className="foreday">
                                <p>{new Date(day.dt*1000).toLocaleDateString()}</p>
                                <p>{day.weather[0].description}</p>
                                <p>{day.main.temp} K</p>
                                <img 
                                    alt={day.weather[0].description}
                                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                />
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
}

export default ForecastDisplay;