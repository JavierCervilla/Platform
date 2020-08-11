const mongoose = require('mongoose');

const AsignaturaSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    curso : {
        type: [String],
        required: true
    },
    guia_docente : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GuiaDocente'
    },
    followers: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Asignatura', AsignaturaSchema);