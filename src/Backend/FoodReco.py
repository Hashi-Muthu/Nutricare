import pandas as pd

import sys


# Receive variables from FastAPI

gender,bmi,b_sugar,b_pressure,b_cholestrol,activity_level,food_preferences = sys.argv[1], sys.argv[2], sys.argv[3],sys.argv[4], sys.argv[5], sys.argv[6],sys.argv[7]

 
# Load data from Excel file
df = pd.read_excel('D:/nutricarenew/src/KB.xlsx')


def get_column_values(column_name):
    if column_name not in df.columns:
        return "Error: Column not found in dataframe"
    else:
        column_values = list(df[column_name])
        return column_values
    


# Filter dataframe based on user input
df_filtered = df.loc[(df['Gender'] == gender) & 
                     (df['bmi'] == bmi) & 
                     (df['Sugar'] == b_sugar) & 
                     (df['Pressure'] == b_pressure) & 
                     (df['Cholestrol'] == b_cholestrol) & 
                     (df['Activity'] == activity_level) & 
                     (df['Preferences'] == food_preferences)]
# Output category ID
if len(df_filtered) > 0:
    category_id = df_filtered.iloc[0]['Category ID']
    print(f"Category ID: {category_id}")
else:
    print("No matching category found.")
    






# Check if category_id is available
if 'category_id' in locals():
    
    def get_recommendations_for_category(category_id):
        matching_rows = df[df['Category ID'] == category_id]
        if not matching_rows.empty:
             recommendations = matching_rows['recommendation']
        for recommendation in recommendations:
            print(recommendation)
        
    get_recommendations_for_category(category_id) 
else:
    print("No category provided. Unable to get recommendations.")

