import pandas as pd

data = pd.read_excel('data/lol.xlsx', sheet_name='EM-DAT Data',
                     usecols=['ISO', 'target'])

# Group by 'Country' and sum 'target'
summed_spending = data.groupby('ISO')['target'].sum().to_dict()

print(summed_spending)
