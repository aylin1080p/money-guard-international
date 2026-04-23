import axios from "axios";

export async function fetchLatestNews(limit = 15) {
  try {
    const response = await axios.get("https://api.rss2json.com/v1/api.json?rss_url=https://cointelegraph.com/rss");
    const articles = response.data.items.slice(0, limit);
    return articles.map(article => ({
      id: article.guid,
      title: article.title,
      source: "Cointelegraph",
      url: article.link,
      published_on: article.pubDate
    }));
  } catch (err) {
    console.error("Haber verisi çekilemedi:", err);
    return [];
  }
}
