const express = require("express")      
const router = require("./modules/index.js") 

const server = express()

server.use(express.json())
server.use(router)
server.listen(2002, () => {
})
