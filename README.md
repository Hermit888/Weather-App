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
# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install required packages
pip install -r requirements.txt
```
4. Set up frontend (React)
```
cd ../weather-app
npm install
```
5. Run the following SQL in your PostgreSQL client (pgAdmin):
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
6. Configure environment variables:
- Frontend (weather-app/.env):
```
REACT_APP_API_KEY=your_openweatherapp_api_key
```
  - Backend (weather-app/backend/.env):
```
DB_HOST=your_host
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASS=your_db_pswd
DB_PORT=your_db_port
```
7. Run backend
```
cd backend
python main.py
```
8. Run frontend
```
cd ../weather-app
npm start
```
