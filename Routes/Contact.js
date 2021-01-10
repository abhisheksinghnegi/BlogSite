const express = require("express");
const router = express.Router();
const SharedContent = require("../Shared/SharedContent");
router.get("/", function (req, res) {
  if (SharedContent.currentUser == null) {
    res.render("contact.ejs", {
      start: SharedContent.contactStartingContent,
      user: SharedContent.currentUser,
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
