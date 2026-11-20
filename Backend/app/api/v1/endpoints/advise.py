from fastapi import APIRouter, HTTPException
from services.advise_services import generate_learning_path, recommend_career
from pydantic import BaseModel
import logging

router = APIRouter()

class ProfileRequest(BaseModel):
    user_profile: str

class PathRequest(BaseModel):
    career: str
    university: str

@router.post("/recommend_career")
def recommend_career_endpoint(request: ProfileRequest):
    result = recommend_career(request.user_profile)
    return {"career_suggestions": {"content": result.content}}

@router.post("/learning_path")
def learning_path(request: PathRequest):
    logging.info(f"Received career: {request.career}, university: {request.university}")
    result = generate_learning_path(request.career, request.university)
    return {"learning_path": {"content": result.content}}
