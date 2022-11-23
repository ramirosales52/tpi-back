const mongoose = require('mongoose')

const denunciasSchema = new mongoose.Schema({
    denunciaanonima: {
        type: Boolean,
        require: true,
        default: false
    },
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    tipodni: {
        type: String,
        require: true
    },
    dni: {
        type: Number,
        require: true
    },
    telmovil: {
        type: Number
    },
    telfijo: {
        type: Number
    },
    localidad: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    denunciado: {
        type: Boolean,
        default: false,
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
    descripcion: {
        type: String,
        require: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model('Denuncia', denunciasSchema)