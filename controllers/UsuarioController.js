const mongoose = require('mongoose');
const Usuario = require('../models/Usuario');
const walletController = require('../controllers/Walletcontroller');


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
            msg: "usuario encontrado.",
            body:{
                usuario: user
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "ERROR. Usuario no encontrado.",
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
        await user.save(
            async (err) => {
                if (err) {
                    console.error("Error : ", err);
                    res.status(404).json({
                        msg: "Error. Usuario no creado.",
                        body: {
                            error: err
                        }
                    });
                    return;
                }
                console.log("Usuario creado.");
                return;
            }
            );
        res.json({
            msg: "usuario creado correctamente.",
            body: {
                usuario: user
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Error. Usuario no creado.",
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
                user.update;
                return;
            });
        console.log("usuario: ", user);
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