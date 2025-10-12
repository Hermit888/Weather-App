# Description
A weather app for the PM Accelerator technical assessment

# Creating & Functions
The web was created with React.js for the frontend and Python Flask for the backend, which can create, read, update, and delete the database. The database is PostgreSQL.
The web has two sections: Weather and Weather Database.
- Weather section
  - Users can search a location's current weather and its forecast for a day range.
  - Users have three choices to search for the weather: city name, zip code, and coordinates.
  - Provides a range slider to select a date range for future weather (min: 1 day and max: 5 days).
  - Current weather shows city, temperature, atmospheric pressure, humidity, wind speed, weather description, and weather image.
  - Future weather shows date, weather description, and temperature.
  - If the input is not found or is an invalid value, the web will pop up the error message.
- Weather Database section
  - Users can read weather data that is in the database by typing the city name and a specific date.
  - Updating the temperature requires typing the city name, a specific date, and the new temperature.
  - Users can delete a city's weather by inputting the city name and a certain date.

 # Test
1. Clone the code to your pc.
  ```
git clone https://github.com/yourusername/WEATHER-APP.git
cd WEATHER-APP
  ```
2. Install Python[https://www.python.org/downloads/] and React.js[https://nodejs.org/en] if you don't have it on your pc
3. Set up the backend (Python + Flask)
```
cd backend
python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```
4. Set up frontend (React)
```
cd ../weather-app
npm install
```
5. Create a PostgreSQL database table based on the code below
 ```
CREATE TABLE IF NOT EXISTS public.weather
(
    city text COLLATE pg_catalog."default" NOT NULL,
    date date NOT NULL,
    weather text COLLATE pg_catalog."default",
    temperate double precision NOT NULL,
    pressure double precision,
    humidity double precision,
    wind double precision,
    id integer NOT NULL DEFAULT nextval('weather_id_seq'::regclass),
    CONSTRAINT weather_pkey PRIMARY KEY (id),
    CONSTRAINT unique_city_date UNIQUE (city, date)
)
 ```
6. Add your OpenWeatherMap API key in weather-app/.env
```
REACT_APP_API_KEY=your_openweatherapp_api_key
```
7. Add your database (db) host, db name, db user, db password, and db port in weather-app/backend/.env
```
### info about your db
DB_HOST=your_host
# the name you create the database
DB_NAME=your_db_name
DB_USER=your_db_user
# your password for postgresql
DB_PASS=your_db_pswd
DB_PORT=your_db_port
```
8. Run backend
```
cd backend
python main.py
```
9. Run frontend
```
cd ../weather-app
npm start
```
