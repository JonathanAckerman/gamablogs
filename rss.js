const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const rssUrl = "https://gamasutra.com/blogs/rss/";

function unescapeHtml(text) {
    return text.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}

fetch(proxyUrl + rssUrl).then((res) => {
  res.text().then((xmlTxt) => {
    var domParser = new DOMParser();
    let doc = domParser.parseFromString(xmlTxt, 'text/xml');
    doc.querySelectorAll('item').forEach((item) => 
    {
      var fullText = item.querySelector('title').textContent;
      var byLineIndex = fullText.search(" - by ");
      var byLine = fullText.slice(byLineIndex);
      var titleText = fullText.substr(0, byLineIndex);
      var itemCategories = item.querySelector('category').textContent;
      
      let category = document.createElement('p');
      itemCategories = itemCategories.replace(/,/g, ", ");
      category.textContent = itemCategories;
      category.setAttribute("class", "category");
      document.getElementById("list").appendChild(category);
      
      let a = document.createElement('a');
      a.setAttribute("class", "link");
      a.setAttribute("href", item.querySelector('link').textContent);
      let link = unescapeHtml(titleText);
      a.textContent = link;
      
      let p = document.createElement('p');
      p.setAttribute("class", "link-line");
      p.appendChild(a);
      p.insertAdjacentText("beforeend", byLine);
      
      document.getElementById("list").appendChild(p);
    })
  })
});

  // .then(response => response.text())
  // .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
  // .then(data => console.log(data))
  