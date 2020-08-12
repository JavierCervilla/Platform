const express = require('express');
const usuarioController = require('../controllers/UsuarioController');
const walletController = require('../controllers/Walletcontroller');

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        msg : "hello World"
    });
});

/*
**  RUTAS DE USUARIOS
*/


router.get("/user", (req, res) => {
    usuarioController.list(req, res);
});

router.post("/user/create", (req, res) => {
    usuarioController.save(req, res);
});

router.post("/user/update", (req, res) => {
    usuarioController.update(req, res);
});

/*
**  RUTAS DE WALLET
*/

router.get("/wallet", (req, res) => {
    walletController.list(req, res);
});

router.post("/wallet/create", (req, res) => {
    walletController.save(req, res);
});


module.exports = router