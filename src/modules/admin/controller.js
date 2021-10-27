const model = require("./model")

const Get = (req, res) => {
    model.get(req, res)
}

module.exports = {
    Get
}