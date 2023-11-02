import sys
import psycopg2
import pandas as pd
from datetime import datetime

# Check if the file path argument is provided
if len(sys.argv) < 2:
    print("Please provide the file path as an argument.")
    sys.exit(1)

# Get the file path from the command-line argument
file_path = sys.argv[1]

# Establish a connection to your PostgreSQL database
connection = psycopg2.connect(
    #host='localhost',
    host = '192.168.0.53',
    port='5432',
    database='gerenciamento-de-salas',
    user='postgresql',
    password='2406'
)

# Read the Excel file and specify the sheet name
dfGrade = pd.read_excel(file_path, sheet_name='Final_table', usecols='B:K', skiprows=1, nrows=1000) #grade
dfDisciplinas = pd.read_excel(file_path, sheet_name='Mock_Tables', usecols='B:C', skiprows=2, nrows=100) #disciplinas
dfProfessores = pd.read_excel(file_path, sheet_name='Mock_Tables', usecols='E:I', skiprows=2, nrows=100) #Professores
dfLaboratorio = pd.read_excel(file_path, sheet_name='Mock_Tables', usecols='K:N', skiprows=2, nrows=100) #Laboratorio
dfSemestres = pd.read_excel(file_path, sheet_name='Mock_Tables', usecols='P:Q', skiprows=2, nrows=20) #semestres
dfDiasSemana = pd.read_excel(file_path, sheet_name='Mock_Tables', usecols='S:T', skiprows=2, nrows=6) #dias da semana


dfGrade.columns = ['id','horario_inicio', 'horario_fim', 'dia_da_semana', 'id_professor', 'id_disciplina', 'semestre', 'id_sala', 'created_at', 'updated_at']

dfDisciplinas.columns = ['disciplina', 'id']

dfProfessores.columns = ['name','id', 'surname', 'email' ,'disciplina']

dfLaboratorio.columns = ['descricao', 'andar','id','capacidade']

dfSemestres.columns = ['descricao', 'ID']

dfDiasSemana.columns = ['dia_da_semana','id']
                
dfGrade.dropna(subset=['id', 'horario_inicio', 'horario_fim', 'dia_da_semana', 'id_professor', 'id_disciplina', 'semestre', 'id_sala', 'created_at', 'updated_at'], inplace=True)
dfDisciplinas.dropna(subset=['disciplina','capacidade', 'id'], inplace=True)
dfProfessores.dropna(subset=['name', 'id', 'surname','email', 'disciplina'], inplace=True)
dfLaboratorio.dropna(subset=['descricao', 'id', 'capacidade'], inplace=True)
dfSemestres.dropna(subset=['descricao', 'ID'], inplace=True)
dfDiasSemana.dropna(subset=['dia_da_semana', 'id'], inplace=True)

# Access the data within the specified range
print(dfGrade)

print(dfDisciplinas)

print(dfProfessores)

print(dfLaboratorio)

print(dfSemestres)

print(dfDiasSemana)


# Create a cursor object
cursor = connection.cursor()

#------------------- disciplinas -------------------#
queryTruncate = f"TRUNCATE disciplinas;"

cursor.execute(queryTruncate)

reset_sequence_query = "ALTER SEQUENCE disciplinas_id_seq RESTART WITH 1;" # reset id sequence
cursor.execute(reset_sequence_query)

for index, row in dfDisciplinas.iterrows():
    descricao = row['disciplina']


    # Construct the SQL INSERT statement
    query = f"INSERT INTO disciplinas (descricao) VALUES ('{descricao}');" # Modify the table name as per your requirement

    query = f"INSERT INTO disciplinas (descricao) VALUES ('{capacidade}');" # Modify the table name as per your requirement


    cursor.execute(query)

#------------------- professores -------------------#

queryTruncateProfessores = "TRUNCATE professores CASCADE;"
cursor.execute(queryTruncateProfessores)

# Reset the primary key sequence for professores table
reset_sequence_query_professores = "ALTER SEQUENCE professores_id_seq RESTART WITH 1;"
cursor.execute(reset_sequence_query_professores)

for index, row in dfProfessores.iterrows():
    name = row['name']
    surname = row['surname']
    email = row['email']
    disciplina = row['disciplina']
    created_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Current timestamp
    updated_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Current timestamp

    # Construct the SQL INSERT statement for professores
    query_professores = f"INSERT INTO professores (name, surname, email, disciplina, created_at, updated_at) VALUES ('{name}', '{surname}','{email}', {disciplina}, '{created_at}', '{updated_at}');"
    cursor.execute(query_professores)

