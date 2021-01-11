const express = require("express");
const router = express.Router();
const Post = require("../Models/Post");
const User = require("../Models/User");
const SharedContent = require("../Shared/SharedContent");
router.get("/", function (req, res) {
  if (
    SharedContent.currentUser == null ||
    SharedContent.currentUserposts == null
  ) {
    res.render("home.ejs", {
      start: SharedContent.postStartingContent,
      allPosts: [],
      user: null,
    });
  } else {
    res.render("home.ejs", {
      start: SharedContent.postStartingContent,
      allPosts: SharedContent.currentUserposts,
      user: SharedContent.currentUser,
    });
  }
});
router.get("/user/:userId", async (req, res) => {
  try {
    if (SharedContent.currentUser != null) res.redirect("/");
    else {
      const guestId = req.params.userId;
      const guestUser = await User.findById(guestId).exec();
      console.log(guestUser);
      SharedContent.currentUserposts = await Post.find({
        _id: { $in: guestUser.userPosts },
      });
      res.render("particularUser.ejs", {
        start: SharedContent.postStartingContent,
        allPosts: SharedContent.currentUserposts,
        user: null,
      });
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});
module.exports = router;
