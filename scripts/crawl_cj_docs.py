import asyncio
from crawl4ai import *

async def main():
    urls = [
        "https://developers.cj.com/docs/rest-apis/overview",
        "https://developers.cj.com/docs/rest-apis/advertiser-lookup",
        "https://developers.cj.com/docs/rest-apis/automated-offer-feed",
        "https://developers.cj.com/docs/rest-apis/link-search",
        "https://developers.cj.com/docs/rest-apis/publisher-lookup",
        "https://developers.cj.com/docs/rest-apis/enumerations"
    ]
    
    async with AsyncWebCrawler() as crawler:
        for url in urls:
            page_name = url.split('/')[-1]
            result = await crawler.arun(url=url)
            # Save to file
            with open(f'cj_docs_{page_name}.md', 'w') as f:
                f.write(result.markdown)
            print(f"Content saved to cj_docs_{page_name}.md")

if __name__ == "__main__":
    asyncio.run(main())
