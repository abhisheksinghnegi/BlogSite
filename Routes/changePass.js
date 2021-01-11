const content = require("../Shared/SharedContent");
const express = require("express");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const SharedContent = require("../Shared/SharedContent");
const router = express.Router();

router.get("/", function (req, res) {
  if (SharedContent.email == null) res.redirect("/forgot");
  res.render("changePass.ejs", { message: null });
});

//write change Password code
router.post("/", async (req, res) => {
  console.log(SharedContent.otp + " " + req.body.pin);
  if (req.body.pin != SharedContent.otp) {
    res.render("changePass.ejs", { message: "Wrong OTP" });
  } else {
    const hashedPassword = await bcrypt.hash(req.body.newPass, 8);
    try {
      console.log(hashedPassword);
      const update = await User.updateOne(
        { email: SharedContent.email },
        { $set: { password: hashedPassword } }
      );
      console.log(update);
      SharedContent.otp = null;
      SharedContent.email = null;
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.redirect("/changePass");
    }
  }
});
module.exports = router;
