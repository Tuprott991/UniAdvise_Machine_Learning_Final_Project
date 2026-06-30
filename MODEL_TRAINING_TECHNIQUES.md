# Ky thuat train model Qwen2.5-7B cho chatbot tu van dai hoc

> Ghi chu: Trong README project co ghi "Gwen2.5-7B", nhung script training dang su dung model Hugging Face `Qwen/Qwen2.5-7B-Instruct`. Tai lieu nay dua tren cac file trong thu muc `llm/`, dac biet la `llm/finetune_qwen25_7b_lora.py`.

## 1. Mo hinh nen

- Model goc: `Qwen/Qwen2.5-7B-Instruct`.
- Day la instruction-tuned LLM, phu hop voi chatbot hoi dap vi da duoc huan luyen san de lam theo chi dan va tra loi theo ngu canh hoi thoai.
- Project khong train model tu dau, ma fine-tune tiep tren model nen da co san.

## 2. Supervised Fine-Tuning (SFT)

Project su dung Supervised Fine-Tuning de day model tra loi cac cau hoi ve truong dai hoc Viet Nam.

- Du lieu training o dang cap hoi dap.
- Moi mau du lieu co format `messages`, gom:
  - `role: user`: cau hoi cua nguoi dung.
  - `role: assistant`: cau tra loi mong muon.
- Script training dung `SFTTrainer` tu thu vien `trl`.
- Muc tieu la giup model bat chuoc cach tra loi trong dataset da chuan bi.

File lien quan:

- `llm/finetune_qwen25_7b_lora.py`
- `llm/vi_uni_dataset.jsonl`

## 3. LoRA fine-tuning

Project su dung LoRA thong qua thu vien `peft` de fine-tune model 7B hieu qua hon.

LoRA giup:

- Giam so tham so can train.
- Giam VRAM can thiet so voi full fine-tuning.
- Giu nguyen phan lon trong so cua base model.
- Chi hoc them cac adapter nho gan vao mot so layer cua model.

Cau hinh LoRA trong project:

```python
LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.CAUSAL_LM
)
```

Y nghia cac tham so chinh:

- `r=16`: rank cua LoRA adapter, anh huong den do lon va kha nang hoc cua adapter.
- `lora_alpha=32`: he so scale cho LoRA.
- `target_modules=["q_proj", "v_proj"]`: chi gan LoRA vao query projection va value projection trong attention.
- `lora_dropout=0.05`: dropout nhe de giam overfitting.
- `bias="none"`: khong train bias.
- `TaskType.CAUSAL_LM`: bai toan sinh ngon ngu tu trai sang phai.

## 4. Completion-only training

Project su dung `DataCollatorForCompletionOnlyLM` voi `response_template="<|im_start|>assistant"`.

Ky thuat nay giup model chi tinh loss tren phan cau tra loi cua assistant, thay vi bat model hoc lai toan bo prompt cua user.

Loi ich:

- Tap trung training vao cach model tra loi.
- Giam viec model hoc nhai cau hoi nguoi dung.
- Phu hop voi instruction/chat fine-tuning.

## 5. Chat template theo format Qwen

Du lieu duoc format theo dang hoi thoai cua Qwen:

```text
<|im_start|>user
{question}<|im_end|>
<|im_start|>assistant
{answer}<|im_end|>
```

Viec dung dung chat template giup model nhan biet ro vai tro `user` va `assistant`, dong thoi phu hop voi format ma Qwen Instruct da duoc train truoc do.

## 6. Chuan bi dataset tu du lieu crawl

Pipeline du lieu cua project gom cac buoc:

1. Crawl thong tin tu website cac truong dai hoc.
2. Luu noi dung crawl thanh cac file Markdown trong `crawl_results`.
3. Dung LLM `gpt-4o-mini` de chuyen Markdown thanh cac cap cau hoi - cau tra loi.
4. Luu tung file thanh JSONL trong thu muc `dataset`.
5. Gop cac file JSONL thanh mot dataset dung cho fine-tuning.

File lien quan:

- `llm/prepare_dataset.py`
- `llm/merge_dataset.py`
- `llm/crawl_results/`
- `llm/dataset/`

Prompt tao dataset yeu cau:

- Cau tra loi phai dua tren noi dung Markdown.
- Khong them thong tin ngoai nguon.
- Khong tao cap Q&A trung lap.
- Output phai dung JSON de co the parse bang `json.loads()`.

## 7. Mixed precision va toi uu bo nho

Project su dung mot so ky thuat toi uu de train model 7B tren GPU:

- `torch_dtype=torch.float16` khi load model.
- `bf16=True` trong `TrainingArguments`.
- `device_map="auto"` de tu dong phan bo model len GPU kha dung.
- `gradient_checkpointing_enable()` de giam VRAM bang cach tinh lai mot phan activation khi backward.
- `gradient_accumulation_steps=2` de tang effective batch size ma khong can tang batch size tren GPU.

## 8. FlashAttention 2

Script load model voi:

```python
attn_implementation="flash_attention_2"
```

FlashAttention 2 giup tang toc attention va giam bo nho khi train/inference tren GPU ho tro. Day la toi uu quan trong khi fine-tune model co kich thuoc 7B.

## 9. Thiet lap hyperparameter training

Training config trong project:

```python
TrainingArguments(
    per_device_train_batch_size=6,
    gradient_accumulation_steps=2,
    learning_rate=1e-5,
    num_train_epochs=7,
    warmup_steps=50,
    logging_steps=10,
    save_steps=200,
    save_total_limit=2,
    output_dir="./qwen2.5-7b-lora-ft",
    bf16=True,
    report_to="none",
    label_names=["labels"]
)
```

