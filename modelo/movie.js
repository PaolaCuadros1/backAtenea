const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MovieSchema = new Schema({
    name: String,
    duration: String,
    image: String,
    image2: String,
    gender: String,
    url: String,
    synopsis: String
});

module.exports = mongoose.model('Movie', MovieSchema);