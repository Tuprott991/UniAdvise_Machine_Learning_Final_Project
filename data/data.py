import os
import psycopg2
from pathlib import Path

# Cấu hình kết nối PostgreSQL
conn = psycopg2.connect(
    dbname="uniML",
    user="postgres",
    password="1234",
    host="localhost",
    port=5432
)
cursor = conn.cursor()

folder_path = Path("crawl_results")
target_sections = [
    "Giới thiệu",
    "Tin Tức Mới Nhất",
    "Thông Tin Tuyển Sinh",
    "Chương Trình Đào Tạo",
    "Ngành Học & Lĩnh Vực"
]

def extract_sections(text):
    extracted = {}
    positions = {}
    for title in target_sections:
        marker = f"## {title}"
        idx = text.find(marker)
        if idx != -1:
            positions[title] = idx
    for i, title in enumerate(target_sections):
        if title not in positions:
            continue
        start = positions[title] + len(f"## {title}")
        end = len(text)
        for next_title in target_sections[i+1:]:
            if next_title in positions:
                end = positions[next_title]
                break
        extracted[title] = text[start:end].strip()
    return extracted

for md_file in sorted(folder_path.glob("crawl_*.md")):
    content = md_file.read_text(encoding="utf-8")

    # Lấy tên trường
    university_name = next(
        (L[2:].strip() for L in content.splitlines() if L.startswith("# ")),
        None
    )
    if not university_name:
        print(f"⚠️  Bỏ qua {md_file.name}: không tìm thấy tên trường")
        continue

    # 1. Kiểm tra xem đã có trường này chưa
    cursor.execute("SELECT id FROM universities WHERE name = %s", (university_name,))
    row = cursor.fetchone()
    if row:
        university_id = row[0]
    else:
        # 2. Nếu chưa có, insert và lấy id mới
        cursor.execute(
            "INSERT INTO universities (name) VALUES (%s) RETURNING id",
            (university_name,)
        )
        university_id = cursor.fetchone()[0]

    # Trích và insert từng section
    for section_title, section_body in extract_sections(content).items():
        cursor.execute(
            """
            INSERT INTO university_sections (university_id, section_title, content)
            VALUES (%s, %s, %s)
            """,
            (university_id, section_title, section_body)
        )

    print(f"✅ Đã xử lý {md_file.name}")

conn.commit()
cursor.close()
conn.close()
