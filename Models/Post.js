const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  postTitle: String,
  postContent: String,
  date: {
    type: Date,
    default: Date.now,
  },
  postUser: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = new mongoose.model("Post", postSchema);
