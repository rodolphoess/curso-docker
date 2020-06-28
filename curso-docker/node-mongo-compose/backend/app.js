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

// Middlewares
server.use(bodyParser.urlencoded({extended:true})) // Faz o parser do conteúdo que vier no body do request.
server.use(bodyParser.json())   // Faz o parser do JSON
server.use(cors())

// ODM - Mapeamento Objeto-Documento
const Client = restful.model('Client', {    // Cria uma entidade cliente com o atributo nome.
    name: { type: String, required: true }
})

// Rest API
Client.methods(['get', 'post', 'put', 'delete'])    // As operações possíveis para o cliente. E o node já cria tbm todas as rotas para as operações que foram indicadas no mapeamento, ou seja, os saves, findBy, updates, etc.
Client.updateOptions({new: true, runValidators: true})

// Routes
Client.register(server, '/clients') // Tudo o que foi definido na Rest API será usado como raíz o /clients e as operações de get, post, put e delete.

// Start Server
server.listen(3000)