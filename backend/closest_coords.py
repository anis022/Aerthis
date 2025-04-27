import math
import json

# Haversine formula to calculate distance


def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in km
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)

    a = math.sin(delta_phi/2)**2 + math.cos(phi1) * \
        math.cos(phi2)*math.sin(delta_lambda/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))

    return R * c

# Find the closest location


def find_closest_location_and_give_aqi(lat, lon):
    with open('data-processed/aqi.json', 'r') as file:
        json_data = json.load(file)
    # <--- IMPORTANT: we access 'data' list
    data_list = json_data.get('aqi', [])
    
    min_distance = float('inf')
    closest = None

    for entry in data_list:
        entry_lat = entry.get('lat')
        entry_lng = entry.get('lng')
        if entry_lat is not None and entry_lng is not None:
            distance = haversine(lat, lon, entry_lat, entry_lng)
            if distance < min_distance:
                min_distance = distance
                closest = entry

    return json.dumps(closest, indent=2)