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
**      -> 
**
*/

usuarioController.save = async (req, res) => {
    try {
        // TODO: VALIDAR DATA

        console.log(req.body);
        const user = await new Usuario(req.body);
        user.wallet = await new Wallet();
        user.save();
        res.json({
            body: {
                usuario: user
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




module.exports = usuarioController;