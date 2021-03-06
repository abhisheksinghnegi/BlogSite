const express = require("express");
const app = express();
const port = 3000;
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var _ = require("lodash");
var about = require("./Routes/about");
var compose = require("./Routes/Compose");
var contact = require("./Routes/Contact");
var home = require("./Routes/home");
var login = require("./Routes/logIn");
var posts = require("./Routes/posts");
var signin = require("./Routes/signIn");
var signout = require("./Routes/signout");
const forgotPass = require("./Routes/forgotPass");
const changePass = require("./Routes/changePass");
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/", home);
app.use("/about", about);
app.use("/contact", contact);
app.use("/compose", compose);
app.use("/logIn", login);
app.use("/signIn", signin);
app.use("/posts", posts);
app.use("/signout", signout);
app.use("/forgot", forgotPass);
app.use("/changePass", changePass);

app.set("view engine", "ejs");

mongoose.connect(
  process.env.MyDb,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err) {
    if (err) console.log(err);
    else console.log("connected to db");
  }
);

app.listen(process.env.PORT || port, function () {
  console.log("listening into port 3000");
});
