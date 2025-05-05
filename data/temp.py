file_path = "crawl_results/crawl_1.md"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

save_path = 'out.txt'

start_str = "## Thông Tin Tuyển Sinh"
end_str = "## Chương Trình Đào Tạo"

with open(save_path, "w", encoding="utf-8") as f:
    f.write(content[content.index(start_str) + len(start_str) : content.index(end_str)])