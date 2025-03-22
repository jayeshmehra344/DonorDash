import pickle
import pymysql
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

# Load the pre-trained models
with open("kmeans_model.pkl", "rb") as f:
    kmeans = pickle.load(f)

with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

with open("random_forest_model.pkl", "rb") as f:
    rf_model = pickle.load(f)

# Connect to MySQL Database using pymysql
conn = pymysql.connect(
    host='host',
    user='root',
    password='pass',
    database='db'
)
cursor = conn.cursor()

# Fetch user data from MySQL
def fetch_user_data():
    query = "SELECT user_id, latitude, longitude FROM users"
    cursor.execute(query)
    user_data = cursor.fetchall()
    return pd.DataFrame(user_data, columns=['user_id', 'latitude', 'longitude'])

# Process user data
def process_users(user_df):
    user_features = scaler.transform(user_df[['latitude', 'longitude']])
    user_df['user_cluster'] = kmeans.predict(user_features)
    return user_df

# Predict charity for each user
def predict_charity(user_df):
    user_clusters = user_df[['user_cluster']]
    user_df['predicted_charity'] = rf_model.predict(user_clusters)
    return user_df[['user_id', 'predicted_charity']]

# Main execution
user_df = fetch_user_data()
user_df = process_users(user_df)
predictions = predict_charity(user_df)

# Display results
print(predictions)

# Close database connection
cursor.close()
conn.close()