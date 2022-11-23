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

route.get('/:email/:id', (req, res) => {
    let result = getDenunciaById(req.params.id)
    result.then(value => {
        res.json({
            value: value
        })
    }) .catch(err =>{
        res.status(400).json({
            error: err
        })                                                                  
    })
})

route.get('/:email', (req, res) => {
    let result = getDenunciasByEmail(req.params.email)
    result.then(value => {
        res.json({
            value: value
        })
    }) .catch(err =>{
        res.status(400).json({
            error: err
        })
    })
})




async function crearDenuncia(body){
    let denuncia = new Denuncia({
        denunciaanonima     : body.denunciaanonima,
        nombre              : body.nombre,
        apellido            : body.apellido,
        tipodni             : body.tipodni,
        dni                 : body.dni,
        telmovil            : body.telmovil,
        telfijo             : body.telfijo,
        localidad           : body.localidad,
        email               : body.email,
        denunciado          : body.denunciado,
        nombredenunciado    : body.nombredenunciado,
        apellidodenunciado  : body.apellidodenunciado,
        domiciliodenunciado : body.domiciliodenunciado,
        tipoinfraccion      : body.tipoinfraccion,
        descripcion         : body.descripcion,
        fecha               : body.fecha
    })

    return await denuncia.save() 
}


async function consultarDenuncias(){
    let denuncias = await Denuncia.find()
    return denuncias
}

async function getDenunciasByEmail(email){
    let denunciasbyemail = await Denuncia.find({"email": email})
    return denunciasbyemail
}

async function getDenunciaById(id){
    let denunciabyid = await Denuncia.findById(id)
    return denunciabyid
}


module.exports = route;