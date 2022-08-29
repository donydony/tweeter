/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escapeXSS = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (data) {
  // const dayDiff = Math.floor((Date.now() - data.created_at) / (24 * 3600 * 1000));
  const time = timeago.format(data.created_at, 'en_US');
  let $tweet = `<article class="tweet">
  <header>
    <div class="tweet-profile">
      <img src="${escapeXSS(data.user.avatars)}" alt="Profile pic">
      <label id="username">
        ${escapeXSS(data.user.name)}
      </label>
    </div>
    <label class="handle">
      ${escapeXSS(data.user.handle)}
    </label>
  </header>
  <p>
    ${escapeXSS(data.content.text)}
  </p>
  <footer>
    <label class="date-ago">
      ${time}
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

const renderTweets = function (arr) {
  for (let t of arr) {
    $('#tweets-container').prepend(createTweetElement(t));
  }
};

$(document).ready(function () {
  const loadTweets = function () {
    $.ajax('/tweets/', { method: 'GET' })
      .then((result) => {
        renderTweets(result);
      }).catch((err) => {
        console.log(err);
      });
  };

  loadTweets();

  $('#submit-tweet').on("submit", function (event) {
    event.preventDefault();
    if ($('#tweet-text')[0].value.length === 0) {
      $('#errors').empty();
      $('#errors').append("Empty Tweet!").hide();
      $('#errors').slideDown("slow");
    } else if ($('#tweet-text')[0].value.length > 140) {
      $('#errors').empty();
      $('#errors').append("Tweet is over 140 chars!").hide();
      $('#errors').slideDown("slow");
    } else {
      const formData = $(this).serialize();
      console.log('Form submitted, performing ajax call...');
      $.ajax('/tweets/', { method: 'POST', data: formData })
        .then((result) => {
          console.log('Success: ', result);
          $('#tweets-container').empty();
          $('#errors').empty();
          loadTweets();
        });
    }
  });
});