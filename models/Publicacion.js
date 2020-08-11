const mongoose = require('mongoose');

/*
** VALORACIÓN DE LA PUBLICACION
*/
const Valoracion = new mongoose.Schema({
    likes: {
        type: Number,
        default: 0
    },
    disLikes: {
        type: Number,
        default: 0
    },
    comentarios:
    {
        type: [String]
    }
});

/*
** PUBLICACIÓN
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