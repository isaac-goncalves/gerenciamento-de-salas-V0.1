import sys
import psycopg2
import pandas as pd
from datetime import datetime
import time

start_time = time.time()

if len(sys.argv) < 2:
    print("Please provide the file path as an argument.")
    sys.exit(1)

# Get the file path from the command-line argument
file_path = sys.argv[1]
course_id = int(sys.argv[2])
print(course_id)
# Establish a connection to your PostgreSQL database
connection = psycopg2.connect(
    #host='localhost',
    host = '192.168.0.53',
    port='5432',
    database='gerenciamento-de-salas',
    user='postgres',
    password='2406'
)

cursor = connection.cursor()

cursor.execute("SELECT * FROM professores;")
professores = cursor.fetchall()

print(professores)

conn.close()

# Convert the fetched data into a DataFrame
columns = [desc[0] for desc in cursor.description]  # Get column names
df = pd.DataFrame(data, columns=columns)

# Path to your Excel file
excel_file = 'BASE_DADOS_ADS-1.9 copy.xlsx'

# Write the data to an Excel file
df.to_excel(excel_file, index=False)

