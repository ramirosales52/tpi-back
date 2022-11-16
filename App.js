const express = require('express')
const app = express()
const mongoose = require('mongoose')
const denuncias = require('./routes/denuncias.routes')
const cors = require('cors')
const morgan = require('morgan')

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

mongoose.connect('mongodb://localhost:27017/denuncias')
    .then(() => console.log('DB Conectado'))
    .catch(err => console.log("Error de Conexion... ", err))

    
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use('/api/denuncias', denuncias)
app.use(morgan('dev'))

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log('Listen... ', port)
})


