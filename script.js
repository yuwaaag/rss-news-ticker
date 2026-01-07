const rssFeeds = [
  "https://pib.gov.in/rss/AllRelease.xml",
  "https://feeds.feedburner.com/ndtvnews-latest",
  "https://www.reutersagency.com/feed/?taxonomy=best-topics&post_type=best"
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
