const express = require("express");
const router = express.Router();
const SharedContent = require("../Shared/SharedContent");
const User = require("../Models/User");
const Post = require("../Models/Post");
const bcrypt = require("bcrypt");
router.get("/", function (req, res) {
  res.render("logIn.ejs");
});
router.post("/", async function (req, res) {
  try {
    const current = await User.find({ email: req.body.Email });
    if (current.length > 0) {
      const cryptPassword = await bcrypt.compare(
        req.body.Password,
        current[0].password
      );
      if (cryptPassword) {
        console.log("User Found and Authd");
        SharedContent.currentUser = current[0];
        SharedContent.currentUserposts = await Post.find({
          _id: { $in: SharedContent.currentUser.userPosts },
        });
        console.log(SharedContent.currentUserposts);
        res.redirect("/");
      } else {
        console.log("User Found but wrong password");
        res.render("logIn.ejs");
      }
    } else {
      console.log("no User Found");
      res.render("logIn.ejs");
    }
  } catch (err) {
    console.log(err);
    res.render("logIn.ejs");
  }

  // User.find({ email: req.body.Email }, function (err, found) {
  //   if (err) {
  //     console.log("error");
  //     //res.redirect('/logIn.ejs');
  //   } else {
  //     if (found.password == req.body.password) {
  //       if (typeof found.userPosts !== "undefined")
  //         res.render("home.ejs", {
  //           start: postStartingContent,
  //           allPosts: found.userPosts,
  //         });
  //       else
  //         res.render("home.ejs", { start: postStartingContent, allPosts: [] });
  //     } else {
  //       res.redirect("/logIn.ejs");
  //     }
  //   }
  // });
});
module.exports = router;
