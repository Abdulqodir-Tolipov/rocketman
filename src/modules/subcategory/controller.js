const model = require("./model")

module.exports = {
    get: (_, res) => model.get(_, res),
    post: (req, res) => {
        try {
            let mod = model.post(req.body)
            console.log(req.body);
            if (mod) {
                return res.status(201).json({
                    status: 201,
                    message: "New subcategory created..."
                })
            }
        } catch (error) {
            return res.status(403).json({
                status: 403,
                message: "Something wrong..."
            })
        }
    },
    put: (req, res) => {
        try {
            let mod = model.put(req.body)
            if (mod) {
                return res.status(201).json({
                    status: 201,
                    message: "New subcategory created..."
                })
            }
        } catch (error) {

        }
    }
}