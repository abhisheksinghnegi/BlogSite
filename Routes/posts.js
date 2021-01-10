const express = require("express");
const router = express.Router();
const Post = require("../Models/Post");
const User = require("../Models/User");
const SharedContent = require("../Shared/SharedContent");
router.get("/:postName", async function (req, res) {
  const post = await Post.find({ _id: req.params.postName });
  const guestUser = await User.find({ _id: post[0].postUser });
  res.render("particularpost.ejs", {
    post: post[0],
    user: SharedContent.currentUser,
    guest: guestUser[0],
  });
});
module.exports = router;
