from fastapi import APIRouter
from app.api.v1.endpoints import chatbot, advise, quiz, uni_info

router = APIRouter()

# Thêm các router con vào router chính
router.include_router(chatbot.router, prefix="/chatbot", tags=["chatbot"]) 
router.include_router(advise.router, prefix = "/advise", tags=["advise"])
router.include_router(quiz.router, prefix = "/quiz", tags=["quiz"])
router.include_router(uni_info.router, prefix = "/uni_info", tags=["uni_info"])
