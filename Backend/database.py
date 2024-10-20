import psycopg2
import api

def fetchInfo(message, db):

    conn = psycopg2.connect(host='localhost', dbname=db, user='postgres', password='123456', port='5432')

    cur = conn.cursor()

    sql = api.convertToSql(message, db)

    cur.execute(sql)

    answer = [()]

    for row in cur.fetchall():
        # print(f'Chatbot: {row}')
        answer.append(row)

    conn.commit()

    cur.close()
    conn.close()

    return {api.convertToEnglish(answer, message)}
    # return answer
    # return sql