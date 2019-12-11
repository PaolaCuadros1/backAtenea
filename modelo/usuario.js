const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    correo: String,
    contrasena: String,
    rol: String,
    imagen: String
});

// module.exports = mongoose.model('nombre de la colección en la BD', Schema que se creo)
module.exports = mongoose.model('Usuario', UsuarioSchema);
