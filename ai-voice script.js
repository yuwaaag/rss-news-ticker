const rssUrl =
  "https://api.allorigins.win/get?url=" +
  encodeURIComponent("https://feeds.feedburner.com/ndtvnews-latest");

async function startNews() {
  const res = await fetch(rssUrl);
  const data = await res.json();

  const parser = new DOMParser();
  const xml = parser.parseFromString(data.contents, "text/xml");
  const items = xml.querySelectorAll("item");

  let text = "";
  items.forEach((item, i) => {
    if (i < 3) {
      text += item.querySelector("title").textContent + ". ";
    }
  });

  speak(text);
}

function speak(text) {
  const msg = new SpeechSynthesisUtterance();
  msg.text = text;
  msg.lang = "hi-IN";   // Hindi voice
  msg.rate = 0.9;
  msg.pitch = 1;

  window.speechSynthesis.speak(msg);
}
