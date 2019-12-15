/* 
    Vamos a crear el manejador de rutas de express para nuestra aplicación
    (API).

    Este manejador se encargará de las rutas del lado del backend
*/
const express = require('express');
const UsuarioControl = require('../control/usuarioControl');
const MovieControl = require('../control/movieControl');

var api = express.Router(); // cargamos el manejador de rutas de Express

/*
    A través de las características de una API tenemos acceso
    a los métodos POST, GET, PUT y DELETE. Estos métodos nos van 
    a permitir Agregar datos (POST), obtener datos (GET),
    actualizar datos (PUT) y eliminar datos (DELETE). Estos métodos
    los provee el protocolo HTTP
*/

// NUEVA LÍNEA
// Importar la librería connect-multiparty - subir los archivos multimedia a una BD
var multipart = require('connect-multiparty');
// NUEVA LÍNEA
// Especificaremos la ruta donde se van a guardar los archivos
var subirImgDirectorio = multipart( {uploadDir: './archivos/usuarios'} ); // Upload Directory


// Por cada función que vayamos a crear debe existir una ruta
// post('una ruta de acceso', una función a ejecutar)
api.post('/registro', UsuarioControl.crearUsuario);
// En el caso del login, en una API es un proceso especial y que no guarda los datos en BD
// sino que realiza un paneo o scan del modelo para la coincidencia de datos
api.post('/loginUsuario', UsuarioControl.login);
// PUT y DELETE es que necesitan tener especificados el id en la ruta
api.put('/actualizar-usuario/:id', UsuarioControl.actualizarUsuario);
// Ruta para enviar y guardar la imagen de un usuario
api.post('/subir-imagen-usuario/:id', subirImgDirectorio, UsuarioControl.subirImg);
// ruta para mostrar el archivo
api.get('/obtener-imagen-usuario/:imageFile', UsuarioControl.mostrarArchivo);


api.post('/saveMovie', MovieControl.createMovie);
api.get('/getMoviByGender/:gender', MovieControl.searchMovieByGender);
api.get('/getAllMovies', MovieControl.getAllMovies);
api.delete('/removeMovie/:id', MovieControl.removeMovie);


module.exports = api ; // 
// MVW -> Modelo Vista Cualquiera / Model View Whatever (modelo, vista rutas)
// aplicaciones menos robustas

// MVC aplicaciones más robustas


