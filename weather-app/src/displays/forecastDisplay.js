function ForecastDisplay({data, range}){
    // get the 5 days forecast data including today
    const datedays = data.list.filter((_,idx) => idx%8 === 0);

    // determine whether the today in data 
    const first = data.list[0];
    const firstDate = new Date(first.dt * 1000).toDateString();
    const today = new Date().toDateString();

    // if equal, delete the first one and add the last one
    if (firstDate === today){
        datedays.shift();
        const last =  data.list[data.list.length - 1];

        // add 1 day to prevent duplicate
        const nextDay ={
            ...last,
            dt: last.dt + 24*60*60
        };

        datedays.push(nextDay);
    }

    const days = datedays.slice(0,range);

    return(
        <div className="forecast">
            <h3>{range} Day(s) Forecast</h3>
            <div className="foregrid">
                {
                    days.map(
                        (day, i) => (
                            <div key={i} className="foreday">
                                <p>{new Date(day.dt*1000).toDateString()}</p>
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