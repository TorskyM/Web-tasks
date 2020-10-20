const { Schema, model } = require("mongoose");

const schema = new Schema({
  createdAt: {type: String},
  userName: {type: String},
  commentContent: {type: String},
});

module.exports = model("Comment", schema);
