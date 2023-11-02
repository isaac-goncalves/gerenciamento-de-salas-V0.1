import psycopg2

# Estabeleça uma conexão com o banco de dados
connection = psycopg2.connect(
    host='192.168.0.53',
    port='5432',
    database='gerenciamento-de-salas',
    user='postgres',
    password='2406'
)

# Crie um cursor para executar consultas SQL
cursor = connection.cursor()

# Tabelas a serem limpas e reinicializadas
tables_to_reset = ["disciplinas", "professores", "semestres", "dias_da_semana", "grade"]

try:
    for table in tables_to_reset:
        # Exclua todos os dados da tabela
        delete_query = f"DELETE FROM {table};"
        cursor.execute(delete_query)

        # Reinicie a sequência da tabela para o valor inicial (1)
        reset_sequence_query = f"ALTER SEQUENCE {table}_id_seq RESTART WITH 1;"
        cursor.execute(reset_sequence_query)

    # Faça commit das alterações no banco de dados
    connection.commit()
    print("Tabelas limpas e sequências reinicializadas com sucesso.")

except (Exception, psycopg2.Error) as error:
    print("Erro ao limpar tabelas e reiniciar sequências:", error)

finally:
    # Feche o cursor e a conexão com o banco de dados
    if cursor:
        cursor.close()
    if connection:
        connection.close()