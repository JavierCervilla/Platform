const mongoose = require('mongoose');

/*
**  ->ADRESS: String hexadecimal de 32 bits unico que identifica una cartera.
*/
const Adress = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        unique: true,
        unmutable: true
    }
});

/*
**   ->TRANSACCIÓN:
**      ->importe de la operacion.
**      ->origen: cartera de origen.
**      ->destino: cartera de destino.
**      ->concepto: concepto de transaccion.
**      ->created: fecha de creacion.
**      ->closed: fecha de cierre de la transaccion.
**      ->status: estado de la transaccion.
*/

// TODO: VER SI ES UTIL CREAR MODELO DE TOKEN PARA PODER RASTREARLO.

const Transaccion = new mongoose.Schema({
    importe: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    origen: {
        type: String,
        required: true
    },
    destino: {
        type: String,
        required: true
    },
    concepto: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    closed: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["Correcta", "En proceso", "Incorrecta"]
    }
});

/*
**  WALLET:
**  -> addres: direccion publica de la cartera.
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
    address: {
        type: Adress
    },
    cantidad: {
        type: Number,
        default: 50
    },
    historial: {
        type: [Transaccion]
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