query_set_professores_sequence = "SELECT setval('professores_id_seq', (SELECT MAX(id) FROM professores));"
cursor.execute(query_set_professores_sequence)

#------------------- laboratorios -------------------#

queryTruncateLaboratorio = "TRUNCATE laboratorios CASCADE;"
cursor.execute(queryTruncateLaboratorio)

reset_sequence_query_laboratorio = "ALTER SEQUENCE laboratorios_id_seq RESTART WITH 1;"
cursor.execute(reset_sequence_query_laboratorio)

for index, row in dfLaboratorio.iterrows():
    descricao = row['descricao']
    andar = int(row['andar'])
    capacidade = int(row['capacidade'])

    query_laboratorios = f"INSERT INTO laboratorios (descricao, andar, capacidade) VALUES ('{descricao}', '{andar}', {capacidade});"    
    cursor.execute(query_laboratorios)

#------------------- Semestres -------------------#

queryTruncateSemestres = "TRUNCATE semestres CASCADE;"
cursor.execute(queryTruncateSemestres)

reset_sequence_query_semestres = "ALTER SEQUENCE semestres_id_seq RESTART WITH 1;"
cursor.execute(reset_sequence_query_semestres)

for index, row in dfSemestres.iterrows():
    descricao = row['descricao']

    query_semestres = f"INSERT INTO semestres (descricao) VALUES ('{descricao}');"
    cursor.execute(query_semestres)

#------------------- Dias da Semana -------------------#

queryTruncateDiasSemana = "TRUNCATE dias_da_semana CASCADE;"
cursor.execute(queryTruncateDiasSemana)


reset_sequence_query_dias_da_semana = "ALTER SEQUENCE dias_da_semana_id_seq RESTART WITH 1;"
cursor.execute(reset_sequence_query_dias_da_semana)

for index, row in dfDiasSemana.iterrows():
    dia_da_semana = row['dia_da_semana']

    query_dias_da_semana = f"INSERT INTO dias_da_semana (dia_da_semana) VALUES ('{dia_da_semana}');"
    cursor.execute(query_dias_da_semana)

#------------------- grade -------------------#

queryTruncateGrade = "TRUNCATE grade CASCADE;"
cursor.execute(queryTruncateGrade)

reset_sequence_query_grade = "ALTER SEQUENCE grade_id_seq RESTART WITH 1;"
cursor.execute(reset_sequence_query_grade)

for index, row in dfGrade.iterrows():
    id = int(row['id'])
    horario_inicio = row['horario_inicio']
    horario_fim = row['horario_fim']
    dia_da_semana = row['dia_da_semana']
    id_professor = int(row['id_professor'])
    id_disciplina = int(row['id_disciplina'])
    semestre = row['semestre']
    id_sala = int(row['id_sala'])
    created_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Current timestamp
    updated_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Current timestamp

    query_grade = f"INSERT INTO grade (id, horario_inicio, horario_fim, dia_da_semana, id_professor, id_disciplina, semestre, id_sala, created_at, updated_at) VALUES ({id}, '{horario_inicio}', '{horario_fim}', '{dia_da_semana}', {id_professor}, {id_disciplina}, '{semestre}', {id_sala}, '{created_at}', '{updated_at}');"
    cursor.execute(query_grade)


#------------------- disciplinas -------------------#

#------------------- disciplinas -------------------#

# Write and execute a SELECT query to fetch data from the table
queryGetDisciplinas = "SELECT * FROM disciplinas LIMIT 100;"  # Modify the table name as per your requirement

queryGetProfessores = "SELECT * FROM professores LIMIT 100;"  # Modify the table name as per your requirement

queryGetGrade = "SELECT * FROM grade LIMIT 100;"  # Modify the table name as per your requirement

queryGetLaboratorio = "SELECT * FROM laboratorio LIMIT 100;"  # Modify the table name as per your requirement

#queryGetSemestres = "SELECT * FROM semestres LIMIT 100;"  # Modify the table name as per your requirement

queryGetDiasSemana = "SELECT * FROM dias_semana LIMIT 100;"  # Modify the table name as per your requirement



# Execute the query


cursor.execute(queryGetDisciplinas)

# Retrieve the data from the cursor
rows = cursor.fetchall()

# Commit the changes to the database
connection.commit()

print("Checking!")
# Print the fetched data
for row in rows:
   print(row)

print("FINISHED!")

# Close the cursor and the connection
cursor.close()
connection.close()