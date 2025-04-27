import json

dict = {"aqi": [],}

with open('../data-processed/aqi.json', 'w') as f:
    with open('../../aqi_DATA.txt', 'r') as lines:
        set_lines = set(lines)
        list_lines = list(set_lines)
        for line in list_lines:
            dict['aqi'].append(json.loads(line.strip()))
    json.dump(dict, f, indent=None, separators=(',', ':'))
