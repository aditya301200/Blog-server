const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  user: {
    type: String,
    required: true,
    maxLength: 50,
  }
});

module.exports = mongoose.model("Like", likeSchema);
