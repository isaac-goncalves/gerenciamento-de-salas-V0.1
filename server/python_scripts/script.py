import sys
import psycopg2
import pandas as pd
from datetime import datetime
import time

start_time = time.time()


# Check if the file path argument is provided
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

def deleteBasedOnID(tableName, course_id):
    try:
        query = "DELETE FROM " + tableName + " WHERE course_id = %s"
        cursor.execute(query, (int(course_id),))
        connection.commit()
        count = cursor.rowcount
        #print in red color 
        print("\033[91m {}\033[00m" .format(count), "Record deleted FROM " + tableName + " successfully ")
    except (Exception, psycopg2.Error) as error:
        print("Error in Delete operation", error)
    

# Local Database
# connection = psycopg2.connect(
#     host='sgsa05database.postgres.database.azure.com',
#     port='5432',
#     database='gerenciamento_de_salas',
#     user='sgsaadmin@sgsa05database',
#     password='I17092004c.'
# )

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

dfLaboratorio.columns = ['descricao','andar','id','capacidade']

dfSemestres.columns = ['descricao', 'ID']

dfDiasSemana.columns = ['dia_da_semana','id']
                
# dfGrade.dropna(subset=['id', 'horario_inicio', 'horario_fim', 'dia_da_semana', 'id_professor', 'id_disciplina', 'semestre', 'id_sala', 'created_at', 'updated_at'], inplace=True)
# dfDisciplinas.dropna(subset=['disciplina', 'id'], inplace=True)
# dfProfessores.dropna(subset=['name', 'id', 'surname','email', 'disciplina'], inplace=True)
# dfLaboratorio.dropna(subset=['descricao', 'id', 'capacidade'], inplace=True)
# dfSemestres.dropna(subset=['descricao', 'ID'], inplace=True)
# dfDiasSemana.dropna(subset=['dia_da_semana', 'id'], inplace=True)

dataframes = [dfGrade, dfDisciplinas, dfProfessores, dfLaboratorio, dfSemestres, dfDiasSemana]
for df in dataframes:
    df.dropna(inplace=True)

# Access the data within the specified range
# print(dfGrade)

# print(dfDisciplinas)

# print(dfProfessores)

# print(dfLaboratorio)

# print(dfSemestres)

# print(dfDiasSemana)


# Create a cursor object
cursor = connection.cursor()

#------------------- agendamentos -------------------#

queryTruncateAgendamento = "TRUNCATE agendamento;"
cursor.execute(queryTruncateAgendamento)

#------------------- disciplinas -------------------#
#queryTruncate = f"TRUNCATE disciplinas;"
#cursor.execute(queryTruncate)

cursor.execute("SELECT MAX(id) FROM disciplinas;")

lastDisciplinaId = cursor.fetchone()[0]

if lastDisciplinaId is None:
    lastDisciplinaId = 0

print(
    "\033[92m {}\033[00m" .format(lastDisciplinaId), "Last disciplina id"
)

deleteBasedOnID("disciplinas", course_id)
# reset id sequence

for index, row in dfDisciplinas.iterrows():
    descricao = row['disciplina'],
    course_id_data = int(course_id)
    query = f"INSERT INTO disciplinas (descricao, course_id) VALUES (%s, %s);" # Modify the table name as per your requirement

    data = (descricao, course_id_data)

    cursor.execute(query, data) 


#------------------- professores -------------------#

cursor.execute("SELECT MAX(id) FROM professores;")

lastProfessorId = cursor.fetchone()[0]
if lastProfessorId is None:
    lastProfessorId = 0

print(
    "\033[92m {}\033[00m" .format(lastProfessorId), "Last professor id"
)

deleteBasedOnID("professores", course_id)

for index, row in dfProfessores.iterrows():
    name = row['name']
    surname = row['surname']
    email = row['email']
    disciplina = row['disciplina']
    created_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Current timestamp
    updated_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Current timestamp

    # Construct the SQL INSERT statement for professores
    query_professores = f"INSERT INTO professores (course_id, name, surname, email, disciplina, created_at, updated_at) VALUES ('{course_id}','{name}', '{surname}','{email}', {disciplina}, '{created_at}', '{updated_at}');"
    cursor.execute(query_professores)

# query_set_professores_sequence = "SELECT setval('professores_id_seq', (SELECT MAX(id) FROM professores));"
# cursor.execute(query_set_professores_sequence)

#------------------- laboratorios -------------------#

# deleteBasedOnID("laboratorios", course_id)

