const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  userPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

module.exports = new mongoose.model("User", userSchema);
