const mongoose = require('mongoose');
const Wallet = require('../models/Wallet');
const Usuario = require('../models/Usuario');


const walletController = {};

walletController.list = async (req, res) => {
    try {
        const wallets = await Wallet.find();
        res.json({
            msg: "Listado de carteras.",
            body: {
                carteras: wallets
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "ERROR at listing wallets.",
            body: {
                error: err
            }
        });
    }
};

walletController.show = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({_id : req.params.id});
        console.log(wallet);
        res.json({
            msg: "wallet encontrada.",
            body: {
                wallet: wallet
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "ERROR. Wallet no encontrada.",
            body: {
                error: err
            }
        });
    }
};

walletController.save = async (req, res) => {
    try {
        const user = await Usuario.findOne({_id : req.body._id});
        user.wallet = new Wallet(req.body);
        user.wallet.usuario = user._id;
        user.wallet.save(
            async(err) => {
                if (err) {
                    console.error("Error: ", err);
                    res.status(404).json({
                        msg: "Error. wallet ya creada para este usuario.",
                        body: {
                            error: err
                        }
                    });
                }
                console.log(user.wallet);
                res.json({
                    msg: "cartera creada con exito",
                    body: {
                        wallet: user.wallet
                    }
                });
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Error. Wallet no creada.",
            body: {
                error: err
            }
        });
    }
};

walletController.listorial = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({_id: req.params.id});
        console.log(wallet);
        res.json({
            msg: "Aqui tiene su historial.",
            body: {
                historial: wallet.historial
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Error. historial no encontrado.",
            body: {
                id: req.param.id,
                error: err
            }
        });
    }
}

module.exports = walletController;