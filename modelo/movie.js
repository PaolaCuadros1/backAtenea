const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MovieSchema = new Schema({
  name: String,
  duration: String,
  image: String,
  gender: String,
  url: String
});

module.exports = mongoose.model('Movie', MovieSchema);