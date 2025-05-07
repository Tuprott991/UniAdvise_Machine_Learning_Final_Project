from database.uni_info_db import get_all_universities, get_university_sections_id

def all_universities_json():
    """
    Lấy thông tin tất cả các trường đại học từ database và chuyển đổi thành định dạng JSON.
    """
    universities = get_all_universities()
    universities_json = []
    for university in universities:
        university_json = {
            "id": university["id"],
            "name": university["name"]
        }
        universities_json.append(university_json)

    return universities_json

import os

file_path = 'crawl_1.md'  # Đường dẫn tới file cần cắt

if not os.path.exists(file_path):
    print(f" Không tìm thấy file: {file_path}")
else:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    cut_index = content.find("## Thẻ")
    if cut_index != -1:
        content = content[:cut_index].rstrip()

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Đã cắt nội dung từ '## Thẻ' trở xuống trong: {file_path}")
    else:
        print(f" Không tìm thấy tiêu đề '## Thẻ' trong: {file_path}")


def format_university_sections(university_id: int):
    """
    Lấy thông tin các section của trường đại học từ database và chuyển đổi thành định dạng JSON.
    """
    sections = get_university_sections_id(university_id)
    # Chuyển đổi danh sách các section thành định dạng JSON
    sections_json = []
    for section in sections:
        section_json = {
            "id": section["university_id"],
            "section": section["section_title"],
            "content": section["content"]
        }
        sections_json.append(section_json)
    return sections_json


# print(all_universities_json())

