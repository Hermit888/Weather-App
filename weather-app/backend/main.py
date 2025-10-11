import psycopg2, os, datetime
from dotenv import load_dotenv

from flask import Flask, jsonify, request
from flask_cors import CORS

# load environment variable from .env
load_dotenv()

# connect to db
def dbConnect():
    conn = psycopg2.connect(
    host = os.getenv("DB_HOST"),
    database = os.getenv("DB_NAME"),
    user = os.getenv("DB_USER"),
    password = os.getenv("DB_PASS"),
    port = os.getenv("DB_PORT")
    )
    return conn


# allow frontend to call backend 
app = Flask(__name__)
CORS(app)

# add new cities to db
@app.route('/addWeather', methods=['POST'])
def addWeather():
    data = request.get_json()

    # forecast = data['forecast']
    
    ### insert current weather
    city = data['city']
    date = datetime.datetime.now().strftime("%Y-%m-%d")
    weather = data['current']['description']
    temp = data['current']['temp']
    pressure = data['current']['pressure']
    hum = data['current']['humidity']
    wind = data['current']['wind_speed']

    conn = dbConnect()
    cur = conn.cursor()

    # determine whether the data in db
    cur.execute(
        """
        INSERT INTO weather (city, date, weather, temperate, pressure, humidity, wind)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT (city, date) DO NOTHING;
        """,
        (city, date, weather, temp, pressure, hum, wind)
    )


    # ### insert forecast
    # for i in forecast:
    #     idx += 1
    #     cur.excute(
    #         """
    #         INSERT INTO %s (idx, city, date, weather, temperate, pressure, humidity, wind)
    #         VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
    #         """,
    #         (os.getenv("DB_NAME"), idx, i['city'], i['date'], 
    #         i['weather'], i['temp'], i['pressure'], i['hum'], i['wind'])
    #     )

    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': f"Weather data for {city} added successfully!"})


app.run(debug=True)