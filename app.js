/*
    Va a contener toda la lógica de ruteo de Express
    Declaración de rutas, uso de la librería body-parser
    Permisos de acceso a cualquier cliente (Permisos a Angular)
*/

const express = require('express'); // Importamos Express
const bodyParser = require('body-parser'); // Permite analizar datos de URL

const app = express(); // Application Express

// Configurar las rutas de acceso a cada función de nuestra aplicación
const usuarioRutas = require('./rutas/usuarioRutas');

// Analizar los datos que se están enviando por la URL con body-parser
app.use(bodyParser.json());


// Configurar permisos de acceso a cualquier cliente
app.use((req, res, next) =>{
    // Todos estos permisos se envian por las cabeceras de las aplicaciones
    // Estos permisos derivan de AJAX (Asynchronous JavaScript XHML)

    // todos los dominios
    res.header('Access-Control-Allow-Origin', '*');
    // todos los metadatos - cookies
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    // todos los métodos http - métodos de petición
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // Confirmación estricta de los métodos a utilizar
    res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');

    // app.use((req, res, next)=>{}) Es un middleware
    // next() -> Salga del middleware y ejecute el siguiente proceso o dele por terminado
    next();
});






// Consumo de las rutas
app.use('/api', usuarioRutas); // acá estamos usando todas las rutas del usuario que activan las funciones
// /api/registro
module.exports = app; // Exportamos todo el archivo app
