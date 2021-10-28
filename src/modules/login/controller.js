const {loginModel} = require("./model.js")

const login = async (req, res) => {
    try {
        const logged = await loginModel(req.body)
        if (logged.length) {
            res.status(200).json({
                status: 200,
                message: "You are logged in!",
            }) 
        } else throw new Error("Wrong password or username")
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message,
        })
    }
}
 
module.exports = login