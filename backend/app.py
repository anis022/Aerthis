from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import reverse_geocode
import pandas as pd
import json
from closest_coords import find_closest_location_and_give_aqi
from api import generate_coordinates_response, generate_pop_up_response

# Load environment variables from .env file
load_dotenv()
import db
# Create a Flask application instance
app = Flask(__name__)
# Add CORS headers to all responses
def get_data(coords):
    lat, lng = coords
    country_code_2_letter = reverse_geocode.search([coords])[0]['country_code']
    code_data = pd.read_csv('data/isocode.csv')
    country_code_3_letter = code_data.loc[code_data['A2'] == country_code_2_letter, 'A3'].values[0]
    country_name = code_data.loc[code_data['A2'] == country_code_2_letter, 'Name'].values[0]
    #get the gdp
    gdp_data = json.load(open('data-processed/gdp.json'))
    try:
        gdp = gdp_data[country_code_3_letter]
    except Exception:
        gdp = "Not available"
    #get the disaster spending
    dis_data = json.load(open('data-processed/disaster-spending.json'))
    try:
        dis = dis_data[country_code_3_letter]
    except Exception:
        dis = "Not available"
    #get the temp diff
    tmp_data = json.load(open('data-processed/temp-diff.json'))
    try:
        tmp = -tmp_data[country_code_3_letter]
    except Exception:
        tmp = "Not available"

    data_aqi = find_closest_location_and_give_aqi(lat, lng)
    gemini_response = generate_pop_up_response(f"Country: {country_name}, GDP: {gdp}, Disaster Spending: {dis}, Temperature Difference: {tmp}, Air Quality Index: {data_aqi}")
    return gemini_response
    
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = os.getenv("FRONTEND_URL")
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    return response

# route that will get longitude and lattitude as args
@app.route('/get-geo-data', methods=['POST'])
def get_geo_data():
    if request.method == 'OPTIONS':
        return '', 200

    print('Request method:', request.method)
    print('Request headers:', dict(request.headers))

    data = request.get_json()
    print('Received data:', data)
    lat = float(data.get('lat'))
    lng = float(data.get('lng'))
    print(f"Received lat: {lat}, lng: {lng}")
    # info for the popup on the map
    coords= (lat, lng)
    return get_data(coords=coords)

@app.route('/get-heatmap-data-test', methods=['GET'])
def get_heatmap_data_test():
    data = {"aqi": [
        {"loc":"Sainte-Luce, Martinique, France","aqi":46,"lat":14.468867,"lng":-60.927389,"tim":"2025-04-26 18:00:00","src":"http://www.madininair.fr/","dom":"pm25","iaq":{"dew":{"v":23},"h":{"v":78},"no2":{"v":1.2},"o3":{"v":15.7},"p":{"v":1012},"pm10":{"v":30},"pm25":{"v":46},"t":{"v":27},"w":{"v":3.6},"wg":{"v":9.2}}},
        {"loc":"Route Nationale 1, Les Abymes, Guadeloupe, France","aqi":22,"lat":16.254085,"lng":-61.53713,"tim":"2025-04-26 18:00:00","src":"https://www.gwadair.fr/","dom":"pm10","iaq":{"co":{"v":0.1},"dew":{"v":23},"h":{"v":78},"no2":{"v":5.8},"p":{"v":1013},"pm10":{"v":22},"t":{"v":27},"w":{"v":2.5}}},
        {"loc":"Route Nationale 1, Les Abymes, Guadeloupe, France","aqi":22,"lat":16.254085,"lng":-61.53713,"tim":"2025-04-26 18:00:00","src":"https://www.gwadair.fr/","dom":"pm10","iaq":{"co":{"v":0.1},"dew":{"v":23},"h":{"v":78},"no2":{"v":5.8},"p":{"v":1013},"pm10":{"v":22},"t":{"v":27},"w":{"v":2.5}}},
        {"loc":"Marigot, Saint-Martin, France","aqi":16,"lat":18.070114,"lng":-63.081481,"tim":"2025-04-26 17:00:00","src":"https://www.gwadair.fr/","dom":"pm25","iaq":{"dew":{"v":24},"h":{"v":88},"no2":{"v":10.1},"o3":{"v":8.9},"p":{"v":1014},"pm10":{"v":8},"pm25":{"v":16},"t":{"v":26},"w":{"v":2.5}}},
        {"loc":"Burin, NewFoundland, Canada","aqi":15,"lat":47.098988,"lng":-55.198521,"tim":"2025-04-26 18:00:00","src":"https://www.mae.gov.nl.ca/env_protection/science/airmon/index.html","dom":"pm25","iaq":{"dew":{"v":2},"h":{"v":93},"no2":{"v":0.2},"o3":{"v":13.1},"p":{"v":1029},"pm10":{"v":7},"pm25":{"v":15},"t":{"v":3},"w":{"v":4.1},"wg":{"v":16.4}}},
    ]}
    json_data = json.dumps(data)
    filtered_data = [
        {'aqi': float(entry['aqi']), 'lat': float(entry['lat']), 'lng': float(entry['lng'])}
        for entry in data['aqi']
    ]

    return jsonify(filtered_data)

@app.route('/get-heatmap-data', methods=['GET'])
def get_heatmap_data():
    data = json.load(open('data-processed/heatmap.json'))
    return jsonify(data["heatmap"])

@app.route('/get-plastic-data', methods=['GET'])
def get_plastic_data():
    data = json.load(open('data-processed/plasticmap.json'))
    # print(data["heatmap"])
    return jsonify(data["heatmap"])


@app.route('/search', methods=['POST'])
def get_search():
    data = request.get_json()
    print('Received search:', data)

    search_query = data.get('search')  # 'search' should match what you sent from React
    # Do something useful here if you want (search a DB, filter data, etc.)

    coords = generate_coordinates_response(search_query)
    coords = json.loads(coords)
    coords = (float(coords['lat']), float(coords['lng']))
    print(coords)
    return get_data(coords)

if __name__ == '__main__':
    app.run(debug=True)
