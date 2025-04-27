import requests
import json

# Fetch the GeoJSON data from the provided URL
url = 'https://r2.datahub.io/clvyjaryy0000la0cxieg4o8o/main/raw/data/countries.geojson'
response = requests.get(url)

# Check for successful response
if response.status_code != 200:
    print("Failed to download data!")
    exit()

# Parse the JSON content
data = response.json()

# Get the 'features' which contains the countries
features = data.get('features')
if not features:
    print("No features found in the GeoJSON!")
    exit()

# Extract the ISO country code and coordinates
countries_coords = []
for feature in features:
    properties = feature['properties']
    geometry = feature['geometry']
    
    # Get the ISO3166-1-Alpha-3 code and coordinates
    iso_code = properties.get('ISO3166-1-Alpha-3')
    coords = geometry.get('coordinates')
    
    if iso_code and coords:
        countries_coords.append({
            "iso_code": iso_code,
            "coordinates": coords
        })

# Save the extracted information to a file
with open('data-processed/outline.json', 'w') as outfile:
    json.dump(countries_coords, outfile, indent=2)

print("Data has been saved to 'data-processed/outline.json'")
