const mongoose = require('mongoose');

/*
** VALORACIÓN DE LA PUBLICACION
**  -> like : si es una valoracion positiva sera true.
**  -> dislike: si es una valoracion negativa sera true.
**  -> comentario: Comentario opcional de la publicacion.
**  -> fecha de creacion.
*/

const ValorationSchema = new mongoose.Schema({
    like: {
        type: Boolean,
        default: false
    },
    disLike: {
        type: Boolean,
        default: false
    },
    comentario:
    {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Valoration', ValorationSchema);