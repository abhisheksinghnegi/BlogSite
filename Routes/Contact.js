const express = require("express");
const router = express.Router();
const SharedContent = require("../Shared/SharedContent");
router.get("/", function (req, res) {
  res.render("contact.ejs", {
    start: SharedContent.contactStartingContent,
    user: SharedContent.currentUser,
  });
});

module.exports = router;
