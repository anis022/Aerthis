import json

dict = {"aqi": [],}

with open('../data-processed/aqi.json', 'w') as f:
    with open('../../aqi_DATA.txt', 'r') as lines:
        for line in lines:
            dict['aqi'].append(json.loads(line.strip()))
    json.dump(dict, f, indent=None, separators=(',', ':'))
