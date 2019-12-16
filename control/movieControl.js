const Movie = require('../modelo/movie');

function searchMovieByGender(req, res) {
 console.log(req.params.gender)
  Movie.find({ gender: req.params.gender }, function (err, data) {
    if (err) {
      res.status(500).send({ message: "Error en la petición" });
    } else {
      if (data.length == 0) {
        res.status(200).send({ message: "No existen películas jajajaa" });
      } else {
        return res.status(200).send({
          data: data
        });
      }
    }
  });
}

function getAllMovies(req, res) {
  Movie.find({}, function (err, data) {
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
  Movie.findByIdAndRemove(req.params.id, function (err, data) {
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
  var movie = new Movie();
  var parametros = req.body;
  movie.name = parametros.name;
  movie.duration = parametros.duration;
  movie.image = parametros.image;
  movie.gender = parametros.gender;
  movie.url = parametros.url;

  movie.save((err, usuarioCreado) => {
    if (err) {
      res.status(500).send({
        message: "Error en el servidor :´("
      });
    } else {
      if (!usuarioCreado) {
        res.status(404).send({
          message: "No se pudo crear el usuario"
        });
      } else {
        res.status(200).send({
          usuario: usuarioCreado
        });
      }
    }
  });
}

module.exports = {
  createMovie,
  searchMovieByGender,
  getAllMovies,
  removeMovie
}