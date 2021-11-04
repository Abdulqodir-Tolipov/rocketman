const model = require("../repositories/realUsers.js")

const GET = async (req, res) => {
    const users = await model.get()
    if(users){
        res.status(200).json(users)
    }
}

module.exports = {
    GET
}