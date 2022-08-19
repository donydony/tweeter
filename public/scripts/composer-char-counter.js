$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on('input', function() {
    const counter = 140 - this.value.length;
    $("#tcounter")[0].value = counter;
    if (counter >= 0) {
      $("#tcounter")[0].style.color = '#545149';
    } else {
      $("#tcounter")[0].style.color = "red";
    }
  });
});