import os
import torch
import math
from datasets import load_dataset
from transformers import (
    AutoTokenizer, AutoModelForCausalLM,
    TrainingArguments
)
from peft import LoraConfig, get_peft_model, TaskType
from trl import SFTTrainer, DataCollatorForCompletionOnlyLM


def format_chat_example(example):
    messages = example["messages"]
    user = next((m["content"] for m in messages if m["role"] == "user"), "")
    assistant = next((m["content"] for m in messages if m["role"] == "assistant"), "")
    return {
        "prompt": f"<|im_start|>user\n{user}<|im_end|>\n<|im_start|>assistant\n",
        "response": assistant + "<|im_end|>"
    }


def compute_perplexity(model, tokenizer, prompt, answer):
    input_text = prompt + answer
    inputs = tokenizer(input_text, return_tensors="pt").to(model.device)
    with torch.no_grad():
        outputs = model(**inputs, labels=inputs["input_ids"])
    loss = outputs.loss.item()
    return math.exp(loss)


def main():
    model_name = "Qwen/Qwen2.5-3B-Instruct"
    data_path = "vi_uni_dataset.jsonl"
    output_dir = "./qwen2.5-3b-lora-ft"

    # Load tokenizer and model
    tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        device_map="auto",
        torch_dtype=torch.float16,
        trust_remote_code=True
    )
    model.gradient_checkpointing_enable()

    # Apply LoRA
    lora_config = LoraConfig(
        r=16,
        lora_alpha=32,
        target_modules=["q_proj", "v_proj"],
        lora_dropout=0.05,
        bias="none",
        task_type=TaskType.CAUSAL_LM
    )
    model = get_peft_model(model, lora_config)
    model.print_trainable_parameters()

    # Load and format dataset
    dataset = load_dataset("json", data_files=data_path)["train"]
    formatted_dataset = dataset.map(format_chat_example)

    # Training arguments
    training_args = TrainingArguments(
        per_device_train_batch_size=2,
        gradient_accumulation_steps=4,
        learning_rate=2e-5,
        num_train_epochs=5,
        warmup_steps=50,
        logging_steps=10,
        save_steps=200,
        save_total_limit=2,
        output_dir=output_dir,
        bf16=True,
        report_to="none"
    )

    data_collator = DataCollatorForCompletionOnlyLM(
        tokenizer=tokenizer,
        response_template="<|im_start|>assistant"
    )

    trainer = SFTTrainer(
        model=model,
        train_dataset=formatted_dataset,
        args=training_args,
        data_collator=data_collator,
        max_seq_length=1024
    )

    trainer.train()

    # Save fine-tuned model and tokenizer
    model.save_pretrained(output_dir)
    tokenizer.save_pretrained(output_dir)

    # Evaluate on some samples
    print("\n🔎 Perplexity Evaluation on 5 Samples:")
    for i in range(5):
        sample = formatted_dataset[i]
        ppl = compute_perplexity(model, tokenizer, sample["prompt"], sample["response"])
        print(f"Sample {i+1} - PPL: {ppl:.2f}")


if __name__ == "__main__":
    main()