# This is a model for the database postgres

from typing import Optional, List
# base model

class BaseModel:
    def __init__(self, id: Optional[int] = None):
        self.id = id




