import pandas as pd

# Load the data from the Excel sheet

nutrient = input("Please enter Nutrient: ")

if nutrient == "Carbohydrates":
    df = pd.read_excel('carbs_data.xlsx')   

else:
    print("Invalid nutrient entered.")

# Remove any rows with missing values


# Ask the user for any allergies
allergy_list = input('Do you have any allergies? (Separate each allergy and food to avoid with a comma, e.g. peanuts, dairy): ').split(',')

# Filter the dataframe to remove the foods with allergies
for allergy in allergy_list:
    if allergy in df['Food'].values:
        df = df[df['Food'] != allergy]

# Print the remaining foods and their carbohydrate amounts
for index, row in df.iterrows():
    print(row['Food'])
