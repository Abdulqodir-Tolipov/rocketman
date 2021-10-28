const express = require("express")      
const router = require("./modules/index.js") 


const server = express()

// middlewares
server.use(express.json())
server.use(router)


server.listen(2002, () => {
    console.log(2002);
})
