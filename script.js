const rssFeeds = [
  "https://feeds.feedburner.com/ndtvnews-latest",
  "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms",
  "https://pib.gov.in/rss/AllRelease.xml"
];

async function loadRSS() {
  let headlines = "";

  for (let feed of rssFeeds) {
    try {
      const api =
        "https://api.rss2json.com/v1/api.json?rss_url=" +
        encodeURIComponent(feed);

      const res = await fetch(api);
      const data = await res.json();

      if (data.items) {
        data.items.slice(0, 4).forEach(item => {
          headlines += " 🔴 " + item.title;
        });
      }
    } catch (e) {
      console.log("RSS error:", feed);
    }
  }

  document.getElementById("newsTicker").innerText =
    headlines || "ताज़ा खबरें लोड हो रही हैं...";
}

loadRSS();
setInterval(loadRSS, 600000); // 10 minute refresh
