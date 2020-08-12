const mongoose = require('mongoose');


/*
**  WALLET:
**  -> addres: id de la cartera.
**  -> cantidad: monto de tokens de la cartera.
**  historial de transacciones:
**   ->transaccion:
**      ->importe.
**      ->origen: cartera de origen.
**      ->destino: cartera de destino.
**      ->concepto: concepto de transaccion.
**      ->created: fecha de creacion.
**      ->closed: fecha de cierre de la transaccion.
**      ->status: estado de la transaccion. 
*/

const WalletSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        unique: true,
        unmutable: true
    },
    cantidad: {
        type: Number,
        default: 50
    },
    historial: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Transaction',
    },
    created: {
        type: Date,
        default: Date.now 
    },
    updated: {
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('Wallet', WalletSchema);