Tom tat:

- Batch size moi GPU: `6`.
- Gradient accumulation: `2`.
- Effective batch size: khoang `12` mau moi buoc update neu dung 1 GPU.
- Learning rate: `1e-5`, kha nho va an toan cho fine-tuning LLM.
- So epoch: `7`.
- Warmup: `50` steps.
- Luu checkpoint moi `200` steps.
- Chi giu toi da `2` checkpoint gan nhat.

## 10. Danh gia bang Perplexity

Trong script fine-tune, project tinh perplexity tren 10 mau truoc va sau fine-tuning.

Perplexity cho biet model du doan cau tra loi tot den muc nao:

- Perplexity cang thap thi model cang tu tin va phu hop hon voi du lieu tham chieu.
- So sanh truoc/sau fine-tune giup kiem tra adapter LoRA co hoc duoc domain dai hoc hay khong.

File lien quan:

- `llm/finetune_qwen25_7b_lora.py`

## 11. Danh gia bang BLEU va ROUGE

Project co file `llm/evaluate.py` de so sanh base model va LoRA fine-tuned model tren 10 mau.

Metric duoc dung:

- BLEU: do muc trung khop token/ngram voi cau tra loi tham chieu.
- ROUGE-1: trung khop unigram.
- ROUGE-2: trung khop bigram.
- ROUGE-L: do trung khop theo longest common subsequence.

Day la cac metric tham khao de do do gan cua output model voi dap an trong dataset. Voi chatbot tu van, ngoai BLEU/ROUGE van nen danh gia them bang human evaluation vi mot cau tra loi dung co the khac cach dien dat voi reference.

## 12. Merge LoRA adapter vao base model

Sau khi fine-tune, project co script merge adapter LoRA vao model goc:

- Load base model `Qwen/Qwen2.5-7B-Instruct`.
- Load LoRA adapter tu `./qwen2.5-7b-lora-ft`.
- Goi `merge_and_unload()`.
- Luu model da merge vao `./qwen2.5-7b-lora-ft_merge`.

File lien quan:

- `llm/merge_lora.py`

Merge LoRA giup viec deploy/inference don gian hon vi khong can load rieng adapter.

## 13. RAG va deploy sau fine-tuning

RAG khong phai la ky thuat train model, nhung la thanh phan lien quan den chatbot trong project.

Project co su dung LightRAG:

- Tao knowledge base tu `uni_data.txt`.
- Dung OpenAI embedding.
- Luu tru bang PostgreSQL, graph storage va vector storage.
- Ho tro truy xuat thong tin truoc khi tra loi.

Vai tro cua RAG:

- Bo sung thong tin moi/chi tiet ma model fine-tune co the khong ghi nho.
- Giam hallucination khi tra loi ve thong tin truong, nganh, diem chuan.
- Phu hop voi du lieu tuyen sinh thay doi theo thoi gian.

File lien quan:

- `llm/rag_db_init.py`
- `Backend/utils/lightrag_functions.py`
- `Backend/services/chatbot_services.py`

Project README cung de cap deploy model bang vLLM tren GPU server de phuc vu inference nhanh cho chatbot.

## 14. Tom tat cac ky thuat da su dung

| Nhom ky thuat | Ky thuat cu the | Muc dich |
| --- | --- | --- |
| Base model | Qwen2.5-7B-Instruct | Lam nen tang chatbot instruction-following |
| Fine-tuning | Supervised Fine-Tuning | Hoc cach tra loi theo dataset Q&A |
| Parameter-efficient tuning | LoRA/PEFT | Giam VRAM va chi phi train |
| Loss masking | Completion-only LM | Chi train tren phan assistant answer |
| Data format | Qwen chat template | Giu dung format hoi thoai cua model |
| Data generation | GPT-4o-mini tao Q&A tu Markdown | Chuyen du lieu crawl thanh dataset fine-tune |
| Data pipeline | JSONL messages, merge dataset | Tao du lieu training hop le cho Hugging Face |
| Memory optimization | fp16, bf16, gradient checkpointing | Train model 7B tiet kiem bo nho |
| Training stability | warmup, learning rate nho, dropout | Giam rui ro unstable va overfitting |
| Speed optimization | FlashAttention 2 | Tang toc attention va giam VRAM |
| Evaluation | Perplexity, BLEU, ROUGE | So sanh truoc/sau fine-tune |
| Deployment prep | Merge LoRA adapter | Don gian hoa inference/deploy |
| Runtime augmentation | LightRAG | Truy xuat tri thuc moi khi chatbot tra loi |

## 15. Nhan xet va huong cai thien

Mot so cai thien co the can nhac:

- Tach train/validation/test split thay vi danh gia tren chinh cac mau training.
- Tang so mau evaluation de metric on dinh hon.
- Bo sung human evaluation cho tinh dung, tinh day du va do huu ich cua cau tra loi.
- Them instruction/system prompt thong nhat ve vai tro chatbot tu van dai hoc.
- Can nhac fine-tune them `k_proj`, `o_proj`, `gate_proj`, `up_proj`, `down_proj` neu co du VRAM va dataset lon hon.
- Chuan hoa dataset de tranh cau tra loi qua dai, trung lap hoac dua thong tin da loi thoi.
- Ket hop fine-tuned model voi RAG trong inference de tra loi thong tin tuyen sinh cap nhat hon.
