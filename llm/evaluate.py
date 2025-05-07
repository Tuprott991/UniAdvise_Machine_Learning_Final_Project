import nltk
from nltk.translate.bleu_score import sentence_bleu, SmoothingFunction
from rouge_score import rouge_scorer
from datasets import load_dataset
from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

nltk.download("punkt")

# === Hàm đánh giá BLEU và ROUGE ===
def compute_bleu(reference: str, hypothesis: str) -> float:
    reference_tokens = nltk.word_tokenize(reference)
    hypothesis_tokens = nltk.word_tokenize(hypothesis)
    smoothie = SmoothingFunction().method4
    return sentence_bleu([reference_tokens], hypothesis_tokens, smoothing_function=smoothie)

def compute_rouge(reference: str, hypothesis: str) -> dict:
    scorer = rouge_scorer.RougeScorer(['rouge1', 'rouge2', 'rougeL'], use_stemmer=True)
    scores = scorer.score(reference, hypothesis)
    return {
        'rouge1': scores['rouge1'].fmeasure,
        'rouge2': scores['rouge2'].fmeasure,
        'rougeL': scores['rougeL'].fmeasure
    }

# === Cấu hình ===
model_name = "Qwen/Qwen2.5-7B-Instruct"
output_dir = "./qwen2.5-7b-lora-ft"
data_path = "vi_uni_dataset.jsonl"

# Load tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)

# Load base model và model đã fine-tune
base_model = AutoModelForCausalLM.from_pretrained(model_name, device_map="auto", trust_remote_code=True, torch_dtype=torch.float16).eval()
lora_model = PeftModel.from_pretrained(base_model, output_dir).eval()

# Load dataset
dataset = load_dataset("json", data_files=data_path)["train"]

# Hàm sinh và đánh giá
def evaluate_model(model, tokenizer, dataset, num_samples=10):
    bleu_scores = []
    rouge1_scores, rouge2_scores, rougeL_scores = [], [], []

    for i in range(num_samples):
        sample = dataset[i]
        prompt = "".join([m["content"] for m in sample["messages"] if m["role"] == "user"])
        reference = "".join([m["content"] for m in sample["messages"] if m["role"] == "assistant"])

        inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
        with torch.no_grad():
            outputs = model.generate(**inputs, max_new_tokens=128)
        generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

        bleu = compute_bleu(reference, generated_text)
        rouge = compute_rouge(reference, generated_text)

        bleu_scores.append(bleu)
        rouge1_scores.append(rouge["rouge1"])
        rouge2_scores.append(rouge["rouge2"])
        rougeL_scores.append(rouge["rougeL"])

    return {
        "BLEU": sum(bleu_scores) / len(bleu_scores),
        "ROUGE-1": sum(rouge1_scores) / len(rouge1_scores),
        "ROUGE-2": sum(rouge2_scores) / len(rouge2_scores),
        "ROUGE-L": sum(rougeL_scores) / len(rougeL_scores),
    }

# === So sánh ===
print("\n📊 Đang đánh giá base_model...")
base_results = evaluate_model(base_model, tokenizer, dataset)

print("\n📊 Đang đánh giá lora_model...")
lora_results = evaluate_model(lora_model, tokenizer, dataset)

# In kết quả
print("\n🔍 So sánh BLEU & ROUGE (10 mẫu):")
print(f"Base Model     - BLEU: {base_results['BLEU']:.4f}, ROUGE-1: {base_results['ROUGE-1']:.4f}, ROUGE-2: {base_results['ROUGE-2']:.4f}, ROUGE-L: {base_results['ROUGE-L']:.4f}")
print(f"LoRA Fine-Tuned- BLEU: {lora_results['BLEU']:.4f}, ROUGE-1: {lora_results['ROUGE-1']:.4f}, ROUGE-2: {lora_results['ROUGE-2']:.4f}, ROUGE-L: {lora_results['ROUGE-L']:.4f}")
