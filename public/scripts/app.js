/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function(){

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  $(".compose").click(function(){
    $(".new-tweet").slideToggle();
    $("textarea").focus();
  });

  function createTweetElement (tweetData) {

    const newtime = moment(tweetData.created_at);
    const html = `
      <article class="tweet">
        <header>
          <img class="pic" src=${tweetData.user.avatars.small}>
          <h3>${tweetData.user.name}</h3>
          <span class="at-name">${tweetData.user.handle}</span>
        </header>
        <div class="content">
          <p>${escape(tweetData.content.text)}</p>
        </div>
        <footer>
        <span class="date">${newtime.fromNow()}</span>
          <i class="fa fa-heart" aria-hidden="true"></i>
          <i class="fa fa-retweet" aria-hidden="true"></i>
          <i class="fa fa-flag" aria-hidden="true"></i>
        </footer>
      </article>`;
    return html;
  } //function createTweetElement

  function renderTweets(data) {
    $('#tweetcontainer').children().remove();
    data.forEach((tweet) => {
      $('#tweetcontainer').prepend(createTweetElement(tweet));
    });
  } //function renderTweets

  //ajax GET request (fetching tweets from /tweetr page)
  function loadTweets() {
    console.log("loadingtweets")
    $.getJSON('/tweets')
      .done((tweets) => {
        console.log(tweets.length);
      })
      .done((tweets) => {
        renderTweets(tweets)
        console.log("renderTweets")
      })
  } //function loadTweets

  //validation (check if data is "" or null)
  function validation() {
    var txtar = $(".new-tweet > form > textarea");
    var leng = txtar.val().length;
    if (!leng) {
      alert("Please enter a message first.");
      return false
    }
    if (leng > 140) {
      alert("Message too long, TLDR.");
      return false;
    }
      return true;
  } // function validation

  //preventDefault of web page refreshing & turn obj into string
  function addNewTweet(event) {
    event.preventDefault();
    if (validation()) {
    const serForm = $(this).serialize();
    console.log(serForm)
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: serForm
    })
    .done(() => {
      loadTweets();
    }) // same as document ready but this is a property of ajax obj
    } // end of if
  }; // end of function addNewTweet

  const $form = $('#posting') //declaring form
  $form.on('submit', addNewTweet); //refers to 'this' in addNewTweet function
  loadTweets(); //calling loadTweets function which renders tweet
});
