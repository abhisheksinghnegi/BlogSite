const express = require("express");
const router = express.Router();
const User = require("../Models/User");
router.get("/", function (req, res) {
  res.render("signIn.ejs");
});
router.post("/", function (req, res) {
  const newUser = new User({
    name: req.body.name,
    email: req.body.Email,
    password: req.body.Password,
    userPosts: [],
  });
  newUser.save().then(function () {
    console.log("User Created");
    res.redirect("/logIn");
  });
});
module.exports = router;
