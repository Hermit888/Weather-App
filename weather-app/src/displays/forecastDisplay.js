function ForecastDisplay({data, range}){
    // get the 5 days forecast data including today
    const datedays = data.list.filter((_,idx) => idx%8 === 0);

    // determine whether the last dates in data 
    // whether is equal to the last item in days array
    const last = data.list[data.list.length - 1];
    const lastDate = new Date(last.dt * 1000).toLocaleDateString();
    const lastDay = new Date(datedays[datedays.length - 1].dt * 1000).toLocaleDateString();
    // if not equal, add it to the days
    if (lastDate !== lastDay){
        datedays.push(last);
    }

    // removing the first element (today)
    datedays.shift();

    const days = datedays.slice(0,range);

    return(
        <div className="forecast">
            <h3>{range} Day(s) Forecast</h3>
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