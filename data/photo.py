import re
import json
import time
from pathlib import Path
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

BASE_DIR = Path(__file__).resolve().parent
CRAWL_DIR = BASE_DIR / "crawl_results"
OUT_FILE = BASE_DIR / "university_og_images.json"
FAILED_FILE = BASE_DIR / "failed_og_images.json"

HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
}

def find_official_website(md_text: str):
    patterns = [
        r"\*?\*?Websites?\s+[Cc]hính\s+thức(?:\s+của\s+(?:trường|[^:]+))?\*?\*?\s*:\s*<([^>]+)>",
        r"\*?\*?Websites?\s+[Cc]hính\s+thức(?:\s+của\s+(?:trường|[^:]+))?\*?\*?\s*:\s*\[[^\]]+\]\(([^)]+)\)",
        r"\*?\*?Websites?\s+[Cc]hính\s+thức(?:\s+của\s+(?:trường|[^:]+))?\*?\*?\s*:\s*(https?://[^\s)]+)",
        r"\*?\*?Websites?\s+[Cc]hính\s+thức(?:\s+của\s+(?:trường|[^:]+))?\*?\*?\s*:\s*([a-z0-9.-]+\.[a-z]{2,}[^\s)]*)",
    ]
    for pattern in patterns:
        match = re.search(pattern, md_text, re.IGNORECASE)
        if match:
            website = match.group(1).strip().rstrip(".,")
            if not website.startswith(("http://", "https://")):
                website = f"https://{website}"
            return website

    lines = md_text.splitlines()
    for idx, line in enumerate(lines):
        if re.search(r"websites?\s+chính\s+thức", line, re.IGNORECASE):
            block = "\n".join(lines[idx:idx + 5])
            match = re.search(r"<(https?://[^>]+)>|\((https?://[^)]+)\)|(https?://[^\s)]+)", block)
            if match:
                return next(group for group in match.groups() if group).strip().rstrip(".,")
    return None

def find_school_name(md_text: str):
    # lấy heading đầu tiên nếu có
    match = re.search(r"^#\s+(.+)$", md_text, re.MULTILINE)
    return match.group(1).strip() if match else None

def normalize_image_url(page_url: str, image: str):
    image = image.strip()
    urls = re.findall(r"https?://[^,\s\"')]+", image)
    if urls:
        image = urls[-1]
    return urljoin(page_url, image)

def get_site_image(url: str):
    try:
        res = requests.get(url, headers=HEADERS, timeout=15, allow_redirects=True)
        res.raise_for_status()
    except Exception:
        return None, None

    soup = BeautifulSoup(res.text, "html.parser")

    selectors = [
        ("meta", {"property": "og:image"}),
        ("meta", {"name": "og:image"}),
        ("meta", {"name": "twitter:image"}),
        ("meta", {"property": "twitter:image"}),
        ("link", {"rel": "image_src"}),
    ]

    for tag_name, attrs in selectors:
        tag = soup.find(tag_name, attrs=attrs)
        if not tag:
            continue

        image = tag.get("content") or tag.get("href")
        if image:
            return normalize_image_url(res.url, image), "opengraph"

    fallback_selectors = [
        ("link", {"rel": re.compile(r"(apple-touch-icon|icon|shortcut icon)", re.I)}),
        ("img", {"src": re.compile(r"(logo|brand|banner|thumbnail|share|social)", re.I)}),
        ("img", {"alt": re.compile(r"(logo|trường|đại học|university)", re.I)}),
    ]

    for tag_name, attrs in fallback_selectors:
        tag = soup.find(tag_name, attrs=attrs)
        if not tag:
            continue

        image = tag.get("content") or tag.get("href") or tag.get("src")
        if image and not image.startswith("data:"):
            return normalize_image_url(res.url, image), "html_fallback"

    return None, None

def is_valid_image(url: str):
    try:
        res = requests.get(url, headers=HEADERS, timeout=15, stream=True)
        content_type = res.headers.get("Content-Type", "")
        if res.status_code != 200:
            return False
        if content_type.startswith("image/"):
            return True
        return bool(re.search(r"\.(png|jpe?g|webp|gif|svg)(\?|$)", url, re.IGNORECASE))
    except Exception:
        return False

results = []
failed = []

for md_file in sorted(CRAWL_DIR.glob("*.md")):
    text = md_file.read_text(encoding="utf-8", errors="ignore")

    website = find_official_website(text)
    name = find_school_name(text)
    slug = md_file.stem

    if not website:
        failed.append({
            "file": md_file.name,
            "slug": slug,
            "name": name,
            "reason": "missing_official_website"
        })
        continue

    print(f"Processing {md_file.name}: {website}")

    image, source = get_site_image(website)

    if image and is_valid_image(image):
        results.append({
            "file": md_file.name,
            "slug": slug,
            "name": name,
            "website": website,
            "image": image,
            "source": source
        })
    else:
        failed.append({
            "file": md_file.name,
            "slug": slug,
            "name": name,
            "website": website,
            "image_candidate": image,
            "reason": "no_valid_og_image"
        })

    time.sleep(0.5)

Path(OUT_FILE).write_text(
    json.dumps(results, ensure_ascii=False, indent=2),
    encoding="utf-8"
)

Path(FAILED_FILE).write_text(
    json.dumps(failed, ensure_ascii=False, indent=2),
    encoding="utf-8"
)

print("Done")
print("Success:", len(results))
print("Failed:", len(failed))
