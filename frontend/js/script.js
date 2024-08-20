function Like() {
  const LikeButtons = document.querySelectorAll(".like-button");
  if (!LikeButtons) {
    return;
  }
  LikeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tweetIcon = this.querySelector("path.heart-icon");
      console.log(tweetIcon);
      tweetIcon.classList.toggle("liked");
      const tweetId = tweetIcon.closest("[data-id]").getAttribute("data-id");
      console.log(tweetId, "tweetId");
      likeTweet(tweetId);
    });
  });
}

function addTweetButton() {
  const addTweetButton = document.querySelector(".add-tweet-button");
  if (!addTweetButton) {
    return;
  }
  addTweetButton.addEventListener("click", function () {
    window.location.href = "addtweet.html";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  addTweetButton();
  setTimeout(Like, 500);
});
