const mongoose = require('mongoose');

/*
** VALORACIÓN DE LA PUBLICACION
**  -> like : si es una valoracion positiva sera true.
**  -> dislike: si es una valoracion negativa sera true.
**  -> comentario: Comentario opcional de la publicacion.
**  -> fecha de creacion.
*/

const Valoracion = new mongoose.Schema({
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

/*
** PUBLICACIÓN:
**  -> titulos: Lista de titulos y subtitulos.
**  -> texto: contenido de la publicacion en texto.
**  -> imagenes: lista de imagenes que acompañan la publicacion.
**  -> referencias: lista de referencias de la publicacion.
**  -> user: usuario que ha creado la publicacion.
**  -> valoraciones: lista de valoraciones de la publicacion.
**      -> VALORACION:
**          -> like : si es una valoracion positiva sera true.
**          -> dislike: si es una valoracion negativa sera true.
**          -> comentario: Comentario opcional de la publicacion.
*/

const PublicacionSchema = new mongoose.Schema({
    titulos: {
        type: [String],
    },
    texto: {
        type: String,
        required: true
    },
    imagenes: {
        type: [String]
    },
    referencias: {
        type: [String]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    valoracion: {
        type: [Valoracion]
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