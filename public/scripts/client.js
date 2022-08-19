/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(data) {
  const dayDiff = Math.floor((Date.now() - data.created_at) / (24 * 3600 * 1000));
  let $tweet = `<article class="tweet">
  <header>
    <div class="tweet-profile">
      <img src="${data.user.avatars}" alt="Profile pic">
      <label id="username">
        ${data.user.name}
      </label>
    </div>
    <label class="handle">
      ${data.user.handle}
    </label>
  </header>
  <p>
    ${data.content.text}
  </p>
  <footer>
    <label class="date-ago">
      ${dayDiff} days ago
    </label>
    <div class="tweet-buttons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`;
  return $tweet;
};

const renderTweets = function(arr) {
  for (let t of arr) {
    $('#tweets-container').append(createTweetElement(t));
  }
};

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

$(document).ready(function() {
  renderTweets(data);
});