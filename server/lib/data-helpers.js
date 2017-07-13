"use strict";

// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");


// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      // db.tweets.push(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      // simulateDelay(() => {
      db.collection("tweets").find().toArray(callback);
      // (err, tweets) => {
      //   if (err) {
      //     return callback(err);
      //   }
      //   const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      //   tweets.sort(sortNewestFirst);
      //   callback(null, tweets);
      // })

    // });
    },


    // getTweets((err, tweets) => {
    //   if (err) {
    //     throw err;
    //   }
    //   console.log("Logging each tweet:");
    //   for (let tweet of tweets) {
    //     console.log(tweet);
    //   }
    //   db.close();
    // })
  };
}
