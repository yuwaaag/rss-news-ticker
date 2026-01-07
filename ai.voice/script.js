const rssFeeds = [
  "https://www.amarujala.com/rss/breaking-news.xml",
  "https://www.jagran.com/rss/breaking-news.xml",
  "https://www.livehindustan.com/rss/breaking-news.xml"
];

let lastSpoken = "";
const intervalMinutes = 5; // 5 minute baad nayi news

async function fetchRSS() {
  for (let feed of rssFeeds) {
    try {
      const res = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(feed)}`
      );
      const data = await res.json();
      const parser = new DOMParser();
      const xml = parser.parseFromString(data.contents, "text/xml");
      const item = xml.querySelector("item > title");

      if (item) {
        const title = item.textContent.trim();
        if (title !== lastSpoken) {
          speakHindi(title);
          lastSpoken = title;
        }
        break;
      }
    } catch (e) {
      console.log("RSS error", e);
    }
  }
}

function speakHindi(text) {
  const msg = new SpeechSynthesisUtterance();
  msg.text = "ताज़ा खबर। " + text;
  msg.lang = "hi-IN";
  msg.rate = 0.9;
  msg.pitch = 1;
  msg.volume = 1;

  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

document.getElementById("startBtn").onclick = () => {
  fetchRSS();
  setInterval(fetchRSS, intervalMinutes * 60 * 1000);
};
