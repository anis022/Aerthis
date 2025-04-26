import pandas as pd

def get_spending_data():
    data = pd.read_excel('data/lol.xlsx', sheet_name='EM-DAT Data', usecols=['Country', 'target'])
    return data.to_json()
