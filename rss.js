const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const rssUrl = "https://gamasutra.com/blogs/rss/";

function unescapeHtml(text) {
    return text.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}

var activeFilterList = new Set();

function filter(elem) {
  var value = elem.innerText;
  if (!activeFilterList.has(value))
  {
    activeFilterList.add(value);
    
    var filterClass = elem.getAttribute("class");
    filterClass = filterClass.split(" ")[1];
    var filterList = document.querySelectorAll("p." + filterClass);
    filterList.forEach((item) => {
      item.style.color = "yellow";
    });
  }
  else
  {
    activeFilterList.delete(value);
    
    var filterClass = elem.getAttribute("class");
    filterClass = filterClass.split(" ")[1];
    var filterList = document.querySelectorAll("p." + filterClass);
    filterList.forEach((item) => {
      item.style.color = "";
    });
  }
  
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
      
      let categoryListText = itemCategories.split(',');
      var catList = document.createElement('div');
      catList.setAttribute("class", "cat-list");
      categoryListText.forEach((cat) => 
      {
        var category = document.createElement('p');
        category.textContent = cat;
        let className = "category";
        category.setAttribute("class", className);
        if (cat == "Design") {
          category.setAttribute("class", className + " Cat-Des");
        }
        if (cat == "Business/Marketing") {
          category.setAttribute("class", className + " Cat-Biz");
        }
        if (cat == "Production") {
          category.setAttribute("class", className + " Cat-Prod");
        }
        if (cat == "Indie") {
          category.setAttribute("class", className + " Cat-Indie");
        }
        if (cat == "Programming") {
          category.setAttribute("class", className + " Cat-Prog");
        }
        if (cat == "Art") {
          category.setAttribute("class", className + " Cat-Art");
        }
        if (cat == "Audio") {
          category.setAttribute("class", className + " Cat-Audio");
        }
        if (cat == "Console/PC" || cat == "VR" || cat == "Social/Online" ||
            cat == "Smartphone/Tablet") {
          category.setAttribute("class", className + " Cat-Plat");
        }
        if (cat == "Serious") {
          category.setAttribute("class", className + " Cat-Serious");
        }
        catList.appendChild(category);
      });
      document.getElementById("list").appendChild(catList);
      
      let a = document.createElement('a');
      a.setAttribute("class", "link");
      a.setAttribute("href", item.querySelector('link').textContent);
      let link = unescapeHtml(titleText);
      a.textContent = link;
      
      let p = document.createElement('p');
      p.setAttribute("class", "link-line");
      p.setAttribute("style", "clear:both");
      p.appendChild(a);
      p.insertAdjacentText("beforeend", byLine);
      
      document.getElementById("list").appendChild(p);
    })
  })
});

  // .then(response => response.text())
  // .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
  // .then(data => console.log(data))
  