import pandas as pd
import json


def get_gdp_2023_json():
    data = pd.read_csv(
        'data/gdp.csv', usecols=['Country Name', 'Country Code', 'Year', 'Value'])
    data_2023 = data[data['Year'] == 2023]
    gdp_dict = dict(zip(data_2023['Country Code'], data_2023['Value']))
    return json.dumps(gdp_dict, indent=2)


# Example usage
if __name__ == "__main__":
    result = get_gdp_2023_json()
    print(result)
