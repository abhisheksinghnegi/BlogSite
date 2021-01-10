const content = require("../Shared/SharedContent");
const express = require("express");
const router = express.Router();
router.get("/", function (req, res) {
  res.render("about.ejs", {
    start: content.aboutStartingContent,
    user: content.currentUser,
  });
});
module.exports = router;