for index, row in dfLaboratorio.iterrows():
    descricao = row['descricao']
    andar = int(row['andar'])
    capacidade = int(row['capacidade'])
    numero_sala = index + 1  # Calculate the numero_sala

    # Check if the record with the same numero_sala exists
    check_query = f"SELECT * FROM laboratorios WHERE numero_sala = {numero_sala};"
    cursor.execute(check_query)
    existing_record = cursor.fetchone()

    if existing_record:
        # Update the existing record if it exists
        update_query = f"UPDATE laboratorios SET descricao = '{descricao}', andar = {andar}, capacidade = {capacidade} WHERE numero_sala = {numero_sala};"
        cursor.execute(update_query)
    else:
        # Insert a new record if it doesn't exist
        insert_query = f"INSERT INTO laboratorios (numero_sala, descricao, andar, capacidade) VALUES ({numero_sala}, '{descricao}', {andar}, {capacidade});"
        cursor.execute(insert_query)

# Commit the changes to the database
connection.commit()

#------------------- Semestres -------------------#

deleteBasedOnID("semestres", course_id)

for index, row in dfSemestres.iterrows():
    descricao = row['descricao']

    query_semestres = f"INSERT INTO semestres (course_id, descricao) VALUES ('{course_id}','{descricao}');"
    cursor.execute(query_semestres)

#------------------- Dias da Semana -------------------#

deleteBasedOnID("dias_da_semana", course_id)

# reset_sequence_query_dias_da_semana = "ALTER SEQUENCE dias_da_semana_id_seq RESTART WITH 1;"
# cursor.execute(reset_sequence_query_dias_da_semana)

for index, row in dfDiasSemana.iterrows():
    dia_da_semana = row['dia_da_semana']

    query_dias_da_semana = f"INSERT INTO dias_da_semana (course_id, dia_da_semana) VALUES ('{course_id}', '{dia_da_semana}');"
    cursor.execute(query_dias_da_semana)

#------------------- grade -------------------#

# queryTruncateGrade = "TRUNCATE grade CASCADE;"
# cursor.execute(queryTruncateGrade)

deleteBasedOnID("grade", course_id)

# reset_sequence_query_grade = "ALTER SEQUENCE grade_id_seq RESTART WITH 1;"
# cursor.execute(reset_sequence_query_grade)

# lastProfessorId = cursor.execute("SELECT MAX(id) FROM professores;")

for index, row in dfGrade.iterrows():
    course_id_data = int(course_id)
    horario_inicio = row['horario_inicio']
    grade_id = int(row['id'])
    horario_fim = row['horario_fim']
    dia_da_semana = row['dia_da_semana']
    id_professor = int(row['id_professor'])
    id_disciplina = int(row['id_disciplina'])
    semestre = row['semestre']
    id_sala = int(row['id_sala'])
    created_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Current timestamp
    updated_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Current timestamp
    
    query_grade = "INSERT INTO grade (grade_id, horario_inicio, horario_fim, dia_da_semana, id_professor, id_disciplina, course_id, semestre, id_sala, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);" # Modify the table name as per your requirement
    
    data = (grade_id, horario_inicio, horario_fim, dia_da_semana, id_professor + lastProfessorId, id_disciplina + lastDisciplinaId, course_id_data, semestre, id_sala, created_at, updated_at)
    
    cursor.execute(query_grade, data)
    
    # print(course_id)

#------------------- disciplinas -------------------#

#------------------- disciplinas -------------------#

# Write and execute a SELECT query to fetch data from the table
queryGetDisciplinas = "SELECT * FROM disciplinas LIMIT 100;"  # Modify the table name as per your requirement

queryGetProfessores = "SELECT * FROM professores LIMIT 100;"  # Modify the table name as per your requirement

queryGetGrade = "SELECT * FROM grade LIMIT 100000;"  # Modify the table name as per your requirement

queryGetLaboratorio = "SELECT * FROM laboratorio LIMIT 100;"  # Modify the table name as per your requirement

#queryGetSemestres = "SELECT * FROM semestres LIMIT 100;"  # Modify the table name as per your requirement

queryGetDiasSemana = "SELECT * FROM dias_semana LIMIT 100;"  # Modify the table name as per your requirement


# Execute the query

cursor.execute(queryGetGrade)

# Retrieve the data from the cursor
rows = cursor.fetchall()

# Commit the changes to the database
connection.commit()

print("Checking!")
# Print the fetched data
# for row in rows:
#    print(row)

# print("Rows: ", len(rows))
#print in green 
print("\033[92m {}\033[00m" .format(len(rows)), "Records inserted successfully into grade table")


end_time = time.time()
elapsed_time = end_time - start_time
print(f"Execution time: {elapsed_time} seconds")

# Close the cursor and the connection
cursor.close()
connection.close()



