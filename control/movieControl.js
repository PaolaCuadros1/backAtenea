const Movie = require('../modelo/movie');

function searchMovieByGender(req, res) {

  Movie.find({ gender: "Romance" }, function (err, data) {
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

module.exports = {
  //createMovie,
  searchMovieByGender,
  getAllMovies,
  removeMovie
}