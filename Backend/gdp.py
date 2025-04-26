import pandas as pd

def get_gdp_data():
    data = pd.read_csv('data/gdp.csv', usecols=['Country Name','Country Code', 'Year', 'Value'])
    return data