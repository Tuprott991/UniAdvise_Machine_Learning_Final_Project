import os
import json
from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
import re

# Load API key
load_dotenv()
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

# Khởi tạo LLM
llm = ChatOpenAI(temperature=0.3, model="gpt-4o-mini")  # Hoặc gpt-3.5-turbo

# Prompt template để chuyển markdown thành Q&A
qa_prompt = PromptTemplate.from_template("""
Bạn là một trợ lý AI giúp tạo dữ liệu huấn luyện LLM. Hãy đọc đoạn thông tin sau về một trường đại học và trích xuất ra các cặp "Câu hỏi - Trả lời" để huấn luyện mô hình ngôn ngữ.

Yêu cầu:
- Mỗi cặp dưới dạng: {{
    "messages": [
        {{"role": "user", "content": "Câu hỏi?"}},
        {{"role": "assistant", "content": "Câu trả lời"}}
    ]
}}
- Phải đảm bảo các cặp Q&A phải chính xác và bao gồm đầy đủ thông tin có trong đoạn văn bản và không được thêm bất kỳ thông tin nào khác.
- Đảm bảo các cặp Q&A không bị trùng lặp.
- Đảm bảo nội dung trả về đúng format JSON để có thể json.loads() được.
- Không thêm bất kỳ ký tự hoặc nội dung nào ngoài JSON.
- Nội dung:
```markdown
{md} """)

def extract_json(response):
    # Tìm phần nằm trong ```json ... ```
    match = re.search(r"```json\s*(\[.*?\])\s*```", response, re.DOTALL)
    if match:
        json_str = match.group(1)
    else:
        # Nếu không có block ```json```, thử lấy phần list JSON đầu tiên
        match = re.search(r"(\[\s*{.*?}\s*\])", response, re.DOTALL)
        if match:
            json_str = match.group(1)
        else:
            return []

    try:
        return json.loads(json_str)
    except json.JSONDecodeError as e:
        print(f"⚠️ JSON decode error: {e}")
        return []

def md_to_qa(md_content: str) -> list:
    prompt = qa_prompt.format(md=md_content)
    response = llm.predict(prompt)
    try:
        data = extract_json(response)
        return data
    except json.JSONDecodeError as e:
        print(f"⚠️ JSON decode error: {e}")
        return []

    
def generate_finetune_dataset_from_md(md_path, output_path):
    with open(md_path, "r", encoding="utf-8") as f:
        md_content = f.read()

    print(f"\n🧠 Đang xử lý file: {md_path.split('/')[-1]} ...")

    # Gọi LLM trực tiếp
    qa_pairs = md_to_qa(md_content)

    if not isinstance(qa_pairs, list):
        print("⚠️ Kết quả không phải danh sách!")
        return

    with open(output_path, "w", encoding="utf-8") as f:
        for item in qa_pairs:
            f.write(json.dumps(item, ensure_ascii=False) + "\n")

    print(f"\n✅ Dataset đã lưu tại: {output_path}")

if __name__ == "__main__":
    md_dir = "crawl_results"
    output_dir = "dataset"
    os.makedirs(output_dir, exist_ok=True)

    for filename in os.listdir(md_dir):
        if filename.endswith(".md"):
            md_path = os.path.join(md_dir, filename)
            output_path = os.path.join(output_dir, f"{filename}.jsonl")
            generate_finetune_dataset_from_md(md_path, output_path)
