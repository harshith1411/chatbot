import openai
import psycopg2

#TODO: ADD YOUR OPEN AI API KEY HERE
openai.api_key = 'YOUR_API_KEY_GOES_HERE'

def convertToSql(userMessage, db):
    messages = [ {"role": "system", "content":
			"You are a intelligent assistant."} ]

    if db == 'MutualFunds' :
        db_promt = '''create table funds(
        scheme_name text,
        min_sip smallint,
        min_lumpsum smallint,
        expense_ratio numeric(4,2),
        fund_size_cr numeric(7,2),
        fund_age_yr smallint,
        fund_manager text,
        sortino numeric(4,2),
        alpha numeric(4,2),
        sd numeric(4,2),
        beta numeric(4,2),
        sharpe numeric(4,2),
        risk_level smallint,
        amc_name text,
        rating smallint,
        category text,
        sub_category text,
        returns_1yr numeric(5,2),
        returns_3yr numeric(5,2),
        returns_5yr numeric(5,2)
        );
        '''

    else:
        db_promt = '''create table company_data(
        company_id bigint,
        company_name text,
        company_domain text,
        year_founded numeric(5,1),
        industry text,
        size_range text,
        locality text,
        country text,
        linkedin_url text,
        current_employee_estimate bigint,
        total_employee_estimate bigint
        );

        here country names start with lowercase
        '''

    message = "I have created a postgres database table\n" + db_promt + "Now i want you to generate query for " + userMessage + "if you are ordering values always put nulls at last" + "Select only the columns which are asked, do not select entire row" + "\ndo not generate any setences apart from the query. Do not put any sentenses before the query"

    messages.append(
      {"role": "user", "content": message},
    )
    chat = openai.ChatCompletion.create(
      model="gpt-3.5-turbo", messages=messages
    )
    chatBotReply = chat.choices[0].message.content
    messages.append({"role": "assistant", "content": chatBotReply})

    return chatBotReply

def convertToEnglish(databaseResponse, userQuestion):
    messages = [ {"role": "system", "content":
			"You are a intelligent assistant."} ]


    message = '''I have entered a sql query and got a response from databas. Now i want you to convert the response into normal conversation english\n''' + f''' Here is the database response - {databaseResponse}\n''' + f''' and the question which i asked was {userQuestion} ''' + ''' Donot write additional sentenses, just convert as if it is a response. when ever there are multiple values do proper formatting '''

    messages.append(
      {"role": "user", "content": message},
    )
    chat = openai.ChatCompletion.create(
      model="gpt-3.5-turbo", messages=messages
    )

    finalChatBotReply = chat.choices[0].message.content
    messages.append({"role": "assistant", "content": finalChatBotReply})

    return finalChatBotReply


