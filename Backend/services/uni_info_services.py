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

if __name__ == "__main__":
    # Test thử với một university_id cụ thể
    test_university_id = 1  # Thay bằng ID thực tế có trong database
    result = format_university_sections(test_university_id)
    print(result)


# print(all_universities_json())

