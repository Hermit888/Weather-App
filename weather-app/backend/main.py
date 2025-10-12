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

    foreday = datetime.datetime.now() + datetime.timedelta(days=1)
    foredays = int(data['daysRange'])

    
    forecast = data['forecats']
    addLast = False

    ### insert forecast
    for i in range(0,len(data['forecats']), 8):
        if foredays == 0:
            break

        # pass today
        if datetime.datetime.fromtimestamp(forecast[i]['date'], tz = datetime.timezone.utc).strftime("%Y-%m-%d") == datetime.datetime.now().strftime("%Y-%m-%d"):
            addLast = True
            continue

        cur.execute(
            """
            INSERT INTO weather (city, date, weather, temperate, pressure, humidity, wind)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (city, date) DO NOTHING;
            """,
            (city, foreday.strftime("%Y-%m-%d"), 
            forecast[i]['description'], forecast[i]['temp'], 
            forecast[i]['pressure'], 
            forecast[i]['humidity'], forecast[i]['wind_speed'])
        )

        foreday += datetime.timedelta(days=1)
        foredays -= 1
 

    # add the last day if remove today
    if addLast and foredays > 0:
        cur.execute(
            """
            INSERT INTO weather (city, date, weather, temperate, pressure, humidity, wind)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (city, date) DO NOTHING;
            """,
            (city, foreday.strftime("%Y-%m-%d"), 
            forecast[39]['description'], forecast[39]['temp'], 
            forecast[39]['pressure'], 
            forecast[39]['humidity'], forecast[39]['wind_speed'])
        )

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({'message': f"Weather data for {city} added successfully!"})

# read city and specific date
@app.route('/readWeather', methods=['GET'])
def read_weather():
    city = request.args.get('city')
    date = request.args.get('date')  # expected in 'YYYY-MM-DD' format

    # determine whether the city in db
    if not city or not date:
        return jsonify({'error': 'City or date not found or invalid value!'}), 400

    conn = dbConnect()
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM weather WHERE city = %s AND date = %s;",
        (city, date)
    )

    row = cur.fetchone()

    cur.close()
    conn.close()

    if row:
        return jsonify({
            'City': row[0],
            'Date': row[1],
            'Weather': row[2],
            'Temperature (K)': row[3],
            'Pressure (hPa)': row[4],
            'Humidity (%)': row[5],
            'Wind speed (m/s)': row[6]
        })
    else:
        return jsonify({'error': 'City not found or invalid value!'}), 404


# update the temp in db
@app.route('/updateWeather', methods=['PUT'])
def update_weather():
    data = request.get_json()
    city = data.get('city')
    date = data.get('date')  # 'YYYY-MM-DD'
    temp = data.get('temperate')

    # determine whether the city in db
    if not city or not date or temp is None:
        return jsonify({'error': 'City, date, or temperature not provided or invalid value!'}), 400

    # if temp is invalid 
    if type(temp) != float:
        return jsonify({'error': 'Temperature is invalid value!'}), 400
    
    # update db
    conn = dbConnect()
    cur = conn.cursor()
    cur.execute(
        "UPDATE weather SET temperate = %s WHERE city = %s AND date = %s RETURNING *;",
        (temp, city, date)
    )
    updated = cur.fetchone()

    conn.commit()
    cur.close()
    conn.close()

    if updated:
        return jsonify({'message': f'Temperature for {city} on {date} updated to {temp}.'})
    else:
        return jsonify({'error': 'City not found or invalid value!'}), 404


# delete a row in db
@app.route('/deleteWeather', methods=['DELETE'])
def delete_weather():
    data = request.get_json()
    city = data.get('city')
    date = data.get('date')

    # determine whether the city in db
    if not city or not date:
        return jsonify({'error': 'City or date not provided!'}), 400

    conn = dbConnect()
    cur = conn.cursor()
    cur.execute(
        "DELETE FROM weather WHERE city = %s AND date = %s RETURNING *;",
        (city, date)
    )
    deleted = cur.fetchone()

    conn.commit()
    cur.close()
    conn.close()

    if deleted:
        return jsonify({'message': f'Data for {city} on {date} deleted successfully!'})
    else:
        return jsonify({'error': 'Not found or invalid value!'}), 404

app.run(debug=True)
