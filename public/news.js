async function getNews() {
  const Url = "http://localhost:8000";
  const newsList = document.querySelector(".news-list");
  const data = await fetch(`${Url}/news`).then((response) => response.json());
  const newsItems = data.length
    ? data.reduce(
        (acc, article) =>
          (acc += `
        <div class="news-item">
          <img src="news-image.png" alt="news image" class="article-image">
          <div class="news-content">
            <h3 class="news-title">${article.title}</h3>
            <p class="news-text">${article.postText}</p>
          </div>
        </div>
`),
        ""
      )
    : `<h5>No news yet...</h5>`;

  newsList.innerHTML = newsItems;
}

getNews();