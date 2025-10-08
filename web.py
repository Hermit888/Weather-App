import streamlit as st
import requests, json

# function for getting weather api url
def getWeatherUrl(baseurl, apikey, userInput, method):
    if method == "City Name":
        compUrl = baseurl + 'q=' + userInput + '&appid=' + apikey
    elif method == "Zip Code":
        compUrl = baseurl + 'zip=' + userInput + '&appid=' + apikey
    else:
        inputs = userInput.split(',')
        compUrl = baseurl + 'lat=' + inputs[0] + '&lon=' + inputs[1] + '&appid=' + apikey

    return compUrl

# openweathermap api
baseUrl_curr = "https://api.openweathermap.org/data/2.5/weather?"
baseUrl_fore = "http://api.openweathermap.org/data/2.5/forecast?"
apiKey = "0190cef3ee5b5c329e224b46e6769ed1"


st.title("🌦️ How is the weather")

# select how to search the weather
method = st.selectbox(
    "How do you want to search:",
    ["City Name", "Zip Code", "Coordinates (lat, lon)"]
)

# show different hints in search bar
if method == "City Name":
    userInput = st.text_input('Enter a city name:', placeholder='e.g. Los Angeles')
elif method == "Zip Code":
    userInput = st.text_input('Enter a zip code:', placeholder='e.g. 90001,US')
else:
    userInput = st.text_input('Enter a coordinates:', placeholder='e.g. 34.05,-118.25')

# search the weather from openweathermap api
if st.button("Search Weather"):
    # get completed url
    if not userInput:
        st.warning("Please enter a value first!")
    elif method == "Coordinates (lat, lon)" and ',' not in userInput:
        st.warning("Please enter a valid value that is with ','!")
    else:
        completeURL_curr = getWeatherUrl(baseUrl_curr, apiKey, userInput, method)
        completeURL_fore = getWeatherUrl(baseUrl_fore, apiKey, userInput, method)
        st.write(completeURL_fore)

    # get data for currect and forecast
    response_curr = requests.get(completeURL_curr)
    data_curr = response_curr.json()

    response_fore = requests.get(completeURL_fore)
    data_fore = response_fore.json()


    if data_curr['cod'] == '404' or data_fore['cod'] == '404':
        st.warning('Please enter a valid value first!')
    else:
        # get currect weather:
        # city name, temperature, feels like, atmospheric pressure, humidity, and description

        # get forecast weather:
        # city name, temperature, feels like, atmospheric pressure, humidity, description, and time
        pass