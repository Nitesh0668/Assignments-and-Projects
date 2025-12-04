import pandas as pd
import matplotlib.pyplot as plt
import os



# object oriented modeling

class MeterReading:
    
    def __init__(self, timestamp, kwh):
        self.timestamp = timestamp
        self.kwh = kwh

class Building:
   
    def __init__(self, name):
        self.name = name
        self.readings = [] 

    def add_reading(self, reading_obj):
        self.readings.append(reading_obj)

    def calculate_total_consumption(self):
        total = 0
        for r in self.readings:
            total += r.kwh
        return total

class BuildingManager:
    
    def __init__(self):
        self.buildings = [] 

    def add_building(self, building_obj):
        self.buildings.append(building_obj)



# data ingestion and validation.


print("--Loading Data:")

all_data_list = [] 
data_folder = 'data'

# looping every file in the data folder.
for file_name in os.listdir(data_folder):
    if file_name.endswith('.csv'):
        file_path = os.path.join(data_folder, file_name)
        
        try:
            
            current_df = pd.read_csv(file_path, on_bad_lines='skip')
            
            
            building_name = file_name.replace('.csv', '')
            
            
            current_df['Building_Name'] = building_name
            
            
            all_data_list.append(current_df)
            print(f"Successfully loaded: {file_name}")
            
        except FileNotFoundError:
            print(f"Error: Could not find file {file_name}")
        except Exception as e:
            print(f"Something went wrong with {file_name}: {e}")


if len(all_data_list) > 0:
    df_combined = pd.concat(all_data_list, ignore_index=True)
else:
    print("No data found!")
    exit()


df_combined['Timestamp'] = pd.to_datetime(df_combined['Timestamp'])

print(f"Total rows loaded: {len(df_combined)}")
print("-" * 30)





# core aggregation logic.

print("--Calculating Stats:")

def calculate_daily_totals(df):
    # grouping by date and sum the kWh.
    
    df_indexed = df.set_index('Timestamp')
    daily_stats = df_indexed.resample('D')['kWh'].sum()
    return daily_stats

def building_wise_summary(df):
    # grouping by building name and getting statistics.
    summary = df.groupby('Building_Name')['kWh'].agg(['mean', 'min', 'max', 'sum'])
    return summary


daily_totals = calculate_daily_totals(df_combined)
building_stats = building_wise_summary(df_combined)

print("Building Summary:")
print(building_stats)
print("-" * 30)





# connecting oop .
# moveing data from pandas to classes.

manager = BuildingManager()


unique_names = df_combined['Building_Name'].unique()

for b_name in unique_names:
    # createing a building object
    new_building = Building(b_name)
    
    # filtering data just for this building.
    building_data = df_combined[df_combined['Building_Name'] == b_name]
    
    
    for index, row in building_data.iterrows():
        reading = MeterReading(row['Timestamp'], row['kWh'])
        new_building.add_reading(reading)
    
    
    manager.add_building(new_building)

print(f"OOP Manager now tracks {len(manager.buildings)} building objects.")





#visualization.

print("--creating dashboard:")


fig, (ax1, ax2, ax3) = plt.subplots(3, 1, figsize=(10, 15))

#ploting trend line...datily totals.
ax1.plot(daily_totals.index, daily_totals.values, color='blue', marker='o')
ax1.set_title('Total Campus Consumption (Daily)')
ax1.set_ylabel('kWh')

# ploting a bar chart....average usage per building.

buildings = building_stats.index
averages = building_stats['mean']
ax2.bar(buildings, averages, color='green')
ax2.set_title('Average Daily Usage by Building')
ax2.set_ylabel('Avg kWh')

# scatter plot (usage over time).
for b_name in unique_names:
    subset = df_combined[df_combined['Building_Name'] == b_name]
    ax3.scatter(subset['Timestamp'], subset['kWh'], label=b_name, alpha=0.6)

ax3.set_title('Consumption Events (Scatter)')
ax3.legend()

#Saveing the dashboard.
plt.tight_layout()
plt.savefig('dashboard.png')
print("Dashboard saved as 'dashboard.png'")





# export and reporting...

print("--Exporting:")

# 1. exporting cleaned csv
df_combined.to_csv('output/cleaned_energy_data.csv', index=False)

#2. exporting summary csv.
building_stats.to_csv('output/building_summary.csv')

#3. createing text report.
total_consumption = df_combined['kWh'].sum()
highest_building = building_stats['sum'].idxmax() 
peak_day = daily_totals.idxmax() 

report_content = f"""
EXECUTIVE SUMMARY REPORT
========================
Total Campus Consumption: {total_consumption} kWh
Highest Consuming Building: {highest_building}
Peak Load Date: {peak_day.date()}

Detailed trends are available in the 'dashboard.png'.
Processed data saved to 'output/' folder.
"""

# writing to txt file.
with open('output/summary.txt', 'w') as f:
    f.write(report_content)

# printing to console.
print(report_content)
print("All tasks completed...")