const model = require('./model.js')

module.exports = {
    get: (_, res) => model.get(_, res),
    post: async (req, res) => {
        let mod = await model.post(req.body)
        if (mod) {
            res.json({
                status: 200,
                message: "New post created..."
            })
        } else {
            res.json({
                status: 404,
                message: "Not found category_id"
            })
        }


    },
    put: async (req, res) => {
        let resp = await model.put(req.body)
        if (resp) {
            res.json({
                status: 201,
                message: "The category updated.."
            })
        } else {
            res.json({
                status: 404,
                message: "Not found category_id"
            })
        }
    },
    delete: async (req, res, next) => {
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
            return next(error)

        }
    }
}