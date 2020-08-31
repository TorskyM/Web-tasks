const handleClick = () => {
  const userInput = document.querySelector('#comment-input');
  const commentsWrapper = document.querySelector('.comments-wrapper');
  const newCommentSection = document.querySelector('.new-comment-container');
  const newPost = document.createElement('div');
  const errorMessage = document.createElement('p');
  const now = new Date();

  newPost.className = 'comment-container';
  errorMessage.className = 'error';
  errorMessage.textContent = 'Enter at least 15 characters';
  newPost.innerHTML = `
  <p>${userInput.value}</p>
  <div class='comment-detail'>
    <span>${now
      .toLocaleString()
      .substring(0, 17)}</span><span>FootballFan2000</span>
  </div>`;

  if (userInput.value && userInput.value.length > 15) {
    if (document.querySelector('.error')) {
      document.querySelector('.error').style.display = 'none';
      userInput.className = 'new-comment-text';
    }

    commentsWrapper.append(newPost);
    userInput.value = '';
  } else {
    newCommentSection.append(errorMessage);
    userInput.className += ' invalid';
  }
};
