const express = require('express')
const route = express.Router()
const Denuncia = require('../models/denuncia_model')
const Joi = require('joi')

const schema = Joi.object({
    nombre: Joi.string()
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})


route.post('/', (req, res) => {
    let body = req.body;
    const { error, value } = schema.validate({nombre: body.nombre, email: body.email})

    if(!error){
        let result = crearDenuncia(body)
    
        result.then(denuncia => {
            res.json({
                mensaje: 'Denuncia guardada',
                value: denuncia
            })
        }) .catch(err => {
            res.status(400).json({
                error: err
            })
        })
    } else {
        res.status(400).json({
            error: error
        })
    }
})


route.get('/', (req, res) => {
    let result = consultarDenuncias()
    result.then(denuncias => {
        res.json(denuncias)
    }) .catch(err => {
        res.status(400).json({
            error: err
        })
    })
})



async function crearDenuncia(body){
    let denuncia = new Denuncia({
        nombre              : body.nombre,
        email               : body.email,
        localidad           : body.localidad,
        tipoinfraccion      : body.tipoinfraccion,
    })

    return await denuncia.save() 
}


async function consultarDenuncias(){
    let denuncias = await Denuncia.find()
    return denuncias
}




module.exports = route;