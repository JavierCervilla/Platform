const express = require('express');
const usuarioController = require('../controllers/UsuarioController');
const walletController = require('../controllers/Walletcontroller');
const transactionController = require('../controllers/TransactionController');
const publicacionController = require('../controllers/PublicacionController');

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

router.get("/wallet/history/:id", (req, res) => {
    walletController.listorial(req, res);
});

router.get("/wallet/:id", (req,res) => {
    walletController.show(req, res);
});


/*
** RUTAS DE TRANSACCIONES
*/

router.get("/transaction/:id", (req, res) => {
    transactionController.show(req, res);
})

router.get("/transaction", (req, res) => {
    transactionController.listAll(req, res);
});

router.post("/transaction/create", (req, res) => {
    transactionController.save(req, res);
});

/*
**  RUTAS DE PUBLICACIONES
*/

router.get("/publicacion", (req, res) => {
    publicacionController.list(req, res);
});


router.get("/publicacion/user/:id", (req, res) => {
    publicacionController.listUser(req, res);
});

router.get("/publicacion/:id", (req, res) => {
    publicacionController.show(req, res);
});

router.post("/publicacion/create", (req,res) => {
    publicacionController.save(req, res);
});

router.post("/publicacion/edit/:id", (req,res) => {
    publicacionController.update(req, res);
});

module.exports = router