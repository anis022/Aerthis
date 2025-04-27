import json

dict = {"heatmap": [],}

aqi_data = json.load(open('../data-processed/aqi.json'))

for station in aqi_data['aqi']:
    dict['heatmap'].append({
        "lat": station['lat'],
        "lng": station['lng'],
        "data": {"aqi": station['aqi']}
    })

json.dump(dict, open('../data-processed/heatmap.json', 'w'), indent=None, separators=(',', ':'))
