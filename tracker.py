# Name: Nitesh Kadian
# Date: october 6, 2025
# Project title: daily_calorie_tracker

# importing the datetime for the bonus file-saving
import datetime

# Print a simple welcome message
print("---")
print("Welcome to the daily calorie tracker")
print("---")
print("This is a tool that helps to log meals and calories.")
print("\n")


# i nput & data collection

meal_names = []
calorie_amounts = []

# asking for the number of meals and converting them to an integer
num_meals_input = input("How many meals would you like to log? ")
number_of_meals = int(num_meals_input)

# loop for the details for meal
for i in range(number_of_meals):
    print(f" Entering Meal #{i+1} ")
    name = input("Enter the meal name (e.g., Breakfast): ")
    calories_input = input(f"Enter the calories for {name}: ")
    
    # adding the user's input to our lists
    meal_names.append(name)
    calorie_amounts.append(float(calories_input))


# calculations

# calculating the total calories using the sum() function
total_calories = sum(calorie_amounts)

# calculating the average calories per meal
# checking if meals are entered to avoid dividing by zero

if number_of_meals > 0:
    average_calories = total_calories/number_of_meals
else:
    average_calories = 0

# getting the user daily calorie limi

daily_limit_input = input("\nWhat is your daily calorie limit? ")
daily_limit = float(daily_limit_input)

print(" Daily Summary Report ")

# printing the table header
print(f"{'Meal Name':<20} Calories")

# looping the lists and print each meal
for i in range(len(meal_names)):
    print(f"{meal_names[i]:<20} {calorie_amounts[i]}")

# pinting the total and average values, formatted to 2 decimal places
print(f"{'Total:':<20} {total_calories:.2f}")
print(f"{'Average per meal:':<20} {average_calories:.2f}")


# using if,else statement to compare total against the limit
print("\n--- Final Status ---")
if total_calories > daily_limit:
    print("Warning: You are OVER your daily calorie limit.")
else:
    print("Success: You are WITHIN your daily calorie limit.")
    

print("\n")
save_report = input("Would you like to save this report to a file? (yes/no): ")

# checking if the user response is yes
if save_report.lower() == 'yes':
    # opening clorie_log.txt in write modee
    with open("calorie_log.txt", "w") as file:
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        file.write(f"Calorie Log generated on: {timestamp}\n")
        file.write("--------------------------------\n")
        
        # writing each meal to the file
        for i in range(len(meal_names)):
            file.write(f"- {meal_names[i]}: {calorie_amounts[i]} calories\n")
            
        file.write("--------------------------------\n")
        file.write(f"Total Calories: {total_calories:.2f}\n")
        file.write(f"Daily Limit: {daily_limit}\n")
    
    print("Report was saved to calorie_log.txt")
else:
    print("Report was not saved.")