const FavoriteList = require('../modelo/favoriteList');

function getFavoriteList(req, res) {
    console.log(req.params.idUser)
    FavoriteList.find({ idUsuario: req.params.idUser }, function (err, data) {
        if (err) {
            res.status(500).send({ message: "Error en la petición" });
        } else {
            if (data.length == 0) {
                res.status(200).send({ message: "No existe lista de favoritos jajajaa" });
            } else {
                return res.status(200).send({
                    data: data
                });
            }
        }
    });
}
module.exports = {
    getFavoriteList
}