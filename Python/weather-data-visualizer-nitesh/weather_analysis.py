import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import os


# loading data
print("\n--Loading Data:")
df = pd.read_csv('weather_data.csv')




df = df.rename(columns={
    'Date/Time': 'Date',        
    'Temp_C': 'Temperature',    
    'Rel Hum_%': 'Humidity',   
    'Wind Speed_km/h': 'Rainfall' 
})

# showing the first few rows to check if it worked
print("First 5 rows (After Renaming):")
print(df.head())

print("\nData Info:")
print(df.info())


# clearning
print("\n--Cleaning Data:")

# drop rows with empty values
df = df.dropna()

# converting date column

df['Date'] = pd.to_datetime(df['Date'])

# filter columns
df = df[['Date', 'Temperature', 'Rainfall', 'Humidity']]
print("Data cleaned and dates converted.")

# statistics (using NumPy/Pandas) 
print("\n Statistics ---")

# calculating the basic stats
avg_temp = np.mean(df['Temperature'])
max_rain = np.max(df['Rainfall'])
min_humid = np.min(df['Humidity'])

print(f"Average Temperature: {avg_temp:.2f} C")
print(f"Max Rainfall: {max_rain} mm")
print(f"Min Humidity: {min_humid} %")


# visualization
print("\n--Creating Plots:")

# line chart for temperature
plt.figure(figsize=(10, 5)) # seting the size
plt.plot(df['Date'], df['Temperature'], color='red', label='Temp')
plt.title('Daily Temperature Trends')
plt.xlabel('Date')
plt.ylabel('Temp (C)')
plt.legend()
plt.savefig('plots/daily_temp.png') # saving it
print("Saved daily_temp.png")
plt.close() 



# scatter plot (humidity vs temp)
plt.figure(figsize=(8, 6))
plt.scatter(df['Humidity'], df['Temperature'], color='blue', alpha=0.5)
plt.title('Humidity vs Temperature')
plt.xlabel('Humidity (%)')
plt.ylabel('Temperature (C)')
plt.savefig('plots/humidity_temp.png')
print("Saved humidity_temp.png")
plt.close()




# --Doing grouping
print("\n--Monthly Analysis:")

# extrating month name into new column
df['Month'] = df['Date'].dt.month_name()

# group by month and get the average (mean)
monthly_stats = df.groupby('Month')[['Rainfall']].mean()

print("Average Rainfall per Month:")
print(monthly_stats)



# bar chart for monthly rain
plt.figure(figsize=(10, 5))


# using .index for month names and .values for rain numbers
plt.bar(monthly_stats.index, monthly_stats['Rainfall'], color='green')
plt.title('Average Monthly Rainfall')
plt.ylabel('Rainfall (mm)')
plt.savefig('plots/monthly_rain.png')
print("Saved monthly_rain.png")
plt.close()


# exporting
print("\n--Exporting:")
# it save's the clean data to a new file
df.to_csv('cleaned_weather_data.csv', index=False)
print("Saved successfully!'cleaned_weather_data.csv'")