const addNewsButton = document.querySelector('#add-news-button');
const newsTitle = document.querySelector('.news-text-title');
const newsText = document.querySelector('.news-text-content');
const wrapper = document.querySelector('.news-text-wrapper');
const titleErrorAnchor = document.querySelector('.error-message-title');
const contentErrorAnchor = document.querySelector('.error-message-content');

const createNews = document.createElement('div');
const titleErrorMessage = document.createElement('p');
const contentErrorMessage = document.createElement('p');

addNewsButton.addEventListener('click', clickHanler);

createNews.className = 'news-item';
titleErrorMessage.className = 'error';
titleErrorMessage.textContent = 'Enter at least 10 characters';
contentErrorMessage.className = 'error';
contentErrorMessage.textContent = 'Enter at least 15 characters';
createNews.innerHTML = `
  <img src='../assets/news-image.png' alt='news image' class='news-image'>
  <div class='news-content'>
    <h3 class='news-title'>${newsTitle.value}</h3>
    <p class='news-text'>${newsText.value}</p>
  </div>`;

const validateTitle = () => {
  if (newsTitle.value && newsTitle.value.length >= 10) {
    setValid();

    return true;
  } else {
    titleErrorAnchor.append(titleErrorMessage);
    newsTitle.className += ' invalid';
  }
};

const validateContent = () => {
  if (newsText.value && newsText.value.length >= 15) {
    setValid();

    return true;
  } else {
    contentErrorAnchor.append(contentErrorMessage);
    newsText.className += ' invalid';

    return false;
  }
};

const setValid = () => {
  if (document.querySelector('.error')) {
    document.querySelector('.error').style.display = 'none';
    newsTitle.className = 'new-comment-text';
    newsText.className = 'news-text-content';
  }
};

function clickHanler() {
  if (validateTitle() && validateContent()) {
    wrapper.append(createNews);
    newsTitle.value = '';
    newsText.value = '';
  }
}