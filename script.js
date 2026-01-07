const rssUrl = "https://api.allorigins.win/get?url=" +
encodeURIComponent("https://feeds.feedburner.com/ndtvnews-latest");

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
