const mongoose = require('mongoose')

const denunciasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    localidad: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    nombredenunciado: {
        type: String,
        require: true
    }, 
    apellidodenunciado: {
        type: String,
        require: true
    },
    tipoinfraccion: {
        type: String,
        require: true
    },
    motivo: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Denuncia', denunciasSchema)