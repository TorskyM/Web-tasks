const { Schema, model } = require("mongoose");

const schema = new Schema({
  title: {type: String, required: true},
  postText: {type: String, required: true},
});

module.exports = model("News", schema);
