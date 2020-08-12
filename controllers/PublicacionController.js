const Publicacion = require('../models/Publicacion');
const Usuario = require('../models/Usuario');

const publicacionController = {};

publicacionController.list = async (req, res) => {
    try {
        const publicaciones = await Publicacion.find();
        res.json({
            msg: "listado de publicaciones.",
            body: {
                publicaciones: publicaciones
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "ERROR at listing publications.",
            body: {
                error: err
            }
        });
    }
};

publicacionController.show = async (req, res) => {
    try {
        const publicacion = await Publicacion.findOne({_id: req.params.id});
        console.log(publicacion);
        res.json({
            msg: "publicacion encontrada.",
            body: {
                publicacion : publicacion
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "ERROR. Publicacion no encontrada.",
            body: {
                error: err
            }
        });
    }
}

publicacionController.save = async (req, res) => {
    try {
        const user = await Usuario.findOne({_id : req.body.user});
        const publicacion = new Publicacion(req.body);
        publicacion.user = user;
        console.log(publicacion);
        publicacion.save();
        res.json({
            msg: "publicacion creada",
            body: {
                publicacion : publicacion
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "ERROR at create publicacion.",
            body: {
                error: err
            }
        });
    }
}

publicacionController.listUser = async (req, res) => {
    try {
        const publicaciones = await Publicacion.find({id: req.param.id});
        res.json({
            msg: "listado de publicaciones.",
            body: {
                publicaciones: publicaciones
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "ERROR at listing publications.",
            body: {
                error: err
            }
        });
    }
};

publicacionController.update = async (req, res) => {
    try {
        let publicacion = await Publicacion.findOne({_id : req.params.id});
        publicacion.texto = req.body.texto;
        publicacion.titulo = req.body.titulo;
        publicacion.referencias = req.body.referencias;
        publicacion.updated = new Date();
        publicacion.save();
        console.log(publicacion);
        res.json({
            msg: "publicacion editada correctamente.",
            body: {
                publicacion: publicacion
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Error al editar publicacion.",
            body:{
                error: err
            }
        });
    }
};

publicacionController.edit = async (req, res) => {
    try {
        const publicacion = await Publicacion.findOne({_id: req.params.id}, (err, user) => {
            if (err) {
                console.log("Error: ", err);
                res.status(500).json({
                    msg: "error",
                    body: {
                        error: err
                    }
                });
                return;
            }
            res.json({
                msg: "publicacion a editar.",
                body: {
                    publicacion: publicacion
                }
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "error",
            body: {
                error: err
            }
        });
    }
};

module.exports = publicacionController;
