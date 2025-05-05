import asyncio
from crawl4ai import *
import os

async def main():
    with open("urls.txt", "r", encoding="utf-8") as f:
        urls = [line.strip() for line in f if line.strip()]

    output_dir = "crawl_results"
    os.makedirs(output_dir, exist_ok=True)

    async with AsyncWebCrawler() as crawler:
        for i, url in enumerate(urls, start=1):
            print(f"Crawling {i}/{len(urls)}: {url}")
            try:
                result = await crawler.arun(url=url)
                output_file = os.path.join(output_dir, f"crawl_{i}.md")
                with open(output_file, "w", encoding="utf-8") as f:
                    f.write(result.markdown)
            except Exception as e:
                print(f"Lỗi khi crawl {url}: {e}")

if __name__ == "__main__":
    asyncio.run(main())
