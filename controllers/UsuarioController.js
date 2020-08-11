const mongoose = require('mongoose');
const Usuario = require('../models/Usuario');
const Wallet = require('../models/Wallet');


const usuarioController = {};

/*
**  LISTAR USUARIOS.
**  GET
**  correct -> {res: 200, usuarios: users}
**  wrong   -> {res: 500, error: err}
*/
usuarioController.list = async (req, res) => {
    try {
        const users = await Usuario.find();
        res.json({
            body: {
                usuarios: users
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            body: err
        });
    }
};

/*
**  MOSTRAR USUARIO.
**  GET
**  correct -> {res: 200, usuario: user}
**  wrong   -> {res: 500, error: err}
*/

usuarioController.show = async (req, res) => {
    try {
        const user = await Usuario.findOne({_id : req.params.id }).lean();
        console.log(user);
        res.json({
            body:{
                usuario: user
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            body: {
                error : err
            }
        });
    }
};

/*
**  CREAR USUARIO.
**  request:
**      -> datos_personales: (nombre, apellido, telefono, edad, password);
**      -> username: String,
**      -> tipo de usuario
**      -> school_name
**  Ahora mismo crea el usuario, en caso de crearlo correctamente, crea la cartera
*/

usuarioController.save = async (req, res) => {
    try {
        // TODO: VALIDAR DATA

        const user = await new Usuario(req.body);
        user.wallet = await new Wallet();
        user.wallet.usuario = user._id;
        /*
        ** //FIXME: Ver si es necesario crear un controller para el wallet y llamarlo 
        */
        user.save(
            (err) => {
                if (err) {
                    console.error("Error : ", err);
                    return;
                }
                user.wallet.save(
                    (err) => {
                        if (err) {
                            console.error("Error : ", err);
                            return;
                        }
                        console.log("wallet created.")
                });
                console.log("User created.")
                res.json({
                    body: {
                        usuario: user
                    }
                });
            }
        );
        res.status(404).json({
            body: {
                error: "error al crear usuario"
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            body:{
                error: err
            }
        });
    }
};

/*
**  EDITAR USUARIO.
**  request.:
**      -> datos_personales
**      -> 
*/

usuarioController.update = async (req, res) => {
    try {
        const user = await Usuario.findOneAndUpdate(
            req.params.id,
            {
                $set: {
                    datos_personales: req.body.datos_personales,
                    school_name: req.body.school_name
                }
            },
            { new: false},
            (err, user) => {
                if (err) {
                    console.error({error : err});
                }
                console.log("usuario: ", user);
                return;
            }
        )
        res.json({
            msg: "usuario actualizado correctamente",
            body: {
                usuario: user
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "error",
            body:{
                error: err
            }
        });
    }
};

usuarioController.edit = async (req, res) => {
    try {
        const user = await Usuario.findOne({_id: req.params.id}, (err, user) => {
            if (err) {
                console.log("Error: ", err);
                res.status(500).json({
                    msg: "error",
                    body:{
                        error: err
                    }
                });
                return;
            }
            res.json({
                usuario: user 
            });
            return;
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "error",
            body:{
                error: err
            }
        });
    }
};

module.exports = usuarioController;