#import psycopg2
import pandas as pd

# Establish a connection to your PostgreSQL database
##connection = psycopg2.connect(
    #host='localhost',
   # port='5432',
   # database='gerenciamento-de-salas',
   # user='postgres',
   # password='2406'
#)

# Read the Excel file and specify the sheet name
dfGrade = pd.read_excel('BASE_DADOS1.2.xls', sheet_name='Final_table', usecols='B:K', skiprows=1, nrows=1000) #grade
dfDisciplinas = pd.read_excel('BASE_DADOS1.2.xls', sheet_name='Mock_Tables', usecols='B:C', skiprows=2, nrows=100) #disciplinas
dfProfessores = pd.read_excel('BASE_DADOS1.2.xls', sheet_name='Mock_Tables', usecols='E:H', skiprows=2, nrows=100) #Professores
dfLaboratorio = pd.read_excel('BASE_DADOS1.2.xls', sheet_name='Mock_Tables', usecols='J:L', skiprows=2, nrows=100) #Laboratorio
dfSemestres = pd.read_excel('BASE_DADOS1.2.xls', sheet_name='Mock_Tables', usecols='N:O', skiprows=2, nrows=20) #semestres
dfDiasSemana = pd.read_excel('BASE_DADOS1.2.xls', sheet_name='Mock_Tables', usecols='Q:R', skiprows=2, nrows=6) #dias da semana



dfGrade.columns = ['id','horario_inicio', 'horario_fim', 'dia_da_semana', 'id_professor', 'id_disciplina', 'semestre', 'id_sala', 'created_at', 'updated_at']

dfDisciplinas.columns = ['disciplina', 'id']

dfProfessores.columns = ['nome_completo','id', 'surname' ,'id_perfil_usuario']

dfLaboratorio.columns = ['descricao','id','lotacao_max']

dfSemestres.columns = ['Nome_completo', 'ID']

dfDiasSemana.columns = ['dia_da_semana','id']
                

# Access the data within the specified range
print(dfGrade)

print(dfDisciplinas)

print(dfProfessores)

print(dfLaboratorio)

print(dfSemestres)

print(dfDiasSemana)


# Create a cursor object
cursor = connection.cursor()

for index, row in df.iterrows():
    descricao = row['descricao']

    # Construct the SQL INSERT statement
    #query = f"INSERT INTO disciplinas (descricao) VALUES ('{descricao}');

    # Execute the SQL statement
    cursor.execute(query)

# Write and execute a SELECT query to fetch data from the table
#query2 = "SELECT * FROM disciplinas LIMIT 10;"  # Modify the table name as per your requirement

#cursor.execute(query2)

# Retrieve the data from the cursor
#rows = cursor.fetchall()

# Commit the changes to the database
#connection.commit()

print("Checking!")
# Print the fetched data
#for row in rows:
#   print(row)

print("FINISHED!")

# Close the cursor and the connection
#cursor.close()
#connection.close()