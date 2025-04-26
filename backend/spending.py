import pandas as pd

data = pd.read_excel('data/lol.xlsx', sheet_name='EM-DAT Data',
                     usecols=['Country', 'target'])

# Group by 'Country' and sum 'target'
summed_spending = data.groupby('Country')['target'].sum().to_dict()

print(summed_spending)
