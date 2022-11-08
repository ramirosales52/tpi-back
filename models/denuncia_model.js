const mongoose = require('mongoose')

const denunciasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    localidad: {
        type: String,
        required: true
    },
    tipoinfraccion: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Denuncia', denunciasSchema)