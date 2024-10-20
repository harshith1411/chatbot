from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import database
import api

app = FastAPI()

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MyData(BaseModel):
    userMessage: str
    database: str

@app.post('/chat')
def chat(data: MyData):
    message = data.userMessage
    db = data.database
    customReply = database.fetchInfo(message, db)
    return {'reply': customReply}