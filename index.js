/*
    Va a contener la conexión de Node & Express con Mongo
    usando la librería mongoose.
*/

const mongoose = require('mongoose'); // Importamos Mongoose para la conexión
const app = require('./app'); // Vamos a importar la lógica de Express
const port = 4000; // Declaramos el puerto que deseemos

// Le especificamos la BD a la cual nos queremos conectar
mongoose.connect('mongodb://localhost:27017/Atenea', { useFindAndModify: false },  (err, res)=>{
    if(err){
        console.log('El error es: ' + err);
    }else{
        console.log('Conexión exitosa!!');
        app.listen(port, ()=>{
            console.log('Puerto: ' + port);
        })
    }
})
