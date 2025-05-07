# Xử lý chatbot với LangChain + FastAPI
 
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from services.chatbot_services import get_answer, get_answer_stream
from database.chatbot_history import get_recent_chat_history
import logging
import json
from typing import AsyncGenerator, Dict

router = APIRouter()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ChatRequest(BaseModel):
    course_name: str
    question: str
    thread_id: str
    course_id: str

class ChatResponse(BaseModel):
    answer: str

@router.post("/chat")
async def chat(request: ChatRequest):
    try:
        logger.info(f"Received question: {request.question} for thread: {request.thread_id}")
        result = get_answer(request.question, request.thread_id)
        logger.info(f"Got result: {result}")
        
        if not isinstance(result, dict) or "output" not in result:
            raise ValueError("Invalid response format from get_answer")
            
        return ChatResponse(answer=result["output"])
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500, 
            detail=f"Internal server error: {str(e)}"
        )

async def event_generator(course_name: str, question: str, thread_id: str, course_id: str) -> AsyncGenerator[str, None]:
    try:
        async for chunk in get_answer_stream(course_name, question, thread_id, course_id):
            if chunk:  # Only yield if there's content
                yield f"data: {json.dumps({'content': chunk})}\n\n"
    except Exception as e:
        logger.error(f"Error in stream: {str(e)}", exc_info=True)
        yield f"data: {json.dumps({'error': str(e)})}\n\n"


@router.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    return StreamingResponse(
        event_generator(request.course_name, request.question, request.thread_id, request.course_id),
        media_type="text/event-stream"
    ) 

@router.get("/chat/history/{thread_id}")
def get_chat_history(thread_id: str):
    """
    Lấy lịch sử chat gần đây của một cuộc trò chuyện
    """
    try:
        history = get_recent_chat_history(thread_id)
        if not history:
            raise HTTPException(status_code=404, detail="No chat history found")
        return history
    except Exception as e:
        logger.error(f"Error fetching chat history: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))