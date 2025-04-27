import requests
import json

# generate a list of geo coords
for lng in range(-123, 180, 5):
    for lat in range(-90, 90, 5):
        print(f"lat: {lat}, lng: {lng}")
        req = requests.get(f"https://api.waqi.info/feed/geo:{lat};{lng}/?token={"75001dc18d56abf731eb69047a75664d4267c47d"}")
        req_json = json.loads(req.text)
        try:
            db_dict = {
            "loc": req_json["data"]["city"]["name"],
            "aqi": req_json["data"]["aqi"],
            "lat": req_json["data"]["city"]["geo"][0],
            "lng": req_json["data"]["city"]["geo"][1],
            "tim": req_json["data"]["time"]["s"],
            "src": req_json["data"]["attributions"][0]["url"],
            "dom": req_json["data"]["dominentpol"],
            "iaq": req_json["data"]["iaqi"],
        }
            print(json.dumps(db_dict,separators=(',', ':')))
            with open("aqi_data.txt", "a") as f:
                f.write(json.dumps(db_dict, separators=(',', ':')))
                f.write("\n")
        except Exception as e:
            print(f"Error: {e}")
            continue
