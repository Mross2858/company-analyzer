from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os
import anthropic
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    system: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    error: Optional[str] = None

@router.post("/chat", response_model=ChatResponse)
async def chat_with_claude(request: ChatRequest):
    try:
        client = anthropic.Client(api_key=os.getenv("ANTHROPIC_API_KEY"))
        
        # Convert messages to Claude's format
        formatted_messages = [
            {"role": msg.role, "content": msg.content}
            for msg in request.messages
        ]
        
        # Create the chat completion
        response = client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=4096,
            messages=formatted_messages,
            system=request.system if request.system else "You are a helpful AI assistant focused on analyzing company data and providing business insights."
        )
        
        return ChatResponse(response=response.content[0].text)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
