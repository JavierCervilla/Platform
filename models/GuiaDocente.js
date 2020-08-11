const mongoose = require('mongoose');

/*
** TUTOR INTERNO (USUARIO)
*/

const TutorInterno = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    disponibilidad: {
        type: String,
        required: true
        // FIXME: igual aqui se podria poner predefinidos
    },
    coste: {
        type: Number,
        default: 1
    }
});

/*
** TUTOR EXTERNO (ACADEMIAS)
*/

const TutorExterno = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
});

/*
** ZONA DE INFORMACIÓN
*/

const ZonaInfo = new mongoose.Schema({
    descargables: {
        type: [String]
    },
    audioVisuales: {
        type: [String]
    },
    tutorias_externas: {
        type: [TutorExterno]
    },
    tutorias_internas: {
        type: [TutorInterno]
    },
    lecturas: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Publicacion'
    }
    //FIXME: tutorias internas iran en el documento del usuario
});

/*
** TEMAS
*/

const Temas = new mongoose.Schema({
    zona_info: {
        type: ZonaInfo
    },
    foro_dudas: {
        //FIXME: ver como tratar el foro
        //TODO: Crear modelo de foro
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Foro' 
    },
    salas_chat: {
        //FIXME: ver como tratar el chat
        //TODO: Crear modelo de sala de chat
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Chat'
    },
    seminarios: {
        //FIXME: ver como tratar los seminarios
        //TODO: Crear modelo de seminario
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Seminario'
    }
});

/*
** GUIA DOCENTE
*/

const GuiaDocenteSchema = new mongoose.Schema({
    temas : {
        types: [Temas]
    },
    asignatura: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asignatura'
    }
});

module.exports = mongoose.model('GuiaDocente', GuiaDocenteSchema);