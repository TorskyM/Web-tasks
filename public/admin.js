const Url = "http://localhost:8000";
const addNewsButton = document.querySelector("#add-news-button");
const newsTab = document.querySelector("#news-tab");
const adminTab = document.querySelector("#admin-tab");
const newsTitle = document.querySelector(".news-text-title");
const newsText = document.querySelector(".news-text-content");
const wrapper = document.querySelector(".news-wrapper");
const titleErrorAnchor = document.querySelector(".error-message-title");
const contentErrorAnchor = document.querySelector(".error-message-content");
const newsArticle = document.querySelector(".news-atricle");
const adminArticle = document.querySelector(".admin-atricle");
const newsList = document.querySelector(".news-list");

const createNews = document.createElement("div");
const titleErrorMessage = document.createElement("p");
const contentErrorMessage = document.createElement("p");
const notification = document.createElement("p");

addNewsButton.addEventListener("click", clickHanler);
newsTab.addEventListener("click", setNewsTabHandler);
adminTab.addEventListener("click", setAdminTabHandler);

async function getNews() {
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

function setNewsTabHandler() {
  newsArticle.style.display = "flex";
  adminArticle.style.display = "none";
  adminTab.className = "navigation-option";
  newsTab.className = "navigation-option selected";
}

function setAdminTabHandler() {
  adminArticle.style.display = "block";
  newsArticle.style.display = "none";
  newsTab.className = "navigation-option";
  adminTab.className = "navigation-option selected";
}

createNews.className = "news-item";
titleErrorMessage.className = "error";
titleErrorMessage.textContent = "Enter at least 10 characters";
contentErrorMessage.className = "error";
contentErrorMessage.textContent = "Enter at least 15 characters";
notification.textContent = "News was added successfully, news data is:";

const validateTitle = () => {
  if (newsTitle.value && newsTitle.value.length >= 10) {
    setValid();

    return true;
  } else {
    titleErrorAnchor.append(titleErrorMessage);
    newsTitle.className += " invalid";
  }
};

const validateContent = () => {
  if (newsText.value && newsText.value.length >= 15) {
    setValid();

    return true;
  } else {
    contentErrorAnchor.append(contentErrorMessage);
    newsText.className += " invalid";

    return false;
  }
};

const setValid = () => {
  if (document.querySelectorAll(".error")) {
    document
      .querySelectorAll(".error")
      .forEach((el) => (el.style.display = "none"));
    newsTitle.className = "new-comment-text";
    newsText.className = "news-text-content";
  }
};

function clickHanler() {
  if (validateTitle() && validateContent()) {
    createNews.innerHTML = `
  <img src="news-image.png" alt="news image" class="article-image">
  <div class="news-content">
    <h3 class="news-title">${newsTitle.value}</h3>
    <p class="news-text">${newsText.value}</p>
  </div>
`;

    const post = {
      title: newsTitle.value,
      postText: newsText.value,
    };

    if (navigator.onLine) {
      newsList.append(createNews);
      addNews(post);

      newsTitle.value = "";
      newsText.value = "";
    } else {
      window.localStorage.setItem("Post", `${createNews}`);

      window.addEventListener("online", async () => {
        console.log("ONLINE");
        if (window.localStorage.getItem("Post")) {
          console.log("IF");
          wrapper.append(notification);

          console.log(post);
          await addNews(post);

          newsList.append(createNews);

          notification.textContent = "";
          newsTitle.value = "";
          newsText.value = "";
          window.localStorage.removeItem("Post");
        }
      });
    }
    notification.textContent = "You are currently in offline mode";
    wrapper.append(notification);
    newsTitle.value = "";
    newsText.value = "";
  }
}

async function addNews(post) {
  await fetch(`${Url}/admin`, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
