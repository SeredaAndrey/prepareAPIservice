const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
  user: {
    type: String,
    required: [true, "User is required"],
    unique: true,
  },
  tweets: {
    type: Number,
    default: null,
  },
  followers: {
    type: Number,
    default: null,
  },
  avatar: {
    type: String,
    default: null,
  },
  following: [{ type: String, default: null }],
});

const User = mongoose.model("user", user);

module.exports = User;
