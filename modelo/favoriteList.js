const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FavoriteListSchema = new Schema({
    idUsuario: String,
    idPelicula: String
});

module.exports = mongoose.model('FavoriteList', FavoriteListSchema);