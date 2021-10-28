const express = require("express")      
const router = require("./modules/index.js") 


const server = express()

server.use(express.json())
server.use(router)


server.listen(2002, () => {
    console.log(2002);
})
<<<<<<< HEAD
=======

>>>>>>> f3678d3e6eb8491deffb3b8d705235174faea865
