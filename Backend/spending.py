import pandas as pd

data = pd.read_excel('data/lol.xlsx', sheet_name='EM-DAT Data', usecols=['Country', 'target'])
print(data.to_json)
