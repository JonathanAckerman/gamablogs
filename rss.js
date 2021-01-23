const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const rssUrl = "https://gamasutra.com/blogs/rss/";

fetch(proxyUrl + rssUrl).then((res) => {
  res.text().then((xmlTxt) => {
    var domParser = new DOMParser();
    let doc = domParser.parseFromString(xmlTxt, 'text/xml');
    doc.querySelectorAll('item').forEach((item) => {

      console.log(item);
      
      var fullText = item.querySelector('title').textContent;
      var byLineIndex = fullText.search(" - by ");
      var byLine = fullText.slice(byLineIndex);
      var titleText = fullText.substr(0, byLineIndex);
      var itemCategories = item.querySelector('category').textContent;
      
      let category = document.createElement('p');
      category.textContent = itemCategories;
      document.getElementById("list").appendChild(category);
      
      let a = document.createElement('a');
      a.setAttribute("href", item.querySelector('link').textContent);
      a.textContent = titleText;
      
      let p = document.createElement('p');
      p.appendChild(a);
      p.insertAdjacentText("beforeend", byLine);
      
      document.getElementById("list").appendChild(p);
    })
  })
});

  // .then(response => response.text())
  // .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
  // .then(data => console.log(data))
  