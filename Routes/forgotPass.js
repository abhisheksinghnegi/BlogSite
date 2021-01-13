const content = require("../Shared/SharedContent");
const express = require("express");
const User = require("../Models/User");
const SharedContent = require("../Shared/SharedContent");
const nodemailer = require("nodemailer");
require("dotenv/config");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.myemail,
    pass: process.env.mypass,
  },
});

const router = express.Router();
router.get("/", function (req, res) {
  if (SharedContent.currentUser != null) res.redirect("/");
  res.render("forgotPass.ejs", { message: null });
});
router.post("/", async (req, res) => {
  const user = await User.find({ email: req.body.email });
  if (user.length == 0) {
    SharedContent.email = null;
    res.render("forgotPass.ejs", { message: "USER NOT FOUND" });
  } else {
    const otp = Math.round(1000 + Math.random() * 9000);
    SharedContent.otp = "" + otp;
    SharedContent.email = req.body.email;
    const sendtext = "Your one time password is " + otp;
    var mailOptions = {
      from: "abhisheksinghnegi5002@gmail.com",
      to: req.body.email,
      subject: "Change your password",
      text: sendtext,
    };
    try {
      const sended = transporter.sendMail(mailOptions);
      res.redirect("/changePass");
    } catch (err) {
      console.log(err);
      res.redirect("/forgot");
    }
  }
});
module.exports = router;
