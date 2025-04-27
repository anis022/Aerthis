import db
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
import reverse_geocode
import pandas as pd

# Load environment variables from .env file
load_dotenv()

# Create a Flask application instance
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": os.getenv("FRONTEND_URL")}},
     supports_credentials=True)  # Enable CORS for all routes

# Add CORS headers to all responses


@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = os.getenv("FRONTEND_URL")
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    return response

# route that will get longitude and lattitude as args


@app.route('/', methods=['GET'])
def get_geo_data(lat, lng):
    # info for the popup on the map
    country_code_2_letter = reverse_geocode.search((lat, lng))['country_code']
    code_data = pd.read_csv('data/isocode.csv')
    country_code_3_letter = code_data.loc[code_data['A2'] == country_code_2_letter, 'A3'].values[0]
    country_name = code_data.loc[code_data['A2'] == country_code_2_letter, 'Name'].values[0]
    return


if __name__ == '__main__':

    # Example usage
    db_name = "test_db"
    collection_name = "test_collection"
    data = {"name": "John Doe", "age": 30}
    query = {"name": "John Doe"}

    # Create an element
    result = db.db_create_element(db_name, collection_name, data)
    print(f"Inserted ID: {result.inserted_id}")

    # Find an element
    found_element = db.db_find_element(db_name, collection_name, query)
    print(f"Found Element: {found_element}")

    app.run(debug=True)
