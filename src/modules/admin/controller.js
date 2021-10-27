const model = require('./model.js')

module.exports = {
    get: (_, res) => model.get(_, res),

    post: async (req, res) => {
        try {
            let post = await model.post(req.body)
            if(post){
                res.json({
                    status: 200,
                    message: 'The new admin'
                })
            } else throw new Error('Somethin went wrong!')
        } catch (error) {
            res.status(400).json({
                status: 400,
                message: error
            })
        }
    },

    put: async (req, res) => {
        try {
            let put = await model.put(req.body)
            if(put){
                res.json({
                    status: 200,
                    message: 'The admin updated'
                })
            } else throw new Error('Somethin went wrong!')
        } catch (error) {
            res.status(400).json({
                status: 400,
                message: error
            })
        }
    },

    delete: async (req, res) => {
        try {
            let delet = await model.delete(req.body)
            if(delet){
                res.json({
                    status: 200,
                    message: 'The admin deleted'
                })
            } else throw new Error('Somethin went wrong!')
        } catch (error) {
            res.status(400).json({
                status: 400,
                message: error
            })
        }
    }
}
