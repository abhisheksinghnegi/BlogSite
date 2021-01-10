const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const Posts = require("../Models/Post");
const SharedContent = require("../Shared/SharedContent");
const Post = require("../Models/Post");
router.get("/", function (req, res) {
  if (SharedContent.currentUser == null) res.redirect("/logIn");
  else res.render("compose.ejs");
});
router.post("/", function (req, res) {
  if (SharedContent.currentUser == null)
    res.render("home.ejs", {
      start: SharedContent.postStartingContent,
      allPosts: [],
    });

  const newPost = new Posts({
    postUser: SharedContent.currentUser._id,
    postTitle: req.body.title,
    postContent: req.body.content,
  });
  var prev;
  if (!SharedContent.currentUser.userPosts)
    SharedContent.currentUser.userPosts.push(newPost);
  else {
    prev = SharedContent.currentUser.userPosts;
    SharedContent.currentUser.userPosts.push(newPost);
  }
  User.updateOne(
    { email: SharedContent.currentUser.email },
    {
      $set: { userPosts: SharedContent.currentUser.userPosts },
    },
    function (err, response) {
      if (err) {
        console.log("err");
        SharedContent.currentUser.userPosts = prev;
        res.render("compose.ejs");
      } else {
        newPost.save();
        console.log("response" + response);
        SharedContent.currentUserposts.push(newPost);
        res.redirect("/");
      }
    }
  );
});

module.exports = router;
