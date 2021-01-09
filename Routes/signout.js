const SharedContent = require("../Shared/SharedContent");
const express = require("express");
const router = express.Router();
router.get("/", function (req, res) {
  SharedContent.currentUser = null;
  SharedContent.currentUserposts = null;
  console.log(SharedContent.currentUser);
  res.redirect("/");
});
module.exports = router;
