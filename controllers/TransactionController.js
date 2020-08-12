const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');

const transactionController = {};

transactionController.listAll = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json({
            msg: "Listado de transacciones globales.",
            body: {
                transacciones: transactions
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Error at listing transactions.",
            body: {
                error: err
            }
        });
    }
};

transactionController.show = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({_id : req.params.id});
        res.json({
            msg: "Transaccion encontrada.",
            body: {
                transaccion: transaction
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Error. Transaccion no encontrada.",
            body: {
                error: err
            }
        });
    }
};

transactionController.save = async (req, res) => {
    try {
        const origen = await Wallet.findOne({_id : req.body.origen});
        const destino = await Wallet.findOne({_id : req.body.destino});
        const transaccion = new Transaction(req.body);
        console.log(origen, destino);
        if (origen.cantidad < transaccion.importe)
        {
            res.status(418).json({
                msg: "error no money no party.",
                body: {
                    cantidad: origen.cantidad,
                    importe: transaccion.importe
                }
            });
            console.log("error. not founds");
        }
        try {
            origen.cantidad = origen.cantidad - transaccion.importe;
            destino.cantidad = destino.cantidad + transaccion.importe;
            let aux = [...origen.historial]
            origen.historial = [...aux, transaccion._id];
            aux = [...destino.historial]
            destino.historial = [...aux, transaccion._id];
            await transaccion.save();
            await origen.save();
            await destino.save();
            res.json({
                msg: "Transaccion creada con exito.",
                body: {
                    transaccion: transaccion
                }
            });
        
        } catch (err) {
            if (err) {
                console.error("Error: ", err);
                res.status(404).json({
                    msg: "Error. Transaccion no creada.",
                    body: {
                        error: err
                    }
                });
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Error. Wallet no creada.",
            body: {
                error: err
            }
        });
    }
}

module.exports = transactionController;