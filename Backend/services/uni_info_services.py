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

def format_university_sections(university_id: int):
    """
    Trả về dict gộp thông tin các section theo tiêu đề:
    {
        "id": university_id,
        "Giới thiệu": "...",
        "Tin Tức Mới Nhất": "...",
        "Thông Tin Tuyển Sinh": "...",
        "Chương Trình Đào Tạo": "...",
        "Ngành Học & Lĩnh Vực": "..."
    }
    """
    sections = get_university_sections_id(university_id)
    # Chỉ giữ lại các section có tiêu đề mong muốn
    allowed_titles = {
        "Giới thiệu",
        "Tin Tức Mới Nhất",
        "Thông Tin Tuyển Sinh",
        "Chương Trình Đào Tạo",
        "Ngành Học & Lĩnh Vực"
    }

    result = {"id": university_id}
    for section in sections:
        title = section["section_title"]
        content = section["content"]
        if title in allowed_titles:
            result[title] = content
    return result

# print(all_universities_json())

