from transformers import AutoModelForCausalLM
from peft import PeftModel

# Load base model
base_model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2.5-7B-Instruct", trust_remote_code=True)

# Load LoRA adapter
lora_model = PeftModel.from_pretrained(base_model, "./qwen2.5-7b-lora-ft")

# Merge LoRA vào base model
merged_model = lora_model.merge_and_unload()


merged_model.save_pretrained("./qwen2.5-7b-lora-ft_merge")