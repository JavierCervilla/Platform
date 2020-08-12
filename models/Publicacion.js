const mongoose = require('mongoose');

/*
** PUBLICACIÓN:
**  -> titulo
**  -> texto: contenido de la publicacion en texto.
**  -> referencias: lista de referencias de la publicacion.
**  -> user: usuario que ha creado la publicacion.
**  -> valoraciones: lista de valoraciones de la publicacion.
**      -> VALORACION:
**          -> like : si es una valoracion positiva sera true.
**          -> dislike: si es una valoracion negativa sera true.
**          -> comentario: Comentario opcional de la publicacion.
*/

const PublicacionSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    texto: {
        type: String,
        required: true
    },
    referencias: {
        type: [String]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    valoracion: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Valoration'
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

module.exports = mongoose.model('Publicacion', PublicacionSchema);