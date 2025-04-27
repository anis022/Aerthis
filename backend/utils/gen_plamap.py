import pandas as pd
import json

# Load the data
data = pd.read_csv('../data/ocean-plastic.csv', usecols=['0045:GPS_Lat Int', '0047:GPS_Lon Int'])

# Rename the columns for easier access
data.columns = ['lat', 'lng']

# Convert the DataFrame to a list of dictionaries
heat_map_data = data.to_dict(orient='records')

# Create the final dictionary
result = {"heat map": heat_map_data}

# Convert to JSON string if needed
json.dump(result, open('../data-processed/plasticmap.json', 'w'), indent=None, separators=(',', ':'))
