import pandas as pd
import json

# Read the CSV file
data = pd.read_csv('data/temp-diff.csv', usecols=['Code', 'Year', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])

# Calculate the average temperature for each row
data['Temperature'] = data[['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']].mean(axis=1)

# Filter data for the period 1940-1950
period1 = data[(data['Year'] >= 1940) & (data['Year'] <= 1950)]

# Group by 'Code' and calculate the average temperature for each country
avg_temp_by_country = period1.groupby('Code')['Temperature'].mean().reset_index()

# Print the result
print(avg_temp_by_country)

# If you want to output the result as JSON
result = avg_temp_by_country.to_dict(orient='records')
print(json.dumps(result, indent=4))
