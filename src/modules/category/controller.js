const model = require('./model.js')

module.exports = {
    get: (_, res) => model.get(_, res),

    post: async (req, res) => {
        try {
            let mod = await model.post(req.body)
        if (mod) {
            res.json({
                status: 200,
                message: "New post created..."
            })
        } else throw Error('Somethin went wrong!')
        } catch (error) {
            res.status(400).json({
                status: 400,
                message: error
            }) 
        }
    },

    put: async (req, res) => {
        try {
            let resp = await model.put(req.body)
        if (resp) {
            res.json({
                status: 201,
                message: "The category updated.."
            })
        } else throw Error('Somethin went wrong!')
        } catch (error) {
            res.status(400).json({
                status: 400,
                message: error
            })
        }
    },

    delete: async (req, res) => {
        try {
            let category = await model.delete(req.body)
            if (category) {
                res.json({
                    status: 200,
                    message: "The category deleted...",
                    data: category
                })
            } else throw new Error("There is an error")
        } catch (error) {
            res.status(400).json({
                status: 400,
                message: error
            })
        }
    }
}