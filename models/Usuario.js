const mongoose = require('mongoose');

/*
** REPUTACION:
**      -> Rango
**      -> Experiencia
**      -> Puntuacion
*/

const Reputacion = new mongoose.Schema({
    Rango: {
        type: Number,
        default: 0
    },
    Experiencia: {
        type: Number,
        default: 0
    },
    puntuacion: {
        type: Number,
        default: 0
    }
});

/*
** DATOS PERSONALES
** //TODO: (Estaria bien saber si se puede ocultar / encriptar.
** de momento aislado para tenerlo en un solo documento.)
** -> Datos personales:
**      -> Nombre
**      -> Apellido
**      -> Telefono
**      -> Edad
**      -> Password
*/

const DatosPersonales = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true,
        unique: true
    },
    edad: {
        type: Number,
        min: 16,
        max: 99
    },
    password: {
        type: String,
        required: true
    }
});

/*
** USUARIO
** -> Datos personales:
**      -> Nombre
**      -> Apellido
**      -> Telefono
**      -> Edad
**      -> Password
** -> Nombre de usuario
** -> Tipo de usuario: 
**   ["1º Bachillerato", "2º Bachillerato", "Universitario", "profesor", "partner"]
** -> Nombre de la escuela
** -> Skills
** -> Wallet
** -> Reputacion:
**      -> Rango
**      -> Experiencia
**      -> Puntuacion
*/

const UsuarioSchema = new mongoose.Schema({
    datos_personales: {
        type: DatosPersonales
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    tipo_usuario: {
        type: String,
        enum: ["1º Bachillerato", "2º Bachillerato", "Universitario", "profesor", "partner", "admin"]
    },
    school_name: {
        type: [String]
    },
    /*skills: {
        //TODO: Crear modelo de Skills
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skills'
    },*/
    reputacion: {
        type: Reputacion,
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

module.exports = mongoose.model('Usuario', UsuarioSchema);