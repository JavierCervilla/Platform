const express = require('express');
const usuarioController = require('../controllers/UsuarioController')


const router = express.Router();

// @method :    GET
// @route  :    /api
// @desc   :    hello world api

router.get("/api", (req,res) => {
    res.json({
        msg : "hello World"
    });
});

router.get("/api/user", (req,res) => {
    usuarioController.list(req, res);
});

router.post("/user/create", (req,res) => {
    usuarioController.save(req, res);
});

module.exports = router