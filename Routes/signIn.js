const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
router.get("/", function (req, res) {
  res.render("signIn.ejs");
});
router.post("/", async function (req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.Password, 8);
    console.log(hashedPassword);
    const newUser = new User({
      name: req.body.name,
      about: req.body.aboutyou,
      email: req.body.Email,
      password: hashedPassword,
      userPosts: [],
    });
    newUser.save().then(function () {
      console.log("User Created");
      res.redirect("/logIn");
    });
  } catch (err) {
    console.log(err);
    res.render("signIn.ejs");
  }
});
module.exports = router;
