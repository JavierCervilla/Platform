const mongoose = require('mongoose');

/*
**   ->TRANSACCIÓN:
**      ->importe de la operacion.
**      ->origen: cartera de origen.
**      ->destino: cartera de destino.
**      ->concepto: concepto de transaccion.
**      ->created: fecha de creacion.
*/

// TODO: VER SI ES UTIL CREAR MODELO DE TOKEN PARA PODER RASTREARLO.

const TransactionSchema = new mongoose.Schema({
    importe: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    origen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet',
        required: true,
    },
    destino: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet',
        required: true
    },
    concepto: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);