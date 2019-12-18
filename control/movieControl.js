const Movie = require('../modelo/movie');

function searchMovieByGender(req, res) {
 console.log(req.params)
  Movie.find({ gender: req.params.gender}, function (err, data) {
    if (err) {
      res.status(500).send({ message: "Error en la petición" });
    } else {
      if (data.length == 0) {
        res.status(200).send({ message: "No existen películas" });
      } else {
        return res.status(200).send({
          data: data, gender: req.params.gender
        });
      }
    }
  });
}

function getAllMovies(req, res) {
    Movie.find({}, function(err, data) {
        if (err) {
            res.status(500).send({ message: "Error en la petición" });
        } else {
            if (data.length == 0) {
                res.status(200).send({ message: "No existen artistas" });
            } else {
                return res.status(200).send({
                    data: data
                });
            }
        }
    });
}

function removeMovie(req, res) {
    Movie.findByIdAndRemove(req.params.id, function(err, data) {
        if (err) {
            res.status(500).send({ message: 'No eliminada' });
        } else {
            if (data.length == 0) {
                res.status(200).send({ message: 'No existe' });
            } else {
                res.status(200).send({ message: 'Eliminada' });
            }
        }
    });
}

function createMovie(req, res) {
    // instacia del objeto
    var movie = new Movie();
    // traer todo al cuerpo de la peticion 
    var params = req.body;
    movie.name = params.name;
    movie.duration = params.duration;
    movie.image = null;
    movie.image2 = null;
    movie.gender = params.gender;
    movie.url = params.url;
    movie.synopsis = params.synopsis;
    // insertar en la base de datos
    movie.save((error, movieCreated) => {
        if (error) {
            //(status)Estado  de la respuesta  del servidor
            //500 -> errores propios del servidor 
            res.status(500).send({
                message: "error en el servidor :/"
            });
        } else {
            if (!movieCreated) {
                //404 -> Pagina no encontrada 
                res.status(200).send({
                    message: "no se pudo crear el usuario "
                });
            } else {
                //200 -> OK
                res.status(200).send({
                    //Modelo Usuario: Nuevo Usuario que se va a guardar 
                    movie: movieCreated
                });
            }
        }
    })
}


module.exports = {
    createMovie,
    searchMovieByGender,
    getAllMovies,
    removeMovie
}