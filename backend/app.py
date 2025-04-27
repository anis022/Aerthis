from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import reverse_geocode
import pandas as pd
import json
from closest_coords import find_closest_location_and_give_aqi
# Load environment variables from .env file
load_dotenv()
import db
# Create a Flask application instance
app = Flask(__name__)
# Add CORS headers to all responses
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
    country_code_2_letter = reverse_geocode.search([coords])[0]['country_code']
    code_data = pd.read_csv('data/isocode.csv')
    country_code_3_letter = code_data.loc[code_data['A2'] == country_code_2_letter, 'A3'].values[0]
    country_name = code_data.loc[code_data['A2'] == country_code_2_letter, 'Name'].values[0]
    print(f"Country code 2 letter: {country_code_2_letter}, Country code 3 letter: {country_code_3_letter}, Country name: {country_name}")
    #get the gdp
    gdp_data = json.load(open('data-processed/gdp.json'))
    try:
        gdp = gdp_data[country_code_3_letter]
    except Exception:
        gdp = "Not available"
    print(f"GDP: {gdp}")
    #get the disaster spending
    dis_data = json.load(open('data-processed/disaster-spending.json'))
    try:
        dis = dis_data[country_code_3_letter]
    except Exception:
        dis = "Not available"
    print(f"Disaster spending: {dis}")
    #get the temp diff
    tmp_data = json.load(open('data-processed/temp-diff.json'))
    try:
        tmp = -tmp_data[country_code_3_letter]
    except Exception:
        tmp = "Not available"
    print(f"Temperature difference: {tmp}")

    data_aqi = find_closest_location_and_give_aqi(lat, lng)
    return jsonify({
        'country_name': country_name,
        'gdp': gdp,
        'disaster_spending': dis,
        'temp_diff': tmp,
        'aqi': data_aqi,
    })

@app.route('/search', methods=['POST'])
def get_search():
    data = request.get_json()
    print('Received search:', data)

    search_query = data.get('search')  # 'search' should match what you sent from React
    # Do something useful here if you want (search a DB, filter data, etc.)

    return jsonify({
        "search": search_query
    }), 200

if __name__ == '__main__':
    app.run(debug=True)
