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
        const users = await Usuario.find().lean();
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

usuarioController.save = (req, res) => {
    try {
        // TODO: VALIDAR DATA

        const user = new Usuario(req.body);
        user.wallet = new Wallet(()=>{
            
        });
        user.wallet.save();
        user.save();
        res.json({
            res: 200,
            body: {
                usuario: user
            }
        });
    } catch (err) {
        console.error(err);
        res.json({
            res: 500,
            body:{
                error: err
            }
        });
    }
};




module.exports = usuarioController;