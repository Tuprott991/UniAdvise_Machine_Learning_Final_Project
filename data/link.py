import re

# Danh sách file cần đọc
file_names = [f"page_{i}.html" for i in range(1, 10)]

# Mẫu regex để tìm slug
pattern = r'data-university-slug="([^"]+)"'

# Danh sách lưu các URL
urls = []

for file_name in file_names:
    with open(file_name, 'r', encoding='utf-8') as file:
        content = file.read()
        slugs = re.findall(pattern, content)
        for slug in slugs:
            url = f"https://dsdaihoc.com/dai-hoc/{slug}"
            urls.append(url)

# In ra các URL
for url in urls:
    with open("urls.txt", "a", encoding="utf-8") as f:
        f.write(url + "\n")
