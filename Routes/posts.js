const express = require("express");
const router = express.Router();
const Post = require("../Models/Post");
const SharedContent = require("../Shared/SharedContent");
router.get("/:postName", async function (req, res) {
  const post = await Post.find({ _id: req.params.postName });
  res.render("particularpost.ejs", {
    post: post[0],
    user: SharedContent.currentUser,
  });
});
module.exports = router;
