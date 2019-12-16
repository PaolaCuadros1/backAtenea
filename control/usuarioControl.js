// Importando el modelo usuario para interactuar con el
const Usuario = require('../modelo/usuario');
// Módulo File System -> 32 / módulo del núcleo de Node
// Nos permite leer archivos externos como los pueden ser css, html, js, img, música, documentos, etc
const fs = require('fs'); // NUEVA LÍNEA

// Módulo path -> Nos permite analizar y evaluar la ruta de un archivo
const path = require('path'); // NUEVA LÍNEA

// req - request - peticion / res - response - respuesta
function crearUsuario(req, res) {
    // instanciar - usar el objeto modelo Usuario
    var usuario = new Usuario();
    // guardar el cuerpo de la peticion en una variable
    // para mejor acceso a los datos que el usuario está enviando
    var parametros = req.body;

    // Para mayor organización de código vamos a guardar cada propiedad
    // del cuerpo de la petición en la variable usuario
    usuario.nombre = parametros.nombre;
    usuario.apellido = parametros.apellido;
    usuario.correo = parametros.correo;
    usuario.contrasena = parametros.contrasena;
    usuario.generos = parametros.generos;
    usuario.rol = 'usuario';
    usuario.imagen = null;

    usuario.save((err, usuarioCreado) => {
        if (err) {
            // estado de la respuesta del servidor
            // 500 -> errores propios del servidor
            res.status(500).send({
                message: "Error en el servidor :´("
            });
        } else {
            if (!usuarioCreado) {
                // 404 -> Página no encontrada 
                res.status(404).send({
                    message: "No se pudo crear el usuario"
                });
            } else {
                // 200 -> OK
                res.status(200).send({
                    // modelo Usuario : Nuevo Usuario que se va a guardar
                    usuario: usuarioCreado
                });
            }
        }
    });
}

function login(req, res) {
    var parametros = req.body;
    var correoUsuario = parametros.correo;
    var contraUsuario = parametros.contrasena;

    // Buscamos al usuario a través del correo. Usamos toLowerCase() para evitar problemas de datos
    Usuario.findOne({ correo: correoUsuario.toLowerCase() }, (err, usuarioLogueado) => {
        if (err) {
            res.status(500).send({
                message: "Error en el servidor!!"
            });
        } else {
            if (!usuarioLogueado) {
                res.status(200).send({
                    message: "No registrado"
                });
            } else {
                if (usuarioLogueado.contrasena != contraUsuario) {
                    res.status(200).send({
                        message: "incorrecta"
                    });
                } else {
                    res.status(200).send({
                        usuario: usuarioLogueado,
                        message: 'Bien'
                    });
                }
            }
        }
    });
}

function actualizarUsuario(req, res) {
    var usuarioId = req.params.id;
    var datosUsuarioActualizar = req.body;

    // db.coleccion.findByIdAndUpdate('a quien quiero actualizar', 'que campos / datos vas a modificar')
    Usuario.findByIdAndUpdate(usuarioId, datosUsuarioActualizar, (err, usuarioActualizado) => {
        if (err) {
            res.status(500).send({
                message: "Error en el servidor"
            });
        } else {
            if (!usuarioActualizado) {
                res.status(404).send({
                    message: "No se pudo actualizar"
                });
            } else {
                res.status(200).send({
                    usuario: usuarioActualizado
                });
            }
        }
    });
}

// NUEVA LÍNEA - funcion subir imagen del usuario
function subirImg(req, res) {
    var usuarioId = req.params.id;
    var nombreArchivo = "No ha subido nada... ";
    if (req.files) {
        var rutaArchivo = req.files.imagen.path;

        var partirArchivo = rutaArchivo.split('\\');
        if (partirArchivo.length === 1){
            var partirArchivo = rutaArchivo.split('/');
        }

        var nombreArchivo = partirArchivo[2];

        Usuario.findByIdAndUpdate(usuarioId, { imagen: nombreArchivo }, (err, usuarioActualizado) => {
            if (err) {
                res.status(500).send({
                    message: "Error en el servidor"
                });
            } else {
                if (!usuarioActualizado) {
                    res.status(200).send({
                        message: "No fue posible actualizar los datos de la imagen"
                    });
                } else {
                    res.status(200).send({
                        imagen: nombreArchivo,
                        usuario: usuarioActualizado
                    });
                }
            }
        });

    } else {
        res.status(404).send({
            message: "No ha subido ninguna imagen"
        });
    }
}

// NUEVA LÍNEA - funcion mostrar archivo
function mostrarArchivo(req, res) {
    // pedir el archivo que queremos mostrar
    if (req.params.imageFile === 'null') {
        var archivo = 'Sin_imagen.png'
    } else {
        var archivo = req.params.imageFile

    } // localhost:4000/api/mostrar/:imageFile

    // verificar la carpeta archivos/usuarios para encontrar el archivo
    var rutaArchivo = './archivos/usuarios/' + archivo;
    console.log("------------------> ", rutaArchivo)

    // Validar si dentro de la carpeta archivos/usuarios existe el archivo
    // exists -> método propio de file system (fs)
    // fs.exists('en donde debo ir a buscar', (existe o no)=>{})
    fs.exists(rutaArchivo, (exists) => {
        if (exists) {
            // envíe la imagen o el archivo
            // senFile -> propio de file system permite enviar archivos como rta

            res.sendFile(path.resolve(rutaArchivo));
        } else {
            res.status(404).send({
                message: "Imagen no encontrada"
            });
        }
    });
}


module.exports = {
    crearUsuario,
    login,
    actualizarUsuario,
    subirImg,
    mostrarArchivo
};


