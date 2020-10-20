const fansUrl = 'http://localhost:8000';

(async function init() {
  const commentsWrapper = document.querySelector(".comments-wrapper");
  const data = await fetch(`${fansUrl}/fans`).then((response) =>
    response.json()
  );
  const comments = data.reduce(
    (acc, comment) =>
      (acc += `
      <div class="comment-container">
        <p>${comment.commentContent}</p>
        <div class='comment-detail'>
        <span>${comment.createdAt}</span><span>${comment.userName}</span>
        </div>
      </div>
      `),
    ""
  );
  commentsWrapper.innerHTML = comments;
})();


const handleClick = async () => {
  const userInput = document.querySelector("#comment-input");
  const commentsWrapper = document.querySelector(".comments-wrapper");

  const newCommentSection = document.querySelector(".new-comment-container");

  const newPost = document.createElement("div");
  const errorMessage = document.createElement("p");

  const now = new Date();

  newPost.className = "comment-container";
  errorMessage.className = "error";
  errorMessage.textContent = "Enter at least 15 characters. Limit - 200";
  newPost.innerHTML = `
  <p>${userInput.value}</p>
  <div class='comment-detail'>
    <span>${now.toLocaleString().substring(0, 17)}</span>
    <span>FootballFan2000</span>
  </div>`;

  const post = {
    commentContent: userInput.value
  };

  if (
    userInput.value &&
    userInput.value.length > 15 &&
    userInput.value.length < 200
  ) {
    if (document.querySelectorAll(".error")) {
      document
        .querySelectorAll(".error")
        .forEach((el) => (el.style.display = "none"));
      userInput.className = "new-comment-text";
    }

    if (navigator.onLine) {
      setPost(post);
      commentsWrapper.append(newPost);
      userInput.value = "";
    } else {
      window.localStorage.setItem("Comment", `${newPost}`);
      userInput.value = "";
    }
  } else {
    newCommentSection.append(errorMessage);
    userInput.className += " invalid";
  }

  window.addEventListener("online", () => {
    if (window.localStorage.getItem("Comment")) {
      setPost(post);
      commentsWrapper.append(newPost);
      userInput.value = "";
      window.localStorage.removeItem("Comment");
    }
  });
};

async function setPost(post) {
  await fetch(`${fansUrl}/fans`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}