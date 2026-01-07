const rssFeeds = [
  "https://www.amarujala.com/rss/breaking-news.xml",
  "https://www.jagran.com/rss/breaking-news.xml",
  "https://www.livehindustan.com/rss/breaking-news.xml"
];

async function loadRSS() {
  try {
    const res = await fetch(rssUrl);
    const data = await res.json();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "text/xml");

    const items = xml.querySelectorAll("item");
    let headlines = "";

    items.forEach((item, index) => {
      if (index < 10) {
        headlines += " 🔴 " + item.querySelector("title").textContent;
      }
    });

    document.getElementById("newsTicker").innerText = headlines;
  } catch (e) {
    document.getElementById("newsTicker").innerText =
      "Breaking News Updating...";
  }
}

loadRSS();
setInterval(loadRSS, 300000); // 5 minutes auto refresh
