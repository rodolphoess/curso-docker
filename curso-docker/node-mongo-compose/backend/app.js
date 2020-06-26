// Importações
const express = require('express')
const restful = require('node-restful')
const server = express()
const mongoose = restful.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')

// Database. Conexão com o MongoDB
mongoose.Promise = global.Promise // Pegando a API de Promises do Node e atribuindo à API de promises do Mongo, pois a API do Mongo está deprecated
mongoose.connect('mongodb://db/mydb') // Conexão. //nome-do-servidor/

// Teste
server.get('/', (req, res, next) => res.send('Backend'))

// // Middlewares
// server.use(bodyParser.urlencoded({extended:true}))
// server.use(bodyParser.json())
// server.use(cors())

// // ODM
// const Client = restful.model('Client', {
//     name: { type: String, required: true }
// })

// // Rest API
// Client.methods(['get', 'post', 'put', 'delete'])
// Client.updateOptions({new: true, runValidators: true})

// // Routes
// Client.register(server, '/clients')

// Start Server
server.listen(3000)