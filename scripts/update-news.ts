import Parser from "rss-parser";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parser = new Parser();

// Multiple RSS sources for better coverage
const RSS_URLS = [
  "https://news.google.com/rss/search?q=%E5%9B%BD%E8%80%83+%E7%9C%81%E8%80%83+%E5%85%AC%E5%8A%A1%E5%91%98&hl=zh-CN&gl=CN&ceid=CN:zh-Hans",
  "https://news.google.com/rss/search?q=%E5%85%AC%E8%80%83+%E6%8B%9B%E5%BD%95+%E6%8A%A5%E5%90%8D&hl=zh-CN&gl=CN&ceid=CN:zh-Hans",
];

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  tag: string;
  tagColor: string;
}

// Keywords that indicate the article is relevant
const RELEVANT_KEYWORDS = [
  "国考", "省考", "公务员", "招录", "报名", "公告", "笔试", "面试",
  "申论", "行测", "选调", "事业编", "事业单位", "三支一扶", "军队文职",
  "基层", "岗位", "竞争", "报录比", "分数线", "政策", "改革",
  "扩招", "缩招", "年龄", "应届", "备考", "真题", "职位",
];

// Keywords that indicate the article is an ad or irrelevant
const BLACKLIST_KEYWORDS = [
  "顶峰国际", "留学", "英联邦", "服务机构", "靠谱的", "实力参考",
  "培训机构", "辅导班", "保过", "包过", "广告", "推广",
  "高考", "专升本", "自考", "成人高考", "学历提升",
];

function isRelevant(title: string): boolean {
  // Check blacklist first
  for (const keyword of BLACKLIST_KEYWORDS) {
    if (title.includes(keyword)) return false;
  }
  // Must contain at least one relevant keyword
  for (const keyword of RELEVANT_KEYWORDS) {
    if (title.includes(keyword)) return true;
  }
  return false;
}

const TAG_MAP: Record<string, { tag: string; color: string }> = {
  "招录": { tag: "招录动态", color: "bg-red-100 text-red-700" },
  "报名": { tag: "招录动态", color: "bg-red-100 text-red-700" },
  "公告": { tag: "招录动态", color: "bg-red-100 text-red-700" },
  "政策": { tag: "政策变化", color: "bg-blue-100 text-blue-700" },
  "改革": { tag: "政策变化", color: "bg-blue-100 text-blue-700" },
  "年龄": { tag: "政策变化", color: "bg-blue-100 text-blue-700" },
  "应届": { tag: "报考指南", color: "bg-green-100 text-green-700" },
  "岗位": { tag: "选岗提示", color: "bg-purple-100 text-purple-700" },
  "职位": { tag: "选岗提示", color: "bg-purple-100 text-purple-700" },
  "竞争": { tag: "数据分析", color: "bg-orange-100 text-orange-700" },
  "报录比": { tag: "数据分析", color: "bg-orange-100 text-orange-700" },
  "分数线": { tag: "数据分析", color: "bg-orange-100 text-orange-700" },
  "备考": { tag: "备考策略", color: "bg-cyan-100 text-cyan-700" },
  "申论": { tag: "备考策略", color: "bg-cyan-100 text-cyan-700" },
  "行测": { tag: "备考策略", color: "bg-cyan-100 text-cyan-700" },
  "面试": { tag: "备考策略", color: "bg-cyan-100 text-cyan-700" },
  "真题": { tag: "备考策略", color: "bg-cyan-100 text-cyan-700" },
  "基层": { tag: "招录动态", color: "bg-red-100 text-red-700" },
  "缩招": { tag: "招录动态", color: "bg-red-100 text-red-700" },
  "扩招": { tag: "招录动态", color: "bg-red-100 text-red-700" },
  "省考": { tag: "招录动态", color: "bg-red-100 text-red-700" },
  "国考": { tag: "招录动态", color: "bg-red-100 text-red-700" },
  "选调": { tag: "招录动态", color: "bg-red-100 text-red-700" },
  "笔试": { tag: "备考策略", color: "bg-cyan-100 text-cyan-700" },
  "事业编": { tag: "招录动态", color: "bg-red-100 text-red-700" },
  "事业单位": { tag: "招录动态", color: "bg-red-100 text-red-700" },
  "三支一扶": { tag: "招录动态", color: "bg-red-100 text-red-700" },
  "军队文职": { tag: "招录动态", color: "bg-red-100 text-red-700" },
};

function guessTag(title: string): { tag: string; color: string } {
  for (const [keyword, tagInfo] of Object.entries(TAG_MAP)) {
    if (title.includes(keyword)) return tagInfo;
  }
  return { tag: "热点资讯", color: "bg-gray-100 text-gray-700" };
}

function cleanTitle(raw: string): string {
  return raw
    .replace(/\s*-\s*[^-]+$/, "") // Remove trailing " - SourceName"
    .replace(/\s*\|.*$/, "") // Remove trailing " | Source"
    .trim();
}

function cleanSummary(raw: string): string {
  return raw
    .replace(/<[^>]*>/g, "")
    .replace(/\s*[-–—]\s*[^-–—]+$/, "")
    .replace(/[\u00a0\u3000]/g, " ")
    .trim()
    .substring(0, 150);
}

async function fetchNews(): Promise<NewsItem[]> {
  const allItems: NewsItem[] = [];

  for (const url of RSS_URLS) {
    try {
      const feed = await parser.parseURL(url);
      for (const item of feed.items || []) {
        const title = cleanTitle(item.title || "");
        if (!title || title.length < 10) continue;
        if (!isRelevant(title)) continue;

        const summary = cleanSummary(item.contentSnippet || item.content || "");
        const tagInfo = guessTag(title);

        allItems.push({
          id: `n-${Date.now()}-${allItems.length}`,
          title,
          summary: summary || title,
          date: item.pubDate
            ? new Date(item.pubDate).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          source: "综合报道",
          tag: tagInfo.tag,
          tagColor: tagInfo.color,
        });
      }
    } catch (e) {
      console.error(`Failed to fetch ${url}:`, e);
    }
  }

  // Deduplicate by title
  const seen = new Set<string>();
  return allItems
    .filter((item) => {
      const normalized = item.title.toLowerCase();
      if (seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 8);
}

function generateNewsFile(items: NewsItem[]): string {
  return `export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  tag: string;
  tagColor: string;
}

export const hotNews: NewsItem[] = ${JSON.stringify(items, null, 2)};
`;
}

async function main() {
  console.log("Fetching latest civil service exam news...");
  const news = await fetchNews();
  console.log(`Fetched ${news.length} relevant news items`);

  if (news.length === 0) {
    console.log("No relevant news found, keeping existing data.");
    process.exit(0);
  }

  const outputPath = path.join(__dirname, "..", "src", "data", "news.ts");
  const content = generateNewsFile(news);
  fs.writeFileSync(outputPath, content, "utf-8");
  console.log(`Updated ${outputPath} with ${news.length} items`);
}

main().catch((err) => {
  console.error("News update failed:", err);
  process.exit(1);
});