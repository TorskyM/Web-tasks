const addNewsButton = document.querySelector("#add-news-button");
const newsTitle = document.querySelector(".news-text-title");
const newsText = document.querySelector(".news-text-content");
const wrapper = document.querySelector(".news-wrapper");
const titleErrorAnchor = document.querySelector(".error-message-title");
const contentErrorAnchor = document.querySelector(".error-message-content");

const createNews = document.createElement("div");
const titleErrorMessage = document.createElement("p");
const contentErrorMessage = document.createElement("p");
const notification = document.createElement("p");

addNewsButton.addEventListener("click", clickHanler);

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
  <img src='../assets/news-image.png' alt='news image' class='news-image'>
  <div class='news-content'>
    <h3 class='news-title'>${newsTitle.value}</h3>
    <p class='news-text'>${newsText.value}</p>
  </div>`;
    wrapper.append(notification);
    wrapper.append(createNews);

    newsTitle.value = "";
    newsText.value = "";
  }
}
