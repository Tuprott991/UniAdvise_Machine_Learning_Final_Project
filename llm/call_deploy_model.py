import requests

url = "http://103.78.3.94:8000/v1/chat/completions"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer sk-xxxx",  # token giả, vLLM không kiểm tra thật
}

prompt = input("Nhập câu hỏi: ")

payload = {
    "model": "./qwen2.5-7b-lora-ft_old",  # tên model giống như trong --model khi chạy vLLM
    "messages": [
        {"role": "user", "content": prompt},
    ],
    "max_tokens": 2000,
    "temperature": 0.3
}

response = requests.post(url, headers=headers, json=payload)

# Xuất content trả về
print(response.json()["choices"][0]["message"]["content"]) 