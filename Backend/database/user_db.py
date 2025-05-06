from dotenv import load_dotenv
from datetime import datetime
from typing import List, Dict
from database import get_db_connection
from uuid import UUID

def append_thread(user_id: int, thread_id: str) -> Dict:
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE User
                SET threads = array_append(threads, %s)
                WHERE id = %s
                RETURNING *;
                """,
                (thread_id, user_id)
            )
            result = cur.fetchone()
        conn.commit()
        return result
