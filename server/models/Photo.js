const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  image: {
    filename: String,
    mimetype: String,
    encoding: String
  }
});

module.exports = mongoose.model("photo", PhotoSchema);
